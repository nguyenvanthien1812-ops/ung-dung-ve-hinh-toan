// Bảng xét dấu (Sign analysis table)

const LW = 1.4;  // label column width
const BW = 0.9;  // boundary (±∞) column width
const IW = 2.0;  // interval column width
const CW = 1.4;  // critical point column width
const RH = 0.9;  // row height

function r(n) { return Math.round(n * 1000) / 1000; }

function totalW(n) { return LW + 2 * BW + (n + 1) * IW + n * CW; }
function critColLeftX(i) { return LW + BW + (i + 1) * IW + i * CW; }
function critMidX(i) { return critColLeftX(i) + CW / 2; }
function intervalMidX(i) { return LW + BW + i * (IW + CW) + IW / 2; }

function gcdInt(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

// Format a root value for display in Typst math
function fmtRoot(n) {
  const rn = Math.round(n * 10000) / 10000;
  if (Number.isInteger(rn)) return String(rn);
  for (let d = 2; d <= 20; d++) {
    const p = Math.round(rn * d);
    if (Math.abs(p / d - rn) < 5e-4) {
      const g = gcdInt(Math.abs(p), d);
      const pr = p / g, dr = d / g;
      return pr < 0 ? `-${Math.abs(pr)}/${dr}` : `${pr}/${dr}`;
    }
  }
  return String(Math.round(rn * 100) / 100);
}

// Format factor (ax + b) as Typst math label
function fmtFactor(a, b) {
  const na = Number(a), nb = Number(b);
  let s = '';
  if (na === 1) s = 'x';
  else if (na === -1) s = '-x';
  else s = `${na}x`;
  if (nb > 0) s += ` + ${nb}`;
  else if (nb < 0) s += ` - ${Math.abs(nb)}`;
  return s;
}

// Sign of (ax + b) at x: returns +1, -1, or 0
function factorSign(a, b, x) {
  const v = Number(a) * x + Number(b);
  if (Math.abs(v) < 1e-9) return 0;
  return v > 0 ? 1 : -1;
}

// Test point in interval j (between sorted roots)
function testX(sortedRoots, j) {
  if (j === 0) return sortedRoots[0] - 1;
  if (j === sortedRoots.length) return sortedRoots[sortedRoots.length - 1] + 1;
  return (sortedRoots[j - 1] + sortedRoots[j]) / 2;
}

// Core table builder
// factors: [{a, b, isNum}]  — isNum=true → numerator, false → denominator
// exprLabel: Typst markup for f(x) label, e.g. '$f(x)$'
function buildSignTable(factors, exprLabel) {
  const N = v => { const n = parseFloat(v); return isNaN(n) ? 0 : n; };

  // Keep only factors with non-zero leading coefficient
  const vf = factors.filter(f => Math.abs(N(f.a)) > 1e-9);

  // Compute and sort roots
  const rootEntries = vf
    .map((f, fi) => ({ root: -N(f.b) / N(f.a), fi, isDenom: !f.isNum }))
    .sort((a, b) => a.root - b.root);

  // Deduplicate: merge roots within 1e-6 of each other (keep first)
  const roots = [];
  rootEntries.forEach(re => {
    if (!roots.length || Math.abs(re.root - roots[roots.length - 1].root) > 1e-6) {
      roots.push(re);
    }
  });

  const n = roots.length;
  const nRows = vf.length + 2;  // x row + factor rows + f(x) row
  const TW = r(totalW(n));
  const TH = r(nRows * RH);
  const sortedRootVals = roots.map(re => re.root);

  const out = [];
  out.push(`#import "@preview/cetz:0.3.2": canvas, draw`);
  out.push(`#set page(width: auto, height: auto, margin: 10pt)`);
  out.push(``);
  out.push(`#canvas({`);
  out.push(`  import draw: *`);
  out.push(``);

  // Outer rectangle
  out.push(`  rect((0, 0), (${TW}, ${TH}), stroke: 1pt + black)`);

  // Horizontal separators between rows (from bottom up)
  for (let row = 1; row < nRows; row++) {
    out.push(`  line((0, ${r(row * RH)}), (${TW}, ${r(row * RH)}), stroke: 0.8pt + black)`);
  }

  // Label column separator
  out.push(`  line((${LW}, 0), (${LW}, ${TH}), stroke: 1pt + black)`);

  // Critical column vertical dividers (light gray)
  for (let i = 0; i < n; i++) {
    const xL = r(critColLeftX(i));
    const xR = r(critColLeftX(i) + CW);
    out.push(`  line((${xL}, 0), (${xL}, ${TH}), stroke: 0.5pt + gray.lighten(20%))`);
    out.push(`  line((${xR}, 0), (${xR}, ${TH}), stroke: 0.5pt + gray.lighten(20%))`);
  }

  // === x row (top row) ===
  const xRowY = r((nRows - 0.5) * RH);
  out.push(`  content((${r(LW / 2)}, ${xRowY}), [$x$])`);
  out.push(`  content((${r(LW + BW / 2)}, ${xRowY}), [$-infinity$])`);
  out.push(`  content((${r(totalW(n) - BW / 2)}, ${xRowY}), [$+infinity$])`);
  for (let i = 0; i < n; i++) {
    out.push(`  content((${r(critMidX(i))}, ${xRowY}), [$${fmtRoot(roots[i].root)}$])`);
  }

  // === Factor rows (from top to bottom, skipping x row and f(x) row) ===
  vf.forEach((factor, fi) => {
    // Row index from bottom: nRows-1 = x row, ..., 1 = top factor, 0 = f(x)
    const rowFromBottom = vf.length - fi;  // ranges from vf.length down to 1
    const midY = r((rowFromBottom + 0.5) * RH);
    const lbl = fmtFactor(factor.a, factor.b);

    // Label in left column
    out.push(`  content((${r(LW / 2)}, ${midY}), [$${lbl}$])`);

    // Signs in interval columns
    for (let j = 0; j <= n; j++) {
      const tx = testX(sortedRootVals, j);
      const s = factorSign(factor.a, factor.b, tx);
      out.push(`  content((${r(intervalMidX(j))}, ${midY}), [$${s >= 0 ? '+' : '-'}$])`);
    }

    // Values at critical point columns
    for (let i = 0; i < n; i++) {
      // Check if this factor equals 0 at this critical point
      const val = N(factor.a) * roots[i].root + N(factor.b);
      if (Math.abs(val) < 1e-6) {
        out.push(`  content((${r(critMidX(i))}, ${midY}), [$0$])`);
      } else {
        const s = factorSign(factor.a, factor.b, roots[i].root);
        out.push(`  content((${r(critMidX(i))}, ${midY}), [$${s >= 0 ? '+' : '-'}$])`);
      }
    }
  });

  // === f(x) row (bottom row) ===
  const fxMidY = r(0.5 * RH);
  out.push(`  content((${r(LW / 2)}, ${fxMidY}), [${exprLabel}])`);

  // f(x) sign in interval columns
  for (let j = 0; j <= n; j++) {
    const tx = testX(sortedRootVals, j);
    let sign = 1;
    vf.forEach(f => { sign *= factorSign(f.a, f.b, tx); });
    out.push(`  content((${r(intervalMidX(j))}, ${fxMidY}), [$${sign >= 0 ? '+' : '-'}$])`);
  }

  // f(x) at critical point columns
  for (let i = 0; i < n; i++) {
    if (roots[i].isDenom) {
      // Denominator root → expression undefined
      out.push(`  content((${r(critMidX(i))}, ${fxMidY}), [KXĐ])`);
    } else {
      // Numerator root → f(x) = 0
      out.push(`  content((${r(critMidX(i))}, ${fxMidY}), [$0$])`);
    }
  }

  out.push(`})`);
  return out.join('\n');
}

// ── Product of 2 linear factors: f(x) = (a1x+b1)(a2x+b2) ──────────────────
export function generateSignProduct2(params) {
  const N = v => { const n = parseFloat(v); return isNaN(n) ? 0 : n; };
  const a1 = N(params.a1 ?? 1), b1 = N(params.b1 ?? -1);
  const a2 = N(params.a2 ?? 1), b2 = N(params.b2 ?? 2);
  const factors = [
    { a: a1, b: b1, isNum: true },
    { a: a2, b: b2, isNum: true }
  ];
  return buildSignTable(factors, `[$f(x)$]`);
}

// ── Product of 3 linear factors: f(x) = (a1x+b1)(a2x+b2)(a3x+b3) ──────────
export function generateSignProduct3(params) {
  const N = v => { const n = parseFloat(v); return isNaN(n) ? 0 : n; };
  const a1 = N(params.a1 ?? 1), b1 = N(params.b1 ?? -2);
  const a2 = N(params.a2 ?? 1), b2 = N(params.b2 ?? 1);
  const a3 = N(params.a3 ?? 1), b3 = N(params.b3 ?? 3);
  const factors = [
    { a: a1, b: b1, isNum: true },
    { a: a2, b: b2, isNum: true },
    { a: a3, b: b3, isNum: true }
  ];
  return buildSignTable(factors, `[$f(x)$]`);
}

// ── Fraction of linear factors: f(x) = (a1x+b1)/(a2x+b2) ──────────────────
export function generateSignFraction(params) {
  const N = v => { const n = parseFloat(v); return isNaN(n) ? 0 : n; };
  const a1 = N(params.a1 ?? 1), b1 = N(params.b1 ?? -1);
  const a2 = N(params.a2 ?? 1), b2 = N(params.b2 ?? 2);
  const factors = [
    { a: a1, b: b1, isNum: true  },   // numerator
    { a: a2, b: b2, isNum: false }    // denominator
  ];
  return buildSignTable(factors, `[$f(x)$]`);
}
