// Shared style utilities for all generators

// Convert a color value to Typst expression
// Accepts: '#RRGGBB' hex, or named colors like 'black', 'blue', 'red'
export function colorToTypst(color) {
  if (!color || color === 'transparent' || color === 'none') return 'none';
  if (color.startsWith('#')) return `rgb("${color.replace('#', '')}")`;
  return color;
}

// Build a Typst stroke expression from styleOptions
export function buildStroke(styleOptions, defaults = {}) {
  const rawColor = styleOptions?.strokeColor || defaults.color || 'black';
  const color = colorToTypst(rawColor);
  const width = styleOptions?.strokeWidth || defaults.width || 1.5;
  const dash = styleOptions?.strokeStyle || defaults.dash || 'solid';
  if (dash === 'solid') return `${width}pt + ${color}`;
  return `(paint: ${color}, thickness: ${width}pt, dash: "${dash}")`;
}

// Build a Typst fill expression from styleOptions
// Returns 'none' when no fill should be applied
export function buildFill(styleOptions, defaultFill = 'none') {
  const color = styleOptions?.fillColor;
  const opacity = parseFloat(styleOptions?.fillOpacity ?? 0);
  if (!color || opacity <= 0) return defaultFill;
  const typst = colorToTypst(color);
  if (typst === 'none') return defaultFill;
  const transparentize = Math.round((1 - opacity) * 100);
  return `${typst}.transparentize(${transparentize}%)`;
}

// Build a Typst point (filled circle) expression
export function buildPoint(x, y, styleOptions, size = 0.1) {
  const rawColor = styleOptions?.pointColor || 'black';
  const color = colorToTypst(rawColor);
  return `circle((${x}, ${y}), radius: ${size}, fill: ${color}, stroke: none)`;
}

// Standard Typst file header with CeTZ import
export const TYPST_HEADER = `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)`;

// ── Key points for graphs ─────────────────────────────────────────
// Parse "A(1;2), B(-1;3)" or "A(1,2) B(-1,3)" → [{name,x,y}, ...]
export function parseKeyPoints(str) {
  if (!str || !str.trim()) return [];
  const pts = [];
  const re = /([A-Za-z][A-Za-z0-9'_]*)\s*\(\s*(-?[\d.]+)\s*[;,]\s*(-?[\d.]+)\s*\)/g;
  let m;
  while ((m = re.exec(str)) !== null) {
    const x = parseFloat(m[2]), y = parseFloat(m[3]);
    if (!isNaN(x) && !isNaN(y)) pts.push({ name: m[1], x, y });
  }
  return pts;
}

// Format a number cleanly (no trailing zeros)
function fmtKP(n) { return parseFloat(n.toFixed(4)).toString(); }

// Render key points as Typst/CeTZ draw code
export function renderKeyPoints(pts) {
  if (!pts.length) return '';
  return pts.map(({ name, x, y }) =>
    `  circle((${x}, ${y}), radius: 0.08, fill: red, stroke: none)\n` +
    `  content((${x}, ${y}), [$${name}(${fmtKP(x)};${fmtKP(y)})$], anchor: "south-west", padding: 3pt)`
  ).join('\n');
}

// Parse vertex string "x1,y1 ; x2,y2 ; x3,y3" into array of [x, y] pairs
function parseVertices(str) {
  if (!str) return [];
  return str.split(';')
    .map(s => s.trim().split(',').map(n => parseFloat(n.trim())))
    .filter(([x, y]) => !isNaN(x) && !isNaN(y));
}

// Append color annotation overlays into the #canvas({...}) block
// Inserts before the last '})' which closes the canvas
export function appendAnnotations(baseCode, annotations) {
  if (!annotations || annotations.length === 0) return baseCode;

  const lines = [];
  for (const a of annotations) {
    const color = colorToTypst(a.color || 'black');

    if (a.type === 'point') {
      const size = parseFloat(a.size) || 0.08;
      lines.push(`  circle((${a.x}, ${a.y}), radius: ${size}, fill: ${color}, stroke: none)`);
      if (a.label && a.label.trim()) {
        lines.push(`  content((${a.x}, ${a.y}), [${a.label.trim()}], anchor: "south", padding: 6pt)`);
      }
    } else if (a.type === 'segment') {
      const w = parseFloat(a.width) || 1.5;
      lines.push(`  line((${a.x1}, ${a.y1}), (${a.x2}, ${a.y2}), stroke: ${w}pt + ${color})`);
    } else if (a.type === 'region') {
      const vertices = parseVertices(a.verticesStr);
      if (vertices.length >= 3) {
        const opacity = parseFloat(a.opacity) || 0.3;
        const t = Math.round((1 - opacity) * 100);
        const ptsStr = vertices.map(([x, y]) => `(${x}, ${y})`).join(', ');
        lines.push(`  line(${ptsStr}, close: true, fill: ${color}.transparentize(${t}%), stroke: none)`);
      }
    }
  }

  if (lines.length === 0) return baseCode;

  const annotBlock = '\n  // Chú thích màu\n' + lines.join('\n') + '\n';
  const lastClose = baseCode.lastIndexOf('})');
  if (lastClose === -1) return baseCode;

  return baseCode.slice(0, lastClose) + annotBlock + baseCode.slice(lastClose);
}
