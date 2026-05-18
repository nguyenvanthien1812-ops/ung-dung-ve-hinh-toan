// Generator cho hình Vật lý
import { buildStroke, buildFill, TYPST_HEADER } from './utils.js';

// ==================== LỰC HỌC ====================

export function generateInclinedPlane(params) {
  const {
    angle = 30, length = 7,
    labelAngle = 'α',
    showForces = true,
    showNormal = true, showFriction = false,
    showAngleLabel = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const rad = angle * Math.PI / 180;
  const cosA = parseFloat(Math.cos(rad).toFixed(4));
  const sinA = parseFloat(Math.sin(rad).toFixed(4));

  // Tam giác mặt phẳng nghiêng
  const O = [0, 0];
  const B = [parseFloat((length * cosA).toFixed(4)), 0];
  const C = [parseFloat((length * cosA).toFixed(4)), parseFloat((length * sinA).toFixed(4))];

  // Vật (box) tại giữa mặt nghiêng
  const boxW = 0.8, boxH = 0.6;
  const midFrac = 0.5;
  const bx = parseFloat((length * midFrac * cosA).toFixed(4));
  const by = parseFloat((length * midFrac * sinA).toFixed(4));

  // 4 góc hộp (theo phương song song và vuông góc với mặt nghiêng)
  const bx0 = parseFloat((bx - boxW / 2 * cosA + boxH / 2 * sinA).toFixed(4));
  const by0 = parseFloat((by - boxW / 2 * sinA - boxH / 2 * cosA).toFixed(4));
  const bx1 = parseFloat((bx + boxW / 2 * cosA + boxH / 2 * sinA).toFixed(4));
  const by1 = parseFloat((by + boxW / 2 * sinA - boxH / 2 * cosA).toFixed(4));
  const bx2 = parseFloat((bx + boxW / 2 * cosA - boxH / 2 * sinA).toFixed(4));
  const by2 = parseFloat((by + boxW / 2 * sinA + boxH / 2 * cosA).toFixed(4));
  const bx3 = parseFloat((bx - boxW / 2 * cosA - boxH / 2 * sinA).toFixed(4));
  const by3 = parseFloat((by - boxW / 2 * sinA + boxH / 2 * cosA).toFixed(4));

  // Tâm hộp (giữa)
  const cx = bx, cy = by;

  // Lực trọng trường (thẳng đứng xuống)
  const wLen = 1.5;
  const wx2 = parseFloat((cx).toFixed(4));
  const wy2 = parseFloat((cy - wLen).toFixed(4));

  // Lực pháp tuyến (vuông góc mặt nghiêng, hướng ra ngoài)
  const nLen = 1.5;
  const nx2 = parseFloat((cx - nLen * sinA).toFixed(4));
  const ny2 = parseFloat((cy + nLen * cosA).toFixed(4));

  // Lực ma sát (dọc theo mặt nghiêng, hướng lên)
  const fLen = 1.0;
  const fx2 = parseFloat((cx - fLen * cosA).toFixed(4));
  const fy2 = parseFloat((cy - fLen * sinA).toFixed(4));

  return `${TYPST_HEADER}

#canvas({
  import draw: *

  // Mặt phẳng nghiêng (tam giác)
  line((${O[0]}, ${O[1]}), (${B[0]}, ${B[1]}), (${C[0]}, ${C[1]}), close: true,
       stroke: ${strokeStr})

  // Vật thể (hộp)
  line((${bx0}, ${by0}), (${bx1}, ${by1}), (${bx2}, ${by2}), (${bx3}, ${by3}), close: true,
       stroke: ${strokeStr}, fill: blue.transparentize(80%))

  ${showForces ? `
  // Trọng lực P (thẳng đứng xuống)
  line((${cx}, ${cy}), (${wx2}, ${wy2}), mark: (end: ">"), stroke: 1.5pt + red)
  content((${wx2}, ${wy2 - 0.2}), [$arrow(P)$], anchor: "north")
  ` : ''}

  ${showNormal ? `
  // Lực pháp tuyến N (vuông góc mặt phẳng)
  line((${cx}, ${cy}), (${nx2}, ${ny2}), mark: (end: ">"), stroke: 1.5pt + blue)
  content((${nx2 - 0.1}, ${ny2 + 0.2}), [$arrow(N)$], anchor: "south")
  ` : ''}

  ${showFriction ? `
  // Lực ma sát f (dọc mặt nghiêng, hướng lên)
  line((${cx}, ${cy}), (${fx2}, ${fy2}), mark: (end: ">"), stroke: 1.5pt + green)
  content((${fx2 - 0.2}, ${fy2}), [$arrow(f)$], anchor: "east")
  ` : ''}

  ${showAngleLabel ? `
  // Góc nghiêng
  arc((${O[0]}, ${O[1]}), start: 0deg, stop: ${angle}deg, radius: 1.2, stroke: 0.8pt + black)
  content((1.5, 0.5), [${labelAngle} = ${angle}°], anchor: "west")
  ` : ''}
})`.trim();
}

export function generateFreeBodyDiagram(params) {
  const {
    forceW = 3, forceN = 3, forceF = 2, forceT = 0,
    labelW = 'P', labelN = 'N', labelF = 'f', labelT = 'F',
    showWeight = true, showNormal = true, showFriction = true, showApplied = false,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  return `${TYPST_HEADER}

#canvas({
  import draw: *

  // Vật thể (hình chữ nhật)
  rect((-0.7, -0.5), (0.7, 0.5), stroke: ${strokeStr}, fill: blue.transparentize(80%))

  ${showWeight ? `
  // Trọng lực (thẳng đứng xuống)
  line((0, -0.5), (0, ${-0.5 - forceW}), mark: (end: ">"), stroke: 1.5pt + red)
  content((0.25, ${-0.5 - forceW / 2}), [$arrow(${labelW})$], anchor: "west")
  ` : ''}

  ${showNormal ? `
  // Phản lực pháp tuyến (thẳng đứng lên)
  line((0, 0.5), (0, ${0.5 + forceN}), mark: (end: ">"), stroke: 1.5pt + blue)
  content((0.25, ${0.5 + forceN / 2}), [$arrow(${labelN})$], anchor: "west")
  ` : ''}

  ${showFriction ? `
  // Lực ma sát (nằm ngang, trái)
  line((-0.7, 0), (${-0.7 - forceF}, 0), mark: (end: ">"), stroke: 1.5pt + green)
  content((${-0.7 - forceF / 2}, 0.25), [$arrow(${labelF})$], anchor: "south")
  ` : ''}

  ${showApplied ? `
  // Lực tác dụng (nằm ngang, phải)
  line((0.7, 0), (${0.7 + forceT}, 0), mark: (end: ">"), stroke: 1.5pt + purple)
  content((${0.7 + forceT / 2}, 0.25), [$arrow(${labelT})$], anchor: "south")
  ` : ''}
})`.trim();
}

export function generatePulley(params) {
  const {
    mass1 = 2, mass2 = 3,
    label1 = 'm₁', label2 = 'm₂',
    showTension = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  return `${TYPST_HEADER}

#canvas({
  import draw: *

  // Trần/giá đỡ
  line((-1, 5), (1, 5), stroke: ${strokeStr})
  line((-1, 5.2), (-1, 5), stroke: 0.5pt + black)
  line((1, 5.2), (1, 5), stroke: 0.5pt + black)
  line((-1, 5.2), (1, 5.2), stroke: ${strokeStr}, fill: gray.transparentize(50%))

  // Ròng rọc
  circle((0, 4.3), radius: 0.6, stroke: ${strokeStr})
  circle((0, 4.3), radius: 0.07, fill: black)

  // Dây bên trái (qua ròng rọc)
  line((-0.6, 4.3), (-0.6, 1.5), stroke: ${strokeStr})

  // Dây bên phải
  line((0.6, 4.3), (0.6, 1.5), stroke: ${strokeStr})

  // Vật m1 (bên trái)
  rect((-1.2, 0.5), (-0.1, 1.5), stroke: ${strokeStr}, fill: blue.transparentize(80%))
  content((-0.65, 1), [${label1}], anchor: "center")

  // Vật m2 (bên phải)
  rect((0.1, 0.5), (1.2, 1.5), stroke: ${strokeStr}, fill: red.transparentize(80%))
  content((0.65, 1), [${label2}], anchor: "center")

  ${showTension ? `
  // Lực căng dây
  content((-1.1, 3.0), [$arrow(T)$], anchor: "east")
  content((1.1, 3.0), [$arrow(T)$], anchor: "west")
  ` : ''}
})`.trim();
}

export function generateSpringSystem(params) {
  const {
    springLength = 3, mass = 2,
    labelK = 'k', labelM = 'm',
    showForces = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const numCoils = 8;
  const coilW = 0.4;
  const dy = springLength / numCoils;

  // Tọa độ các điểm lò xo (zigzag)
  const springPoints = [];
  springPoints.push(`(0, 0)`); // điểm treo
  for (let i = 0; i < numCoils; i++) {
    const y = -(i + 0.25) * dy;
    const x = (i % 2 === 0) ? coilW : -coilW;
    springPoints.push(`(${parseFloat(x.toFixed(3))}, ${parseFloat(y.toFixed(3))})`);
    springPoints.push(`(${parseFloat((-x).toFixed(3))}, ${parseFloat((-(i + 0.75) * dy).toFixed(3))})`);
  }
  springPoints.push(`(0, ${-springLength})`);
  const springPtsStr = springPoints.join(', ');

  const massTop = -springLength;
  const massBot = parseFloat((massTop - 1).toFixed(2));

  return `${TYPST_HEADER}

#canvas({
  import draw: *

  // Trần/giá đỡ
  rect((-1, 0.2), (1, 0.5), stroke: none, fill: gray.transparentize(50%))
  line((-1, 0.2), (1, 0.2), stroke: ${strokeStr})
  // Gạch chéo trần
  line((-0.8, 0.2), (-1, 0.5), stroke: 0.5pt + black)
  line((-0.3, 0.2), (-0.5, 0.5), stroke: 0.5pt + black)
  line((0.2, 0.2), (0, 0.5), stroke: 0.5pt + black)
  line((0.7, 0.2), (0.5, 0.5), stroke: 0.5pt + black)

  // Móc treo
  line((0, 0.2), (0, 0), stroke: ${strokeStr})

  // Lò xo
  line(${springPtsStr}, stroke: ${strokeStr})

  // Vật nặng
  rect((-0.6, ${massBot}), (0.6, ${massTop}), stroke: ${strokeStr}, fill: blue.transparentize(80%))
  content((0, ${(massTop + massBot) / 2}), [${labelM}], anchor: "center")

  // Nhãn lò xo
  content((${coilW + 0.3}, ${-springLength / 2}), [${labelK}], anchor: "west")

  ${showForces ? `
  // Lực đàn hồi (lên)
  line((0, ${massTop}), (0, ${massTop + 1.2}), mark: (end: ">"), stroke: 1.5pt + blue)
  content((0.25, ${massTop + 0.6}), [$arrow(F)_"đh"$], anchor: "west")
  // Trọng lực (xuống)
  line((0, ${massBot}), (0, ${massBot - 1.2}), mark: (end: ">"), stroke: 1.5pt + red)
  content((0.25, ${massBot - 0.6}), [$arrow(P)$], anchor: "west")
  ` : ''}
})`.trim();
}

// ==================== QUANG HỌC ====================

export function generateConvexLens(params) {
  const {
    focalLength = 2.5,
    objectDist = 5, objectHeight = 2,
    labelF = 'F', labelO = 'O',
    showRays = true, showImage = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const f = Number(focalLength);
  const d = Number(objectDist);
  const h = Number(objectHeight);

  // Tính ảnh qua công thức thấu kính: 1/d' = 1/f - 1/d => d' = df/(d-f)
  const dImg = d !== f ? parseFloat((d * f / (d - f)).toFixed(3)) : 999;
  const hImg = d !== f ? parseFloat((-h * dImg / d).toFixed(3)) : 0;

  const L = Math.max(d, Math.abs(dImg)) + 1;

  return `${TYPST_HEADER}

#canvas({
  import draw: *

  // Trục chính
  line((${-d - 1}, 0), (${L + 1}, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((${L + 1.2}, 0), [], anchor: "west")

  // Thấu kính hội tụ (biconvex)
  arc((${-0.15}, 0), start: -60deg, stop: 60deg, radius: 2.5, stroke: ${strokeStr})
  arc((${0.15}, 0), start: 120deg, stop: 240deg, radius: 2.5, stroke: ${strokeStr})
  line((0, -3), (0, 3), stroke: 0.5pt + black, dash: "dashed")

  // Tiêu điểm
  circle((${f}, 0), radius: 0.08, fill: black)
  content((${f}, -0.3), [${labelF}], anchor: "north")
  circle((${-f}, 0), radius: 0.08, fill: black)
  content((${-f}, -0.3), [${labelF}'], anchor: "north")

  // Tâm quang học
  content((0.2, -0.3), [${labelO}], anchor: "north")

  // Vật (mũi tên từ trục lên)
  line((${-d}, 0), (${-d}, ${h}), mark: (end: ">"), stroke: 1.5pt + blue)
  content((${-d - 0.2}, ${h / 2}), [AB], anchor: "east")

  ${showRays && d !== f ? `
  // Tia 1: song song trục → qua tiêu điểm ảnh
  line((${-d}, ${h}), (0, ${h}), stroke: 0.7pt + red)
  line((0, ${h}), (${dImg}, ${hImg}), stroke: 0.7pt + red)
  // Tia 2: qua tâm O
  line((${-d}, ${h}), (${dImg}, ${hImg}), stroke: 0.7pt + green)
  // Tia 3: qua tiêu điểm vật → song song trục
  line((${-d}, ${h}), (0, ${(-h * f / (d - f)).toFixed(4)}), stroke: 0.7pt + orange)
  line((0, ${(-h * f / (d - f)).toFixed(4)}), (${dImg}, ${hImg}), stroke: 0.7pt + orange)
  ` : ''}

  ${showImage && d !== f && Math.abs(dImg) < 20 ? `
  // Ảnh
  line((${dImg}, 0), (${dImg}, ${hImg}), mark: (end: ">"), stroke: 1.5pt + purple)
  content((${dImg + 0.2}, ${hImg / 2}), [A'B'], anchor: "west")
  ` : ''}
})`.trim();
}

export function generateConcaveLens(params) {
  const {
    focalLength = 2.5,
    objectDist = 4, objectHeight = 2,
    labelF = 'F', labelO = 'O',
    showRays = true, showImage = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const f = -Math.abs(Number(focalLength)); // tiêu cự âm
  const d = Number(objectDist);
  const h = Number(objectHeight);

  // 1/d' = 1/f - 1/d
  const dImg = parseFloat((d * f / (d - f)).toFixed(3));
  const hImg = parseFloat((-h * dImg / d).toFixed(3));

  const L = Math.max(d, 1) + 1;

  return `${TYPST_HEADER}

#canvas({
  import draw: *

  // Trục chính
  line((${-d - 1}, 0), (${L + 1}, 0), mark: (end: ">"), stroke: 0.8pt + black)

  // Thấu kính phân kỳ (biconcave)
  arc((${0.15}, 0), start: -60deg, stop: 60deg, radius: 2.5, stroke: ${strokeStr})
  arc((${-0.15}, 0), start: 120deg, stop: 240deg, radius: 2.5, stroke: ${strokeStr})
  line((0, -3), (0, 3), stroke: 0.5pt + black, dash: "dashed")

  // Tiêu điểm (ảo, bên cùng phía vật)
  circle((${f}, 0), radius: 0.08, fill: black)
  content((${f}, -0.3), [${labelF}], anchor: "north")
  circle((${-f}, 0), radius: 0.08, fill: black)
  content((${-f}, -0.3), [${labelF}'], anchor: "north")

  content((0.2, -0.3), [${labelO}], anchor: "north")

  // Vật
  line((${-d}, 0), (${-d}, ${h}), mark: (end: ">"), stroke: 1.5pt + blue)

  ${showRays ? `
  // Tia 1: song song trục → kéo dài qua tiêu điểm ảo
  line((${-d}, ${h}), (0, ${h}), stroke: 0.7pt + red)
  line((0, ${h}), (${L}, ${(h + h * L / Math.abs(f)).toFixed(4)}), stroke: 0.7pt + red, dash: "dashed")
  // Tia 2: qua tâm O
  line((${-d}, ${h}), (${L}, ${-h * L / d}), stroke: 0.7pt + green)
  ` : ''}

  ${showImage && Math.abs(dImg) < 20 ? `
  // Ảnh ảo (cùng phía với vật)
  line((${dImg}, 0), (${dImg}, ${hImg}), mark: (end: ">"), stroke: 1.5pt + purple, dash: "dashed")
  content((${dImg - 0.2}, ${hImg / 2}), [A'B'], anchor: "east")
  ` : ''}
})`.trim();
}

export function generateConcaveMirror(params) {
  const {
    radius = 5,
    objectDist = 6, objectHeight = 2,
    labelF = 'F', labelC = 'C', labelO = 'O',
    showRays = true, showImage = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const R = Number(radius);
  const f = R / 2;
  const d = Number(objectDist);
  const h = Number(objectHeight);

  // Công thức gương: 1/d' = 1/f - 1/d
  const dImg = d !== f ? parseFloat((d * f / (d - f)).toFixed(3)) : 999;
  const hImg = d !== f ? parseFloat((-h * dImg / d).toFixed(3)) : 0;

  return `${TYPST_HEADER}

#canvas({
  import draw: *

  // Trục chính (chiều sáng đi từ trái sang phải, gương ở bên phải)
  line((${-d - 1}, 0), (${R + 1}, 0), mark: (end: ">"), stroke: 0.8pt + black)

  // Gương cầu lõm (cung bên phải, lõm về phía trái)
  arc((${R}, 0), start: 150deg, stop: 210deg, radius: ${R}, stroke: ${strokeStr})

  // Ký hiệu mặt phản chiếu (gạch chéo)
  arc((${R}, 0), start: 150deg, stop: 210deg, radius: ${R + 0.2}, stroke: 0.5pt + black, dash: "dashed")

  // Tiêu điểm F và tâm cong C
  circle((${f}, 0), radius: 0.08, fill: black)
  content((${f}, -0.3), [${labelF}], anchor: "north")
  circle((${R}, 0), radius: 0.08, fill: black)
  content((${R + 0.1}, -0.3), [${labelC}], anchor: "north")

  // Đỉnh gương O
  content((0.2, -0.3), [${labelO}], anchor: "north")

  // Vật
  line((${-d}, 0), (${-d}, ${h}), mark: (end: ">"), stroke: 1.5pt + blue)
  content((${-d - 0.2}, ${h / 2}), [AB], anchor: "east")

  ${showImage && d !== f && Math.abs(dImg) < 20 ? `
  // Ảnh
  line((${dImg}, 0), (${dImg}, ${hImg}), mark: (end: ">"), stroke: 1.5pt + purple)
  content((${dImg + 0.2}, ${hImg / 2}), [A'B'], anchor: "west")
  ` : ''}
})`.trim();
}

export function generateConvexMirror(params) {
  const {
    radius = 4,
    objectDist = 5, objectHeight = 2,
    labelF = 'F', labelC = 'C', labelO = 'O',
    showRays = true, showImage = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const R = Number(radius);
  const f = -R / 2; // tiêu cự âm
  const d = Number(objectDist);
  const h = Number(objectHeight);

  const dImg = parseFloat((d * f / (d - f)).toFixed(3));
  const hImg = parseFloat((-h * dImg / d).toFixed(3));

  return `${TYPST_HEADER}

#canvas({
  import draw: *

  // Trục chính
  line((${-d - 1}, 0), (${R + 1}, 0), mark: (end: ">"), stroke: 0.8pt + black)

  // Gương cầu lồi (cung bên phải, lồi về phía trái)
  arc((${-R}, 0), start: -30deg, stop: 30deg, radius: ${R}, stroke: ${strokeStr})

  // Ký hiệu mặt phản chiếu
  arc((${-R}, 0), start: -30deg, stop: 30deg, radius: ${R + 0.2}, stroke: 0.5pt + black, dash: "dashed")

  // Tiêu điểm ảo F (sau gương)
  circle((${-f}, 0), radius: 0.08, fill: black)
  content((${-f + 0.1}, -0.3), [${labelF}], anchor: "north")

  content((0.2, -0.3), [${labelO}], anchor: "north")

  // Vật
  line((${-d}, 0), (${-d}, ${h}), mark: (end: ">"), stroke: 1.5pt + blue)
  content((${-d - 0.2}, ${h / 2}), [AB], anchor: "east")

  ${showImage && Math.abs(dImg) < 20 ? `
  // Ảnh ảo (sau gương, nét đứt)
  line((${dImg}, 0), (${dImg}, ${hImg}), mark: (end: ">"), stroke: 1.5pt + purple, dash: "dashed")
  content((${dImg + 0.2}, ${hImg / 2}), [A'B'], anchor: "west")
  ` : ''}
})`.trim();
}

// ==================== ĐỒ THỊ ĐỘNG HỌC ====================

export function generateVelocityTimeGraph(params) {
  const {
    v0 = 0, v1 = 5, t1 = 4,
    v2 = 5, t2 = 7,
    v3 = 0, t3 = 10,
    showArea = true,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const maxT = Number(t3) + 1;
  const maxV = Math.max(Number(v1), Number(v2)) + 1;

  return `${TYPST_HEADER}

#canvas({
  import draw: *

  // Lưới
  grid((0, 0), (${maxT}, ${maxV}), step: 1, stroke: luma(240))

  // Trục Ot
  line((-0.3, 0), (${maxT + 0.5}, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((${maxT + 0.7}, 0), [$t$ (s)], anchor: "west")

  // Trục Ov
  line((0, -0.3), (0, ${maxV + 0.5}), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, ${maxV + 0.7}), [$v$ (m/s)], anchor: "south")
  content((-0.3, -0.3), [$O$])

  // Đường v-t
  line((0, ${v0}), (${t1}, ${v1}), stroke: ${strokeStr})
  line((${t1}, ${v1}), (${t2}, ${v2}), stroke: ${strokeStr})
  line((${t2}, ${v2}), (${t3}, ${v3}), stroke: ${strokeStr})

  ${showArea ? `
  // Diện tích (biểu thị độ dịch chuyển)
  line((0, 0), (0, ${v0}), (${t1}, ${v1}), (${t2}, ${v2}), (${t3}, 0), close: true,
       fill: blue.transparentize(85%), stroke: none)
  ` : ''}

  // Nhãn các điểm đặc biệt
  content((${t1}, -0.4), [t₁=${t1}], anchor: "north")
  content((${t2}, -0.4), [t₂=${t2}], anchor: "north")
  content((${t3}, -0.4), [t₃=${t3}], anchor: "north")
  content((-0.5, ${v1}), [v₁=${v1}], anchor: "east")
  content((-0.5, ${v0}), [v₀=${v0}], anchor: "east")
})`.trim();
}

export function generatePositionTimeGraph(params) {
  const {
    x0 = 0, v0 = 3, a = -0.5,
    tMax = 8,
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const nX0 = Number(x0), nV0 = Number(v0), nA = Number(a), nTMax = Number(tMax);

  // Tính điểm cực đại
  const tPeak = nA !== 0 ? Math.min(nTMax, Math.max(0, -nV0 / nA)) : nTMax;
  const xPeak = nX0 + nV0 * tPeak + 0.5 * nA * tPeak * tPeak;
  const maxX = Math.max(0, xPeak) + 1;
  const minX = Math.min(0, nX0 + nV0 * nTMax + 0.5 * nA * nTMax * nTMax) - 1;

  // Tính 30 điểm của đường cong x(t)
  const N = 30;
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const t = nTMax * i / N;
    const x = nX0 + nV0 * t + 0.5 * nA * t * t;
    pts.push(`(${parseFloat(t.toFixed(2))}, ${parseFloat(x.toFixed(2))})`);
  }
  const ptsStr = pts.join(', ');

  return `${TYPST_HEADER}

#canvas({
  import draw: *

  // Lưới
  grid((0, ${minX}), (${nTMax + 1}, ${maxX}), step: 1, stroke: luma(240))

  // Trục Ot
  line((-0.3, 0), (${nTMax + 0.8}, 0), mark: (end: ">"), stroke: 0.8pt + black)
  content((${nTMax + 1}, 0), [$t$ (s)], anchor: "west")

  // Trục Ox
  line((0, ${minX - 0.3}), (0, ${maxX + 0.5}), mark: (end: ">"), stroke: 0.8pt + black)
  content((0, ${maxX + 0.7}), [$x$ (m)], anchor: "south")
  content((-0.3, -0.3), [$O$])

  // Đường x-t (đường cong bậc hai)
  line(${ptsStr}, stroke: ${strokeStr})

  // Thông tin phương trình
  content((${nTMax - 0.5}, ${maxX - 0.3}),
    [$x = ${nX0} + ${nV0}t + ${nA}/2 dot t^2$], anchor: "east")
})`.trim();
}

// ==================== ĐIỆN HỌC ====================

export function generateElectricFieldPositive(params) {
  const {
    numLines = 8,
    charge = '+Q',
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const n = Math.max(4, Math.min(16, Number(numLines)));
  const lineLength = 2.5;

  const lines = [];
  for (let i = 0; i < n; i++) {
    const ang = (2 * Math.PI * i) / n;
    const x1 = parseFloat((0.35 * Math.cos(ang)).toFixed(3));
    const y1 = parseFloat((0.35 * Math.sin(ang)).toFixed(3));
    const x2 = parseFloat((lineLength * Math.cos(ang)).toFixed(3));
    const y2 = parseFloat((lineLength * Math.sin(ang)).toFixed(3));
    lines.push(`  line((${x1}, ${y1}), (${x2}, ${y2}), mark: (end: ">"), stroke: ${strokeStr})`);
  }

  return `${TYPST_HEADER}

#canvas({
  import draw: *

  // Điện tích dương
  circle((0, 0), radius: 0.35, fill: red.transparentize(20%), stroke: 1.5pt + red)
  content((0, 0), [+], anchor: "center")
  content((0, -0.6), [${charge}], anchor: "north")

  // Đường sức điện trường (hướng ra ngoài)
${lines.join('\n')}
})`.trim();
}

export function generateElectricFieldNegative(params) {
  const {
    numLines = 8,
    charge = '−Q',
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const n = Math.max(4, Math.min(16, Number(numLines)));
  const lineLength = 2.5;

  const lines = [];
  for (let i = 0; i < n; i++) {
    const ang = (2 * Math.PI * i) / n;
    const x1 = parseFloat((lineLength * Math.cos(ang)).toFixed(3));
    const y1 = parseFloat((lineLength * Math.sin(ang)).toFixed(3));
    const x2 = parseFloat((0.35 * Math.cos(ang)).toFixed(3));
    const y2 = parseFloat((0.35 * Math.sin(ang)).toFixed(3));
    lines.push(`  line((${x1}, ${y1}), (${x2}, ${y2}), mark: (end: ">"), stroke: ${strokeStr})`);
  }

  return `${TYPST_HEADER}

#canvas({
  import draw: *

  // Điện tích âm
  circle((0, 0), radius: 0.35, fill: blue.transparentize(20%), stroke: 1.5pt + blue)
  content((0, 0), [−], anchor: "center")
  content((0, -0.6), [${charge}], anchor: "north")

  // Đường sức điện trường (hướng vào trong)
${lines.join('\n')}
})`.trim();
}

export function generateCircuitSeries(params) {
  const {
    numResistors = 2,
    labelBattery = 'E,r', labelR = 'R',
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const n = Math.min(4, Math.max(1, Number(numResistors)));
  const totalW = 2 + n * 2.5;

  // Vẽ mạch hình chữ nhật, pin bên trái, điện trở bên trên
  const battX = 0.5;
  const topY = 3, botY = 0;
  const resistorSpacing = (totalW - 2) / n;

  let resistorLines = '';
  for (let i = 0; i < n; i++) {
    const rx = 2 + i * resistorSpacing;
    const rw = resistorSpacing * 0.6;
    resistorLines += `
  // Điện trở R${i + 1}
  rect((${parseFloat((rx).toFixed(2))}, ${topY - 0.25}), (${parseFloat((rx + rw).toFixed(2))}, ${topY + 0.25}), stroke: ${strokeStr})
  content((${parseFloat((rx + rw / 2).toFixed(2))}, ${topY + 0.5}), [${labelR}${n > 1 ? `₍${i + 1}₎` : ''}], anchor: "south")`;
  }

  return `${TYPST_HEADER}

#canvas({
  import draw: *

  // Dây dẫn (mạch hình chữ nhật)
  line((0, ${botY}), (${totalW}, ${botY}), stroke: ${strokeStr})
  line((${totalW}, ${botY}), (${totalW}, ${topY}), stroke: ${strokeStr})
  line((${totalW}, ${topY}), (0, ${topY}), stroke: ${strokeStr})
  line((0, ${topY}), (0, ${botY}), stroke: ${strokeStr})

  // Pin/Nguồn điện (bên trái dọc)
  line((0, ${(topY + botY) / 2 + 0.5}), (0, ${(topY + botY) / 2 + 0.2}), stroke: 2pt + black)
  line((0, ${(topY + botY) / 2 - 0.2}), (0, ${(topY + botY) / 2 - 0.5}), stroke: 2pt + black)
  line((-0.3, ${(topY + botY) / 2 + 0.5}), (0.3, ${(topY + botY) / 2 + 0.5}), stroke: 2pt + black)
  line((-0.15, ${(topY + botY) / 2 - 0.5}), (0.15, ${(topY + botY) / 2 - 0.5}), stroke: 1pt + black)
  content((-0.5, ${(topY + botY) / 2}), [${labelBattery}], anchor: "east")

  // Các điện trở nối tiếp
${resistorLines}

  // Hướng dòng điện
  content((${totalW / 2}, ${botY - 0.4}), [$I$], anchor: "north")
  line((${totalW * 0.4}, ${botY}), (${totalW * 0.6}, ${botY}), mark: (end: ">"), stroke: 1pt + black)
})`.trim();
}

export function generateCircuitParallel(params) {
  const {
    numResistors = 2,
    labelBattery = 'E,r', labelR = 'R',
    styleOptions = {}
  } = params;

  const strokeStr = buildStroke(styleOptions);
  const fillStr = buildFill(styleOptions);

  const n = Math.min(4, Math.max(1, Number(numResistors)));
  const totalH = 1 + n * 2;
  const topY = totalH, botY = 0;
  const W = 6;

  let resistorLines = '';
  for (let i = 0; i < n; i++) {
    const branchY = 1 + i * 2;
    const ry = branchY;
    resistorLines += `
  // Nhánh R${i + 1}
  line((1.5, ${ry}), (4.5, ${ry}), stroke: ${strokeStr})
  rect((2.5, ${ry - 0.25}), (3.5, ${ry + 0.25}), stroke: ${strokeStr})
  content((3, ${ry + 0.45}), [${labelR}${n > 1 ? `₍${i + 1}₎` : ''}], anchor: "south")`;
  }

  return `${TYPST_HEADER}

#canvas({
  import draw: *

  // Đường dây chính trên và dưới
  line((1.5, ${botY}), (4.5, ${botY}), stroke: ${strokeStr})
  line((1.5, ${topY}), (4.5, ${topY}), stroke: ${strokeStr})

  // Thanh dọc trái và phải (nối các nhánh)
  line((1.5, ${botY}), (1.5, ${topY}), stroke: ${strokeStr})
  line((4.5, ${botY}), (4.5, ${topY}), stroke: ${strokeStr})

  // Dây ra ngoài (đến pin)
  line((0, ${totalH / 2}), (1.5, ${totalH / 2}), stroke: ${strokeStr})
  line((4.5, ${totalH / 2}), (${W}, ${totalH / 2}), stroke: ${strokeStr})

  // Bổ sung dây kết nối trái → phải bên ngoài
  line((0, ${totalH / 2}), (0, ${topY + 0.5}), stroke: ${strokeStr})
  line((0, ${topY + 0.5}), (${W}, ${topY + 0.5}), stroke: ${strokeStr})
  line((${W}, ${topY + 0.5}), (${W}, ${totalH / 2}), stroke: ${strokeStr})

  // Pin (bên trên giữa)
  line((${W / 2 - 0.4}, ${topY + 0.5}), (${W / 2 + 0.4}, ${topY + 0.5}), stroke: 2pt + black)
  line((${W / 2 - 0.2}, ${topY + 0.8}), (${W / 2 + 0.2}, ${topY + 0.8}), stroke: 1pt + black)
  content((${W / 2}, ${topY + 1.2}), [${labelBattery}], anchor: "south")

  // Các điện trở song song
${resistorLines}
})`.trim();
}
