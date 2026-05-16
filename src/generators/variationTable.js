// Bảng biến thiên (Variation tables)

const LW = 1.4;  // label column width
const BW = 0.9;  // boundary column width
const IW = 2.3;  // interval column width
const CW = 1.4;  // critical point column width
const RH = 1.1;  // row height

function r(n) { return Math.round(n * 1000) / 1000; }

function fmtVal(n) {
  if (!isFinite(n)) return n > 0 ? '$+infinity$' : '$-infinity$';
  if (Number.isInteger(n)) return `$${n}$`;
  const rounded = Math.round(n * 1000) / 1000;
  for (let q = 2; q <= 20; q++) {
    const p = Math.round(rounded * q);
    if (Math.abs(p / q - rounded) < 0.0005) {
      const g = gcd(Math.abs(p), q);
      const pr = p / g, qr = q / g;
      if (qr === 1) return `$${pr}$`;
      return `$${pr < 0 ? '-' : ''}frac(${Math.abs(pr)}, ${qr})$`;
    }
  }
  return `$${Math.round(n * 100) / 100}$`;
}

function gcd(a, b) {
  while (b) { const t = b; b = a % b; a = t; }
  return a;
}

function fmtInput(s) {
  s = String(s).trim();
  if (s === '+∞' || s === '+inf' || s.toLowerCase() === '+infinity') return '$+infinity$';
  if (s === '-∞' || s === '-inf' || s.toLowerCase() === '-infinity') return '$-infinity$';
  if (s === '') return '$0$';
  return `$${s}$`;
}

function totalW(n) {
  return LW + 2 * BW + (n + 1) * IW + n * CW;
}

function critColLeftX(i) {
  return LW + BW + (i + 1) * IW + i * CW;
}

function critMidX(i) {
  return critColLeftX(i) + CW / 2;
}

function intervalMidX(i) {
  return LW + BW + i * (IW + CW) + IW / 2;
}

function baseCode(TW, TH) {
  return `
  rect((0, 0), (${r(TW)}, ${r(TH)}), stroke: 1pt + black)
  line((0, ${r(RH)}), (${r(TW)}, ${r(RH)}), stroke: 0.8pt + black)
  line((0, ${r(2 * RH)}), (${r(TW)}, ${r(2 * RH)}), stroke: 0.8pt + black)
  line((${LW}, 0), (${LW}, ${r(TH)}), stroke: 1pt + black)
  content((${r(LW / 2)}, ${r(2.5 * RH)}), [$x$])
  content((${r(LW / 2)}, ${r(1.5 * RH)}), [$f'(x)$])
  content((${r(LW / 2)}, ${r(0.5 * RH)}), [$f(x)$])`;
}

function header() {
  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *`;
}

// Draw vertical lines for a critical/special point column
function critLines(i, dashed = false) {
  const xL = r(critColLeftX(i));
  const xR = r(critColLeftX(i) + CW);
  const TH = r(3 * RH);
  const s = dashed
    ? `(paint: black, thickness: 0.8pt, dash: "dashed")`
    : `0.8pt + black`;
  return `  line((${xL}, 0), (${xL}, ${TH}), stroke: ${s})
  line((${xR}, 0), (${xR}, ${TH}), stroke: ${s})`;
}

// Arrow from (x0,y0) to (x1,y1) with arrowhead
function arrow(x0, y0, x1, y1) {
  return `  line((${r(x0)}, ${r(y0)}), (${r(x1)}, ${r(y1)}), mark: (end: ">"), stroke: 0.8pt + black)`;
}

const yH = r(0.88 * RH);
const yL = r(0.12 * RH);
const yM = r(0.5 * RH);

// ── 0 critical points (monotone) ──────────────────────────────────────────────
function genMonotone({ sign, fxLeft, fxRight }) {
  const TW = LW + 2 * BW + IW;
  const TH = 3 * RH;
  const ascending = sign === '+';
  const ax0 = LW + BW + 0.2, ax1 = TW - BW - 0.2;
  const ay0 = ascending ? yL : yH, ay1 = ascending ? yH : yL;
  const bndLy = ascending ? yL : yH;
  const bndRy = ascending ? yH : yL;

  return `${header()}${baseCode(TW, TH)}

  content((${r(LW + BW / 2)}, ${r(2.5 * RH)}), [$-infinity$])
  content((${r(TW - BW / 2)}, ${r(2.5 * RH)}), [$+infinity$])
  content((${r(LW + BW + IW / 2)}, ${r(1.5 * RH)}), [$${sign}$])
  content((${r(LW + BW + 0.1)}, ${bndLy}), [${fxLeft}], anchor: "west")
  ${arrow(ax0, ay0, ax1, ay1)}
  content((${r(TW - BW - 0.1)}, ${bndRy}), [${fxRight}], anchor: "east")
})`.trim();
}

// ── 1 critical point ──────────────────────────────────────────────────────────
function gen1Crit({ xStr, fxStr, signL, signR, fxLeft, fxRight, fprimeAt = '0', dashed = false }) {
  const TW = totalW(1);
  const TH = 3 * RH;
  const cx = r(critMidX(0));
  const cxL = critColLeftX(0), cxR = cxL + CW;
  const i0 = r(intervalMidX(0)), i1 = r(intervalMidX(1));
  const ascL = signL === '+', ascR = signR === '+';

  const a0x0 = LW + BW + 0.2, a0x1 = cxL - 0.1;
  const a0y0 = ascL ? yL : yH, a0y1 = ascL ? yH : yL;
  const a1x0 = cxR + 0.1, a1x1 = TW - BW - 0.2;
  const a1y0 = ascR ? yL : yH, a1y1 = ascR ? yH : yL;

  const bndLy = ascL ? yL : yH;
  const bndRy = ascR ? yH : yL;
  const isMax = ascL && !ascR;
  const isMin = !ascL && ascR;
  const critFy = isMax ? yH : (isMin ? yL : yM);

  return `${header()}${baseCode(TW, TH)}

${critLines(0, dashed)}

  content((${r(LW + BW / 2)}, ${r(2.5 * RH)}), [$-infinity$])
  content((${cx}, ${r(2.5 * RH)}), [${xStr}])
  content((${r(totalW(1) - BW / 2)}, ${r(2.5 * RH)}), [$+infinity$])

  content((${i0}, ${r(1.5 * RH)}), [$${signL}$])
  content((${cx}, ${r(1.5 * RH)}), [$${fprimeAt}$])
  content((${i1}, ${r(1.5 * RH)}), [$${signR}$])

  content((${r(LW + BW + 0.1)}, ${bndLy}), [${fxLeft}], anchor: "west")
  ${arrow(a0x0, a0y0, a0x1, a0y1)}
  content((${cx}, ${critFy}), [${fxStr}])
  ${arrow(a1x0, a1y0, a1x1, a1y1)}
  content((${r(TW - BW - 0.1)}, ${bndRy}), [${fxRight}], anchor: "east")
})`.trim();
}

// ── 2 critical points ─────────────────────────────────────────────────────────
function gen2Crit({ x1Str, x2Str, fx1Str, fx2Str, signL, signM, signR, fxLeft, fxRight }) {
  const TW = totalW(2);
  const TH = 3 * RH;
  const cx1 = r(critMidX(0)), cx2 = r(critMidX(1));
  const cxL1 = critColLeftX(0), cxR1 = cxL1 + CW;
  const cxL2 = critColLeftX(1), cxR2 = cxL2 + CW;
  const i0 = r(intervalMidX(0)), i1 = r(intervalMidX(1)), i2 = r(intervalMidX(2));

  const asc0 = signL === '+', asc1 = signM === '+', asc2 = signR === '+';

  const a0x0 = LW + BW + 0.2, a0x1 = cxL1 - 0.1;
  const a0y0 = asc0 ? yL : yH, a0y1 = asc0 ? yH : yL;
  const a1x0 = cxR1 + 0.1, a1x1 = cxL2 - 0.1;
  const a1y0 = asc1 ? yL : yH, a1y1 = asc1 ? yH : yL;
  const a2x0 = cxR2 + 0.1, a2x1 = TW - BW - 0.2;
  const a2y0 = asc2 ? yL : yH, a2y1 = asc2 ? yH : yL;

  const bndLy = asc0 ? yL : yH;
  const bndRy = asc2 ? yH : yL;

  // fx positions: if asc→desc = max (top), desc→asc = min (bottom)
  const c1Fy = (asc0 && !asc1) ? yH : (!asc0 && asc1) ? yL : yM;
  const c2Fy = (asc1 && !asc2) ? yH : (!asc1 && asc2) ? yL : yM;

  return `${header()}${baseCode(TW, TH)}

${critLines(0)}
${critLines(1)}

  content((${r(LW + BW / 2)}, ${r(2.5 * RH)}), [$-infinity$])
  content((${cx1}, ${r(2.5 * RH)}), [${x1Str}])
  content((${cx2}, ${r(2.5 * RH)}), [${x2Str}])
  content((${r(TW - BW / 2)}, ${r(2.5 * RH)}), [$+infinity$])

  content((${i0}, ${r(1.5 * RH)}), [$${signL}$])
  content((${cx1}, ${r(1.5 * RH)}), [$0$])
  content((${i1}, ${r(1.5 * RH)}), [$${signM}$])
  content((${cx2}, ${r(1.5 * RH)}), [$0$])
  content((${i2}, ${r(1.5 * RH)}), [$${signR}$])

  content((${r(LW + BW + 0.1)}, ${bndLy}), [${fxLeft}], anchor: "west")
  ${arrow(a0x0, a0y0, a0x1, a0y1)}
  content((${cx1}, ${c1Fy}), [${fx1Str}])
  ${arrow(a1x0, a1y0, a1x1, a1y1)}
  content((${cx2}, ${c2Fy}), [${fx2Str}])
  ${arrow(a2x0, a2y0, a2x1, a2y1)}
  content((${r(TW - BW - 0.1)}, ${bndRy}), [${fxRight}], anchor: "east")
})`.trim();
}

// ── Exported generators ───────────────────────────────────────────────────────

export function generateBBTQuadratic(params) {
  const a = parseFloat(params.a ?? 1);
  const b = parseFloat(params.b ?? -2);
  const c = parseFloat(params.c ?? 1);

  const x0 = -b / (2 * a);
  const y0 = a * x0 * x0 + b * x0 + c;
  const signL = a > 0 ? '-' : '+';
  const signR = a > 0 ? '+' : '-';
  const bound = a > 0 ? '$+infinity$' : '$-infinity$';

  return gen1Crit({
    xStr: fmtVal(x0),
    fxStr: fmtVal(y0),
    signL, signR,
    fxLeft: bound, fxRight: bound,
    fprimeAt: '0'
  });
}

export function generateBBTCubic(params) {
  const a = parseFloat(params.a ?? 1);
  const b = parseFloat(params.b ?? -3);
  const c = parseFloat(params.c ?? 0);
  const d = parseFloat(params.d ?? 2);

  // f'(x) = 3ax² + 2bx + c
  const A = 3 * a, B = 2 * b, C = c;
  const delta = B * B - 4 * A * C;

  const fxLeft = a > 0 ? '$-infinity$' : '$+infinity$';
  const fxRight = a > 0 ? '$+infinity$' : '$-infinity$';

  if (delta <= 0) {
    return genMonotone({
      sign: a > 0 ? '+' : '-',
      fxLeft, fxRight
    });
  }

  const sqD = Math.sqrt(delta);
  const x1 = (-B - sqD) / (2 * A);
  const x2 = (-B + sqD) / (2 * A);
  const fx1 = a * x1 ** 3 + b * x1 ** 2 + c * x1 + d;
  const fx2 = a * x2 ** 3 + b * x2 ** 2 + c * x2 + d;

  // a>0: (+,0,-,0,+); a<0: (-,0,+,0,-)
  const signL = a > 0 ? '+' : '-';
  const signM = a > 0 ? '-' : '+';
  const signR = a > 0 ? '+' : '-';

  return gen2Crit({
    x1Str: fmtVal(x1), x2Str: fmtVal(x2),
    fx1Str: fmtVal(fx1), fx2Str: fmtVal(fx2),
    signL, signM, signR,
    fxLeft, fxRight
  });
}

export function generateBBTRational11(params) {
  const na = parseFloat(params.numerA ?? 1);
  const nb = parseFloat(params.numerB ?? 0);
  const nc = parseFloat(params.denomC ?? 1);
  const nd = parseFloat(params.denomD ?? 0);

  if (nc === 0) {
    const slope = nb === 0 ? na / nd : na / nd;
    return genMonotone({
      sign: slope >= 0 ? '+' : '-',
      fxLeft: slope >= 0 ? '$-infinity$' : '$+infinity$',
      fxRight: slope >= 0 ? '$+infinity$' : '$-infinity$'
    });
  }

  const x0 = -nd / nc;
  const yAsym = na / nc;
  // f'(x) = (na*nd - nb*nc) / (cx+d)² — sign same everywhere
  const fprimeSign = (na * nd - nb * nc) > 0 ? '+' : '-';
  const ascending = fprimeSign === '+';

  // Sample near x0 to get limit directions
  const eps = 0.001;
  const fL = (na * (x0 - eps) + nb) / (nc * (x0 - eps) + nd);
  const fR = (na * (x0 + eps) + nb) / (nc * (x0 + eps) + nd);
  const fxNearL = fL > 0 ? '$+infinity$' : '$-infinity$';
  const fxNearR = fR > 0 ? '$+infinity$' : '$-infinity$';

  const TW = totalW(1);
  const TH = 3 * RH;
  const cx = r(critMidX(0));
  const cxL = critColLeftX(0), cxR = cxL + CW;
  const i0 = r(intervalMidX(0)), i1 = r(intervalMidX(1));

  // Arrow in left interval: from yAsym level toward ±∞
  const leftGoesDown = fxNearL === '$-infinity$';
  const a0y1 = leftGoesDown ? yL : yH;
  const a0y0 = leftGoesDown ? yH : yL;

  // Arrow in right interval: from ±∞ back toward yAsym
  const rightStartsHigh = fxNearR === '$+infinity$';
  const a1y0 = rightStartsHigh ? yH : yL;
  const a1y1 = rightStartsHigh ? yL : yH;

  const bndLy = a0y0;
  const bndRy = a1y1;
  const yAsymStr = fmtVal(yAsym);

  return `${header()}${baseCode(TW, TH)}

${critLines(0, true)}

  content((${r(LW + BW / 2)}, ${r(2.5 * RH)}), [$-infinity$])
  content((${cx}, ${r(2.5 * RH)}), [${fmtVal(x0)}])
  content((${r(TW - BW / 2)}, ${r(2.5 * RH)}), [$+infinity$])

  content((${i0}, ${r(1.5 * RH)}), [$${fprimeSign}$])
  content((${i1}, ${r(1.5 * RH)}), [$${fprimeSign}$])

  content((${r(LW + BW + 0.1)}, ${bndLy}), [${yAsymStr}], anchor: "west")
  ${arrow(LW + BW + 0.2, a0y0, cxL - 0.1, a0y1)}
  content((${r(cxL - 0.1)}, ${a0y1}), [${fxNearL}], anchor: "east")
  content((${r(cxR + 0.1)}, ${a1y0}), [${fxNearR}], anchor: "west")
  ${arrow(cxR + 0.1, a1y0, TW - BW - 0.2, a1y1)}
  content((${r(TW - BW - 0.1)}, ${bndRy}), [${yAsymStr}], anchor: "east")
})`.trim();
}

export function generateBBTCustom(params) {
  const critPoints = String(params.critPoints ?? '-1, 2');
  const intervalSigns = String(params.intervalSigns ?? '+, -, +');
  const fxAtCrits = String(params.fxAtCrits ?? '3, -1');
  const fxAtLeft = String(params.fxAtLeft ?? '+∞');
  const fxAtRight = String(params.fxAtRight ?? '+∞');

  const pts = critPoints.split(',').map(s => s.trim()).filter(Boolean);
  const signs = intervalSigns.split(',').map(s => s.trim()).filter(Boolean);
  const fxVals = fxAtCrits.split(',').map(s => fmtInput(s.trim()));
  const fxL = fmtInput(fxAtLeft);
  const fxR = fmtInput(fxAtRight);
  const n = pts.length;

  // Pad signs if needed
  while (signs.length < n + 1) signs.push(signs[signs.length - 1] || '+');

  if (n === 0) {
    return genMonotone({ sign: signs[0] || '+', fxLeft: fxL, fxRight: fxR });
  }
  if (n === 1) {
    return gen1Crit({
      xStr: pts[0],
      fxStr: fxVals[0] || '$0$',
      signL: signs[0], signR: signs[1],
      fxLeft: fxL, fxRight: fxR
    });
  }
  if (n === 2) {
    return gen2Crit({
      x1Str: pts[0], x2Str: pts[1],
      fx1Str: fxVals[0] || '$0$', fx2Str: fxVals[1] || '$0$',
      signL: signs[0], signM: signs[1], signR: signs[2],
      fxLeft: fxL, fxRight: fxR
    });
  }
  // Fallback for >2 points
  return gen2Crit({
    x1Str: pts[0], x2Str: pts[1],
    fx1Str: fxVals[0] || '$0$', fx2Str: fxVals[1] || '$0$',
    signL: signs[0], signM: signs[1], signR: signs[2],
    fxLeft: fxL, fxRight: fxR
  });
}
