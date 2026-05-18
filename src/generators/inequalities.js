// Vẽ miền nghiệm hệ bất phương trình bậc nhất hai ẩn

function r(n) { return Math.round(n * 1000) / 1000; }

function gcdInt(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

// Format number as fraction if possible, else decimal
function fmtN(n) {
  const rn = Math.round(n * 10000) / 10000;
  if (Number.isInteger(rn)) return String(rn);
  for (let d = 2; d <= 20; d++) {
    const p = Math.round(rn * d);
    if (Math.abs(p / d - rn) < 5e-4) {
      const g = gcdInt(Math.abs(p), d);
      return `${p / g}/${d / g}`;
    }
  }
  return String(Math.round(rn * 100) / 100);
}

// Liang-Barsky line clipping to rectangle [xmin,xmax] x [ymin,ymax]
// Returns [x1,y1,x2,y2] or null if fully outside
function clipLine(x1, y1, x2, y2, xmin, xmax, ymin, ymax) {
  let t0 = 0, t1 = 1;
  const dx = x2 - x1, dy = y2 - y1;
  const clip = (p, q) => {
    if (Math.abs(p) < 1e-12) return q >= 0;
    const t = q / p;
    if (p < 0) { if (t > t1) return false; if (t > t0) t0 = t; }
    else { if (t < t0) return false; if (t < t1) t1 = t; }
    return true;
  };
  if (!clip(-dx, x1 - xmin) || !clip(dx, xmax - x1)) return null;
  if (!clip(-dy, y1 - ymin) || !clip(dy, ymax - y1)) return null;
  if (t0 > t1) return null;
  return [x1 + t0 * dx, y1 + t0 * dy, x1 + t1 * dx, y1 + t1 * dy];
}

// Sutherland-Hodgman polygon clipping by half-plane ax+by <= c (isLe=true) or >= c (isLe=false)
function clipPolygon(poly, a, b, c, isLe) {
  if (!poly.length) return [];
  const inside = (x, y) => isLe ? a * x + b * y - c <= 1e-9 : a * x + b * y - c >= -1e-9;
  const intersect = ([x1, y1], [x2, y2]) => {
    const d1 = a * x1 + b * y1 - c;
    const d2 = a * x2 + b * y2 - c;
    if (Math.abs(d1 - d2) < 1e-12) return [x1, y1];
    const t = d1 / (d1 - d2);
    return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
  };
  const out = [];
  for (let i = 0; i < poly.length; i++) {
    const cur = poly[i], nxt = poly[(i + 1) % poly.length];
    const cIn = inside(...cur), nIn = inside(...nxt);
    if (cIn) out.push(cur);
    if (cIn !== nIn) out.push(intersect(cur, nxt));
  }
  return out;
}

// Format linear inequality label for Typst math: "ax + by <= c"
function fmtIneqLabel(a, b, c, sign) {
  let lhs = '';
  if (a !== 0) {
    if (a === 1) lhs += 'x';
    else if (a === -1) lhs += '-x';
    else lhs += `${fmtN(a)}x`;
  }
  if (b !== 0) {
    const absB = Math.abs(b);
    const yStr = absB === 1 ? 'y' : `${fmtN(absB)}y`;
    if (!lhs) lhs += b < 0 ? `-${yStr}` : yStr;
    else lhs += b < 0 ? ` - ${yStr}` : ` + ${yStr}`;
  }
  if (!lhs) return '';
  const signStr = sign === 'le' ? '<=' : '>=';
  return `$${lhs} ${signStr} ${fmtN(c)}$`;
}

export function generateInequalityRegion(params) {
  const N = v => { const n = parseFloat(v); return isNaN(n) ? 0 : n; };
  const B = v => v === true || v === 'true';

  const a1 = N(params.a1 ?? 1),  b1 = N(params.b1 ?? 1),  c1 = N(params.c1 ?? 4);
  const sign1 = params.sign1 === '≥' ? 'ge' : 'le';
  const a2 = N(params.a2 ?? 1),  b2 = N(params.b2 ?? -1), c2 = N(params.c2 ?? 2);
  const sign2 = params.sign2 === '≥' ? 'ge' : 'le';
  const a3 = N(params.a3 ?? 0),  b3 = N(params.b3 ?? 0),  c3 = N(params.c3 ?? 0);
  const sign3 = params.sign3 === '≥' ? 'ge' : 'le';

  const xge0 = B(params.xge0 ?? true);
  const yge0 = B(params.yge0 ?? true);
  const minX = N(params.minX ?? -1), maxX = N(params.maxX ?? 6);
  const minY = N(params.minY ?? -1), maxY = N(params.maxY ?? 6);
  const showGrid = B(params.showGrid ?? true);

  // Build list of active inequalities
  const ineqs = [];
  const addIneq = (a, b, c, sign) => {
    if (Math.abs(a) < 1e-12 && Math.abs(b) < 1e-12) return;
    ineqs.push({ a, b, c, sign });
  };
  addIneq(a1, b1, c1, sign1);
  addIneq(a2, b2, c2, sign2);
  addIneq(a3, b3, c3, sign3);
  if (xge0) addIneq(1, 0, 0, 'ge');
  if (yge0) addIneq(0, 1, 0, 'ge');

  // Compute feasible polygon via Sutherland-Hodgman clipping
  let polygon = [[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]];
  for (const { a, b, c, sign } of ineqs) {
    polygon = clipPolygon(polygon, a, b, c, sign === 'le');
    if (!polygon.length) break;
  }

  // Detect boundary lines that coincide with the coordinate axes (x=0 or y=0)
  const isCoordAxis = (a, b, c) =>
    (Math.abs(a - 1) < 1e-9 && Math.abs(b) < 1e-9 && Math.abs(c) < 1e-9) ||
    (Math.abs(a) < 1e-9 && Math.abs(b - 1) < 1e-9 && Math.abs(c) < 1e-9);

  const lines = [];
  lines.push(`#import "@preview/cetz:0.3.2": canvas, draw`);
  lines.push(`#set page(width: auto, height: auto, margin: 10pt)`);
  lines.push(``);
  lines.push(`#canvas({`);
  lines.push(`  import draw: *`);

  // Grid
  if (showGrid) {
    lines.push(``);
    for (let xi = Math.ceil(minX); xi <= Math.floor(maxX); xi++) {
      lines.push(`  line((${xi}, ${r(minY)}), (${xi}, ${r(maxY)}), stroke: 0.3pt + gray.lighten(50%))`);
    }
    for (let yi = Math.ceil(minY); yi <= Math.floor(maxY); yi++) {
      lines.push(`  line((${r(minX)}, ${yi}), (${r(maxX)}, ${yi}), stroke: 0.3pt + gray.lighten(50%))`);
    }
  }

  // Feasible region fill
  if (polygon.length >= 3) {
    lines.push(``);
    const pts = polygon.map(([x, y]) => `(${r(x)}, ${r(y)})`).join(', ');
    lines.push(`  line(${pts}, close: true, fill: blue.transparentize(72%), stroke: none)`);
  }

  // Boundary lines
  ineqs.forEach(({ a, b, c, sign }) => {
    if (isCoordAxis(a, b, c)) return;
    let seg;
    if (Math.abs(b) > 1e-9) {
      // Non-vertical: extend far horizontally then clip
      seg = clipLine(
        minX - 10, (c - a * (minX - 10)) / b,
        maxX + 10, (c - a * (maxX + 10)) / b,
        minX, maxX, minY, maxY
      );
    } else if (Math.abs(a) > 1e-9) {
      // Vertical line x = c/a
      const vx = c / a;
      seg = [vx, minY, vx, maxY];
    }
    if (!seg) return;
    lines.push(`  line((${r(seg[0])}, ${r(seg[1])}), (${r(seg[2])}, ${r(seg[3])}), stroke: 1pt + black)`);
    // Label near midpoint, slightly above
    const mx = r((seg[0] + seg[2]) / 2);
    const my = r((seg[1] + seg[3]) / 2 + 0.2);
    const lbl = fmtIneqLabel(a, b, c, sign);
    if (lbl) lines.push(`  content((${mx}, ${my}), [${lbl}], anchor: "south")`);
  });

  // Coordinate axes
  lines.push(``);
  lines.push(`  line((${r(minX)}, 0), (${r(maxX + 0.5)}, 0), stroke: 1.2pt + black)`);
  lines.push(`  line((0, ${r(minY)}), (0, ${r(maxY + 0.5)}), stroke: 1.2pt + black)`);
  lines.push(`  content((${r(maxX + 0.65)}, 0), [$x$])`);
  lines.push(`  content((0.1, ${r(maxY + 0.55)}), [$y$])`);
  lines.push(`  content((-0.25, -0.25), [$O$])`);

  // Axis tick marks and numbers
  for (let xi = Math.ceil(minX); xi <= Math.floor(maxX); xi++) {
    if (xi === 0) continue;
    lines.push(`  line((${xi}, -0.1), (${xi}, 0.1), stroke: 0.8pt + black)`);
    lines.push(`  content((${xi}, -0.3), [$${xi}$], anchor: "north")`);
  }
  for (let yi = Math.ceil(minY); yi <= Math.floor(maxY); yi++) {
    if (yi === 0) continue;
    lines.push(`  line((-0.1, ${yi}), (0.1, ${yi}), stroke: 0.8pt + black)`);
    lines.push(`  content((-0.3, ${yi}), [$${yi}$], anchor: "east")`);
  }

  // Vertex dots and coordinate labels
  if (polygon.length >= 3) {
    const cx = polygon.reduce((s, [x]) => s + x, 0) / polygon.length;
    const cy = polygon.reduce((s, [, y]) => s + y, 0) / polygon.length;
    polygon.forEach(([x, y]) => {
      lines.push(`  circle((${r(x)}, ${r(y)}), radius: 0.07, fill: red, stroke: none)`);
      // Pick anchor direction pointing away from centroid
      let anc = '';
      if (y > cy + 0.1) anc += 'north'; else if (y < cy - 0.1) anc += 'south';
      if (x > cx + 0.1) anc += (anc ? '-' : '') + 'east';
      else if (x < cx - 0.1) anc += (anc ? '-' : '') + 'west';
      if (!anc) anc = 'south';
      lines.push(`  content((${r(x)}, ${r(y)}), [$(${fmtN(x)}; ${fmtN(y)})$], anchor: "${anc}")`);
    });
  }

  lines.push(`})`);
  return lines.join('\n');
}

// ── Miền nghiệm BPT đường tròn: (x-h)² + (y-k)² ≤/≥ r² ──────────────────
export function generateCircleRegion(params) {
  const N = v => { const n = parseFloat(v); return isNaN(n) ? 0 : n; };
  const B = v => v === true || v === 'true';

  const h = N(params.h ?? 0);
  const k = N(params.k ?? 0);
  const rad = Math.max(0.1, Math.abs(N(params.rad ?? 3)));
  const isLe = (params.sign !== '≥');
  const minX = N(params.minX ?? -5);
  const maxX = N(params.maxX ?? 5);
  const minY = N(params.minY ?? -5);
  const maxY = N(params.maxY ?? 5);
  const showGrid = B(params.showGrid ?? true);

  function fmtCircleEq() {
    const r2 = rad * rad;
    const r2str = Number.isInteger(Math.round(r2 * 100) / 100) ? String(Math.round(r2)) : String(Math.round(r2 * 100) / 100);
    const hPart = h === 0 ? 'x^2' : h > 0 ? `(x - ${fmtN(h)})^2` : `(x + ${fmtN(-h)})^2`;
    const kPart = k === 0 ? 'y^2' : k > 0 ? `(y - ${fmtN(k)})^2` : `(y + ${fmtN(-k)})^2`;
    return `$${hPart} + ${kPart} ${isLe ? '<=' : '>='} ${r2str}$`;
  }

  const lines = [];
  lines.push(`#import "@preview/cetz:0.3.2": canvas, draw`);
  lines.push(`#set page(width: auto, height: auto, margin: 10pt)`);
  lines.push(``);
  lines.push(`#canvas({`);
  lines.push(`  import draw: *`);

  if (showGrid) {
    lines.push(``);
    for (let xi = Math.ceil(minX); xi <= Math.floor(maxX); xi++) {
      lines.push(`  line((${xi}, ${r(minY)}), (${xi}, ${r(maxY)}), stroke: 0.3pt + gray.lighten(50%))`);
    }
    for (let yi = Math.ceil(minY); yi <= Math.floor(maxY); yi++) {
      lines.push(`  line((${r(minX)}, ${yi}), (${r(maxX)}, ${yi}), stroke: 0.3pt + gray.lighten(50%))`);
    }
  }

  lines.push(``);
  if (isLe) {
    lines.push(`  circle((${r(h)}, ${r(k)}), radius: ${r(rad)}, fill: blue.transparentize(72%), stroke: none)`);
  } else {
    lines.push(`  rect((${r(minX)}, ${r(minY)}), (${r(maxX)}, ${r(maxY)}), fill: blue.transparentize(72%), stroke: none)`);
    lines.push(`  circle((${r(h)}, ${r(k)}), radius: ${r(rad)}, fill: white, stroke: none)`);
  }
  lines.push(`  circle((${r(h)}, ${r(k)}), radius: ${r(rad)}, fill: none, stroke: 1pt + black)`);

  const lblY = r(Math.min(maxY - 0.15, k + rad + 0.3));
  lines.push(`  content((${r(h)}, ${lblY}), [${fmtCircleEq()}], anchor: "south")`);

  lines.push(``);
  lines.push(`  line((${r(minX)}, 0), (${r(maxX + 0.5)}, 0), stroke: 1.2pt + black)`);
  lines.push(`  line((0, ${r(minY)}), (0, ${r(maxY + 0.5)}), stroke: 1.2pt + black)`);
  lines.push(`  content((${r(maxX + 0.65)}, 0), [$x$])`);
  lines.push(`  content((0.1, ${r(maxY + 0.55)}), [$y$])`);
  lines.push(`  content((-0.25, -0.25), [$O$])`);

  for (let xi = Math.ceil(minX); xi <= Math.floor(maxX); xi++) {
    if (xi === 0) continue;
    lines.push(`  line((${xi}, -0.1), (${xi}, 0.1), stroke: 0.8pt + black)`);
    lines.push(`  content((${xi}, -0.3), [$${xi}$], anchor: "north")`);
  }
  for (let yi = Math.ceil(minY); yi <= Math.floor(maxY); yi++) {
    if (yi === 0) continue;
    lines.push(`  line((-0.1, ${yi}), (0.1, ${yi}), stroke: 0.8pt + black)`);
    lines.push(`  content((-0.3, ${yi}), [$${yi}$], anchor: "east")`);
  }

  lines.push(`  circle((${r(h)}, ${r(k)}), radius: 0.07, fill: red, stroke: none)`);
  if (h !== 0 || k !== 0) {
    lines.push(`  content((${r(h + 0.15)}, ${r(k + 0.15)}), [$(${fmtN(h)};${fmtN(k)})$], anchor: "south-west")`);
  }

  lines.push(`})`);
  return lines.join('\n');
}

// ── Miền nghiệm BPT parabol: y ≤/≥ ax² + bx + c ─────────────────────────
export function generateParabolaRegion(params) {
  const N = v => { const n = parseFloat(v); return isNaN(n) ? 0 : n; };
  const B = v => v === true || v === 'true';

  const a = N(params.a ?? 1);
  const b = N(params.b ?? 0);
  const c = N(params.c ?? 0);
  const isLe = (params.sign !== '≥');
  const minX = N(params.minX ?? -4);
  const maxX = N(params.maxX ?? 4);
  const minY = N(params.minY ?? -3);
  const maxY = N(params.maxY ?? 6);
  const showGrid = B(params.showGrid ?? true);

  function fmtParabolaEq() {
    let eq = '';
    if (a !== 0) {
      if (a === 1) eq += 'x^2';
      else if (a === -1) eq += '-x^2';
      else eq += `${fmtN(a)}x^2`;
    }
    if (b !== 0) {
      const bAbs = Math.abs(b);
      const bStr = bAbs === 1 ? 'x' : `${fmtN(bAbs)}x`;
      if (!eq) eq += b < 0 ? `-${bStr}` : bStr;
      else eq += b < 0 ? ` - ${bStr}` : ` + ${bStr}`;
    }
    if (c !== 0) {
      if (!eq) eq += fmtN(c);
      else eq += c < 0 ? ` - ${fmtN(-c)}` : ` + ${fmtN(c)}`;
    }
    if (!eq) eq = '0';
    return `$y ${isLe ? '<=' : '>='} ${eq}$`;
  }

  const N_SAMPLES = 80;
  const step = (maxX - minX) / N_SAMPLES;
  const parabolaPts = [];
  for (let i = 0; i <= N_SAMPLES; i++) {
    const x = minX + i * step;
    const y = Math.max(minY, Math.min(maxY, a * x * x + b * x + c));
    parabolaPts.push([r(x), r(y)]);
  }

  const lines = [];
  lines.push(`#import "@preview/cetz:0.3.2": canvas, draw`);
  lines.push(`#set page(width: auto, height: auto, margin: 10pt)`);
  lines.push(``);
  lines.push(`#canvas({`);
  lines.push(`  import draw: *`);

  if (showGrid) {
    lines.push(``);
    for (let xi = Math.ceil(minX); xi <= Math.floor(maxX); xi++) {
      lines.push(`  line((${xi}, ${r(minY)}), (${xi}, ${r(maxY)}), stroke: 0.3pt + gray.lighten(50%))`);
    }
    for (let yi = Math.ceil(minY); yi <= Math.floor(maxY); yi++) {
      lines.push(`  line((${r(minX)}, ${yi}), (${r(maxX)}, ${yi}), stroke: 0.3pt + gray.lighten(50%))`);
    }
  }

  lines.push(``);
  const cornerBase = isLe ? r(minY) : r(maxY);
  const fillPts = [
    `(${r(minX)}, ${cornerBase})`,
    ...parabolaPts.map(([x, y]) => `(${x}, ${y})`),
    `(${r(maxX)}, ${cornerBase})`
  ];
  lines.push(`  line(${fillPts.join(', ')}, close: true, fill: blue.transparentize(72%), stroke: none)`);

  const curvePts = parabolaPts.map(([x, y]) => `(${x}, ${y})`).join(', ');
  lines.push(`  line(${curvePts}, stroke: 1pt + black)`);

  // Label near right side of curve
  const lx = maxX - 0.5;
  const ly = Math.max(minY, Math.min(maxY, a * lx * lx + b * lx + c));
  const labelY = isLe ? r(Math.min(maxY, ly + 0.5)) : r(Math.max(minY, ly - 0.5));
  lines.push(`  content((${r(lx)}, ${labelY}), [${fmtParabolaEq()}], anchor: ${isLe ? '"south"' : '"north"'})`);

  lines.push(``);
  lines.push(`  line((${r(minX)}, 0), (${r(maxX + 0.5)}, 0), stroke: 1.2pt + black)`);
  lines.push(`  line((0, ${r(minY)}), (0, ${r(maxY + 0.5)}), stroke: 1.2pt + black)`);
  lines.push(`  content((${r(maxX + 0.65)}, 0), [$x$])`);
  lines.push(`  content((0.1, ${r(maxY + 0.55)}), [$y$])`);
  lines.push(`  content((-0.25, -0.25), [$O$])`);

  for (let xi = Math.ceil(minX); xi <= Math.floor(maxX); xi++) {
    if (xi === 0) continue;
    lines.push(`  line((${xi}, -0.1), (${xi}, 0.1), stroke: 0.8pt + black)`);
    lines.push(`  content((${xi}, -0.3), [$${xi}$], anchor: "north")`);
  }
  for (let yi = Math.ceil(minY); yi <= Math.floor(maxY); yi++) {
    if (yi === 0) continue;
    lines.push(`  line((-0.1, ${yi}), (0.1, ${yi}), stroke: 0.8pt + black)`);
    lines.push(`  content((-0.3, ${yi}), [$${yi}$], anchor: "east")`);
  }

  lines.push(`})`);
  return lines.join('\n');
}

// ── Miền nghiệm hỗn hợp: BPT bậc nhất + BPT đường tròn ──────────────────
export function generateMixedRegion(params) {
  const N = v => { const n = parseFloat(v); return isNaN(n) ? 0 : n; };
  const B = v => v === true || v === 'true';

  const h = N(params.h ?? 0), k = N(params.k ?? 0);
  const rad = Math.max(0.1, Math.abs(N(params.rad ?? 2)));
  const circleIsLe = (params.circleSign !== '≥');

  const a1 = N(params.a1 ?? 1), b1 = N(params.b1 ?? 1), c1 = N(params.c1 ?? 3);
  const sign1 = params.sign1 === '≥' ? 'ge' : 'le';
  const a2 = N(params.a2 ?? 0), b2 = N(params.b2 ?? 0), c2 = N(params.c2 ?? 0);
  const sign2 = params.sign2 === '≥' ? 'ge' : 'le';

  const xge0 = B(params.xge0 ?? false);
  const yge0 = B(params.yge0 ?? false);
  const minX = N(params.minX ?? -4), maxX = N(params.maxX ?? 4);
  const minY = N(params.minY ?? -4), maxY = N(params.maxY ?? 4);
  const showGrid = B(params.showGrid ?? true);

  const linIneqs = [];
  const addIneq = (a, b, c, sign) => {
    if (Math.abs(a) < 1e-12 && Math.abs(b) < 1e-12) return;
    linIneqs.push({ a, b, c, sign });
  };
  addIneq(a1, b1, c1, sign1);
  addIneq(a2, b2, c2, sign2);
  if (xge0) addIneq(1, 0, 0, 'ge');
  if (yge0) addIneq(0, 1, 0, 'ge');

  const lines = [];
  lines.push(`#import "@preview/cetz:0.3.2": canvas, draw`);
  lines.push(`#set page(width: auto, height: auto, margin: 10pt)`);
  lines.push(``);
  lines.push(`#canvas({`);
  lines.push(`  import draw: *`);

  if (showGrid) {
    lines.push(``);
    for (let xi = Math.ceil(minX); xi <= Math.floor(maxX); xi++) {
      lines.push(`  line((${xi}, ${r(minY)}), (${xi}, ${r(maxY)}), stroke: 0.3pt + gray.lighten(50%))`);
    }
    for (let yi = Math.ceil(minY); yi <= Math.floor(maxY); yi++) {
      lines.push(`  line((${r(minX)}, ${yi}), (${r(maxX)}, ${yi}), stroke: 0.3pt + gray.lighten(50%))`);
    }
  }

  lines.push(``);
  if (circleIsLe) {
    // Inside circle ∩ linear: clip 80-gon by linear constraints
    const N_SIDES = 80;
    let polygon = [];
    for (let i = 0; i < N_SIDES; i++) {
      const angle = (2 * Math.PI * i) / N_SIDES;
      polygon.push([h + rad * Math.cos(angle), k + rad * Math.sin(angle)]);
    }
    polygon = clipPolygon(polygon, 1, 0, maxX, true);
    polygon = clipPolygon(polygon, -1, 0, -minX, true);
    polygon = clipPolygon(polygon, 0, 1, maxY, true);
    polygon = clipPolygon(polygon, 0, -1, -minY, true);
    for (const { a, b, c, sign } of linIneqs) {
      if (!polygon.length) break;
      polygon = clipPolygon(polygon, a, b, c, sign === 'le');
    }
    if (polygon.length >= 3) {
      const pts = polygon.map(([x, y]) => `(${r(x)}, ${r(y)})`).join(', ');
      lines.push(`  line(${pts}, close: true, fill: blue.transparentize(72%), stroke: none)`);
    }
  } else {
    // Outside circle ∩ linear: fill linear region, mask out circle interior
    let polygon = [[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]];
    for (const { a, b, c, sign } of linIneqs) {
      if (!polygon.length) break;
      polygon = clipPolygon(polygon, a, b, c, sign === 'le');
    }
    if (polygon.length >= 3) {
      const pts = polygon.map(([x, y]) => `(${r(x)}, ${r(y)})`).join(', ');
      lines.push(`  line(${pts}, close: true, fill: blue.transparentize(72%), stroke: none)`);
    }
    lines.push(`  circle((${r(h)}, ${r(k)}), radius: ${r(rad)}, fill: white, stroke: none)`);
  }

  lines.push(`  circle((${r(h)}, ${r(k)}), radius: ${r(rad)}, fill: none, stroke: 1pt + black)`);

  const isCoordAxis = (a, b, c) =>
    (Math.abs(a - 1) < 1e-9 && Math.abs(b) < 1e-9 && Math.abs(c) < 1e-9) ||
    (Math.abs(a) < 1e-9 && Math.abs(b - 1) < 1e-9 && Math.abs(c) < 1e-9);

  linIneqs.forEach(({ a, b, c, sign }) => {
    if (isCoordAxis(a, b, c)) return;
    let seg;
    if (Math.abs(b) > 1e-9) {
      seg = clipLine(minX - 10, (c - a * (minX - 10)) / b, maxX + 10, (c - a * (maxX + 10)) / b, minX, maxX, minY, maxY);
    } else if (Math.abs(a) > 1e-9) {
      const vx = c / a;
      seg = [vx, minY, vx, maxY];
    }
    if (!seg) return;
    lines.push(`  line((${r(seg[0])}, ${r(seg[1])}), (${r(seg[2])}, ${r(seg[3])}), stroke: 1pt + black)`);
    const mx = r((seg[0] + seg[2]) / 2);
    const my = r((seg[1] + seg[3]) / 2 + 0.2);
    const lbl = fmtIneqLabel(a, b, c, sign);
    if (lbl) lines.push(`  content((${mx}, ${my}), [${lbl}], anchor: "south")`);
  });

  lines.push(``);
  lines.push(`  line((${r(minX)}, 0), (${r(maxX + 0.5)}, 0), stroke: 1.2pt + black)`);
  lines.push(`  line((0, ${r(minY)}), (0, ${r(maxY + 0.5)}), stroke: 1.2pt + black)`);
  lines.push(`  content((${r(maxX + 0.65)}, 0), [$x$])`);
  lines.push(`  content((0.1, ${r(maxY + 0.55)}), [$y$])`);
  lines.push(`  content((-0.25, -0.25), [$O$])`);

  for (let xi = Math.ceil(minX); xi <= Math.floor(maxX); xi++) {
    if (xi === 0) continue;
    lines.push(`  line((${xi}, -0.1), (${xi}, 0.1), stroke: 0.8pt + black)`);
    lines.push(`  content((${xi}, -0.3), [$${xi}$], anchor: "north")`);
  }
  for (let yi = Math.ceil(minY); yi <= Math.floor(maxY); yi++) {
    if (yi === 0) continue;
    lines.push(`  line((-0.1, ${yi}), (0.1, ${yi}), stroke: 0.8pt + black)`);
    lines.push(`  content((-0.3, ${yi}), [$${yi}$], anchor: "east")`);
  }

  lines.push(`  circle((${r(h)}, ${r(k)}), radius: 0.07, fill: red, stroke: none)`);

  lines.push(`})`);
  return lines.join('\n');
}
