// Generator cho hình học phẳng

// ==================== TAM GIÁC ====================

export function generateTriangle(params) {
  const {
    sideA = 5, sideB = 4, sideC = 3,
    labelA = 'A', labelB = 'B', labelC = 'C',
    showSides = true, showAngles = false,
    styleOptions = {}
  } = params;

  // Tính tọa độ các đỉnh (đặt B tại gốc, C trên trục x)
  const B = [0, 0];
  const C = [sideA, 0];

  // Tính tọa độ A bằng công thức cosine
  const cosB = (sideA * sideA + sideC * sideC - sideB * sideB) / (2 * sideA * sideC);
  const sinB = Math.sqrt(Math.max(0, 1 - cosB * cosB));
  const A = [sideC * cosB, sideC * sinB];

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';
  const fillColor = styleOptions.fillColor || 'transparent';
  const fillOpacity = styleOptions.fillOpacity || 0.1;

  const fillStyle = fillColor !== 'transparent'
    ? `fill: ${fillColor}.transparentize(${(1 - fillOpacity) * 100}%)`
    : '';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Vẽ tam giác
  line((${B[0]}, ${B[1]}), (${C[0]}, ${C[1]}), (${A[0]}, ${A[1]}), close: true,
       stroke: ${strokeWidth} + ${stroke}${fillStyle ? ', ' + fillStyle : ''})

  // Nhãn đỉnh
  content((${A[0]}, ${A[1]}), [${labelA}], anchor: "south")
  content((${B[0]}, ${B[1]}), [${labelB}], anchor: "north-east")
  content((${C[0]}, ${C[1]}), [${labelC}], anchor: "north-west")

  ${showSides ? `
  // Độ dài cạnh
  content((${(B[0] + C[0]) / 2}, ${(B[1] + C[1]) / 2 - 0.3}), [${sideA.toFixed(1)}], anchor: "north")
  content((${(A[0] + C[0]) / 2}, ${(A[1] + C[1]) / 2}), [${sideB.toFixed(1)}], anchor: "west")
  content((${(A[0] + B[0]) / 2}, ${(A[1] + B[1]) / 2}), [${sideC.toFixed(1)}], anchor: "east")
  ` : ''}
})`.trim();
}

export function generateRightTriangle(params) {
  const {
    sideA = 3, sideB = 4,
    rightAngleAt = 'A',
    labelA = 'A', labelB = 'B', labelC = 'C',
    showRightAngleSymbol = true,
    showSides = true,
    styleOptions = {}
  } = params;

  // Tính cạnh huyền
  const hypotenuse = Math.sqrt(sideA * sideA + sideB * sideB);

  let A, B, C;
  if (rightAngleAt === 'A') {
    A = [0, 0];
    B = [sideA, 0];
    C = [0, sideB];
  } else if (rightAngleAt === 'B') {
    B = [0, 0];
    A = [sideA, 0];
    C = [0, sideB];
  } else {
    C = [0, 0];
    A = [sideA, 0];
    B = [0, sideB];
  }

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Vẽ tam giác vuông
  line((${A[0]}, ${A[1]}), (${B[0]}, ${B[1]}), (${C[0]}, ${C[1]}), close: true,
       stroke: ${strokeWidth} + ${stroke})

  ${showRightAngleSymbol && rightAngleAt === 'A' ? `
  // Ký hiệu góc vuông
  line((0.3, 0), (0.3, 0.3), (0, 0.3), stroke: 0.5pt + ${stroke})
  ` : ''}

  // Nhãn đỉnh
  content((${A[0]}, ${A[1]}), [${labelA}], anchor: "north-east")
  content((${B[0]}, ${B[1]}), [${labelB}], anchor: "north-west")
  content((${C[0]}, ${C[1]}), [${labelC}], anchor: "south-east")

  ${showSides ? `
  // Độ dài cạnh
  content((${(A[0] + B[0]) / 2}, ${(A[1] + B[1]) / 2 - 0.3}), [${sideA.toFixed(1)}], anchor: "north")
  content((${(A[0] + C[0]) / 2 - 0.3}, ${(A[1] + C[1]) / 2}), [${sideB.toFixed(1)}], anchor: "east")
  content((${(B[0] + C[0]) / 2}, ${(B[1] + C[1]) / 2}), [${hypotenuse.toFixed(1)}], anchor: "south-west")
  ` : ''}
})`.trim();
}

export function generateIsoscelesTriangle(params) {
  const {
    base = 4, leg = 5,
    labelA = 'A', labelB = 'B', labelC = 'C',
    showSides = true,
    showEqualMarks = true,
    styleOptions = {}
  } = params;

  // Tính chiều cao
  const height = Math.sqrt(leg * leg - (base / 2) * (base / 2));

  const A = [base / 2, height];
  const B = [0, 0];
  const C = [base, 0];

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Vẽ tam giác cân
  line((${B[0]}, ${B[1]}), (${C[0]}, ${C[1]}), (${A[0]}, ${A[1]}), close: true,
       stroke: ${strokeWidth} + ${stroke})

  ${showEqualMarks ? `
  // Dấu cạnh bằng nhau trên AB
  line((${base / 2 - 0.2}, ${height / 2 + 0.1}), (${base / 2 - 0.1}, ${height / 2 - 0.1}), stroke: 0.5pt + ${stroke})
  // Dấu cạnh bằng nhau trên AC
  line((${base / 2 + 0.1}, ${height / 2 - 0.1}), (${base / 2 + 0.2}, ${height / 2 + 0.1}), stroke: 0.5pt + ${stroke})
  ` : ''}

  // Nhãn đỉnh
  content((${A[0]}, ${A[1]}), [${labelA}], anchor: "south")
  content((${B[0]}, ${B[1]}), [${labelB}], anchor: "north-east")
  content((${C[0]}, ${C[1]}), [${labelC}], anchor: "north-west")

  ${showSides ? `
  // Độ dài cạnh
  content((${(B[0] + C[0]) / 2}, ${(B[1] + C[1]) / 2 - 0.3}), [${base.toFixed(1)}], anchor: "north")
  content((${(A[0] + B[0]) / 2 - 0.3}, ${(A[1] + B[1]) / 2}), [${leg.toFixed(1)}], anchor: "east")
  content((${(A[0] + C[0]) / 2 + 0.3}, ${(A[1] + C[1]) / 2}), [${leg.toFixed(1)}], anchor: "west")
  ` : ''}
})`.trim();
}

export function generateEquilateralTriangle(params) {
  const {
    side = 5,
    labelA = 'A', labelB = 'B', labelC = 'C',
    showSides = true,
    showEqualMarks = true,
    styleOptions = {}
  } = params;

  const height = (side * Math.sqrt(3)) / 2;

  const A = [side / 2, height];
  const B = [0, 0];
  const C = [side, 0];

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Vẽ tam giác đều
  line((${B[0]}, ${B[1]}), (${C[0]}, ${C[1]}), (${A[0]}, ${A[1]}), close: true,
       stroke: ${strokeWidth} + ${stroke})

  ${showEqualMarks ? `
  // Dấu cạnh bằng nhau
  line((${side / 2 - 0.1}, ${0.2}), (${side / 2 + 0.1}, ${0.2}), stroke: 0.5pt + ${stroke})
  line((${side / 4 - 0.1}, ${height / 2}), (${side / 4 + 0.1}, ${height / 2}), stroke: 0.5pt + ${stroke})
  line((${3 * side / 4 - 0.1}, ${height / 2}), (${3 * side / 4 + 0.1}, ${height / 2}), stroke: 0.5pt + ${stroke})
  ` : ''}

  // Nhãn đỉnh
  content((${A[0]}, ${A[1]}), [${labelA}], anchor: "south")
  content((${B[0]}, ${B[1]}), [${labelB}], anchor: "north-east")
  content((${C[0]}, ${C[1]}), [${labelC}], anchor: "north-west")

  ${showSides ? `
  // Độ dài cạnh
  content((${(B[0] + C[0]) / 2}, ${(B[1] + C[1]) / 2 - 0.3}), [${side.toFixed(1)}], anchor: "north")
  ` : ''}
})`.trim();
}

export function generateInscribedTriangle(params) {
  const {
    radius = 3,
    triangleType = 'Đều',
    labelO = 'O', labelA = 'A', labelB = 'B', labelC = 'C',
    showRadius = false,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  // Tọa độ cho tam giác đều nội tiếp
  const A = [0, radius];
  const B = [-radius * Math.sqrt(3) / 2, -radius / 2];
  const C = [radius * Math.sqrt(3) / 2, -radius / 2];

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *
  let O = (0, 0)
  let R = ${radius}

  // Vẽ đường tròn
  circle(O, radius: R, stroke: ${strokeWidth} + gray)

  // Vẽ tam giác nội tiếp
  line((${A[0]}, ${A[1]}), (${B[0]}, ${B[1]}), (${C[0]}, ${C[1]}), close: true,
       stroke: ${strokeWidth} + ${stroke}, fill: blue.transparentize(90%))

  ${showRadius ? `
  // Bán kính
  line(O, (${A[0]}, ${A[1]}), stroke: gray, dash: "dashed")
  ` : ''}

  // Nhãn
  content(O, [${labelO}], anchor: "north")
  content((${A[0]}, ${A[1] + 0.3}), [${labelA}], anchor: "south")
  content((${B[0] - 0.3}, ${B[1]}), [${labelB}], anchor: "east")
  content((${C[0] + 0.3}, ${C[1]}), [${labelC}], anchor: "west")
})`.trim();
}

// ==================== TỨ GIÁC ====================

export function generateSquare(params) {
  const {
    side = 4,
    labelA = 'A', labelB = 'B', labelC = 'C', labelD = 'D',
    showDiagonals = false,
    showSides = true,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Vẽ hình vuông
  rect((0, 0), (${side}, ${side}), stroke: ${strokeWidth} + ${stroke})

  ${showDiagonals ? `
  // Đường chéo
  line((0, 0), (${side}, ${side}), stroke: gray, dash: "dashed")
  line((0, ${side}), (${side}, 0), stroke: gray, dash: "dashed")
  ` : ''}

  // Nhãn đỉnh
  content((0, 0), [${labelA}], anchor: "north-east")
  content((${side}, 0), [${labelB}], anchor: "north-west")
  content((${side}, ${side}), [${labelC}], anchor: "south-west")
  content((0, ${side}), [${labelD}], anchor: "south-east")

  ${showSides ? `
  // Độ dài cạnh
  content((${side / 2}, -0.3), [${side.toFixed(1)}], anchor: "north")
  ` : ''}
})`.trim();
}

export function generateRectangle(params) {
  const {
    width = 4, height = 3,
    labelA = 'A', labelB = 'B', labelC = 'C', labelD = 'D',
    showDiagonals = false,
    showSides = true,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Vẽ hình chữ nhật
  rect((0, 0), (${width}, ${height}), stroke: ${strokeWidth} + ${stroke})

  ${showDiagonals ? `
  // Đường chéo
  line((0, 0), (${width}, ${height}), stroke: gray, dash: "dashed")
  line((0, ${height}), (${width}, 0), stroke: gray, dash: "dashed")
  ` : ''}

  // Nhãn đỉnh
  content((0, 0), [${labelA}], anchor: "north-east")
  content((${width}, 0), [${labelB}], anchor: "north-west")
  content((${width}, ${height}), [${labelC}], anchor: "south-west")
  content((0, ${height}), [${labelD}], anchor: "south-east")

  ${showSides ? `
  // Độ dài cạnh
  content((${width / 2}, -0.3), [${width.toFixed(1)}], anchor: "north")
  content((${width + 0.3}, ${height / 2}), [${height.toFixed(1)}], anchor: "west")
  ` : ''}
})`.trim();
}

export function generateRhombus(params) {
  const {
    side = 4, angle = 60,
    labelA = 'A', labelB = 'B', labelC = 'C', labelD = 'D',
    showDiagonals = false,
    showSides = true,
    styleOptions = {}
  } = params;

  const angleRad = (angle * Math.PI) / 180;
  const height = side * Math.sin(angleRad);
  const base = side * Math.cos(angleRad);

  const A = [0, 0];
  const B = [side, 0];
  const C = [side + base, height];
  const D = [base, height];

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Vẽ hình thoi
  line((${A[0]}, ${A[1]}), (${B[0]}, ${B[1]}), (${C[0]}, ${C[1]}), (${D[0]}, ${D[1]}), close: true,
       stroke: ${strokeWidth} + ${stroke})

  ${showDiagonals ? `
  // Đường chéo
  line((${A[0]}, ${A[1]}), (${C[0]}, ${C[1]}), stroke: gray, dash: "dashed")
  line((${B[0]}, ${B[1]}), (${D[0]}, ${D[1]}), stroke: gray, dash: "dashed")
  ` : ''}

  // Nhãn đỉnh
  content((${A[0]}, ${A[1]}), [${labelA}], anchor: "north-east")
  content((${B[0]}, ${B[1]}), [${labelB}], anchor: "north-west")
  content((${C[0]}, ${C[1]}), [${labelC}], anchor: "south-west")
  content((${D[0]}, ${D[1]}), [${labelD}], anchor: "south-east")

  ${showSides ? `
  // Độ dài cạnh
  content((${(A[0] + B[0]) / 2}, ${(A[1] + B[1]) / 2 - 0.3}), [${side.toFixed(1)}], anchor: "north")
  ` : ''}
})`.trim();
}

// ==================== ĐƯỜNG TRÒN ====================

export function generateCircle(params) {
  const {
    radius = 3,
    labelO = 'O',
    showRadius = true,
    showCenter = true,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *
  let O = (0, 0)
  let R = ${radius}

  // Vẽ đường tròn
  circle(O, radius: R, stroke: ${strokeWidth} + ${stroke})

  ${showCenter ? `
  // Tâm
  circle(O, radius: 0.05, fill: ${stroke})
  ` : ''}

  ${showRadius ? `
  // Bán kính
  line(O, (R, 0), stroke: gray, dash: "dashed")
  content((R/2, -0.2), [R = ${radius.toFixed(1)}], anchor: "north")
  ` : ''}

  // Nhãn tâm
  content(O, [${labelO}], anchor: "north-east")
})`.trim();
}

export function generateCircleChord(params) {
  const {
    radius = 3,
    chordAngle = 60,
    labelO = 'O', labelA = 'A', labelB = 'B',
    showRadius = true,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';
  const angleRad = (chordAngle * Math.PI) / 180;

  const A = [radius, 0];
  const B = [radius * Math.cos(angleRad), radius * Math.sin(angleRad)];

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *
  let O = (0, 0)
  let R = ${radius}

  // Vẽ đường tròn
  circle(O, radius: R, stroke: ${strokeWidth} + ${stroke})

  // Dây cung
  line((${A[0]}, ${A[1]}), (${B[0]}, ${B[1]}), stroke: ${strokeWidth} + ${stroke})

  ${showRadius ? `
  line(O, (${A[0]}, ${A[1]}), stroke: gray, dash: "dashed")
  line(O, (${B[0]}, ${B[1]}), stroke: gray, dash: "dashed")
  ` : ''}

  content(O, [${labelO}], anchor: "north-east")
  content((${A[0] + 0.3}, ${A[1]}), [${labelA}], anchor: "west")
  content((${B[0] - 0.3}, ${B[1]}), [${labelB}], anchor: "east")
})`.trim();
}

export function generateTangentCircle(params) {
  const {
    radius = 2, distance = 5,
    labelO = 'O', labelM = 'M', labelA = 'A', labelB = 'B',
    showBothTangents = true,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  // Tính tọa độ tiếp điểm
  const tangentLength = Math.sqrt(distance * distance - radius * radius);
  const alpha = Math.acos(radius / distance);

  const A = [radius * Math.cos(alpha), radius * Math.sin(alpha)];
  const B = [radius * Math.cos(alpha), -radius * Math.sin(alpha)];
  const M = [distance, 0];

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *
  let O = (0, 0)
  let R = ${radius}
  let M = (${M[0]}, ${M[1]})
  let A = (${A[0]}, ${A[1]})
  let B = (${A[0]}, ${-A[1]})

  // Vẽ đường tròn
  circle(O, radius: R, stroke: ${strokeWidth} + ${stroke})

  // Tiếp tuyến
  line(M, A, stroke: ${strokeWidth} + ${stroke})
  ${showBothTangents ? `line(M, B, stroke: ${strokeWidth} + ${stroke})` : ''}

  // Đường nối tâm với điểm M
  line(O, M, stroke: gray, dash: "dashed")

  // Nhãn
  content(O, [${labelO}], anchor: "north-east")
  content(M, [${labelM}], anchor: "west")
  content(A, [${labelA}], anchor: "south")
  ${showBothTangents ? `content(B, [${labelB}], anchor: "north")` : ''}
})`.trim();
}

export function generateCircleSecant(params) {
  const {
    radius = 3,
    distance = 2,
    labelO = 'O', labelA = 'A', labelB = 'B',
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *
  let O = (0, 0)
  let R = ${radius}

  // Vẽ đường tròn
  circle(O, radius: R, stroke: ${strokeWidth} + ${stroke})

  // Cát tuyến
  line((-R - 2, ${distance}), (R + 2, ${distance}), stroke: ${strokeWidth} + ${stroke})

  // Đường nối tâm
  line(O, (0, ${distance}), stroke: gray, dash: "dashed")

  content(O, [${labelO}], anchor: "north-east")
  content((R + 0.5, ${distance}), [${labelA}], anchor: "south")
  content((-R - 0.5, ${distance}), [${labelB}], anchor: "north")
})`.trim();
}

export function generateTwoCirclesIntersect(params) {
  const {
    radius1 = 2, radius2 = 2,
    distance = 3,
    labelO1 = 'O', labelO2 = "O'",
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  const O1 = [0, 0];
  const O2 = [distance, 0];

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Hai đường tròn
  circle((${O1[0]}, ${O1[1]}), radius: ${radius1}, stroke: ${strokeWidth} + ${stroke})
  circle((${O2[0]}, ${O2[1]}), radius: ${radius2}, stroke: ${strokeWidth} + ${stroke})

  // Đường nối tâm
  line((${O1[0]}, ${O1[1]}), (${O2[0]}, ${O2[1]}), stroke: gray, dash: "dashed")

  // Nhãn
  content((${O1[0]}, ${O1[1]}), [${labelO1}], anchor: "north-east")
  content((${O2[0]}, ${O2[1]}), [${labelO2}], anchor: "north-west")
})`.trim();
}
