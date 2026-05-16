// Generator cho đồ thị hàm số và vectơ

// ==================== ĐỒ THỊ HÀM SỐ ====================

export function generateLinearGraph(params) {
  const {
    a, b,
    minX = -5, maxX = 5,
    showGrid = true,
    showAxis = true,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

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
      plot.add(domain: (${minX}, ${maxX}), x => ${a} * x + ${b}, style: (stroke: ${stroke} + ${strokeWidth}))
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

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

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
      plot.add(domain: (${minX}, ${maxX}), x => ${a} * x * x + ${b} * x + ${c}, style: (stroke: ${stroke} + ${strokeWidth}))
    }
  )

  ${showVertex ? `
  // Đỉnh parabol
  circle((${vertexX}, ${vertexY}), radius: 0.08, fill: ${stroke})
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

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

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
      plot.add(domain: (${minX}, ${maxX}), x => ${a} * x * x * x + ${b} * x * x + ${c} * x + ${d}, style: (stroke: ${stroke} + ${strokeWidth}))
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

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

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
      plot.add(domain: (${domain1Start}, ${domain1End}), x => ${k} / x, style: (stroke: ${stroke} + ${strokeWidth}))
      plot.add(domain: (${domain2Start}, ${domain2End}), x => ${k} / x, style: (stroke: ${stroke} + ${strokeWidth}))
    }
  )

  // Hiển thị phương trình
  content((${axisMaxX - 1}, ${axisMaxY - 0.5}), [$y = ${k}/x$], anchor: "east")
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

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

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
      plot.add(domain: (${minX}, ${maxX}), x => ${amplitude} * calc.sin(${frequency} * x + ${phase}) + ${offset}, style: (stroke: ${stroke} + ${strokeWidth}), samples: 200)
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

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

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
      plot.add(domain: (${minX}, ${maxX}), x => ${amplitude} * calc.cos(${frequency} * x + ${phase}) + ${offset}, style: (stroke: ${stroke} + ${strokeWidth}), samples: 200)
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

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

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
      plot.add(domain: (-calc.pi/2 + 0.1, calc.pi/2 - 0.1), x => ${amplitude} * calc.tan(${frequency} * x), style: (stroke: ${stroke} + ${strokeWidth}), samples: 200)
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

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

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
      plot.add(domain: (${minX}, ${maxX}), x => ${base} ^ x, style: (stroke: ${stroke} + ${strokeWidth}), samples: 200)
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

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

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
      plot.add(domain: (${minX}, ${maxX}), x => calc.ln(x), style: (stroke: ${stroke} + ${strokeWidth}), samples: 200)
    }
  )

  content((${axisMaxX - 1}, ${axisMaxY - 0.5}), [$y = ln(x)$], anchor: "east")
})`.trim();
}

export function generateAbsoluteGraph(params) {
  const {
    a, b, c,
    minX = -5, maxX = 5,
    showGrid = true,
    showAxis = true,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

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
      plot.add(domain: (${minX}, ${maxX}), x => calc.abs(${a} * x * x + ${b} * x + ${c}), style: (stroke: ${stroke} + ${strokeWidth}), samples: 200)
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

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

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
  line((${startX}, ${startY}), (${endX}, ${endY}), mark: (end: ">"), stroke: ${strokeWidth} + ${stroke})

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

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

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
  line((0, 0), (${x1}, ${y1}), mark: (end: ">"), stroke: ${strokeWidth} + blue)
  content((${x1 / 2}, ${y1 / 2}), [$arrow(a)$], anchor: "south-east")

  // Vectơ b
  line((0, 0), (${x2}, ${y2}), mark: (end: ">"), stroke: ${strokeWidth} + green)
  content((${x2 / 2}, ${y2 / 2}), [$arrow(b)$], anchor: "south-west")

  // Hình bình hành
  line((${x1}, ${y1}), (${x1 + x2}, ${y1 + y2}), stroke: gray, dash: "dashed")
  line((${x2}, ${y2}), (${x1 + x2}, ${y1 + y2}), stroke: gray, dash: "dashed")

  // Vectơ tổng
  line((0, 0), (${x1 + x2}, ${y1 + y2}), mark: (end: ">"), stroke: ${strokeWidth} + red)
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
  line((0, 0), (${x1}, ${y1}), mark: (end: ">"), stroke: ${strokeWidth} + blue)
  content((${x1 / 2}, ${y1 / 2}), [$arrow(a)$], anchor: "south-east")

  // Vectơ b (bắt đầu từ đầu mút của a)
  line((${x1}, ${y1}), (${x1 + x2}, ${y1 + y2}), mark: (end: ">"), stroke: ${strokeWidth} + green)
  content((${x1 + x2 / 2}, ${y1 + y2 / 2}), [$arrow(b)$], anchor: "south-west")

  // Vectơ tổng
  line((0, 0), (${x1 + x2}, ${y1 + y2}), mark: (end: ">"), stroke: ${strokeWidth} + red)
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

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

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
  line((${O[0]}, ${O[1]}), (${Ex[0]}, ${Ex[1]}), mark: (end: ">"), stroke: ${strokeWidth} + ${stroke})
  line((${O[0]}, ${O[1]}), (${Ey[0]}, ${Ey[1]}), mark: (end: ">"), stroke: ${strokeWidth} + ${stroke})
  line((${O[0]}, ${O[1]}), (${Ez[0]}, ${Ez[1]}), mark: (end: ">"), stroke: ${strokeWidth} + ${stroke})

  content((${O[0] - 0.2}, ${O[1] - 0.2}), [$O$], anchor: "north-east")
  content((${Ex[0] + 0.2}, ${Ex[1]}), [$${labelX}$], anchor: "west")
  content((${Ey[0] - 0.2}, ${(Ey[1] - 0.15).toFixed(3)}), [$${labelY}$], anchor: "north-east")
  content((${Ez[0]}, ${Ez[1] + 0.2}), [$${labelZ}$], anchor: "south")

  // Nhãn đơn vị trên các trục
  circle((${p3(1,0,0)[0]}, ${p3(1,0,0)[1]}), radius: 0.05, fill: ${stroke})
  circle((${p3(0,1,0)[0]}, ${p3(0,1,0)[1]}), radius: 0.05, fill: ${stroke})
  circle((${p3(0,0,1)[0]}, ${p3(0,0,1)[1]}), radius: 0.05, fill: ${stroke})
})`.trim();
}

export function generateVector3D(params) {
  const {
    x = 2, y = 2, z = 3,
    label = 'a',
    showComponents = true,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

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
  line((${O[0]}, ${O[1]}), (${V[0]}, ${V[1]}), mark: (end: ">"), stroke: ${strokeWidth} + ${stroke})
  content((${V[0] + 0.2}, ${V[1] + 0.1}), [$arrow(${label}) = (${nx}; ${ny}; ${nz})$], anchor: "south-west")
})`.trim();
}

export function generateVector3DSum(params) {
  const {
    x1 = 2, y1 = 1, z1 = 1,
    x2 = 1, y2 = 2, z2 = 1,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

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
  line((${O[0]}, ${O[1]}), (${Va[0]}, ${Va[1]}), mark: (end: ">"), stroke: ${strokeWidth} + blue)
  content((${(Va[0] / 2 + 0.15).toFixed(3)}, ${(Va[1] / 2).toFixed(3)}), [$arrow(a)$], anchor: "south-east")

  // Vectơ b (từ O)
  line((${O[0]}, ${O[1]}), (${Vb[0]}, ${Vb[1]}), mark: (end: ">"), stroke: ${strokeWidth} + green)
  content((${(Vb[0] / 2 - 0.15).toFixed(3)}, ${(Vb[1] / 2).toFixed(3)}), [$arrow(b)$], anchor: "south-west")

  // Các cạnh hình hộp (dashed)
  line((${Va[0]}, ${Va[1]}), (${Vs[0]}, ${Vs[1]}), stroke: 0.5pt + green, dash: "dashed")
  line((${Vb[0]}, ${Vb[1]}), (${Vs[0]}, ${Vs[1]}), stroke: 0.5pt + blue, dash: "dashed")

  // Vectơ tổng
  line((${O[0]}, ${O[1]}), (${Vs[0]}, ${Vs[1]}), mark: (end: ">"), stroke: ${strokeWidth} + red)
  content((${Vs[0] + 0.2}, ${Vs[1] + 0.1}), [$arrow(a) + arrow(b)$], anchor: "south-west")
})`.trim();
}

export function generateVectorCrossProduct(params) {
  const {
    x1 = 3, y1 = 0, z1 = 0,
    x2 = 0, y2 = 3, z2 = 0,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

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
  line((${O[0]}, ${O[1]}), (${Va[0]}, ${Va[1]}), mark: (end: ">"), stroke: ${strokeWidth} + blue)
  content((${Va[0] + 0.2}, ${Va[1]}), [$arrow(a)$], anchor: "west")

  // Vectơ b
  line((${O[0]}, ${O[1]}), (${Vb[0]}, ${Vb[1]}), mark: (end: ">"), stroke: ${strokeWidth} + green)
  content((${Vb[0] + 0.2}, ${Vb[1]}), [$arrow(b)$], anchor: "west")

  // Tích có hướng a × b
  line((${O[0]}, ${O[1]}), (${Vc[0]}, ${Vc[1]}), mark: (end: ">"), stroke: ${strokeWidth} + red)
  content((${Vc[0] + 0.2}, ${Vc[1] + 0.1}), [$arrow(a) times arrow(b)$], anchor: "south-west")
})`.trim();
}
