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
