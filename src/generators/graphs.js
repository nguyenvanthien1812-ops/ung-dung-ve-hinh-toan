// Generator cho đồ thị hàm số và vectơ
import { buildStroke, buildFill, colorToTypst, TYPST_HEADER } from './utils.js';

// ==================== ĐỒ THỊ HÀM SỐ ====================

export function generateLinearGraph(params) {
  const {
    a, b,
    minX = -5, maxX = 5,
    showGrid = true,
    showAxis = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const axisMinX = minX - 1;
  const axisMaxX = maxX + 1;
  const axisMinY = -5;
  const axisMaxY = 5;

  return `#import "@preview/cetz:0.3.2": canvas, draw
#import "@preview/cetz-plot:0.1.1": plot
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((${axisMinX}, ${axisMinY}), (${axisMaxX}, ${axisMaxY}), step: 1, stroke: luma(240))` : ''}

  ${showAxis ? `
  // Trục Ox
  line((${axisMinX}, 0), (${axisMaxX}, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((${axisMaxX + 0.2}, 0), [$x$], anchor: "west")

  // Trục Oy
  line((0, ${axisMinY}), (0, ${axisMaxY}), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, ${axisMaxY + 0.2}), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])
  ` : ''}

  // Đồ thị hàm số y = ax + b
  plot.plot(
    size: (${axisMaxX - axisMinX}, ${axisMaxY - axisMinY}),
    x-tick-step: none, y-tick-step: none, axis-style: none,
    {
      plot.add(domain: (${minX}, ${maxX}), x => ${a} * x + ${b}, style: (stroke: ${strokeStr}))
    }
  )

  // Hiển thị phương trình
  content((${axisMaxX - 1}, ${axisMaxY - 0.5}), [$y = ${a}x ${b >= 0 ? '+' : ''} ${b}$], anchor: "east")
})`.trim();
}

export function generateQuadraticGraph(params) {
  const {
    a, b, c,
    minX = -5, maxX = 5,
    showGrid = true,
    showVertex = true,
    showAxis = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  // Tính đỉnh parabol
  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX * vertexX + b * vertexX + c;

  const axisMinX = minX - 1;
  const axisMaxX = maxX + 1;
  const axisMinY = -5;
  const axisMaxY = 5;

  return `#import "@preview/cetz:0.3.2": canvas, draw
#import "@preview/cetz-plot:0.1.1": plot
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((${axisMinX}, ${axisMinY}), (${axisMaxX}, ${axisMaxY}), step: 1, stroke: luma(240))` : ''}

  ${showAxis ? `
  // Trục Ox
  line((${axisMinX}, 0), (${axisMaxX}, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((${axisMaxX + 0.2}, 0), [$x$], anchor: "west")

  // Trục Oy
  line((0, ${axisMinY}), (0, ${axisMaxY}), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, ${axisMaxY + 0.2}), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])
  ` : ''}

  // Đồ thị parabol y = ax² + bx + c
  plot.plot(
    size: (${axisMaxX - axisMinX}, ${axisMaxY - axisMinY}),
    x-tick-step: none, y-tick-step: none, axis-style: none,
    {
      plot.add(domain: (${minX}, ${maxX}), x => ${a} * x * x + ${b} * x + ${c}, style: (stroke: ${strokeStr}))
    }
  )

  ${showVertex ? `
  // Đỉnh parabol
  circle((${vertexX}, ${vertexY}), radius: 0.08, fill: black)
  content((${vertexX}, ${vertexY}), [I(${vertexX.toFixed(1)}, ${vertexY.toFixed(1)})], anchor: "south-west")
  ` : ''}

  // Hiển thị phương trình
  content((${axisMaxX - 1}, ${axisMaxY - 0.5}), [$y = ${a}x^2 ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c}$], anchor: "east")
})`.trim();
}

export function generateCubicGraph(params) {
  const {
    a, b, c, d,
    minX = -5, maxX = 5,
    showGrid = true,
    showAxis = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const axisMinX = minX - 1;
  const axisMaxX = maxX + 1;
  const axisMinY = -5;
  const axisMaxY = 5;

  return `#import "@preview/cetz:0.3.2": canvas, draw
#import "@preview/cetz-plot:0.1.1": plot
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((${axisMinX}, ${axisMinY}), (${axisMaxX}, ${axisMaxY}), step: 1, stroke: luma(240))` : ''}

  ${showAxis ? `
  // Trục Ox
  line((${axisMinX}, 0), (${axisMaxX}, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((${axisMaxX + 0.2}, 0), [$x$], anchor: "west")

  // Trục Oy
  line((0, ${axisMinY}), (0, ${axisMaxY}), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, ${axisMaxY + 0.2}), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])
  ` : ''}

  // Đồ thị hàm bậc ba
  plot.plot(
    size: (${axisMaxX - axisMinX}, ${axisMaxY - axisMinY}),
    x-tick-step: none, y-tick-step: none, axis-style: none,
    {
      plot.add(domain: (${minX}, ${maxX}), x => ${a} * x * x * x + ${b} * x * x + ${c} * x + ${d}, style: (stroke: ${strokeStr}))
    }
  )

  // Hiển thị phương trình
  content((${axisMaxX - 1}, ${axisMaxY - 0.5}), [$y = ${a}x^3 ${b >= 0 ? '+' : ''} ${b}x^2 ${c >= 0 ? '+' : ''} ${c}x ${d >= 0 ? '+' : ''} ${d}$], anchor: "east")
})`.trim();
}

export function generateHyperbolaGraph(params) {
  const {
    k,
    minX = -5, maxX = 5,
    showGrid = true,
    showAsymptotes = true,
    showAxis = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const axisMinX = minX - 1;
  const axisMaxX = maxX + 1;
  const axisMinY = -5;
  const axisMaxY = 5;

  // Chia domain thành 2 phần để tránh x = 0
  const domain1Start = minX;
  const domain1End = k > 0 ? -0.1 : 0.1;
  const domain2Start = k > 0 ? 0.1 : -0.1;
  const domain2End = maxX;

  return `#import "@preview/cetz:0.3.2": canvas, draw
#import "@preview/cetz-plot:0.1.1": plot
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((${axisMinX}, ${axisMinY}), (${axisMaxX}, ${axisMaxY}), step: 1, stroke: luma(240))` : ''}

  ${showAxis ? `
  // Trục Ox
  line((${axisMinX}, 0), (${axisMaxX}, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((${axisMaxX + 0.2}, 0), [$x$], anchor: "west")

  // Trục Oy
  line((0, ${axisMinY}), (0, ${axisMaxY}), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, ${axisMaxY + 0.2}), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])
  ` : ''}

  ${showAsymptotes ? `
  // Tiệm cận
  line((0, ${axisMinY}), (0, ${axisMaxY}), stroke: gray, dash: "dashed")
  line((${axisMinX}, 0), (${axisMaxX}, 0), stroke: gray, dash: "dashed")
  ` : ''}

  // Đồ thị hypebol y = k/x
  plot.plot(
    size: (${axisMaxX - axisMinX}, ${axisMaxY - axisMinY}),
    x-tick-step: none, y-tick-step: none, axis-style: none,
    {
      plot.add(domain: (${domain1Start}, ${domain1End}), x => ${k} / x, style: (stroke: ${strokeStr}))
      plot.add(domain: (${domain2Start}, ${domain2End}), x => ${k} / x, style: (stroke: ${strokeStr}))
    }
  )

  // Hiển thị phương trình
  content((${axisMaxX - 1}, ${axisMaxY - 0.5}), [$y = ${k}/x$], anchor: "east")
})`.trim();
}

export function generateRationalLinearGraph(params) {
  const {
    numerA = 1, numerB = 0,
    denomC = 1, denomD = -2,
    minX = -8, maxX = 8,
    showGrid = true,
    showAsymptotes = true,
    showAxis = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const na = Number(numerA), nb = Number(numerB);
  const nc = Number(denomC), nd = Number(denomD);

  // Vertical asymptote x = -d/c, horizontal asymptote y = a/c
  const xAsym = nc !== 0 ? -nd / nc : null;
  const yAsym = nc !== 0 ? na / nc : null;

  const axisMinX = Number(minX) - 1;
  const axisMaxX = Number(maxX) + 1;
  const axisMinY = -6;
  const axisMaxY = 6;

  // Split domain around vertical asymptote
  const gap = 0.15;
  let d1s = Number(minX), d1e, d2s, d2e;
  if (xAsym !== null && xAsym > Number(minX) && xAsym < Number(maxX)) {
    d1e = xAsym - gap;
    d2s = xAsym + gap;
    d2e = Number(maxX);
  } else {
    d1e = Number(maxX);
    d2s = null;
    d2e = null;
  }

  const nbSign = nb >= 0 ? '+' : '';
  const ndSign = nd >= 0 ? '+' : '';
  const numerStr = `${na}x ${nbSign}${nb}`;
  const denomStr = `${nc}x ${ndSign}${nd}`;

  const asymLines = showAsymptotes && xAsym !== null ? `
  // Tiệm cận đứng x = ${xAsym.toFixed(2)}
  line((${xAsym.toFixed(3)}, ${axisMinY}), (${xAsym.toFixed(3)}, ${axisMaxY}), stroke: (paint: gray, dash: "dashed", thickness: 0.7pt))
  // Tiệm cận ngang y = ${yAsym.toFixed(2)}
  line((${axisMinX}, ${yAsym.toFixed(3)}), (${axisMaxX}, ${yAsym.toFixed(3)}), stroke: (paint: gray, dash: "dashed", thickness: 0.7pt))
  ` : '';

  const plot2 = d2s !== null
    ? `\n      plot.add(domain: (${d2s}, ${d2e}), x => (${na} * x + ${nb}) / (${nc} * x + ${nd}), style: (stroke: ${strokeStr}))`
    : '';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#import "@preview/cetz-plot:0.1.1": plot
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((${axisMinX}, ${axisMinY}), (${axisMaxX}, ${axisMaxY}), step: 1, stroke: luma(240))` : ''}

  ${showAxis ? `
  line((${axisMinX}, 0), (${axisMaxX}, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((${axisMaxX + 0.2}, 0), [$x$], anchor: "west")
  line((0, ${axisMinY}), (0, ${axisMaxY}), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, ${axisMaxY + 0.2}), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])
  ` : ''}

  ${asymLines}

  plot.plot(
    size: (${axisMaxX - axisMinX}, ${axisMaxY - axisMinY}),
    x-tick-step: none, y-tick-step: none, axis-style: none,
    {
      plot.add(domain: (${d1s}, ${d1e}), x => (${na} * x + ${nb}) / (${nc} * x + ${nd}), style: (stroke: ${strokeStr}))${plot2}
    }
  )

  content((${axisMaxX - 1}, ${axisMaxY - 0.5}), [$y = frac(${numerStr}, ${denomStr})$], anchor: "east")
})`.trim();
}

export function generateTrigCombinationGraph(params) {
  const {
    sinCoeff = 1, cosCoeff = 1,
    minX = -6.28, maxX = 6.28,
    showGrid = true,
    showAxis = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const a = Number(sinCoeff), b = Number(cosCoeff);
  const amplitude = Math.sqrt(a * a + b * b);

  const axisMinX = Number(minX) - 1;
  const axisMaxX = Number(maxX) + 1;
  const axisMinY = -(amplitude + 2);
  const axisMaxY = amplitude + 2;

  const bSign = b >= 0 ? '+' : '';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#import "@preview/cetz-plot:0.1.1": plot
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((${axisMinX}, ${axisMinY.toFixed(2)}), (${axisMaxX}, ${axisMaxY.toFixed(2)}), step: 1, stroke: luma(240))` : ''}

  ${showAxis ? `
  line((${axisMinX}, 0), (${axisMaxX}, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((${axisMaxX + 0.2}, 0), [$x$], anchor: "west")
  line((0, ${axisMinY.toFixed(2)}), (0, ${axisMaxY.toFixed(2)}), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, ${(axisMaxY + 0.2).toFixed(2)}), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])
  ` : ''}

  plot.plot(
    size: (${axisMaxX - axisMinX}, ${(axisMaxY - axisMinY).toFixed(2)}),
    x-tick-step: none, y-tick-step: none, axis-style: none,
    {
      plot.add(domain: (${minX}, ${maxX}), x => ${a} * calc.sin(x) + ${b} * calc.cos(x), style: (stroke: ${strokeStr}), samples: 200)
    }
  )

  content((${axisMaxX - 1}, ${(axisMaxY - 0.5).toFixed(2)}), [$y = ${a} sin(x) ${bSign}${b} cos(x)$], anchor: "east")
})`.trim();
}

export function generateSineGraph(params) {
  const {
    amplitude = 1, frequency = 1, phase = 0, offset = 0,
    minX = -6.28, maxX = 6.28,
    showGrid = true,
    showAxis = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const axisMinX = minX - 1;
  const axisMaxX = maxX + 1;
  const axisMinY = -(amplitude + 2);
  const axisMaxY = amplitude + 2;

  return `#import "@preview/cetz:0.3.2": canvas, draw
#import "@preview/cetz-plot:0.1.1": plot
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((${axisMinX}, ${axisMinY}), (${axisMaxX}, ${axisMaxY}), step: 1, stroke: luma(240))` : ''}

  ${showAxis ? `
  // Trục Ox
  line((${axisMinX}, 0), (${axisMaxX}, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((${axisMaxX + 0.2}, 0), [$x$], anchor: "west")

  // Trục Oy
  line((0, ${axisMinY}), (0, ${axisMaxY}), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, ${axisMaxY + 0.2}), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])
  ` : ''}

  // Đồ thị hàm sin
  plot.plot(
    size: (${axisMaxX - axisMinX}, ${axisMaxY - axisMinY}),
    x-tick-step: none, y-tick-step: none, axis-style: none,
    {
      plot.add(domain: (${minX}, ${maxX}), x => ${amplitude} * calc.sin(${frequency} * x + ${phase}) + ${offset}, style: (stroke: ${strokeStr}), samples: 200)
    }
  )

  // Hiển thị phương trình
  content((${axisMaxX - 1}, ${axisMaxY - 0.5}), [$y = ${amplitude} sin(${frequency}x ${phase >= 0 ? '+' : ''} ${phase}) ${offset >= 0 ? '+' : ''} ${offset}$], anchor: "east")
})`.trim();
}

export function generateCosineGraph(params) {
  const {
    amplitude = 1, frequency = 1, phase = 0, offset = 0,
    minX = -6.28, maxX = 6.28,
    showGrid = true,
    showAxis = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const axisMinX = minX - 1;
  const axisMaxX = maxX + 1;
  const axisMinY = -(amplitude + 2);
  const axisMaxY = amplitude + 2;

  return `#import "@preview/cetz:0.3.2": canvas, draw
#import "@preview/cetz-plot:0.1.1": plot
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((${axisMinX}, ${axisMinY}), (${axisMaxX}, ${axisMaxY}), step: 1, stroke: luma(240))` : ''}

  ${showAxis ? `
  // Trục Ox
  line((${axisMinX}, 0), (${axisMaxX}, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((${axisMaxX + 0.2}, 0), [$x$], anchor: "west")

  // Trục Oy
  line((0, ${axisMinY}), (0, ${axisMaxY}), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, ${axisMaxY + 0.2}), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])
  ` : ''}

  // Đồ thị hàm cos
  plot.plot(
    size: (${axisMaxX - axisMinX}, ${axisMaxY - axisMinY}),
    x-tick-step: none, y-tick-step: none, axis-style: none,
    {
      plot.add(domain: (${minX}, ${maxX}), x => ${amplitude} * calc.cos(${frequency} * x + ${phase}) + ${offset}, style: (stroke: ${strokeStr}), samples: 200)
    }
  )

  // Hiển thị phương trình
  content((${axisMaxX - 1}, ${axisMaxY - 0.5}), [$y = ${amplitude} cos(${frequency}x ${phase >= 0 ? '+' : ''} ${phase}) ${offset >= 0 ? '+' : ''} ${offset}$], anchor: "east")
})`.trim();
}

export function generateTangentGraph(params) {
  const {
    amplitude = 1, frequency = 1,
    minX = -5, maxX = 5,
    showGrid = true,
    showAxis = true,
    showAsymptotes = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const axisMinX = minX - 1;
  const axisMaxX = maxX + 1;
  const axisMinY = -5;
  const axisMaxY = 5;

  return `#import "@preview/cetz:0.3.2": canvas, draw
#import "@preview/cetz-plot:0.1.1": plot
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((${axisMinX}, ${axisMinY}), (${axisMaxX}, ${axisMaxY}), step: 1, stroke: luma(240))` : ''}

  ${showAxis ? `
  line((${axisMinX}, 0), (${axisMaxX}, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((${axisMaxX + 0.2}, 0), [$x$], anchor: "west")
  line((0, ${axisMinY}), (0, ${axisMaxY}), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, ${axisMaxY + 0.2}), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])
  ` : ''}

  ${showAsymptotes ? `
  // Tiệm cận đứng
  line((-calc.pi/2, ${axisMinY}), (-calc.pi/2, ${axisMaxY}), stroke: 0.5pt + gray, dash: "dashed")
  line((calc.pi/2, ${axisMinY}), (calc.pi/2, ${axisMaxY}), stroke: 0.5pt + gray, dash: "dashed")
  ` : ''}

  plot.plot(
    size: (${axisMaxX - axisMinX}, ${axisMaxY - axisMinY}),
    x-tick-step: none, y-tick-step: none, axis-style: none,
    {
      plot.add(domain: (-calc.pi/2 + 0.1, calc.pi/2 - 0.1), x => ${amplitude} * calc.tan(${frequency} * x), style: (stroke: ${strokeStr}), samples: 200)
    }
  )

  content((${axisMaxX - 1}, ${axisMaxY - 0.5}), [$y = ${amplitude} tan(${frequency}x)$], anchor: "east")
})`.trim();
}

export function generateExponentialGraph(params) {
  const {
    base = 2,
    minX = -3, maxX = 3,
    showGrid = true,
    showAxis = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const axisMinX = minX - 1;
  const axisMaxX = maxX + 1;
  const axisMinY = -1;
  const axisMaxY = Math.pow(base, maxX) + 2;

  return `#import "@preview/cetz:0.3.2": canvas, draw
#import "@preview/cetz-plot:0.1.1": plot
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((${axisMinX}, ${axisMinY}), (${axisMaxX}, ${axisMaxY}), step: 1, stroke: luma(240))` : ''}

  ${showAxis ? `
  line((${axisMinX}, 0), (${axisMaxX}, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((${axisMaxX + 0.2}, 0), [$x$], anchor: "west")
  line((0, ${axisMinY}), (0, ${axisMaxY}), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, ${axisMaxY + 0.2}), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])
  ` : ''}

  plot.plot(
    size: (${axisMaxX - axisMinX}, ${axisMaxY - axisMinY}),
    x-tick-step: none, y-tick-step: none, axis-style: none,
    {
      plot.add(domain: (${minX}, ${maxX}), x => ${base} ^ x, style: (stroke: ${strokeStr}), samples: 200)
    }
  )

  content((${axisMaxX - 1}, ${axisMaxY - 0.5}), [$y = ${base}^x$], anchor: "east")
})`.trim();
}

export function generateLogarithmGraph(params) {
  const {
    minX = 0.1, maxX = 10,
    showGrid = true,
    showAxis = true,
    showAsymptotes = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const axisMinX = minX - 1;
  const axisMaxX = maxX + 1;
  const axisMinY = -3;
  const axisMaxY = 3;

  return `#import "@preview/cetz:0.3.2": canvas, draw
#import "@preview/cetz-plot:0.1.1": plot
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((${axisMinX}, ${axisMinY}), (${axisMaxX}, ${axisMaxY}), step: 1, stroke: luma(240))` : ''}

  ${showAxis ? `
  line((${axisMinX}, 0), (${axisMaxX}, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((${axisMaxX + 0.2}, 0), [$x$], anchor: "west")
  line((0, ${axisMinY}), (0, ${axisMaxY}), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, ${axisMaxY + 0.2}), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])
  ` : ''}

  ${showAsymptotes ? `
  line((0, ${axisMinY}), (0, ${axisMaxY}), stroke: 0.5pt + gray, dash: "dashed")
  ` : ''}

  plot.plot(
    size: (${axisMaxX - axisMinX}, ${axisMaxY - axisMinY}),
    x-tick-step: none, y-tick-step: none, axis-style: none,
    {
      plot.add(domain: (${minX}, ${maxX}), x => calc.ln(x), style: (stroke: ${strokeStr}), samples: 200)
    }
  )

  content((${axisMaxX - 1}, ${axisMaxY - 0.5}), [$y = ln(x)$], anchor: "east")
})`.trim();
}

export function generateAbsoluteLinearGraph(params) {
  const {
    a = 1, b = 0,
    minX = -5, maxX = 5,
    showGrid = true,
    showAxis = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const axisMinX = minX - 1;
  const axisMaxX = maxX + 1;
  const axisMinY = -1;
  const axisMaxY = 5;

  return `#import "@preview/cetz:0.3.2": canvas, draw
#import "@preview/cetz-plot:0.1.1": plot
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((${axisMinX}, ${axisMinY}), (${axisMaxX}, ${axisMaxY}), step: 1, stroke: luma(240))` : ''}

  ${showAxis ? `
  line((${axisMinX}, 0), (${axisMaxX}, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((${axisMaxX + 0.2}, 0), [$x$], anchor: "west")
  line((0, ${axisMinY}), (0, ${axisMaxY}), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, ${axisMaxY + 0.2}), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])
  ` : ''}

  plot.plot(
    size: (${axisMaxX - axisMinX}, ${axisMaxY - axisMinY}),
    x-tick-step: none, y-tick-step: none, axis-style: none,
    {
      plot.add(domain: (${minX}, ${maxX}), x => calc.abs(${a} * x + ${b}), style: (stroke: ${strokeStr}), samples: 200)
    }
  )

  content((${axisMaxX - 1}, ${axisMaxY - 0.5}), [$y = |${a}x ${b >= 0 ? '+' : ''} ${b}|$], anchor: "east")
})`.trim();
}

export function generateAbsoluteGraph(params) {
  const {
    a = 1, b = 0, c = 0,
    minX = -5, maxX = 5,
    showGrid = true,
    showAxis = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const axisMinX = minX - 1;
  const axisMaxX = maxX + 1;
  const axisMinY = -1;
  const axisMaxY = 5;

  return `#import "@preview/cetz:0.3.2": canvas, draw
#import "@preview/cetz-plot:0.1.1": plot
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((${axisMinX}, ${axisMinY}), (${axisMaxX}, ${axisMaxY}), step: 1, stroke: luma(240))` : ''}

  ${showAxis ? `
  line((${axisMinX}, 0), (${axisMaxX}, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((${axisMaxX + 0.2}, 0), [$x$], anchor: "west")
  line((0, ${axisMinY}), (0, ${axisMaxY}), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, ${axisMaxY + 0.2}), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])
  ` : ''}

  plot.plot(
    size: (${axisMaxX - axisMinX}, ${axisMaxY - axisMinY}),
    x-tick-step: none, y-tick-step: none, axis-style: none,
    {
      plot.add(domain: (${minX}, ${maxX}), x => calc.abs(${a} * x * x + ${b} * x + ${c}), style: (stroke: ${strokeStr}), samples: 200)
    }
  )

  content((${axisMaxX - 1}, ${axisMaxY - 0.5}), [$y = |${a}x^2 ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c}|$], anchor: "east")
})`.trim();
}

// ==================== VECTƠ ====================

export function generateVector2D(params) {
  const {
    x, y,
    startX = 0, startY = 0,
    label = 'a',
    showComponents = true,
    showGrid = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const endX = startX + x;
  const endY = startY + y;

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((-5, -5), (5, 5), step: 1, stroke: luma(240))` : ''}

  // Trục tọa độ
  line((-5, 0), (5, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((5.2, 0), [$x$], anchor: "west")

  line((0, -5), (0, 5), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, 5.2), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])

  // Vectơ
  line((${startX}, ${startY}), (${endX}, ${endY}), mark: (end: ">"), stroke: ${strokeStr})

  ${showComponents ? `
  // Thành phần
  line((${startX}, ${startY}), (${endX}, ${startY}), stroke: gray, dash: "dashed")
  line((${endX}, ${startY}), (${endX}, ${endY}), stroke: gray, dash: "dashed")
  ` : ''}

  // Nhãn
  content((${(startX + endX) / 2}, ${(startY + endY) / 2}), [$arrow(${label})$], anchor: "south-east")
  content((${endX}, ${endY}), [$(${x}, ${y})$], anchor: "south-west")
})`.trim();
}

export function generateVectorSum(params) {
  const {
    x1, y1, x2, y2,
    method = 'Hình bình hành',
    showGrid = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  if (method === 'Hình bình hành') {
    return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((-5, -5), (5, 5), step: 1, stroke: luma(240))` : ''}

  // Trục tọa độ
  line((-5, 0), (5, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((5.2, 0), [$x$], anchor: "west")

  line((0, -5), (0, 5), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, 5.2), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])

  // Vectơ a
  line((0, 0), (${x1}, ${y1}), mark: (end: ">"), stroke: 1.5pt + blue)
  content((${x1 / 2}, ${y1 / 2}), [$arrow(a)$], anchor: "south-east")

  // Vectơ b
  line((0, 0), (${x2}, ${y2}), mark: (end: ">"), stroke: 1.5pt + green)
  content((${x2 / 2}, ${y2 / 2}), [$arrow(b)$], anchor: "south-west")

  // Hình bình hành
  line((${x1}, ${y1}), (${x1 + x2}, ${y1 + y2}), stroke: gray, dash: "dashed")
  line((${x2}, ${y2}), (${x1 + x2}, ${y1 + y2}), stroke: gray, dash: "dashed")

  // Vectơ tổng
  line((0, 0), (${x1 + x2}, ${y1 + y2}), mark: (end: ">"), stroke: 1.5pt + red)
  content((${(x1 + x2) / 2}, ${(y1 + y2) / 2}), [$arrow(a) + arrow(b)$], anchor: "south")
})`.trim();
  } else {
    // Phương pháp nối tiếp
    return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((-5, -5), (5, 5), step: 1, stroke: luma(240))` : ''}

  // Trục tọa độ
  line((-5, 0), (5, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((5.2, 0), [$x$], anchor: "west")

  line((0, -5), (0, 5), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, 5.2), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])

  // Vectơ a
  line((0, 0), (${x1}, ${y1}), mark: (end: ">"), stroke: 1.5pt + blue)
  content((${x1 / 2}, ${y1 / 2}), [$arrow(a)$], anchor: "south-east")

  // Vectơ b (bắt đầu từ đầu mút của a)
  line((${x1}, ${y1}), (${x1 + x2}, ${y1 + y2}), mark: (end: ">"), stroke: 1.5pt + green)
  content((${x1 + x2 / 2}, ${y1 + y2 / 2}), [$arrow(b)$], anchor: "south-west")

  // Vectơ tổng
  line((0, 0), (${x1 + x2}, ${y1 + y2}), mark: (end: ">"), stroke: 1.5pt + red)
  content((${(x1 + x2) / 2}, ${(y1 + y2) / 2}), [$arrow(a) + arrow(b)$], anchor: "north")
})`.trim();
  }
}

// ==================== VECTƠ 3D & HỆ TỌA ĐỘ OXYZ ====================

// Oblique projection (phối cảnh nghiêng) — chuẩn sách giáo khoa VN:
// Oz lên trên, Ox sang phải, Oy chếch xuống trái
function p3(x, y, z) {
  return [parseFloat((x - 0.5 * y).toFixed(4)), parseFloat((z - 0.35 * y).toFixed(4))];
}

export function generateCoordinateSystem3D(params) {
  const {
    axisLength = 4,
    labelX = 'x', labelY = 'y', labelZ = 'z',
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const L = Number(axisLength) || 4;
  const O  = p3(0, 0, 0);
  const Ex = p3(L, 0, 0);
  const Ey = p3(0, L, 0);
  const Ez = p3(0, 0, L);

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Hệ tọa độ Oxyz
  line((${O[0]}, ${O[1]}), (${Ex[0]}, ${Ex[1]}), mark: (end: ">"), stroke: ${strokeStr})
  line((${O[0]}, ${O[1]}), (${Ey[0]}, ${Ey[1]}), mark: (end: ">"), stroke: ${strokeStr})
  line((${O[0]}, ${O[1]}), (${Ez[0]}, ${Ez[1]}), mark: (end: ">"), stroke: ${strokeStr})

  content((${O[0] - 0.2}, ${O[1] - 0.2}), [$O$], anchor: "north-east")
  content((${Ex[0] + 0.2}, ${Ex[1]}), [$${labelX}$], anchor: "west")
  content((${Ey[0] - 0.2}, ${(Ey[1] - 0.15).toFixed(3)}), [$${labelY}$], anchor: "north-east")
  content((${Ez[0]}, ${Ez[1] + 0.2}), [$${labelZ}$], anchor: "south")

  // Nhãn đơn vị trên các trục
  circle((${p3(1,0,0)[0]}, ${p3(1,0,0)[1]}), radius: 0.05, fill: black)
  circle((${p3(0,1,0)[0]}, ${p3(0,1,0)[1]}), radius: 0.05, fill: black)
  circle((${p3(0,0,1)[0]}, ${p3(0,0,1)[1]}), radius: 0.05, fill: black)
})`.trim();
}

export function generateVector3D(params) {
  const {
    x = 2, y = 2, z = 3,
    label = 'a',
    showComponents = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const nx = Number(x), ny = Number(y), nz = Number(z);
  const L = Math.max(nx, ny, nz) + 1.5;

  const O    = p3(0, 0, 0);
  const Ex   = p3(L, 0, 0);
  const Ey   = p3(0, L, 0);
  const Ez   = p3(0, 0, L);
  const V    = p3(nx, ny, nz);
  const Vx   = p3(nx, 0, 0);
  const Vy   = p3(0, ny, 0);
  const Vz   = p3(0, 0, nz);
  const Vxy  = p3(nx, ny, 0);
  const Vxz  = p3(nx, 0, nz);
  const Vyz  = p3(0, ny, nz);

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Trục Oxyz
  line((${O[0]}, ${O[1]}), (${Ex[0]}, ${Ex[1]}), mark: (end: ">"), stroke: 0.8pt + gray)
  line((${O[0]}, ${O[1]}), (${Ey[0]}, ${Ey[1]}), mark: (end: ">"), stroke: 0.8pt + gray)
  line((${O[0]}, ${O[1]}), (${Ez[0]}, ${Ez[1]}), mark: (end: ">"), stroke: 0.8pt + gray)
  content((${O[0] - 0.2}, ${O[1] - 0.2}), [$O$], anchor: "north-east")
  content((${Ex[0] + 0.2}, ${Ex[1]}), [$x$], anchor: "west")
  content((${Ey[0] - 0.2}, ${(Ey[1] - 0.15).toFixed(3)}), [$y$], anchor: "north-east")
  content((${Ez[0]}, ${Ez[1] + 0.2}), [$z$], anchor: "south")

  ${showComponents ? `
  // Hình hộp chiều (dashed)
  line((${O[0]}, ${O[1]}), (${Vx[0]}, ${Vx[1]}), stroke: 0.5pt + gray, dash: "dashed")
  line((${O[0]}, ${O[1]}), (${Vy[0]}, ${Vy[1]}), stroke: 0.5pt + gray, dash: "dashed")
  line((${O[0]}, ${O[1]}), (${Vz[0]}, ${Vz[1]}), stroke: 0.5pt + gray, dash: "dashed")
  line((${Vx[0]}, ${Vx[1]}), (${Vxy[0]}, ${Vxy[1]}), stroke: 0.5pt + gray, dash: "dashed")
  line((${Vy[0]}, ${Vy[1]}), (${Vxy[0]}, ${Vxy[1]}), stroke: 0.5pt + gray, dash: "dashed")
  line((${Vx[0]}, ${Vx[1]}), (${Vxz[0]}, ${Vxz[1]}), stroke: 0.5pt + gray, dash: "dashed")
  line((${Vz[0]}, ${Vz[1]}), (${Vxz[0]}, ${Vxz[1]}), stroke: 0.5pt + gray, dash: "dashed")
  line((${Vy[0]}, ${Vy[1]}), (${Vyz[0]}, ${Vyz[1]}), stroke: 0.5pt + gray, dash: "dashed")
  line((${Vz[0]}, ${Vz[1]}), (${Vyz[0]}, ${Vyz[1]}), stroke: 0.5pt + gray, dash: "dashed")
  line((${Vxy[0]}, ${Vxy[1]}), (${V[0]}, ${V[1]}), stroke: 0.5pt + gray, dash: "dashed")
  line((${Vxz[0]}, ${Vxz[1]}), (${V[0]}, ${V[1]}), stroke: 0.5pt + gray, dash: "dashed")
  line((${Vyz[0]}, ${Vyz[1]}), (${V[0]}, ${V[1]}), stroke: 0.5pt + gray, dash: "dashed")
  ` : ''}

  // Vectơ
  line((${O[0]}, ${O[1]}), (${V[0]}, ${V[1]}), mark: (end: ">"), stroke: ${strokeStr})
  content((${V[0] + 0.2}, ${V[1] + 0.1}), [$arrow(${label}) = (${nx}; ${ny}; ${nz})$], anchor: "south-west")
})`.trim();
}

export function generateVector3DSum(params) {
  const {
    x1 = 2, y1 = 1, z1 = 1,
    x2 = 1, y2 = 2, z2 = 1,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const nx1 = Number(x1), ny1 = Number(y1), nz1 = Number(z1);
  const nx2 = Number(x2), ny2 = Number(y2), nz2 = Number(z2);
  const L = Math.max(nx1 + nx2, ny1 + ny2, nz1 + nz2) + 1.5;

  const O  = p3(0, 0, 0);
  const Ex = p3(L, 0, 0);
  const Ey = p3(0, L, 0);
  const Ez = p3(0, 0, L);
  const Va = p3(nx1, ny1, nz1);
  const Vb = p3(nx2, ny2, nz2);
  const Vs = p3(nx1 + nx2, ny1 + ny2, nz1 + nz2);
  const VbFromA = p3(nx1 + nx2, ny1 + ny2, nz1 + nz2);

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Trục Oxyz
  line((${O[0]}, ${O[1]}), (${Ex[0]}, ${Ex[1]}), mark: (end: ">"), stroke: 0.5pt + gray)
  line((${O[0]}, ${O[1]}), (${Ey[0]}, ${Ey[1]}), mark: (end: ">"), stroke: 0.5pt + gray)
  line((${O[0]}, ${O[1]}), (${Ez[0]}, ${Ez[1]}), mark: (end: ">"), stroke: 0.5pt + gray)
  content((${O[0] - 0.2}, ${O[1] - 0.2}), [$O$], anchor: "north-east")
  content((${Ex[0] + 0.2}, ${Ex[1]}), [$x$], anchor: "west")
  content((${Ey[0] - 0.2}, ${(Ey[1] - 0.1).toFixed(3)}), [$y$], anchor: "east")
  content((${Ez[0]}, ${Ez[1] + 0.2}), [$z$], anchor: "south")

  // Vectơ a
  line((${O[0]}, ${O[1]}), (${Va[0]}, ${Va[1]}), mark: (end: ">"), stroke: 1.5pt + blue)
  content((${(Va[0] / 2 + 0.15).toFixed(3)}, ${(Va[1] / 2).toFixed(3)}), [$arrow(a)$], anchor: "south-east")

  // Vectơ b (từ O)
  line((${O[0]}, ${O[1]}), (${Vb[0]}, ${Vb[1]}), mark: (end: ">"), stroke: 1.5pt + green)
  content((${(Vb[0] / 2 - 0.15).toFixed(3)}, ${(Vb[1] / 2).toFixed(3)}), [$arrow(b)$], anchor: "south-west")

  // Các cạnh hình hộp (dashed)
  line((${Va[0]}, ${Va[1]}), (${Vs[0]}, ${Vs[1]}), stroke: 0.5pt + green, dash: "dashed")
  line((${Vb[0]}, ${Vb[1]}), (${Vs[0]}, ${Vs[1]}), stroke: 0.5pt + blue, dash: "dashed")

  // Vectơ tổng
  line((${O[0]}, ${O[1]}), (${Vs[0]}, ${Vs[1]}), mark: (end: ">"), stroke: 1.5pt + red)
  content((${Vs[0] + 0.2}, ${Vs[1] + 0.1}), [$arrow(a) + arrow(b)$], anchor: "south-west")
})`.trim();
}

export function generateVectorCrossProduct(params) {
  const {
    x1 = 3, y1 = 0, z1 = 0,
    x2 = 0, y2 = 3, z2 = 0,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const nx1 = Number(x1), ny1 = Number(y1), nz1 = Number(z1);
  const nx2 = Number(x2), ny2 = Number(y2), nz2 = Number(z2);

  // Tính tích có hướng a × b
  const cx = ny1 * nz2 - nz1 * ny2;
  const cy = nz1 * nx2 - nx1 * nz2;
  const cz = nx1 * ny2 - ny1 * nx2;
  const cLen = Math.sqrt(cx * cx + cy * cy + cz * cz);
  const dispScale = cLen > 0 ? 3 / cLen : 1;
  const dcx = parseFloat((cx * dispScale).toFixed(3));
  const dcy = parseFloat((cy * dispScale).toFixed(3));
  const dcz = parseFloat((cz * dispScale).toFixed(3));

  const axLen = Math.max(nx1, ny1, nz1, nx2, ny2, nz2) + 2;
  const O  = p3(0, 0, 0);
  const Ex = p3(axLen, 0, 0);
  const Ey = p3(0, axLen, 0);
  const Ez = p3(0, 0, axLen);
  const Va = p3(nx1, ny1, nz1);
  const Vb = p3(nx2, ny2, nz2);
  const Vc = p3(dcx, dcy, dcz);

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Trục Oxyz
  line((${O[0]}, ${O[1]}), (${Ex[0]}, ${Ex[1]}), mark: (end: ">"), stroke: 0.5pt + gray)
  line((${O[0]}, ${O[1]}), (${Ey[0]}, ${Ey[1]}), mark: (end: ">"), stroke: 0.5pt + gray)
  line((${O[0]}, ${O[1]}), (${Ez[0]}, ${Ez[1]}), mark: (end: ">"), stroke: 0.5pt + gray)
  content((${O[0] - 0.2}, ${O[1] - 0.2}), [$O$], anchor: "north-east")
  content((${Ex[0] + 0.2}, ${Ex[1]}), [$x$], anchor: "west")
  content((${Ey[0] - 0.2}, ${(Ey[1] - 0.1).toFixed(3)}), [$y$], anchor: "east")
  content((${Ez[0]}, ${Ez[1] + 0.2}), [$z$], anchor: "south")

  // Vectơ a
  line((${O[0]}, ${O[1]}), (${Va[0]}, ${Va[1]}), mark: (end: ">"), stroke: 1.5pt + blue)
  content((${Va[0] + 0.2}, ${Va[1]}), [$arrow(a)$], anchor: "west")

  // Vectơ b
  line((${O[0]}, ${O[1]}), (${Vb[0]}, ${Vb[1]}), mark: (end: ">"), stroke: 1.5pt + green)
  content((${Vb[0] + 0.2}, ${Vb[1]}), [$arrow(b)$], anchor: "west")

  // Tích có hướng a × b
  line((${O[0]}, ${O[1]}), (${Vc[0]}, ${Vc[1]}), mark: (end: ">"), stroke: 1.5pt + red)
  content((${Vc[0] + 0.2}, ${Vc[1] + 0.1}), [$arrow(a) times arrow(b)$], anchor: "south-west")
})`.trim();
}

// ==================== HIỆU VECTƠ ====================

export function generateVectorDifference(params) {
  const {
    x1 = 3, y1 = 2, x2 = 1, y2 = 3,
    showGrid = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const nx1 = Number(x1), ny1 = Number(y1), nx2 = Number(x2), ny2 = Number(y2);
  const dx = nx1 - nx2;
  const dy = ny1 - ny2;

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((-5, -5), (5, 5), step: 1, stroke: luma(240))` : ''}

  // Trục tọa độ
  line((-5, 0), (5, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((5.2, 0), [$x$], anchor: "west")
  line((0, -5), (0, 5), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, 5.2), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])

  // Vectơ a
  line((0, 0), (${nx1}, ${ny1}), mark: (end: ">"), stroke: 1.5pt + blue)
  content((${nx1 / 2 + 0.2}, ${ny1 / 2}), [$arrow(a)$], anchor: "south-east")

  // Vectơ b (từ đầu mút a về gốc — để tính a - b = a + (-b))
  line((0, 0), (${nx2}, ${ny2}), mark: (end: ">"), stroke: 1.5pt + green)
  content((${nx2 / 2}, ${ny2 / 2 + 0.2}), [$arrow(b)$], anchor: "south-west")

  // Vectơ −b (đảo chiều b, vẽ nét đứt từ gốc)
  line((0, 0), (${-nx2}, ${-ny2}), mark: (end: ">"), stroke: 0.8pt + green, dash: "dashed")
  content((${-nx2 / 2 - 0.2}, ${-ny2 / 2}), [$-arrow(b)$], anchor: "east")

  // Hình bình hành: a và -b
  line((${nx1}, ${ny1}), (${dx}, ${dy}), stroke: gray, dash: "dashed")
  line((${-nx2}, ${-ny2}), (${dx}, ${dy}), stroke: gray, dash: "dashed")

  // Vectơ hiệu a - b
  line((0, 0), (${dx}, ${dy}), mark: (end: ">"), stroke: 1.5pt + red)
  content((${dx / 2 + 0.2}, ${dy / 2}), [$arrow(a) - arrow(b)$], anchor: "west")
})`.trim();
}

// ==================== TÍCH VÔ HƯỚNG ====================

export function generateVectorDotProduct(params) {
  const {
    x1 = 3, y1 = 0, x2 = 2, y2 = 2,
    showGrid = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const nx1 = Number(x1), ny1 = Number(y1), nx2 = Number(x2), ny2 = Number(y2);
  const lenA = Math.sqrt(nx1 * nx1 + ny1 * ny1);
  const lenB = Math.sqrt(nx2 * nx2 + ny2 * ny2);
  const dot = nx1 * nx2 + ny1 * ny2;
  const cosTheta = lenA > 0 && lenB > 0 ? dot / (lenA * lenB) : 0;
  const thetaDeg = parseFloat((Math.acos(Math.max(-1, Math.min(1, cosTheta))) * 180 / Math.PI).toFixed(1));

  // Góc bắt đầu và kết thúc cho arc
  const angle1 = parseFloat((Math.atan2(ny1, nx1) * 180 / Math.PI).toFixed(1));
  const angle2 = parseFloat((Math.atan2(ny2, nx2) * 180 / Math.PI).toFixed(1));
  const arcStart = Math.min(angle1, angle2);
  const arcStop = Math.max(angle1, angle2);

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((-5, -5), (5, 5), step: 1, stroke: luma(240))` : ''}

  // Trục tọa độ
  line((-5, 0), (5, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((5.2, 0), [$x$], anchor: "west")
  line((0, -5), (0, 5), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, 5.2), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])

  // Vectơ a
  line((0, 0), (${nx1}, ${ny1}), mark: (end: ">"), stroke: 1.5pt + blue)
  content((${(nx1 * 1.1).toFixed(2)}, ${(ny1 * 1.1).toFixed(2)}), [$arrow(a)$], anchor: "south-west")

  // Vectơ b
  line((0, 0), (${nx2}, ${ny2}), mark: (end: ">"), stroke: 1.5pt + green)
  content((${(nx2 * 1.1).toFixed(2)}, ${(ny2 * 1.1).toFixed(2)}), [$arrow(b)$], anchor: "south-east")

  // Góc giữa hai vectơ
  arc((0, 0), start: ${arcStart}deg, stop: ${arcStop}deg, radius: 0.8, stroke: 0.8pt + red)
  content((0.9, 0.5), [$theta$], anchor: "west")

  // Hình chiếu của b lên a (projection)
  let projLen = ${parseFloat((dot / lenA).toFixed(3))}
  line((projLen, 0), (${nx2}, ${ny2}), stroke: 0.5pt + gray, dash: "dashed")

  // Thông tin
  content((4, 4), [$arrow(a) dot arrow(b) = ${dot.toFixed(2)}$], anchor: "east")
  content((4, 3.3), [$theta = ${thetaDeg}°$], anchor: "east")
})`.trim();
}

// ==================== HÌNH CHIẾU VECTƠ ====================

export function generateVectorProjection(params) {
  const {
    x1 = 3, y1 = 2, x2 = 4, y2 = 0,
    showGrid = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const nx1 = Number(x1), ny1 = Number(y1), nx2 = Number(x2), ny2 = Number(y2);
  const lenBSq = nx2 * nx2 + ny2 * ny2;
  const dot = nx1 * nx2 + ny1 * ny2;
  const t = lenBSq > 0 ? dot / lenBSq : 0;
  const projX = parseFloat((t * nx2).toFixed(4));
  const projY = parseFloat((t * ny2).toFixed(4));

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((-2, -2), (6, 6), step: 1, stroke: luma(240))` : ''}

  // Trục tọa độ
  line((-2, 0), (6, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((6.2, 0), [$x$], anchor: "west")
  line((0, -2), (0, 6), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, 6.2), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])

  // Vectơ b (hướng chiếu)
  line((0, 0), (${nx2}, ${ny2}), mark: (end: ">"), stroke: 1.5pt + green)
  content((${nx2 + 0.3}, ${ny2}), [$arrow(b)$], anchor: "west")

  // Vectơ a
  line((0, 0), (${nx1}, ${ny1}), mark: (end: ">"), stroke: 1.5pt + blue)
  content((${nx1 + 0.2}, ${ny1}), [$arrow(a)$], anchor: "west")

  // Đường vuông góc từ đầu mút a xuống đường b
  line((${nx1}, ${ny1}), (${projX}, ${projY}), stroke: 0.7pt + gray, dash: "dashed")

  // Vectơ hình chiếu (projection)
  line((0, 0), (${projX}, ${projY}), mark: (end: ">"), stroke: 1.5pt + red)
  content((${projX / 2}, ${projY / 2 - 0.3}), [$"proj"_arrow(b) arrow(a)$], anchor: "north")

  // Điểm chân đường vuông góc
  circle((${projX}, ${projY}), radius: 0.07, fill: red)
})`.trim();
}

// ==================== ĐƯỜNG CONG THAM SỐ ====================

export function generateParametricCircle(params) {
  const {
    radius = 3,
    labelO = 'O',
    showArrow = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);
  const r = Number(radius);

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Trục tọa độ
  line((${-r - 1}, 0), (${r + 1.5}, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((${r + 1.7}, 0), [$x$], anchor: "west")
  line((0, ${-r - 1}), (0, ${r + 1.5}), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, ${r + 1.7}), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])

  // Đường tròn tham số x = r·cos(t), y = r·sin(t)
  circle((0, 0), radius: ${r}, stroke: ${strokeStr})

  // Bán kính mẫu
  line((0, 0), (${r}, 0), stroke: gray, dash: "dashed")
  content((${r / 2}, -0.3), [r = ${r}], anchor: "north")

  ${showArrow ? `
  // Mũi tên chỉ hướng tham số t tăng
  arc((0, 0), start: 25deg, stop: 65deg, radius: ${r * 1.15}, mark: (end: ">"), stroke: 0.8pt + blue)
  content((0, ${r * 1.3}), [$t$], anchor: "south")
  ` : ''}

  // Nhãn tâm
  circle((0, 0), radius: 0.06, fill: black)
  content((0.15, 0.15), [${labelO}], anchor: "south-west")

  // Phương trình
  content((${-r - 0.5}, ${-r - 0.7}), [$x = ${r}cos(t), space y = ${r}sin(t)$], anchor: "west")
})`.trim();
}

export function generateParametricEllipse(params) {
  const {
    semiA = 4, semiB = 2.5,
    showAxes = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);
  const a = Number(semiA), b = Number(semiB);
  const maxR = Math.max(a, b);

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Trục tọa độ
  line((${-a - 1}, 0), (${a + 1.5}, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((${a + 1.7}, 0), [$x$], anchor: "west")
  line((0, ${-b - 1}), (0, ${b + 1.5}), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, ${b + 1.7}), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])

  // Elip tham số x = a·cos(t), y = b·sin(t)
  arc((0, 0), start: 0deg, stop: 360deg, radius: (${a}, ${b}), stroke: ${strokeStr})

  ${showAxes ? `
  // Bán trục a và b
  line((0, 0), (${a}, 0), stroke: gray, dash: "dashed")
  line((0, 0), (0, ${b}), stroke: gray, dash: "dashed")
  content((${a / 2}, -0.3), [a = ${a}], anchor: "north")
  content((-0.5, ${b / 2}), [b = ${b}], anchor: "east")
  ` : ''}

  // Tâm
  circle((0, 0), radius: 0.06, fill: black)

  // Phương trình
  content((${-a - 0.5}, ${-b - 0.7}), [$x = ${a}cos(t), space y = ${b}sin(t)$], anchor: "west")
})`.trim();
}

export function generateParametricGeneral(params) {
  const {
    freqX = 3, freqY = 2, phaseX = 0, phaseY = 0,
    ampX = 3, ampY = 3,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const nX = Number(freqX), nY = Number(freqY);
  const aX = Number(ampX), aY = Number(ampY);
  const pX = Number(phaseX), pY = Number(phaseY);

  // Tính điểm Lissajous và output dưới dạng array Typst
  const N = 300;
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const t = (2 * Math.PI * i) / N;
    const x = parseFloat((aX * Math.sin(nX * t + pX)).toFixed(3));
    const y = parseFloat((aY * Math.sin(nY * t + pY)).toFixed(3));
    pts.push(`(${x}, ${y})`);
  }
  const ptsStr = pts.join(', ');

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Trục tọa độ
  line((${-aX - 1}, 0), (${aX + 1.5}, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((${aX + 1.7}, 0), [$x$], anchor: "west")
  line((0, ${-aY - 1}), (0, ${aY + 1.5}), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, ${aY + 1.7}), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])

  // Đường cong Lissajous tham số
  line(${ptsStr}, stroke: ${strokeStr})

  // Phương trình
  content((${-aX - 0.5}, ${-aY - 0.7}),
    [$x = ${aX}sin(${nX}t + ${pX}), space y = ${aY}sin(${nY}t + ${pY})$], anchor: "west")
})`.trim();
}
