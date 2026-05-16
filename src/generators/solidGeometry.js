// Generator cho hình học không gian

// ==================== HÌNH CHÓP ====================

export function generatePyramid(params) {
  const {
    baseType = 'triangular', // 'triangular' hoặc 'square'
    baseSize,
    height,
    perspective = 'Trước',
    labelS = 'S',
    labelA = 'A', labelB = 'B', labelC = 'C', labelD = 'D',
    showHiddenEdges = true,
    showHeight = false,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  if (baseType === 'triangular') {
    return generateTriangularPyramid({
      baseSize, height, perspective,
      labelS, labelA, labelB, labelC,
      showHiddenEdges, showHeight,
      stroke, strokeWidth
    });
  } else {
    return generateSquarePyramid({
      baseSize, height, perspective,
      labelS, labelA, labelB, labelC, labelD,
      showHiddenEdges, showHeight,
      stroke, strokeWidth
    });
  }
}

function generateTriangularPyramid(params) {
  const {
    baseSize, height, perspective,
    labelS, labelA, labelB, labelC,
    showHiddenEdges, showHeight,
    stroke, strokeWidth
  } = params;

  // Tọa độ phối cảnh (projection 3D -> 2D)
  const perspectiveAngle = perspective === 'Trái' ? -0.5 : perspective === 'Phải' ? 0.5 : 0;

  // Đáy tam giác đều
  const baseHeight = (baseSize * Math.sqrt(3)) / 2;
  const A = [baseSize / 2 + perspectiveAngle, 0];
  const B = [0 + perspectiveAngle, 0];
  const C = [baseSize + perspectiveAngle, 0];

  // Đỉnh S
  const S = [baseSize / 2 + perspectiveAngle * 0.5, height];

  // Tâm đáy (để vẽ đường cao)
  const H = [baseSize / 2 + perspectiveAngle, 0];

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Đáy tam giác (cạnh phía sau - vẽ trước)
  ${showHiddenEdges ? `line((${A[0]}, ${A[1]}), (${C[0]}, ${C[1]}), stroke: ${strokeWidth} + ${stroke}, dash: "dashed")` : ''}

  // Các cạnh bên
  line((${S[0]}, ${S[1]}), (${A[0]}, ${A[1]}), stroke: ${strokeWidth} + ${stroke})
  line((${S[0]}, ${S[1]}), (${B[0]}, ${B[1]}), stroke: ${strokeWidth} + ${stroke})
  line((${S[0]}, ${S[1]}), (${C[0]}, ${C[1]}), stroke: ${strokeWidth} + ${stroke})

  // Đáy tam giác (cạnh phía trước)
  line((${A[0]}, ${A[1]}), (${B[0]}, ${B[1]}), stroke: ${strokeWidth} + ${stroke})
  line((${B[0]}, ${B[1]}), (${C[0]}, ${C[1]}), stroke: ${strokeWidth} + ${stroke})

  ${showHeight ? `
  // Đường cao
  line((${S[0]}, ${S[1]}), (${H[0]}, ${H[1]}), stroke: gray, dash: "dashed")
  circle((${H[0]}, ${H[1]}), radius: 0.05, fill: gray)
  content((${H[0] - 0.3}, ${H[1]}), [H], anchor: "east")
  ` : ''}

  // Nhãn
  content((${S[0]}, ${S[1]}), [${labelS}], anchor: "south")
  content((${A[0]}, ${A[1]}), [${labelA}], anchor: "north")
  content((${B[0]}, ${B[1]}), [${labelB}], anchor: "north-east")
  content((${C[0]}, ${C[1]}), [${labelC}], anchor: "north-west")
})`.trim();
}

function generateSquarePyramid(params) {
  const {
    baseSize, height, perspective,
    labelS, labelA, labelB, labelC, labelD,
    showHiddenEdges, showHeight,
    stroke, strokeWidth
  } = params;

  // Tọa độ phối cảnh
  const perspectiveRatio = 0.6; // Tỷ lệ phối cảnh
  const offsetX = perspective === 'Trái' ? -1 : perspective === 'Phải' ? 1 : 0;
  const offsetY = 0.5;

  // Đáy hình vuông (phối cảnh)
  const A = [0, 0];
  const B = [baseSize, 0];
  const C = [baseSize + offsetX * perspectiveRatio, offsetY * perspectiveRatio];
  const D = [offsetX * perspectiveRatio, offsetY * perspectiveRatio];

  // Đỉnh S
  const S = [baseSize / 2 + offsetX * perspectiveRatio / 2, height + offsetY * perspectiveRatio / 2];

  // Tâm đáy
  const H = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2];

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Cạnh khuất của đáy
  ${showHiddenEdges ? `
  line((${A[0]}, ${A[1]}), (${D[0]}, ${D[1]}), stroke: ${strokeWidth} + ${stroke}, dash: "dashed")
  line((${D[0]}, ${D[1]}), (${C[0]}, ${C[1]}), stroke: ${strokeWidth} + ${stroke}, dash: "dashed")
  ` : ''}

  // Cạnh bên khuất
  ${showHiddenEdges ? `line((${S[0]}, ${S[1]}), (${D[0]}, ${D[1]}), stroke: ${strokeWidth} + ${stroke}, dash: "dashed")` : ''}

  // Đáy hình vuông (cạnh nhìn thấy)
  line((${A[0]}, ${A[1]}), (${B[0]}, ${B[1]}), stroke: ${strokeWidth} + ${stroke})
  line((${B[0]}, ${B[1]}), (${C[0]}, ${C[1]}), stroke: ${strokeWidth} + ${stroke})
  line((${C[0]}, ${C[1]}), (${A[0]}, ${A[1]}), stroke: ${strokeWidth} + ${stroke})

  // Các cạnh bên nhìn thấy
  line((${S[0]}, ${S[1]}), (${A[0]}, ${A[1]}), stroke: ${strokeWidth} + ${stroke})
  line((${S[0]}, ${S[1]}), (${B[0]}, ${B[1]}), stroke: ${strokeWidth} + ${stroke})
  line((${S[0]}, ${S[1]}), (${C[0]}, ${C[1]}), stroke: ${strokeWidth} + ${stroke})

  ${showHeight ? `
  // Đường cao
  line((${S[0]}, ${S[1]}), (${H[0]}, ${H[1]}), stroke: gray, dash: "dashed")
  circle((${H[0]}, ${H[1]}), radius: 0.05, fill: gray)
  content((${H[0] - 0.3}, ${H[1]}), [H], anchor: "east")
  ` : ''}

  // Nhãn
  content((${S[0]}, ${S[1]}), [${labelS}], anchor: "south")
  content((${A[0]}, ${A[1]}), [${labelA}], anchor: "north-east")
  content((${B[0]}, ${B[1]}), [${labelB}], anchor: "north-west")
  content((${C[0]}, ${C[1]}), [${labelC}], anchor: "south-west")
  content((${D[0]}, ${D[1]}), [${labelD}], anchor: "south-east")
})`.trim();
}

// ==================== LĂNG TRỤ ====================

export function generatePrism(params) {
  const {
    baseType = 'triangular',
    baseSize,
    height,
    perspective = 'Trước',
    showHiddenEdges = true,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  // Tọa độ phối cảnh
  const perspectiveRatio = 0.5;
  const offsetX = perspective === 'Trái' ? -1 : perspective === 'Phải' ? 1 : 0.5;
  const offsetY = 0.5;

  if (baseType === 'triangular') {
    const baseW = baseSize;
    // Đáy dưới
    const A = [0, 0];
    const B = [baseW, 0];
    const C = [baseW / 2, (baseW * Math.sqrt(3)) / 2];

    // Đáy trên (dịch lên và phối cảnh)
    const A1 = [offsetX * perspectiveRatio, height + offsetY * perspectiveRatio];
    const B1 = [baseW + offsetX * perspectiveRatio, height + offsetY * perspectiveRatio];
    const C1 = [baseW / 2 + offsetX * perspectiveRatio, (baseW * Math.sqrt(3)) / 2 + height + offsetY * perspectiveRatio];

    return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Đáy dưới
  line((${A[0]}, ${A[1]}), (${B[0]}, ${B[1]}), (${C[0]}, ${C[1]}), close: true, stroke: ${strokeWidth} + ${stroke})

  // Cạnh bên khuất
  ${showHiddenEdges ? `line((${A[0]}, ${A[1]}), (${A1[0]}, ${A1[1]}), stroke: ${strokeWidth} + ${stroke}, dash: "dashed")` : ''}

  // Đáy trên (cạnh khuất)
  ${showHiddenEdges ? `line((${A1[0]}, ${A1[1]}), (${C1[0]}, ${C1[1]}), stroke: ${strokeWidth} + ${stroke}, dash: "dashed")` : ''}

  // Đáy trên (cạnh nhìn thấy)
  line((${A1[0]}, ${A1[1]}), (${B1[0]}, ${B1[1]}), stroke: ${strokeWidth} + ${stroke})
  line((${B1[0]}, ${B1[1]}), (${C1[0]}, ${C1[1]}), stroke: ${strokeWidth} + ${stroke})

  // Cạnh bên nhìn thấy
  line((${B[0]}, ${B[1]}), (${B1[0]}, ${B1[1]}), stroke: ${strokeWidth} + ${stroke})
  line((${C[0]}, ${C[1]}), (${C1[0]}, ${C1[1]}), stroke: ${strokeWidth} + ${stroke})

  // Nhãn
  content((${A[0]}, ${A[1]}), [A], anchor: "north-east")
  content((${B[0]}, ${B[1]}), [B], anchor: "north-west")
  content((${C[0]}, ${C[1]}), [C], anchor: "south")
  content((${A1[0]}, ${A1[1]}), [A'], anchor: "south-east")
  content((${B1[0]}, ${B1[1]}), [B'], anchor: "south-west")
  content((${C1[0]}, ${C1[1]}), [C'], anchor: "north")
})`.trim();
  }

  // Lăng trụ lục giác
  if (baseType === 'hexagonal') {
    const hexR = baseSize / 1.732; // inradius -> circumradius
    const hexVerts = [];
    for (let k = 0; k < 6; k++) {
      const ang = (Math.PI / 6) + (Math.PI / 3) * k;
      hexVerts.push([
        parseFloat((hexR * Math.cos(ang)).toFixed(4)),
        parseFloat((hexR * Math.sin(ang)).toFixed(4))
      ]);
    }

    const topVerts = hexVerts.map(v => [
      parseFloat((v[0] + offsetX * perspectiveRatio).toFixed(4)),
      parseFloat((v[1] + height + offsetY * perspectiveRatio).toFixed(4))
    ]);

    const botLines = hexVerts.map(v => `(${v[0]}, ${v[1]})`).join(', ');
    const topLines = topVerts.map(v => `(${v[0]}, ${v[1]})`).join(', ');
    const labels = ['A', 'B', 'C', 'D', 'E', 'F'];

    const verticalEdges = hexVerts.map((v, i) => {
      const visible = i < 4;
      const dash = visible ? '' : ', dash: "dashed"';
      return `  line((${v[0]}, ${v[1]}), (${topVerts[i][0]}, ${topVerts[i][1]}), stroke: ${strokeWidth} + ${stroke}${dash})`;
    }).join('\n');

    const botLabelLines = hexVerts.map((v, i) => {
      const ang = (Math.PI / 6) + (Math.PI / 3) * i;
      const lx = parseFloat((v[0] + Math.cos(ang) * 0.35).toFixed(3));
      const ly = parseFloat((v[1] + Math.sin(ang) * 0.35).toFixed(3));
      const dash = i < 3 ? '' : ', dash: "dashed"';
      return `  content((${lx}, ${ly}), [${labels[i]}], anchor: "center")`;
    }).join('\n');

    return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Đáy dưới
  line(${botLines}, close: true, stroke: ${strokeWidth} + ${stroke})

  // Đáy trên
  line(${topLines}, close: true, stroke: ${strokeWidth} + ${stroke})

  // Cạnh bên
${verticalEdges}

  // Nhãn
${botLabelLines}
})`.trim();
  }

  return '';
}

export function generateCube(params) {
  const {
    side,
    perspective = 'Trước',
    labelA = 'A', labelB = 'B', labelC = 'C', labelD = 'D',
    showHiddenEdges = true,
    showDiagonals = false,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  // Tọa độ phối cảnh
  const perspectiveRatio = 0.5;
  const offsetX = 1 * perspectiveRatio;
  const offsetY = 0.5 * perspectiveRatio;

  // Mặt trước (đáy)
  const A = [0, 0];
  const B = [side, 0];
  const C = [side, side];
  const D = [0, side];

  // Mặt sau (đỉnh)
  const A1 = [offsetX, offsetY];
  const B1 = [side + offsetX, offsetY];
  const C1 = [side + offsetX, side + offsetY];
  const D1 = [offsetX, side + offsetY];

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Mặt trước
  rect((${A[0]}, ${A[1]}), (${C[0]}, ${C[1]}), stroke: ${strokeWidth} + ${stroke})

  // Cạnh khuất
  ${showHiddenEdges ? `
  line((${A[0]}, ${A[1]}), (${A1[0]}, ${A1[1]}), stroke: ${strokeWidth} + ${stroke}, dash: "dashed")
  line((${D[0]}, ${D[1]}), (${D1[0]}, ${D1[1]}), stroke: ${strokeWidth} + ${stroke}, dash: "dashed")
  rect((${A1[0]}, ${A1[1]}), (${C1[0]}, ${C1[1]}), stroke: ${strokeWidth} + ${stroke}, dash: "dashed")
  ` : ''}

  // Cạnh nhìn thấy
  line((${B[0]}, ${B[1]}), (${B1[0]}, ${B1[1]}), stroke: ${strokeWidth} + ${stroke})
  line((${C[0]}, ${C[1]}), (${C1[0]}, ${C1[1]}), stroke: ${strokeWidth} + ${stroke})

  ${showDiagonals ? `
  // Đường chéo
  line((${A[0]}, ${A[1]}), (${C1[0]}, ${C1[1]}), stroke: 0.5pt + ${stroke} , dash: "dotted")
  ` : ''}

  // Nhãn
  content((${A[0]}, ${A[1]}), [${labelA}], anchor: "north-east")
  content((${B[0]}, ${B[1]}), [${labelB}], anchor: "north-west")
  content((${C[0]}, ${C[1]}), [${labelC}], anchor: "south-west")
  content((${D[0]}, ${D[1]}), [${labelD}], anchor: "south-east")
})`.trim();
}

// ==================== HÌNH TRÒN XOAY ====================

export function generateCylinder(params) {
  const {
    radius,
    height,
    perspective = 'Nghiêng',
    showAxis = true,
    showHiddenLines = true,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  // Tỷ lệ phối cảnh cho ellipse
  const ellipseRatio = perspective === 'Nghiêng' ? 0.3 : 0.1;

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  let r = ${radius}
  let h = ${height}
  let ratio = ${ellipseRatio}

  // Đáy dưới (ellipse)
  arc((0, 0), start: 0deg, stop: 180deg, radius: (r, r * ratio), stroke: ${strokeWidth} + ${stroke})
  ${showHiddenLines ? `arc((0, 0), start: 180deg, stop: 360deg, radius: (r, r * ratio), stroke: ${strokeWidth} + ${stroke}, dash: "dashed")` : ''}

  // Đường sinh
  line((-r, 0), (-r, h), stroke: ${strokeWidth} + ${stroke})
  line((r, 0), (r, h), stroke: ${strokeWidth} + ${stroke})

  // Đáy trên (ellipse)
  arc((0, h), start: 0deg, stop: 360deg, radius: (r, r * ratio), stroke: ${strokeWidth} + ${stroke})

  ${showAxis ? `
  // Trục
  line((0, 0), (0, h), stroke: gray, dash: "dashed")
  content((0, h/2), [h = ${height.toFixed(1)}], anchor: "west")
  ` : ''}

  // Nhãn
  content((0, -r * ratio - 0.3), [O], anchor: "north")
  content((0, h + r * ratio + 0.3), [O'], anchor: "south")
})`.trim();
}

export function generateCone(params) {
  const {
    radius,
    height,
    perspective = 'Nghiêng',
    labelS = 'S',
    labelO = 'O',
    showAxis = true,
    showGeneratrix = true,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  const ellipseRatio = perspective === 'Nghiêng' ? 0.3 : 0.1;

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  let r = ${radius}
  let h = ${height}
  let ratio = ${ellipseRatio}
  let S = (0, h)
  let O = (0, 0)

  // Đáy (ellipse)
  arc(O, start: 0deg, stop: 180deg, radius: (r, r * ratio), stroke: ${strokeWidth} + ${stroke})
  arc(O, start: 180deg, stop: 360deg, radius: (r, r * ratio), stroke: ${strokeWidth} + ${stroke}, dash: "dashed")

  // Đường sinh
  line(S, (-r, 0), stroke: ${strokeWidth} + ${stroke})
  line(S, (r, 0), stroke: ${strokeWidth} + ${stroke})

  ${showAxis ? `
  // Trục (đường cao)
  line(O, S, stroke: gray, dash: "dashed")
  ` : ''}

  ${showGeneratrix ? `
  // Đường sinh mẫu
  line(S, (r, 0), stroke: ${strokeWidth} + ${stroke})
  ` : ''}

  // Nhãn
  content(S, [${labelS}], anchor: "south")
  content(O, [${labelO}], anchor: "north-east")
})`.trim();
}

export function generateSphere(params) {
  const {
    radius,
    labelO = 'O',
    showGreatCircle = true,
    showAxis = false,
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
  let r = ${radius}

  // Hình cầu (đường tròn chính)
  circle(O, radius: r, stroke: ${strokeWidth} + ${stroke})

  ${showGreatCircle ? `
  // Đường tròn lớn (ellipse phối cảnh)
  arc(O, start: 0deg, stop: 360deg, radius: (r, r * 0.3), stroke: ${strokeWidth} + ${stroke}, dash: "dashed")
  ` : ''}

  ${showAxis ? `
  // Trục
  line((0, -r), (0, r), stroke: gray, dash: "dashed")
  ` : ''}

  // Tâm
  circle(O, radius: 0.05, fill: ${stroke})

  // Nhãn
  content(O, [${labelO}], anchor: "north-east")
  content((r + 0.3, 0), [R = ${radius.toFixed(1)}], anchor: "west")
})`.trim();
}

// ==================== MẶT PHẲNG & ĐƯỜNG THẲNG TRONG KHÔNG GIAN ====================

export function generatePlaneBasic(params) {
  const {
    planeName = 'α',
    showLabels = false,
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

  // Mặt phẳng (parallelogram phối cảnh)
  line((-3, -0.5), (3, -0.5), (2.2, 1.2), (-2.2, 1.2), close: true,
       stroke: ${strokeWidth} + ${stroke})

  // Nhãn mặt phẳng
  content((2.4, 1.3), [$(${planeName})$], anchor: "south-west")

  ${showLabels ? `
  content((-3.2, -0.5), [${labelA}], anchor: "east")
  content((3.2, -0.5), [${labelB}], anchor: "west")
  content((2.4, 1.2), [${labelC}], anchor: "west")
  content((-2.4, 1.2), [${labelD}], anchor: "east")
  ` : ''}
})`.trim();
}

export function generateLinePlaneIntersect(params) {
  const {
    planeName = 'α',
    lineName = 'd',
    intersectLabel = 'A',
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Mặt phẳng
  line((-3, -0.3), (3, -0.3), (2.2, 1.4), (-2.2, 1.4), close: true,
       stroke: ${strokeWidth} + ${stroke})

  // Phần đường thẳng phía dưới mặt phẳng
  line((0.4, -1.8), (0.15, 0.55), stroke: ${strokeWidth} + ${stroke})

  // Phần đường thẳng phía trên mặt phẳng
  line((0.15, 0.55), (-0.4, 2.6), mark: (end: ">"), stroke: ${strokeWidth} + ${stroke})

  // Điểm giao
  circle((0.15, 0.55), radius: 0.08, fill: ${stroke})

  // Nhãn
  content((2.4, 1.5), [$(${planeName})$], anchor: "south-west")
  content((-0.6, 2.6), [${lineName}], anchor: "south")
  content((0.35, 0.55), [${intersectLabel}], anchor: "west")
})`.trim();
}

export function generateTwoPlanesIntersect(params) {
  const {
    plane1Name = 'α',
    plane2Name = 'β',
    intersectLineName = 'd',
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Mặt phẳng α (trái)
  line((-4, -0.5), (0, -1), (0, 1.5), (-3, 1.8), close: true,
       stroke: ${strokeWidth} + ${stroke})

  // Mặt phẳng β (phải)
  line((0, -1), (4, -0.5), (3, 1.8), (0, 1.5), close: true,
       stroke: ${strokeWidth} + ${stroke})

  // Giao tuyến
  line((0, -1.5), (0, 2.2), stroke: 1.5pt + ${stroke})

  // Nhãn
  content((-3.2, 1.8), [$(${plane1Name})$], anchor: "east")
  content((3.2, 1.8), [$(${plane2Name})$], anchor: "west")
  content((0.3, 2.2), [${intersectLineName}], anchor: "west")
})`.trim();
}

// ==================== HÌNH CHÓP CỤT ====================

export function generateTruncatedPyramid(params) {
  const {
    baseSize = 5, topSize = 2.5, height = 4,
    perspective = 'Trước',
    labelA = 'A', labelB = 'B', labelC = 'C', labelD = 'D',
    labelA1 = "A'", labelB1 = "B'", labelC1 = "C'", labelD1 = "D'",
    showHiddenEdges = true,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  const pRatio = 0.5;
  const offX = perspective === 'Trái' ? -1 : perspective === 'Phải' ? 1 : 0;
  const offY = 0.5;

  // Đáy lớn (phía dưới)
  const A = [0, 0];
  const B = [baseSize, 0];
  const C = [baseSize + offX * pRatio, offY * pRatio];
  const D = [offX * pRatio, offY * pRatio];

  // Tâm đáy lớn
  const cx = (A[0] + C[0]) / 2;
  const cy = (A[1] + C[1]) / 2;

  // Đáy nhỏ (phía trên), căn giữa so với đáy lớn
  const shift = (baseSize - topSize) / 2;
  const A1 = [shift + offX * pRatio * 0.5, height + offY * pRatio * 0.5];
  const B1 = [shift + topSize + offX * pRatio * 0.5, height + offY * pRatio * 0.5];
  const C1 = [shift + topSize + offX * pRatio, height + offY * pRatio];
  const D1 = [shift + offX * pRatio, height + offY * pRatio];

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Cạnh khuất đáy lớn
  ${showHiddenEdges ? `
  line((${A[0]}, ${A[1]}), (${D[0]}, ${D[1]}), stroke: ${strokeWidth} + ${stroke}, dash: "dashed")
  line((${D[0]}, ${D[1]}), (${C[0]}, ${C[1]}), stroke: ${strokeWidth} + ${stroke}, dash: "dashed")
  ` : ''}

  // Đáy lớn (cạnh nhìn thấy)
  line((${A[0]}, ${A[1]}), (${B[0]}, ${B[1]}), stroke: ${strokeWidth} + ${stroke})
  line((${B[0]}, ${B[1]}), (${C[0]}, ${C[1]}), stroke: ${strokeWidth} + ${stroke})

  // Đáy nhỏ
  line((${A1[0]}, ${A1[1]}), (${B1[0]}, ${B1[1]}), stroke: ${strokeWidth} + ${stroke})
  line((${B1[0]}, ${B1[1]}), (${C1[0]}, ${C1[1]}), stroke: ${strokeWidth} + ${stroke})
  line((${C1[0]}, ${C1[1]}), (${D1[0]}, ${D1[1]}), stroke: ${strokeWidth} + ${stroke})
  ${showHiddenEdges ? `line((${D1[0]}, ${D1[1]}), (${A1[0]}, ${A1[1]}), stroke: ${strokeWidth} + ${stroke}, dash: "dashed")` : `line((${D1[0]}, ${D1[1]}), (${A1[0]}, ${A1[1]}), stroke: ${strokeWidth} + ${stroke})`}

  // Cạnh bên nhìn thấy
  line((${A[0]}, ${A[1]}), (${A1[0]}, ${A1[1]}), stroke: ${strokeWidth} + ${stroke})
  line((${B[0]}, ${B[1]}), (${B1[0]}, ${B1[1]}), stroke: ${strokeWidth} + ${stroke})
  line((${C[0]}, ${C[1]}), (${C1[0]}, ${C1[1]}), stroke: ${strokeWidth} + ${stroke})

  // Cạnh bên khuất
  ${showHiddenEdges ? `line((${D[0]}, ${D[1]}), (${D1[0]}, ${D1[1]}), stroke: ${strokeWidth} + ${stroke}, dash: "dashed")` : ''}

  // Nhãn đáy lớn
  content((${A[0] - 0.3}, ${A[1]}), [${labelA}], anchor: "east")
  content((${B[0] + 0.3}, ${B[1]}), [${labelB}], anchor: "west")
  content((${C[0] + 0.3}, ${C[1]}), [${labelC}], anchor: "west")
  content((${D[0] - 0.3}, ${D[1]}), [${labelD}], anchor: "east")

  // Nhãn đáy nhỏ
  content((${A1[0] - 0.3}, ${A1[1]}), [${labelA1}], anchor: "east")
  content((${B1[0] + 0.3}, ${B1[1]}), [${labelB1}], anchor: "west")
  content((${C1[0] + 0.3}, ${C1[1]}), [${labelC1}], anchor: "west")
  content((${D1[0] - 0.3}, ${D1[1]}), [${labelD1}], anchor: "east")
})`.trim();
}

// ==================== HÌNH NÓN CỤT ====================

export function generateTruncatedCone(params) {
  const {
    radiusBottom = 3, radiusTop = 1.5, height = 5,
    perspective = 'Nghiêng',
    labelO = 'O', labelO1 = "O'",
    showAxis = true,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  const ratio = perspective === 'Nghiêng' ? 0.3 : 0.1;
  const r1 = Number(radiusBottom);
  const r2 = Number(radiusTop);
  const h = Number(height);

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  let r1 = ${r1}
  let r2 = ${r2}
  let h = ${h}
  let ratio = ${ratio}

  // Đáy dưới (ellipse)
  arc((0, 0), start: 0deg, stop: 180deg, radius: (r1, r1 * ratio), stroke: ${strokeWidth} + ${stroke})
  arc((0, 0), start: 180deg, stop: 360deg, radius: (r1, r1 * ratio), stroke: ${strokeWidth} + ${stroke}, dash: "dashed")

  // Đáy trên (ellipse nhỏ hơn)
  arc((0, h), start: 0deg, stop: 360deg, radius: (r2, r2 * ratio), stroke: ${strokeWidth} + ${stroke})

  // Đường sinh
  line((-r1, 0), (-r2, h), stroke: ${strokeWidth} + ${stroke})
  line((r1, 0), (r2, h), stroke: ${strokeWidth} + ${stroke})

  ${showAxis ? `
  // Trục
  line((0, 0), (0, h), stroke: gray, dash: "dashed")
  content((0.3, h / 2), [h = ${h.toFixed(1)}], anchor: "west")
  content((r1 / 2 + 0.2, -r1 * ratio - 0.3), [R = ${r1.toFixed(1)}], anchor: "north")
  content((r2 / 2 + 0.2, h + r2 * ratio + 0.2), [r = ${r2.toFixed(1)}], anchor: "south")
  ` : ''}

  // Nhãn tâm
  content((0, -r1 * ratio - 0.4), [${labelO}], anchor: "north")
  content((0, h + r2 * ratio + 0.4), [${labelO1}], anchor: "south")
})`.trim();
}

// ==================== MẶT CẮT HÌNH CẦU ====================

export function generateSphereSection(params) {
  const {
    radius = 3, sectionHeight = 1,
    labelO = 'O',
    showAxis = true,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  const r = Number(radius);
  const h = Number(sectionHeight);
  // Bán kính mặt cắt: r_cut = sqrt(r² - h²)
  const rCut = parseFloat(Math.sqrt(Math.max(0, r * r - h * h)).toFixed(4));

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  let O = (0, 0)
  let r = ${r}

  // Hình cầu
  circle(O, radius: r, stroke: ${strokeWidth} + ${stroke})

  // Đường tròn lớn (mặt phẳng xích đạo, nét đứt)
  arc(O, start: 0deg, stop: 360deg, radius: (r, r * 0.3), stroke: 0.8pt + gray, dash: "dashed")

  // Mặt cắt tại chiều cao h = ${h.toFixed(2)}
  arc((0, ${h}), start: 0deg, stop: 180deg, radius: (${rCut}, ${rCut} * 0.3), stroke: ${strokeWidth} + blue)
  arc((0, ${h}), start: 180deg, stop: 360deg, radius: (${rCut}, ${rCut} * 0.3), stroke: ${strokeWidth} + blue, dash: "dashed")

  // Bán kính mặt cắt
  line((0, ${h}), (${rCut}, ${h}), stroke: gray, dash: "dashed")
  content((${rCut / 2}, ${h + 0.25}), [r' = ${rCut.toFixed(2)}], anchor: "south")

  // Đường từ tâm đến mặt cắt
  line((0, 0), (0, ${h}), stroke: gray, dash: "dashed")
  content((0.25, ${h / 2}), [h = ${h.toFixed(1)}], anchor: "west")

  // Tâm
  circle(O, radius: 0.06, fill: ${stroke})

  // Nhãn
  content((0, 0), [${labelO}], anchor: "north-east")
  content((r + 0.3, 0), [R = ${r.toFixed(1)}], anchor: "west")
})`.trim();
}

export function generateLinePerpendicularPlane(params) {
  const {
    planeName = 'α',
    lineName = 'd',
    footLabel = 'H',
    showFoot = true,
    styleOptions = {}
  } = params;

  const stroke = styleOptions.strokeColor || 'black';
  const sw = styleOptions.strokeWidth;
  const strokeWidth = sw ? (typeof sw === 'string' ? sw : `${sw}pt`) : '1.5pt';

  return `#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  // Mặt phẳng α
  line((-3, -0.5), (3, -0.5), (2.2, 0.8), (-2.2, 0.8), close: true,
       stroke: ${strokeWidth} + ${stroke})

  // Đường thẳng vuông góc
  line((0, 0.15), (0, 3.5), stroke: ${strokeWidth} + ${stroke})

  // Ký hiệu góc vuông tại chân
  line((0.25, 0.15), (0.25, 0.4), (0, 0.4), stroke: 0.7pt + ${stroke})

  ${showFoot ? `
  circle((0, 0.15), radius: 0.07, fill: ${stroke})
  content((0.3, 0.1), [${footLabel}], anchor: "west")
  ` : ''}

  // Nhãn
  content((2.4, 0.9), [$(${planeName})$], anchor: "south-west")
  content((0.25, 3.5), [${lineName}], anchor: "west")
})`.trim();
}
