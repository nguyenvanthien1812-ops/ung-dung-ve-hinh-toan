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

export function generateCircumscribedTriangle(params) {
  const {
    sideA = 5, sideB = 4, sideC = 3,
    labelA = 'A', labelB = 'B', labelC = 'C', labelI = 'I',
    showRadius = true,
    styleOptions = {}
  } = params;

  const B = [0, 0];
  const C = [sideA, 0];
  const cosB = (sideA * sideA + sideC * sideC - sideB * sideB) / (2 * sideA * sideC);
  const sinB = Math.sqrt(Math.max(0, 1 - cosB * cosB));
  const A = [sideC * cosB, sideC * sinB];

  // Tâm đường tròn nội tiếp (incenter): I = (a·A + b·B + c·C) / (a+b+c)
  const s = sideA + sideB + sideC;
  const Ix = parseFloat(((sideA * A[0] + sideB * B[0] + sideC * C[0]) / s).toFixed(4));
  const Iy = parseFloat(((sideA * A[1] + sideB * B[1] + sideC * C[1]) / s).toFixed(4));

  // Bán kính nội tiếp: r = Area / semiperimeter
  const sp = s / 2;
  const area = Math.sqrt(Math.max(0, sp * (sp - sideA) * (sp - sideB) * (sp - sideC)));
  const r = parseFloat((area / sp).toFixed(4));

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Vẽ tam giác ngoại tiếp đường tròn
  line((${B[0]}, ${B[1]}), (${C[0]}, ${C[1]}), (${A[0].toFixed(3)}, ${A[1].toFixed(3)}), close: true,
       stroke: ${strokeWidth} + ${stroke})

  // Đường tròn nội tiếp
  circle((${Ix}, ${Iy}), radius: ${r}, stroke: ${strokeWidth} + ${stroke})

  // Tâm nội tiếp
  circle((${Ix}, ${Iy}), radius: 0.06, fill: ${stroke})

  ${showRadius ? `
  // Bán kính nội tiếp (vuông góc từ I đến BC = cạnh x-axis)
  line((${Ix}, ${Iy}), (${Ix}, 0), stroke: gray, dash: "dashed")
  content((${Ix + 0.2}, ${Iy / 2}), [r = ${r.toFixed(2)}], anchor: "west")
  ` : ''}

  // Nhãn
  content((${A[0].toFixed(3)}, ${A[1].toFixed(3)}), [${labelA}], anchor: "south")
  content((${B[0] - 0.3}, ${B[1]}), [${labelB}], anchor: "east")
  content((${C[0] + 0.3}, ${C[1]}), [${labelC}], anchor: "west")
  content((${Ix + 0.15}, ${Iy + 0.15}), [${labelI}], anchor: "south-west")
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

// ==================== ĐA GIÁC ====================

export function generateRegularPolygon(params) {
  const {
    sides = 5, radius = 3,
    showSides = true,
    styleOptions = {}
  } = params;

  const n = Math.max(3, Math.round(sides));
  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const vertices = [];
  for (let k = 0; k < n; k++) {
    const angle = (Math.PI / 2) + (2 * Math.PI * k) / n;
    vertices.push([
      parseFloat((radius * Math.cos(angle)).toFixed(4)),
      parseFloat((radius * Math.sin(angle)).toFixed(4))
    ]);
  }

  const sideLength = parseFloat((2 * radius * Math.sin(Math.PI / n)).toFixed(3));

  const lineArgs = vertices.map(v => `(${v[0]}, ${v[1]})`).join(', ');

  const labelLines = vertices.map((v, k) => {
    const angle = (Math.PI / 2) + (2 * Math.PI * k) / n;
    const ax = Math.cos(angle);
    const ay = Math.sin(angle);
    let anchor = 'south';
    if (ax > 0.4) anchor = ay > 0.4 ? 'south-west' : ay < -0.4 ? 'north-west' : 'west';
    else if (ax < -0.4) anchor = ay > 0.4 ? 'south-east' : ay < -0.4 ? 'north-east' : 'east';
    else anchor = ay >= 0 ? 'south' : 'north';
    const lx = parseFloat((v[0] + ax * 0.4).toFixed(3));
    const ly = parseFloat((v[1] + ay * 0.4).toFixed(3));
    return `  content((${lx}, ${ly}), [${labels[k] || String.fromCharCode(65 + k)}], anchor: "${anchor}")`;
  }).join('\n');

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  line(${lineArgs}, close: true, stroke: ${strokeWidth} + ${stroke})

${labelLines}
${showSides ? `  content((0, -${(radius + 0.4).toFixed(2)}), [a = ${sideLength}], anchor: "north")` : ''}
})`.trim();
}

// ==================== TỨ GIÁC MỞ RỘNG ====================

export function generateParallelogram(params) {
  const {
    width = 5, height = 3, angle = 60,
    labelA = 'A', labelB = 'B', labelC = 'C', labelD = 'D',
    showSides = true, showDiagonals = false,
    styleOptions = {}
  } = params;

  const angleRad = (angle * Math.PI) / 180;
  const shift = parseFloat((height / Math.tan(angleRad)).toFixed(4));

  const A = [0, 0];
  const B = [width, 0];
  const C = [parseFloat((width + shift).toFixed(4)), height];
  const D = [shift, height];

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  line((${A[0]}, ${A[1]}), (${B[0]}, ${B[1]}), (${C[0]}, ${C[1]}), (${D[0]}, ${D[1]}), close: true,
       stroke: ${strokeWidth} + ${stroke})

  ${showDiagonals ? `
  line((${A[0]}, ${A[1]}), (${C[0]}, ${C[1]}), stroke: gray, dash: "dashed")
  line((${B[0]}, ${B[1]}), (${D[0]}, ${D[1]}), stroke: gray, dash: "dashed")
  ` : ''}

  content((${A[0] - 0.3}, ${A[1]}), [${labelA}], anchor: "east")
  content((${B[0] + 0.3}, ${B[1]}), [${labelB}], anchor: "west")
  content((${C[0] + 0.3}, ${C[1]}), [${labelC}], anchor: "west")
  content((${D[0] - 0.3}, ${D[1]}), [${labelD}], anchor: "east")

  ${showSides ? `
  content((${width / 2}, -0.3), [${width.toFixed(1)}], anchor: "north")
  content((${D[0] + shift / 2 + 0.3}, ${height / 2}), [${parseFloat((height / Math.sin(angleRad)).toFixed(2))} ], anchor: "west")
  ` : ''}
})`.trim();
}

export function generateTrapezoid(params) {
  const {
    bottomWidth = 6, topWidth = 3, height = 3,
    labelA = 'A', labelB = 'B', labelC = 'C', labelD = 'D',
    showSides = true, showDiagonals = false,
    styleOptions = {}
  } = params;

  const offset = (bottomWidth - topWidth) / 2;
  const A = [0, 0];
  const B = [bottomWidth, 0];
  const C = [parseFloat((bottomWidth - offset).toFixed(4)), height];
  const D = [parseFloat(offset.toFixed(4)), height];

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  line((${A[0]}, ${A[1]}), (${B[0]}, ${B[1]}), (${C[0]}, ${C[1]}), (${D[0]}, ${D[1]}), close: true,
       stroke: ${strokeWidth} + ${stroke})

  ${showDiagonals ? `
  line((${A[0]}, ${A[1]}), (${C[0]}, ${C[1]}), stroke: gray, dash: "dashed")
  line((${B[0]}, ${B[1]}), (${D[0]}, ${D[1]}), stroke: gray, dash: "dashed")
  ` : ''}

  content((${A[0] - 0.3}, ${A[1]}), [${labelA}], anchor: "east")
  content((${B[0] + 0.3}, ${B[1]}), [${labelB}], anchor: "west")
  content((${C[0] + 0.3}, ${C[1]}), [${labelC}], anchor: "west")
  content((${D[0] - 0.3}, ${D[1]}), [${labelD}], anchor: "east")

  ${showSides ? `
  content((${bottomWidth / 2}, -0.3), [${bottomWidth.toFixed(1)}], anchor: "north")
  content((${(D[0] + C[0]) / 2}, ${height + 0.3}), [${topWidth.toFixed(1)}], anchor: "south")
  ` : ''}
})`.trim();
}

export function generateKite(params) {
  const {
    diagH = 5, diagW = 3, topRatio = 0.35,
    labelA = 'A', labelB = 'B', labelC = 'C', labelD = 'D',
    showDiagonals = false, showSides = true,
    styleOptions = {}
  } = params;

  const topY = parseFloat((diagH * topRatio).toFixed(4));
  const A = [0, diagH];
  const B = [diagW / 2, topY];
  const C = [0, 0];
  const D = [-diagW / 2, topY];

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  line((${A[0]}, ${A[1]}), (${B[0]}, ${B[1]}), (${C[0]}, ${C[1]}), (${D[0]}, ${D[1]}), close: true,
       stroke: ${strokeWidth} + ${stroke})

  ${showDiagonals ? `
  line((${A[0]}, ${A[1]}), (${C[0]}, ${C[1]}), stroke: gray, dash: "dashed")
  line((${B[0]}, ${B[1]}), (${D[0]}, ${D[1]}), stroke: gray, dash: "dashed")
  ` : ''}

  content((${A[0]}, ${A[1] + 0.3}), [${labelA}], anchor: "south")
  content((${B[0] + 0.3}, ${B[1]}), [${labelB}], anchor: "west")
  content((${C[0]}, ${C[1] - 0.3}), [${labelC}], anchor: "north")
  content((${D[0] - 0.3}, ${D[1]}), [${labelD}], anchor: "east")
})`.trim();
}

export function generateQuadrilateralGeneral(params) {
  const {
    ax = 0, ay = 0,
    bx = 5, by = 0,
    cx = 6, cy = 4,
    dx = 1, dy = 4,
    labelA = 'A', labelB = 'B', labelC = 'C', labelD = 'D',
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  line((${ax}, ${ay}), (${bx}, ${by}), (${cx}, ${cy}), (${dx}, ${dy}), close: true,
       stroke: ${strokeWidth} + ${stroke})

  content((${ax - 0.3}, ${ay}), [${labelA}], anchor: "east")
  content((${bx + 0.3}, ${by}), [${labelB}], anchor: "west")
  content((${cx + 0.3}, ${cy}), [${labelC}], anchor: "west")
  content((${dx - 0.3}, ${dy}), [${labelD}], anchor: "east")
})`.trim();
}

// ==================== TAM GIÁC VỚI ĐƯỜNG ĐẶC BIỆT ====================

function triangleVertices(sideA, sideB, sideC) {
  const B = [0, 0];
  const C = [sideA, 0];
  const cosB = (sideA * sideA + sideC * sideC - sideB * sideB) / (2 * sideA * sideC);
  const sinB = Math.sqrt(Math.max(0, 1 - cosB * cosB));
  const A = [sideC * cosB, sideC * sinB];
  return { A, B, C };
}

export function generateTriangleWithMedians(params) {
  const {
    sideA = 5, sideB = 4, sideC = 3,
    labelA = 'A', labelB = 'B', labelC = 'C',
    styleOptions = {}
  } = params;

  const { A, B, C } = triangleVertices(sideA, sideB, sideC);
  const mA = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2];
  const mB = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2];
  const mC = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  line((${B[0]}, ${B[1]}), (${C[0]}, ${C[1]}), (${A[0].toFixed(3)}, ${A[1].toFixed(3)}), close: true,
       stroke: ${strokeWidth} + ${stroke})

  // Đường trung tuyến
  line((${A[0].toFixed(3)}, ${A[1].toFixed(3)}), (${mA[0].toFixed(3)}, ${mA[1].toFixed(3)}), stroke: 1pt + blue, dash: "dashed")
  line((${B[0]}, ${B[1]}), (${mB[0].toFixed(3)}, ${mB[1].toFixed(3)}), stroke: 1pt + blue, dash: "dashed")
  line((${C[0]}, ${C[1]}), (${mC[0].toFixed(3)}, ${mC[1].toFixed(3)}), stroke: 1pt + blue, dash: "dashed")

  content((${A[0].toFixed(3)}, ${A[1].toFixed(3)}), [${labelA}], anchor: "south")
  content((${B[0]}, ${B[1]}), [${labelB}], anchor: "north-east")
  content((${C[0]}, ${C[1]}), [${labelC}], anchor: "north-west")
  content((${mA[0].toFixed(3)}, ${(mA[1] - 0.3).toFixed(3)}), [M#sub[a]], anchor: "north")
  content((${(mB[0] + 0.3).toFixed(3)}, ${mB[1].toFixed(3)}), [M#sub[b]], anchor: "west")
  content((${(mC[0] - 0.3).toFixed(3)}, ${mC[1].toFixed(3)}), [M#sub[c]], anchor: "east")
})`.trim();
}

export function generateTriangleWithAltitudes(params) {
  const {
    sideA = 5, sideB = 4, sideC = 3,
    labelA = 'A', labelB = 'B', labelC = 'C',
    styleOptions = {}
  } = params;

  const { A, B, C } = triangleVertices(sideA, sideB, sideC);

  // Foot of altitude from A to BC (BC is along x-axis)
  const hA = [A[0], 0];
  // Foot of altitude from B to AC
  const acDx = C[0] - A[0], acDy = C[1] - A[1];
  const tB = ((B[0] - A[0]) * acDx + (B[1] - A[1]) * acDy) / (acDx * acDx + acDy * acDy);
  const hB = [A[0] + tB * acDx, A[1] + tB * acDy];
  // Foot of altitude from C to AB
  const abDx = B[0] - A[0], abDy = B[1] - A[1];
  const tC = ((C[0] - A[0]) * abDx + (C[1] - A[1]) * abDy) / (abDx * abDx + abDy * abDy);
  const hC = [A[0] + tC * abDx, A[1] + tC * abDy];

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  line((${B[0]}, ${B[1]}), (${C[0]}, ${C[1]}), (${A[0].toFixed(3)}, ${A[1].toFixed(3)}), close: true,
       stroke: ${strokeWidth} + ${stroke})

  // Đường cao
  line((${A[0].toFixed(3)}, ${A[1].toFixed(3)}), (${hA[0].toFixed(3)}, ${hA[1].toFixed(3)}), stroke: 1pt + red, dash: "dashed")
  line((${B[0]}, ${B[1]}), (${hB[0].toFixed(3)}, ${hB[1].toFixed(3)}), stroke: 1pt + red, dash: "dashed")
  line((${C[0]}, ${C[1]}), (${hC[0].toFixed(3)}, ${hC[1].toFixed(3)}), stroke: 1pt + red, dash: "dashed")

  content((${A[0].toFixed(3)}, ${A[1].toFixed(3)}), [${labelA}], anchor: "south")
  content((${B[0]}, ${B[1]}), [${labelB}], anchor: "north-east")
  content((${C[0]}, ${C[1]}), [${labelC}], anchor: "north-west")
  content((${hA[0].toFixed(3)}, ${(hA[1] - 0.3).toFixed(3)}), [H#sub[a]], anchor: "north")
})`.trim();
}

export function generateTriangleWithBisectors(params) {
  const {
    sideA = 5, sideB = 4, sideC = 3,
    labelA = 'A', labelB = 'B', labelC = 'C',
    styleOptions = {}
  } = params;

  const { A, B, C } = triangleVertices(sideA, sideB, sideC);

  // Angle bisector foot from A: divides BC in ratio AB:AC = sideC:sideB
  const dA = [(sideC * C[0] + sideB * B[0]) / (sideB + sideC), (sideC * C[1] + sideB * B[1]) / (sideB + sideC)];
  // Angle bisector foot from B: divides AC in ratio BA:BC = sideC:sideA
  const dB = [(sideC * C[0] + sideA * A[0]) / (sideA + sideC), (sideC * C[1] + sideA * A[1]) / (sideA + sideC)];
  // Angle bisector foot from C: divides AB in ratio CA:CB = sideB:sideA
  const dC = [(sideB * B[0] + sideA * A[0]) / (sideA + sideB), (sideB * B[1] + sideA * A[1]) / (sideA + sideB)];

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  line((${B[0]}, ${B[1]}), (${C[0]}, ${C[1]}), (${A[0].toFixed(3)}, ${A[1].toFixed(3)}), close: true,
       stroke: ${strokeWidth} + ${stroke})

  // Đường phân giác
  line((${A[0].toFixed(3)}, ${A[1].toFixed(3)}), (${dA[0].toFixed(3)}, ${dA[1].toFixed(3)}), stroke: 1pt + green, dash: "dashed")
  line((${B[0]}, ${B[1]}), (${dB[0].toFixed(3)}, ${dB[1].toFixed(3)}), stroke: 1pt + green, dash: "dashed")
  line((${C[0]}, ${C[1]}), (${dC[0].toFixed(3)}, ${dC[1].toFixed(3)}), stroke: 1pt + green, dash: "dashed")

  content((${A[0].toFixed(3)}, ${A[1].toFixed(3)}), [${labelA}], anchor: "south")
  content((${B[0]}, ${B[1]}), [${labelB}], anchor: "north-east")
  content((${C[0]}, ${C[1]}), [${labelC}], anchor: "north-west")
})`.trim();
}

// ==================== ĐƯỜNG TRÒN MỞ RỘNG ====================

export function generateCircleSector(params) {
  const {
    radius = 3, sectorAngle = 60, startAngle = 0,
    labelO = 'O', labelA = 'A', labelB = 'B',
    showRadius = true,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  const startRad = (startAngle * Math.PI) / 180;
  const endRad = ((startAngle + sectorAngle) * Math.PI) / 180;
  const Ax = parseFloat((radius * Math.cos(startRad)).toFixed(4));
  const Ay = parseFloat((radius * Math.sin(startRad)).toFixed(4));
  const Bx = parseFloat((radius * Math.cos(endRad)).toFixed(4));
  const By = parseFloat((radius * Math.sin(endRad)).toFixed(4));

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *
  let O = (0, 0)

  // Hình quạt tròn
  arc(O, radius: ${radius}, start: ${startAngle}deg, stop: ${startAngle + sectorAngle}deg,
      mode: "PIE", stroke: ${strokeWidth} + ${stroke}, fill: blue.transparentize(85%))

  content(O, [${labelO}], anchor: "north-east")
  content((${(Ax * 1.15).toFixed(3)}, ${(Ay * 1.15).toFixed(3)}), [${labelA}], anchor: "west")
  content((${(Bx * 1.15).toFixed(3)}, ${(By * 1.15).toFixed(3)}), [${labelB}], anchor: "south")

  ${showRadius ? `
  content((${(Ax / 2).toFixed(3)}, ${(Ay / 2 - 0.2).toFixed(3)}), [R = ${radius}], anchor: "north")
  ` : ''}
})`.trim();
}

export function generateCircleSegment(params) {
  const {
    radius = 3, chordAngle = 60,
    labelO = 'O', labelA = 'A', labelB = 'B',
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  const halfAngle = chordAngle / 2;
  const halfRad = halfAngle * Math.PI / 180;
  const Ax = parseFloat((radius * Math.cos(-halfRad) * 1.15).toFixed(4));
  const Ay = parseFloat((radius * Math.sin(-halfRad) * 1.15).toFixed(4));
  const Bx = parseFloat((radius * Math.cos(halfRad) * 1.15).toFixed(4));
  const By = parseFloat((radius * Math.sin(halfRad) * 1.15).toFixed(4));

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Vẽ đường tròn (nét mờ)
  circle((0, 0), radius: ${radius}, stroke: 0.5pt + gray)

  // Hình viên phân (cung + dây cung)
  arc((0, 0), radius: ${radius}, start: ${-halfAngle}deg, stop: ${halfAngle}deg,
      mode: "CHORD", stroke: ${strokeWidth} + ${stroke}, fill: blue.transparentize(85%))

  content((0, 0), [${labelO}], anchor: "north-east")
  content((${Ax}, ${Ay}), [${labelA}], anchor: "north-west")
  content((${Bx}, ${By}), [${labelB}], anchor: "south-west")
})`.trim();
}

export function generateTwoCirclesTangentExternal(params) {
  const {
    radius1 = 2, radius2 = 1.5,
    labelO1 = 'O', labelO2 = "O'",
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  const dist = radius1 + radius2;
  const O1 = [0, 0];
  const O2 = [dist, 0];
  const T = [radius1, 0];

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  circle((${O1[0]}, ${O1[1]}), radius: ${radius1}, stroke: ${strokeWidth} + ${stroke})
  circle((${O2[0]}, ${O2[1]}), radius: ${radius2}, stroke: ${strokeWidth} + ${stroke})

  // Đường nối tâm
  line((${O1[0]}, ${O1[1]}), (${O2[0]}, ${O2[1]}), stroke: gray, dash: "dashed")

  // Tiếp điểm
  circle((${T[0]}, ${T[1]}), radius: 0.08, fill: ${stroke})

  content((${O1[0]}, ${O1[1]}), [${labelO1}], anchor: "north-east")
  content((${O2[0]}, ${O2[1]}), [${labelO2}], anchor: "north-west")
  content((${T[0]}, ${(T[1] - 0.3).toFixed(2)}), [T], anchor: "north")
})`.trim();
}

export function generateTwoCirclesTangentInternal(params) {
  const {
    radius1 = 3, radius2 = 1.5,
    labelO1 = 'O', labelO2 = "O'",
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  const dist = radius1 - radius2;
  const O2 = [dist, 0];
  const T = [radius1, 0];

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  circle((0, 0), radius: ${radius1}, stroke: ${strokeWidth} + ${stroke})
  circle((${O2[0]}, ${O2[1]}), radius: ${radius2}, stroke: ${strokeWidth} + ${stroke})

  // Đường nối tâm
  line((0, 0), (${O2[0]}, ${O2[1]}), stroke: gray, dash: "dashed")

  // Tiếp điểm
  circle((${T[0]}, ${T[1]}), radius: 0.08, fill: ${stroke})

  content((0, 0), [${labelO1}], anchor: "north-east")
  content((${O2[0]}, ${O2[1]}), [${labelO2}], anchor: "north-west")
  content((${T[0]}, ${(T[1] - 0.3).toFixed(2)}), [T], anchor: "north")
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
