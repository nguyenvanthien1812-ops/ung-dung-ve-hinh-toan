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
