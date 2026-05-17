import { useState } from 'react';

const COLORS = [
  { label: 'Đỏ',         typst: 'red',              hex: '#e74c3c' },
  { label: 'Xanh dương', typst: 'blue',             hex: '#2196f3' },
  { label: 'Xanh lá',   typst: 'green',            hex: '#27ae60' },
  { label: 'Vàng',       typst: 'yellow',           hex: '#f1c40f' },
  { label: 'Cam',        typst: 'orange',           hex: '#e67e22' },
  { label: 'Tím',        typst: 'purple',           hex: '#8e44ad' },
  { label: 'Hồng',       typst: 'rgb("e91e63")',    hex: '#e91e63' },
  { label: 'Đen',        typst: 'black',            hex: '#111111' },
  { label: 'Xám',        typst: 'gray',             hex: '#95a5a6' },
  { label: 'Nâu',        typst: 'rgb("795548")',    hex: '#795548' },
];

// Build the full prompt string from user inputs
function buildPrompt(description, points, edges, regions) {
  if (!description.trim()) return '';

  const lines = [];
  lines.push('Hãy viết mã Typst sử dụng thư viện CeTZ 0.3.2 để vẽ:');
  lines.push(`"${description.trim()}"`);
  lines.push('');

  const validPoints  = points.filter(p => p.name.trim());
  const validEdges   = edges.filter(e => e.name.trim());
  const validRegions = regions.filter(r => r.desc.trim());

  if (validPoints.length > 0) {
    lines.push('YÊU CẦU MÀU SẮC CHO ĐIỂM/ĐỈNH:');
    validPoints.forEach(p => {
      lines.push(
        `  - Điểm ${p.name.trim()}: ${p.color.label}` +
        ` → dùng circle((...), radius: 0.06, fill: ${p.color.typst}, stroke: none)` +
        ` rồi đặt nhãn bằng content()`
      );
    });
    lines.push('');
  }

  if (validEdges.length > 0) {
    lines.push('YÊU CẦU MÀU SẮC CHO ĐƯỜNG KẺ/CẠNH:');
    validEdges.forEach(e => {
      const dashNote   = e.dashed ? ', kiểu nét đứt' : '';
      const dashTypst  = e.dashed ? ', dash: "dashed"' : '';
      lines.push(
        `  - ${e.name.trim()}: ${e.color.label}, độ dày ${e.width}pt${dashNote}` +
        ` → stroke: (paint: ${e.color.typst}, thickness: ${e.width}pt${dashTypst})`
      );
    });
    lines.push('');
  }

  if (validRegions.length > 0) {
    lines.push('YÊU CẦU VÙNG TÔ MÀU (ý a, ý b...):');
    validRegions.forEach(r => {
      const t = Math.round((1 - r.opacity) * 100);
      lines.push(`  - ${r.desc.trim()}: ${r.color.label}, độ mờ ${Math.round(r.opacity * 100)}%`);
      lines.push(
        `    → line(<liệt kê các đỉnh của vùng>, close: true,` +
        ` fill: ${r.color.typst}.transparentize(${t}%), stroke: none)`
      );
    });
    lines.push('');
  }

  lines.push('QUY TẮC KỸ THUẬT BẮT BUỘC (phải tuân thủ chính xác):');
  lines.push('  1. Dòng đầu file: #import "@preview/cetz:0.3.2": canvas, draw');
  lines.push('  2. Kích thước trang: #set page(width: auto, height: auto, margin: 10pt)');
  lines.push('  3. Màu hex PHẢI dùng rgb("RRGGBB") — KHÔNG dùng #RRGGBB trực tiếp trong stroke/fill');
  lines.push('  4. Vùng tô vẽ TRƯỚC các cạnh và điểm (để không bị che khuất)');
  lines.push('  5. Điểm vẽ bằng circle() fill màu, stroke: none; sau đó đặt nhãn content()');
  lines.push('  6. Đặt nhãn content() cho TẤT CẢ các điểm được đặt tên trong bài');
  lines.push('  7. Chỉ trả về mã Typst thuần — không có giải thích, không có markdown code block');

  return lines.join('\n');
}

// Dropdown chọn màu có chấm màu preview
function ColorSelect({ value, onChange }) {
  return (
    <div className="pb-color-select">
      <span className="pb-color-dot" style={{ background: value.hex }} />
      <select
        value={value.label}
        onChange={e => {
          const found = COLORS.find(c => c.label === e.target.value);
          if (found) onChange(found);
        }}
      >
        {COLORS.map(c => (
          <option key={c.label} value={c.label}>{c.label}</option>
        ))}
      </select>
    </div>
  );
}

let _idSeq = 0;
const newId = () => ++_idSeq;

function PromptColorBuilder({ geminiUrl }) {
  const [description, setDescription] = useState('');
  const [points,  setPoints]  = useState([]);
  const [edges,   setEdges]   = useState([]);
  const [regions, setRegions] = useState([]);
  const [copied,  setCopied]  = useState(false);
  const [sent,    setSent]    = useState(false);

  // --- Points ---
  const addPoint    = () => setPoints(p => [...p, { id: newId(), name: '', color: COLORS[0] }]);
  const removePoint = id => setPoints(p => p.filter(x => x.id !== id));
  const updatePoint = (id, field, val) =>
    setPoints(p => p.map(x => x.id === id ? { ...x, [field]: val } : x));

  // --- Edges ---
  const addEdge    = () => setEdges(e => [...e, { id: newId(), name: '', color: COLORS[0], width: 1.5, dashed: false }]);
  const removeEdge = id => setEdges(e => e.filter(x => x.id !== id));
  const updateEdge = (id, field, val) =>
    setEdges(e => e.map(x => x.id === id ? { ...x, [field]: val } : x));

  // --- Regions ---
  const addRegion    = () => setRegions(r => [...r, { id: newId(), desc: '', color: COLORS[1], opacity: 0.3 }]);
  const removeRegion = id => setRegions(r => r.filter(x => x.id !== id));
  const updateRegion = (id, field, val) =>
    setRegions(r => r.map(x => x.id === id ? { ...x, [field]: val } : x));

  const prompt = buildPrompt(description, points, edges, regions);

  const handleCopy = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToGemini = () => {
    if (!prompt) return;
    // Sao chép prompt vào clipboard trước
    navigator.clipboard.writeText(prompt).catch(() => {});
    // Mở Gemini trong cửa sổ mới căn phải màn hình
    const winW  = 840;
    const winH  = window.screen.availHeight;
    const winL  = Math.max(0, window.screen.availWidth - winW);
    window.open(
      geminiUrl || 'https://gemini.google.com',
      'gemini_typst_window',
      `width=${winW},height=${winH},left=${winL},top=0,resizable=yes,scrollbars=yes`
    );
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <div className="prompt-builder">

      {/* Mô tả hình vẽ */}
      <div className="pb-section">
        <label className="pb-label">Mô tả hình vẽ muốn AI vẽ</label>
        <textarea
          className="pb-textarea"
          rows={3}
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="VD: Tam giác ABC nội tiếp đường tròn tâm O bán kính 2. M là trung điểm BC, AH là đường cao."
        />
      </div>

      {/* Màu điểm / đỉnh */}
      <div className="pb-section">
        <div className="pb-section-header">
          <span className="pb-section-title">⦿ Màu điểm / đỉnh</span>
          <button className="pb-add-btn" onClick={addPoint}>+ Thêm điểm</button>
        </div>
        {points.length === 0 && (
          <p className="pb-empty">Bấm "+ Thêm điểm" để chỉ định màu cho từng đỉnh (A, B, M...)</p>
        )}
        {points.map(p => (
          <div key={p.id} className="pb-row">
            <label>Tên:</label>
            <input
              type="text"
              className="pb-input-short"
              value={p.name}
              onChange={e => updatePoint(p.id, 'name', e.target.value)}
              placeholder="A, B, M..."
            />
            <label>Màu:</label>
            <ColorSelect value={p.color} onChange={c => updatePoint(p.id, 'color', c)} />
            <button className="pb-remove" onClick={() => removePoint(p.id)} title="Xóa">×</button>
          </div>
        ))}
      </div>

      {/* Màu đường kẻ / cạnh */}
      <div className="pb-section">
        <div className="pb-section-header">
          <span className="pb-section-title">— Màu đường kẻ / cạnh</span>
          <button className="pb-add-btn" onClick={addEdge}>+ Thêm cạnh</button>
        </div>
        {edges.length === 0 && (
          <p className="pb-empty">Bấm "+ Thêm cạnh" để chỉ định màu cho cạnh (AB, BC, đường tròn O...)</p>
        )}
        {edges.map(e => (
          <div key={e.id} className="pb-edge-row">
            <div className="pb-row">
              <label>Tên:</label>
              <input
                type="text"
                className="pb-input-medium"
                value={e.name}
                onChange={ev => updateEdge(e.id, 'name', ev.target.value)}
                placeholder="AB, BC, đường tròn O..."
              />
              <ColorSelect value={e.color} onChange={c => updateEdge(e.id, 'color', c)} />
              <button className="pb-remove" onClick={() => removeEdge(e.id)} title="Xóa">×</button>
            </div>
            <div className="pb-row">
              <label>Độ dày:</label>
              <input
                type="number"
                className="pb-input-xs"
                min="0.5" max="5" step="0.5"
                value={e.width}
                onChange={ev => updateEdge(e.id, 'width', parseFloat(ev.target.value) || 1.5)}
              />
              <span className="pb-unit">pt</span>
              <label className="pb-checkbox-label">
                <input
                  type="checkbox"
                  checked={e.dashed}
                  onChange={ev => updateEdge(e.id, 'dashed', ev.target.checked)}
                />
                Nét đứt
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Vùng tô màu */}
      <div className="pb-section">
        <div className="pb-section-header">
          <span className="pb-section-title">▲ Vùng tô màu (ý a / ý b...)</span>
          <button className="pb-add-btn" onClick={addRegion}>+ Thêm vùng</button>
        </div>
        {regions.length === 0 && (
          <p className="pb-empty">Bấm "+ Thêm vùng" để tô màu từng ý (ý a tô xanh, ý b tô hồng...)</p>
        )}
        {regions.map(r => (
          <div key={r.id} className="pb-region-block">
            <div className="pb-row">
              <label>Mô tả:</label>
              <input
                type="text"
                className="pb-input-long"
                value={r.desc}
                onChange={ev => updateRegion(r.id, 'desc', ev.target.value)}
                placeholder="Ý a — tam giác ABC, Ý b — vùng ABM..."
              />
              <button className="pb-remove" onClick={() => removeRegion(r.id)} title="Xóa">×</button>
            </div>
            <div className="pb-row">
              <label>Màu:</label>
              <ColorSelect value={r.color} onChange={c => updateRegion(r.id, 'color', c)} />
              <label>Độ mờ:</label>
              <input
                type="range" min="0.1" max="0.9" step="0.05"
                value={r.opacity}
                onChange={ev => updateRegion(r.id, 'opacity', parseFloat(ev.target.value))}
                className="pb-range"
              />
              <span className="pb-range-val">{Math.round(r.opacity * 100)}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Prompt đã tạo + nút gửi / copy */}
      {description.trim() ? (
        <div className="pb-output">
          <div className="pb-output-header">
            <span className="pb-output-label">Prompt tự động tạo:</span>
            <div className="pb-output-actions">
              <button
                className={`pb-copy-btn ${copied ? 'pb-copied' : ''}`}
                onClick={handleCopy}
                title="Chỉ sao chép, không mở Gemini"
              >
                {copied ? '✓ Đã sao chép!' : '📋 Sao chép'}
              </button>
              <button
                className="pb-send-btn"
                onClick={handleSendToGemini}
                title="Sao chép prompt và mở Gemini trong cửa sổ mới"
              >
                🚀 Gửi lên Gemini
              </button>
            </div>
          </div>

          {/* Thông báo hướng dẫn sau khi bấm Gửi lên Gemini */}
          {sent && (
            <div className="pb-sent-notice">
              <div className="pb-sent-icon">✅</div>
              <div className="pb-sent-text">
                <strong>Gemini đã mở! Prompt đã sao chép vào clipboard.</strong>
                <ol className="pb-sent-steps">
                  <li>Trong cửa sổ Gemini vừa mở → nhấn <kbd>Ctrl</kbd>+<kbd>V</kbd> để dán prompt</li>
                  <li>Nhấn <kbd>Enter</kbd> để gửi cho Gemini</li>
                  <li>Copy mã Typst từ Gemini → Dán vào <strong>Code Editor (Manual)</strong></li>
                </ol>
              </div>
            </div>
          )}

          <textarea className="pb-prompt-preview" value={prompt} readOnly rows={10} />
        </div>
      ) : (
        <p className="pb-output-hint">Điền mô tả hình vẽ ở trên để xem prompt được tạo tự động.</p>
      )}
    </div>
  );
}

export default PromptColorBuilder;
