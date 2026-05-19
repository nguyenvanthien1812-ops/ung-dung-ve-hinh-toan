// Generator cho biểu đồ thống kê (cột đứng, cột ngang, cột nhóm, cột chồng, đường)
import { colorToTypst, TYPST_HEADER } from './utils.js';

const SERIES_COLORS = ['blue', 'red', 'olive'];

function parseLabels(str) {
  if (!str || !str.trim()) return [];
  return str.split(',').map(s => s.trim()).filter(s => s.length > 0);
}

function parseValues(str) {
  if (!str || !str.trim()) return [];
  return str.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
}

// Tính thang đo đẹp: trả về { yMax, step, nTicks }
function niceScale(maxVal) {
  if (!maxVal || maxVal <= 0) return { yMax: 10, step: 2, nTicks: 5 };
  const nTicks = 5;
  const rawStep = maxVal * 1.2 / nTicks;
  const mag = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const frac = rawStep / mag;
  const niceFrac = frac < 1.5 ? 1 : frac < 3 ? 2 : frac < 7 ? 5 : 10;
  const step = niceFrac * mag;
  return { yMax: step * nTicks, step, nTicks };
}

// Nếu user nhập yMax/yStep thì dùng, không thì tự tính
function resolveScale(autoMaxVal, userYMax, userYStep) {
  const manualMax = parseFloat(userYMax);
  const manualStep = parseFloat(userYStep);
  if (manualMax > 0 && manualStep > 0) {
    const nTicks = Math.round(manualMax / manualStep);
    return { yMax: manualMax, step: manualStep, nTicks };
  }
  if (manualMax > 0) {
    const auto = niceScale(manualMax);
    return { yMax: manualMax, step: auto.step, nTicks: Math.ceil(manualMax / auto.step) };
  }
  if (manualStep > 0) {
    // Chỉ nhập step: tự tính max = bội số nhỏ nhất của step vượt qua autoMaxVal*1.2
    const nTicks = Math.ceil(autoMaxVal * 1.2 / manualStep);
    return { yMax: nTicks * manualStep, step: manualStep, nTicks };
  }
  return niceScale(autoMaxVal);
}

function fmt(n) { return parseFloat(n.toFixed(4)).toString(); }

function tickLabel(val) {
  if (Math.abs(val - Math.round(val)) < 1e-9) return Math.round(val).toString();
  return parseFloat(val.toFixed(2)).toString();
}

function buildCanvas(lines) {
  return `${TYPST_HEADER}\n\n#canvas({\n  import draw: *\n\n${lines.join('\n')}\n})`.trim();
}

function emptyChart() {
  return buildCanvas([`  content((3, 2), [Không có dữ liệu])`]);
}

// ─── Helpers vẽ trục ──────────────────────────────────────────────────────────

function drawHGrid(lines, chartW, nTicks, step, scale, showGrid) {
  if (!showGrid) return;
  for (let i = 0; i <= nTicks; i++) {
    const cy = fmt(i * step * scale);
    lines.push(`  line((0, ${cy}), (${fmt(chartW)}, ${cy}), stroke: 0.3pt + luma(210))`);
  }
}

function drawVGrid(lines, chartH, nTicks, step, scale, showGrid) {
  if (!showGrid) return;
  for (let i = 0; i <= nTicks; i++) {
    const cx = fmt(i * step * scale);
    lines.push(`  line((${cx}, 0), (${cx}, ${fmt(chartH)}), stroke: 0.3pt + luma(210))`);
  }
}

function drawYAxis(lines, chartH, nTicks, step, scale, yLabel) {
  for (let i = 0; i <= nTicks; i++) {
    const y = i * step;
    const cy = fmt(y * scale);
    lines.push(`  line((-0.1, ${cy}), (0, ${cy}), stroke: 0.6pt + black)`);
    lines.push(`  content((-0.15, ${cy}), [${tickLabel(y)}], anchor: "east")`);
  }
  lines.push(`  line((0, 0), (0, ${fmt(chartH + 0.5)}), mark: (end: ">"), stroke: 0.8pt + black)`);
  if (yLabel) lines.push(`  content((0, ${fmt(chartH + 0.5)}), [${yLabel}], anchor: "south-west")`);
}

function drawXAxisVertical(lines, chartW, xLabel) {
  lines.push(`  line((0, 0), (${fmt(chartW + 0.5)}, 0), mark: (end: ">"), stroke: 0.8pt + black)`);
  if (xLabel) lines.push(`  content((${fmt(chartW + 0.5)}, 0), [${xLabel}], anchor: "north-west")`);
}

function drawXAxisHorizontal(lines, chartW, chartH, nTicks, step, scale, xLabel) {
  for (let i = 0; i <= nTicks; i++) {
    const x = i * step;
    const cx = fmt(x * scale);
    lines.push(`  line((${cx}, -0.1), (${cx}, 0), stroke: 0.6pt + black)`);
    lines.push(`  content((${cx}, -0.2), [${tickLabel(x)}], anchor: "north")`);
  }
  lines.push(`  line((0, 0), (${fmt(chartW + 0.5)}, 0), mark: (end: ">"), stroke: 0.8pt + black)`);
  lines.push(`  line((0, 0), (0, ${fmt(chartH + 0.3)}), stroke: 0.8pt + black)`);
  if (xLabel) lines.push(`  content((${fmt(chartW + 0.5)}, 0), [${xLabel}], anchor: "north-west")`);
}

function drawTitle(lines, chartW, chartH, title) {
  if (title) lines.push(`  content((${fmt(chartW / 2)}, ${fmt(chartH + 0.8)}), [*${title}*], anchor: "south")`);
}

// ─── Legend cho biểu đồ nhiều chuỗi ──────────────────────────────────────────

function drawLegend(lines, chartW, chartH, series) {
  const lx = fmt(chartW + 0.3);
  for (let j = 0; j < series.length; j++) {
    const ly = fmt(chartH - j * 0.55);
    const color = series[j].color;
    lines.push(`  rect((${lx}, ${fmt(parseFloat(ly) - 0.22)}), (${fmt(parseFloat(lx) + 0.38)}, ${ly}), fill: ${color}.transparentize(30%), stroke: 0.7pt + ${color})`);
    lines.push(`  content((${fmt(parseFloat(lx) + 0.48)}, ${fmt(parseFloat(ly) - 0.11)}), [${series[j].label}], anchor: "west")`);
  }
}

// ==================== BIỂU ĐỒ CỘT ĐỨNG ====================

export function generateBarChart(params) {
  const {
    labels = '2020, 2021, 2022, 2023',
    values = '10, 25, 15, 30',
    title = '', xLabel = '', yLabel = '',
    showValues = true, showGrid = true,
    userYMax = '', userYStep = '',
    styleOptions = {}
  } = params;

  const lblArr = parseLabels(labels);
  const valArr = parseValues(values);
  const n = Math.min(lblArr.length, valArr.length);
  if (n === 0) return emptyChart();

  const chartH = 6.0, slotW = 1.0, barW = 0.65, chartW = n * slotW;
  const maxVal = Math.max(...valArr.slice(0, n));
  const { yMax, step, nTicks } = resolveScale(maxVal, userYMax, userYStep);
  const scale = chartH / yMax;
  const color = colorToTypst(styleOptions?.strokeColor || 'blue');

  const lines = [];
  drawHGrid(lines, chartW, nTicks, step, scale, showGrid);

  for (let i = 0; i < n; i++) {
    const val = valArr[i];
    const bh = fmt(val * scale);
    const x0 = fmt(i * slotW + (slotW - barW) / 2);
    const x1 = fmt(i * slotW + (slotW + barW) / 2);
    const cx = fmt((i + 0.5) * slotW);
    lines.push(`  rect((${x0}, 0), (${x1}, ${bh}), fill: ${color}.transparentize(30%), stroke: 0.8pt + ${color})`);
    if (showValues) lines.push(`  content((${cx}, ${fmt(val * scale + 0.15)}), [${val}], anchor: "south")`);
    lines.push(`  content((${cx}, -0.3), [${lblArr[i]}], anchor: "north")`);
  }

  drawYAxis(lines, chartH, nTicks, step, scale, yLabel);
  drawXAxisVertical(lines, chartW, xLabel);
  drawTitle(lines, chartW, chartH, title);
  return buildCanvas(lines);
}

// ==================== BIỂU ĐỒ CỘT NGANG ====================

export function generateBarChartHorizontal(params) {
  const {
    labels = 'Toán, Văn, Anh, Lý, Hóa',
    values = '8, 7, 9, 8.5, 7.5',
    title = '', xLabel = '', yLabel = '',
    showValues = true, showGrid = true,
    userYMax = '', userYStep = '',
    styleOptions = {}
  } = params;

  const lblArr = parseLabels(labels);
  const valArr = parseValues(values);
  const n = Math.min(lblArr.length, valArr.length);
  if (n === 0) return emptyChart();

  const chartW = 8.0, slotH = 0.8, barH = 0.55, chartH = n * slotH;
  const maxVal = Math.max(...valArr.slice(0, n));
  const { yMax: xMax, step: xStep, nTicks } = resolveScale(maxVal, userYMax, userYStep);
  const scale = chartW / xMax;
  const color = colorToTypst(styleOptions?.strokeColor || 'blue');

  const lines = [];
  drawVGrid(lines, chartH, nTicks, xStep, scale, showGrid);

  // Vẽ cột ngang (danh mục 0 ở trên, n-1 ở dưới)
  for (let i = 0; i < n; i++) {
    const val = valArr[i];
    const bw = fmt(val * scale);
    const ySlot = (n - 1 - i) * slotH;
    const y0 = fmt(ySlot + (slotH - barH) / 2);
    const y1 = fmt(ySlot + (slotH + barH) / 2);
    const cy = fmt(ySlot + slotH / 2);
    lines.push(`  rect((0, ${y0}), (${bw}, ${y1}), fill: ${color}.transparentize(30%), stroke: 0.8pt + ${color})`);
    if (showValues) lines.push(`  content((${fmt(val * scale + 0.15)}, ${cy}), [${val}], anchor: "west")`);
    lines.push(`  content((-0.15, ${cy}), [${lblArr[i]}], anchor: "east")`);
  }

  drawXAxisHorizontal(lines, chartW, chartH, nTicks, xStep, scale, xLabel);
  if (yLabel) lines.push(`  content((0, ${fmt(chartH + 0.3)}), [${yLabel}], anchor: "south-west")`);
  drawTitle(lines, chartW, chartH, title);
  return buildCanvas(lines);
}

// ==================== BIỂU ĐỒ CỘT NHÓM ====================

export function generateBarChartGrouped(params) {
  const {
    labels = 'Q1, Q2, Q3, Q4',
    series1Values = '10, 25, 15, 30',
    series2Values = '8, 20, 18, 25',
    series3Values = '',
    series1Label = 'Chuỗi 1',
    series2Label = 'Chuỗi 2',
    series3Label = 'Chuỗi 3',
    title = '', xLabel = '', yLabel = '',
    showValues = false, showGrid = true, showLegend = true,
    userYMax = '', userYStep = '',
    styleOptions = {}
  } = params;

  const lblArr = parseLabels(labels);
  const raw = [
    { values: parseValues(series1Values), label: series1Label, color: SERIES_COLORS[0] },
    { values: parseValues(series2Values), label: series2Label, color: SERIES_COLORS[1] },
    { values: parseValues(series3Values), label: series3Label, color: SERIES_COLORS[2] },
  ].filter(s => s.values.length > 0);

  const m = raw.length;
  const n = Math.min(lblArr.length, ...raw.map(s => s.values.length));
  if (n === 0 || m === 0) return emptyChart();

  const chartH = 6.0, slotW = 1.4;
  const gap = 0.05;
  const barW = (slotW - 0.3 - (m - 1) * gap) / m;
  const barStart = (slotW - (m * barW + (m - 1) * gap)) / 2;
  const chartW = n * slotW;

  const maxVal = Math.max(...raw.flatMap(s => s.values.slice(0, n)));
  const { yMax, step, nTicks } = resolveScale(maxVal, userYMax, userYStep);
  const scale = chartH / yMax;

  const lines = [];
  drawHGrid(lines, chartW, nTicks, step, scale, showGrid);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const val = raw[j].values[i];
      const bh = fmt(val * scale);
      const x0 = fmt(i * slotW + barStart + j * (barW + gap));
      const x1 = fmt(parseFloat(x0) + barW);
      const cx = fmt(parseFloat(x0) + barW / 2);
      const color = raw[j].color;
      lines.push(`  rect((${x0}, 0), (${x1}, ${bh}), fill: ${color}.transparentize(30%), stroke: 0.7pt + ${color})`);
      if (showValues) lines.push(`  content((${cx}, ${fmt(val * scale + 0.12)}), [${val}], anchor: "south")`);
    }
    const catCx = fmt(i * slotW + slotW / 2);
    lines.push(`  content((${catCx}, -0.3), [${lblArr[i]}], anchor: "north")`);
  }

  drawYAxis(lines, chartH, nTicks, step, scale, yLabel);
  drawXAxisVertical(lines, chartW, xLabel);
  if (showLegend) drawLegend(lines, chartW, chartH, raw);
  drawTitle(lines, chartW, chartH, title);
  return buildCanvas(lines);
}

// ==================== BIỂU ĐỒ CỘT CHỒNG ====================

export function generateBarChartStacked(params) {
  const {
    labels = 'Q1, Q2, Q3, Q4',
    series1Values = '10, 25, 15, 30',
    series2Values = '8, 20, 18, 25',
    series3Values = '',
    series1Label = 'Chuỗi 1',
    series2Label = 'Chuỗi 2',
    series3Label = 'Chuỗi 3',
    title = '', xLabel = '', yLabel = '',
    showValues = false, showGrid = true, showLegend = true,
    userYMax = '', userYStep = '',
    styleOptions = {}
  } = params;

  const lblArr = parseLabels(labels);
  const raw = [
    { values: parseValues(series1Values), label: series1Label, color: SERIES_COLORS[0] },
    { values: parseValues(series2Values), label: series2Label, color: SERIES_COLORS[1] },
    { values: parseValues(series3Values), label: series3Label, color: SERIES_COLORS[2] },
  ].filter(s => s.values.length > 0);

  const m = raw.length;
  const n = Math.min(lblArr.length, ...raw.map(s => s.values.length));
  if (n === 0 || m === 0) return emptyChart();

  // Tổng từng cột để tính yMax
  const totals = Array.from({ length: n }, (_, i) => raw.reduce((sum, s) => sum + (s.values[i] || 0), 0));
  const maxTotal = Math.max(...totals);

  const chartH = 6.0, slotW = 1.0, barW = 0.65, chartW = n * slotW;
  const { yMax, step, nTicks } = resolveScale(maxTotal, userYMax, userYStep);
  const scale = chartH / yMax;

  const lines = [];
  drawHGrid(lines, chartW, nTicks, step, scale, showGrid);

  for (let i = 0; i < n; i++) {
    let yBase = 0;
    for (let j = 0; j < m; j++) {
      const val = raw[j].values[i] || 0;
      if (val <= 0) continue;
      const y0 = fmt(yBase * scale);
      const y1 = fmt((yBase + val) * scale);
      const x0 = fmt(i * slotW + (slotW - barW) / 2);
      const x1 = fmt(i * slotW + (slotW + barW) / 2);
      const cx = fmt((i + 0.5) * slotW);
      const cy = fmt((yBase + val / 2) * scale);
      const color = raw[j].color;
      lines.push(`  rect((${x0}, ${y0}), (${x1}, ${y1}), fill: ${color}.transparentize(30%), stroke: 0.7pt + ${color})`);
      if (showValues && val > 0) lines.push(`  content((${cx}, ${cy}), [${val}], anchor: "center")`);
      yBase += val;
    }
    const cx = fmt((i + 0.5) * slotW);
    // Nhãn tổng trên đỉnh cột
    lines.push(`  content((${cx}, ${fmt(yBase * scale + 0.15)}), [${totals[i]}], anchor: "south")`);
    lines.push(`  content((${cx}, -0.3), [${lblArr[i]}], anchor: "north")`);
  }

  drawYAxis(lines, chartH, nTicks, step, scale, yLabel);
  drawXAxisVertical(lines, chartW, xLabel);
  if (showLegend) drawLegend(lines, chartW, chartH, raw);
  drawTitle(lines, chartW, chartH, title);
  return buildCanvas(lines);
}

// ==================== BIỂU ĐỒ ĐƯỜNG (ĐƠN) ====================

export function generateLineChart(params) {
  const {
    labels = '2019, 2020, 2021, 2022, 2023',
    values = '10, 15, 12, 20, 18',
    title = '', xLabel = '', yLabel = '',
    showPoints = true, showValues = false, showGrid = true,
    userYMax = '', userYStep = '',
    styleOptions = {}
  } = params;

  const lblArr = parseLabels(labels);
  const valArr = parseValues(values);
  const n = Math.min(lblArr.length, valArr.length);
  if (n === 0) return emptyChart();

  const chartH = 6.0, slotW = 1.0, chartW = n * slotW;
  const maxVal = Math.max(...valArr.slice(0, n));
  const { yMax, step, nTicks } = resolveScale(maxVal, userYMax, userYStep);
  const scale = chartH / yMax;
  const color = colorToTypst(styleOptions?.strokeColor || 'blue');

  const lines = [];
  drawHGrid(lines, chartW, nTicks, step, scale, showGrid);
  if (showGrid) {
    for (let i = 0; i < n; i++) {
      const cx = fmt((i + 0.5) * slotW);
      lines.push(`  line((${cx}, 0), (${cx}, ${fmt(chartH)}), stroke: 0.3pt + luma(210))`);
    }
  }

  // Tọa độ các điểm
  const pts = valArr.slice(0, n).map((val, i) => ({
    x: fmt((i + 0.5) * slotW),
    y: fmt(val * scale),
    val
  }));

  // Đường nối
  for (let i = 0; i < pts.length - 1; i++) {
    lines.push(`  line((${pts[i].x}, ${pts[i].y}), (${pts[i + 1].x}, ${pts[i + 1].y}), stroke: 1.2pt + ${color})`);
  }

  // Điểm và nhãn
  for (let i = 0; i < pts.length; i++) {
    if (showPoints) {
      lines.push(`  circle((${pts[i].x}, ${pts[i].y}), radius: 0.1, fill: ${color}, stroke: none)`);
    }
    if (showValues) {
      lines.push(`  content((${pts[i].x}, ${fmt(parseFloat(pts[i].y) + 0.2)}), [${pts[i].val}], anchor: "south")`);
    }
    lines.push(`  content((${pts[i].x}, -0.3), [${lblArr[i]}], anchor: "north")`);
  }

  drawYAxis(lines, chartH, nTicks, step, scale, yLabel);
  drawXAxisVertical(lines, chartW, xLabel);
  drawTitle(lines, chartW, chartH, title);
  return buildCanvas(lines);
}

const PIE_COLORS = ['blue', 'red', 'olive', 'orange', 'purple', 'teal', 'maroon', 'fuchsia'];

// labelR: bán kính đặt nhãn (tính từ tâm)
// innerR: bán kính lỗ donut (0 = không có lỗ); vẽ TRƯỚC nhãn để không che chữ
function drawPieSectors(lines, lblArr, valArr, n, total, r, showLabels, showPercent, labelR, innerR = 0) {
  let currentAngle = 90;

  // Pass 1: vẽ các sector bằng polygon (tâm + các điểm trên cung)
  for (let i = 0; i < n; i++) {
    const val = valArr[i];
    const sliceAngle = val / total * 360;
    const color = PIE_COLORS[i % PIE_COLORS.length];
    const steps = Math.max(4, Math.ceil(sliceAngle / 5));
    const pts = ['(0, 0)'];
    for (let s = 0; s <= steps; s++) {
      const ang = (currentAngle + (s / steps) * sliceAngle) * Math.PI / 180;
      pts.push(`(${fmt(r * Math.cos(ang))}, ${fmt(r * Math.sin(ang))})`);
    }
    lines.push(`  line(${pts.join(', ')}, close: true, fill: ${color}.transparentize(20%), stroke: none)`);
    currentAngle += sliceAngle;
  }

  // Pass 2: đường phân chia trắng từ tâm (hoặc từ viền trong) ra viền ngoài
  currentAngle = 90;
  for (let i = 0; i < n; i++) {
    const rad = currentAngle * Math.PI / 180;
    const sx = innerR > 0 ? fmt(innerR * Math.cos(rad)) : '0';
    const sy = innerR > 0 ? fmt(innerR * Math.sin(rad)) : '0';
    lines.push(`  line((${sx}, ${sy}), (${fmt(r * Math.cos(rad))}, ${fmt(r * Math.sin(rad))}), stroke: 1.5pt + white)`);
    currentAngle += valArr[i] / total * 360;
  }

  // Viền ngoài
  lines.push(`  circle((0, 0), radius: ${fmt(r)}, fill: none, stroke: 0.8pt + black)`);

  // Lỗ donut (vẽ TRƯỚC nhãn để không che chữ)
  if (innerR > 0) {
    lines.push(`  circle((0, 0), radius: ${fmt(innerR)}, fill: white, stroke: 0.8pt + black)`);
  }

  // Pass 3: nhãn
  currentAngle = 90;
  for (let i = 0; i < n; i++) {
    const val = valArr[i];
    const sliceAngle = val / total * 360;
    const midAngle = currentAngle + sliceAngle / 2;
    if (sliceAngle >= 12) {
      const midRad = midAngle * Math.PI / 180;
      const lx = fmt(labelR * Math.cos(midRad));
      const ly = fmt(labelR * Math.sin(midRad));
      const pct = (val / total * 100).toFixed(1);
      if (showLabels && showPercent) {
        lines.push(`  content((${lx}, ${fmt(parseFloat(ly) + 0.12)}), [${lblArr[i]}], anchor: "center")`);
        lines.push(`  content((${lx}, ${fmt(parseFloat(ly) - 0.18)}), [${pct}%], anchor: "center")`);
      } else if (showLabels) {
        lines.push(`  content((${lx}, ${ly}), [${lblArr[i]}], anchor: "center")`);
      } else if (showPercent) {
        lines.push(`  content((${lx}, ${ly}), [${pct}%], anchor: "center")`);
      }
    }
    currentAngle += sliceAngle;
  }
}

function drawPieLegend(lines, lblArr, valArr, n, total, r) {
  const lx = r + 0.5;
  for (let i = 0; i < n; i++) {
    const color = PIE_COLORS[i % PIE_COLORS.length];
    const pct = (valArr[i] / total * 100).toFixed(1);
    const ly = fmt(r * 0.7 - i * 0.6);
    lines.push(`  rect((${fmt(lx)}, ${fmt(parseFloat(ly) - 0.22)}), (${fmt(lx + 0.38)}, ${ly}), fill: ${color}.transparentize(20%), stroke: 0.7pt + ${color})`);
    lines.push(`  content((${fmt(lx + 0.48)}, ${fmt(parseFloat(ly) - 0.11)}), [${lblArr[i]}: ${pct}%], anchor: "west")`);
  }
}

// ==================== BIỂU ĐỒ ĐƯỜNG NHIỀU SERIES ====================

export function generateLineChartMulti(params) {
  const {
    labels = '2019, 2020, 2021, 2022, 2023',
    series1Values = '10, 15, 12, 20, 18',
    series2Values = '5, 8, 10, 14, 16',
    series3Values = '',
    series1Label = 'Chuỗi 1',
    series2Label = 'Chuỗi 2',
    series3Label = 'Chuỗi 3',
    title = '', xLabel = '', yLabel = '',
    showPoints = true, showValues = false, showGrid = true, showLegend = true,
    userYMax = '', userYStep = '',
    styleOptions = {}
  } = params;

  const lblArr = parseLabels(labels);
  const raw = [
    { values: parseValues(series1Values), label: series1Label, color: SERIES_COLORS[0] },
    { values: parseValues(series2Values), label: series2Label, color: SERIES_COLORS[1] },
    { values: parseValues(series3Values), label: series3Label, color: SERIES_COLORS[2] },
  ].filter(s => s.values.length > 0);

  const m = raw.length;
  const n = Math.min(lblArr.length, ...raw.map(s => s.values.length));
  if (n === 0 || m === 0) return emptyChart();

  const chartH = 6.0, slotW = 1.0, chartW = n * slotW;
  const maxVal = Math.max(...raw.flatMap(s => s.values.slice(0, n)));
  const { yMax, step, nTicks } = resolveScale(maxVal, userYMax, userYStep);
  const scale = chartH / yMax;

  const lines = [];
  drawHGrid(lines, chartW, nTicks, step, scale, showGrid);
  if (showGrid) {
    for (let i = 0; i < n; i++) {
      const cx = fmt((i + 0.5) * slotW);
      lines.push(`  line((${cx}, 0), (${cx}, ${fmt(chartH)}), stroke: 0.3pt + luma(210))`);
    }
  }

  for (let j = 0; j < m; j++) {
    const color = raw[j].color;
    const pts = raw[j].values.slice(0, n).map((val, i) => ({
      x: fmt((i + 0.5) * slotW),
      y: fmt(val * scale),
      val
    }));

    // Đường nối
    for (let i = 0; i < pts.length - 1; i++) {
      lines.push(`  line((${pts[i].x}, ${pts[i].y}), (${pts[i + 1].x}, ${pts[i + 1].y}), stroke: 1.2pt + ${color})`);
    }

    // Điểm
    for (let i = 0; i < pts.length; i++) {
      if (showPoints) {
        lines.push(`  circle((${pts[i].x}, ${pts[i].y}), radius: 0.1, fill: ${color}, stroke: none)`);
      }
      if (showValues) {
        lines.push(`  content((${pts[i].x}, ${fmt(parseFloat(pts[i].y) + 0.2)}), [${pts[i].val}], anchor: "south")`);
      }
    }
  }

  // Nhãn danh mục (chỉ vẽ 1 lần)
  for (let i = 0; i < n; i++) {
    lines.push(`  content((${fmt((i + 0.5) * slotW)}, -0.3), [${lblArr[i]}], anchor: "north")`);
  }

  drawYAxis(lines, chartH, nTicks, step, scale, yLabel);
  drawXAxisVertical(lines, chartW, xLabel);
  if (showLegend) drawLegend(lines, chartW, chartH, raw);
  drawTitle(lines, chartW, chartH, title);
  return buildCanvas(lines);
}

// ==================== BIỂU ĐỒ HÌNH TRÒN ====================

export function generatePieChart(params) {
  const {
    labels = 'Toán, Văn, Anh, Lý, Hóa',
    values = '30, 20, 25, 15, 10',
    title = '',
    showLabels = true,
    showPercent = true,
    showLegend = true,
    radius = 3.0,
  } = params;

  const lblArr = parseLabels(labels);
  const valArr = parseValues(values);
  const n = Math.min(lblArr.length, valArr.length);
  if (n === 0) return emptyChart();

  const total = valArr.slice(0, n).reduce((sum, v) => sum + v, 0);
  if (total <= 0) return emptyChart();

  const r = parseFloat(radius) || 3.0;
  const lines = [];
  drawPieSectors(lines, lblArr, valArr, n, total, r, showLabels, showPercent, r * 0.63);
  if (showLegend) drawPieLegend(lines, lblArr, valArr, n, total, r);
  if (title) lines.push(`  content((0, ${fmt(r + 0.6)}), [*${title}*], anchor: "south")`);
  return buildCanvas(lines);
}

// ==================== BIỂU ĐỒ DONUT ====================

export function generateDonutChart(params) {
  const {
    labels = 'Toán, Văn, Anh, Lý, Hóa',
    values = '30, 20, 25, 15, 10',
    title = '',
    centerText = '',
    showLabels = false,
    showPercent = true,
    showLegend = true,
    radius = 3.0,
    innerRatio = 0.55,
  } = params;

  const lblArr = parseLabels(labels);
  const valArr = parseValues(values);
  const n = Math.min(lblArr.length, valArr.length);
  if (n === 0) return emptyChart();

  const total = valArr.slice(0, n).reduce((sum, v) => sum + v, 0);
  if (total <= 0) return emptyChart();

  const r = parseFloat(radius) || 3.0;
  const iRatio = parseFloat(innerRatio) || 0.55;
  const innerRVal = r * iRatio;
  // Đặt nhãn giữa vành donut: midpoint của (innerR, r)
  const labelR = (innerRVal + r) * 0.5;

  const lines = [];
  drawPieSectors(lines, lblArr, valArr, n, total, r, showLabels, showPercent, labelR, innerRVal);
  if (centerText) lines.push(`  content((0, 0), [${centerText}], anchor: "center")`);
  if (showLegend) drawPieLegend(lines, lblArr, valArr, n, total, r);
  if (title) lines.push(`  content((0, ${fmt(r + 0.6)}), [*${title}*], anchor: "south")`);
  return buildCanvas(lines);
}
