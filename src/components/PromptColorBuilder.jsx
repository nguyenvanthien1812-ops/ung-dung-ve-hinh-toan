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
// hasImage = true → description optional; Gemini sẽ nhìn ảnh đính kèm
function buildPrompt(description, points, edges, regions, hasImage = false) {
  if (!description.trim() && !hasImage) return '';

  const lines = [];

  // Persona + task
  lines.push('Bạn là chuyên gia vẽ hình toán bằng Typst + CeTZ 0.3.2 cho giáo viên Việt Nam.');
  if (description.trim()) {
    lines.push('Hãy viết mã Typst để vẽ:');
    lines.push(`"${description.trim()}"`);
  } else {
    lines.push('Đây là ảnh một bài toán. Hãy đọc yêu cầu trong ảnh, xác định các biểu đồ / hình học mà đề bài yêu cầu vẽ, rồi viết mã Typst để vẽ chúng.');
    lines.push('QUAN TRỌNG: KHÔNG tái tạo lại văn bản đề bài, KHÔNG vẽ lại bảng số liệu — chỉ vẽ các hình / biểu đồ mà đề yêu cầu (ý a, ý b, ý c...) bằng canvas CeTZ.');
    lines.push('Nếu đề yêu cầu nhiều biểu đồ, hãy vẽ từng biểu đồ riêng biệt, mỗi biểu đồ là một #canvas riêng.');
  }
  lines.push('');

  const validPoints  = points.filter(p => p.name.trim());
  const validEdges   = edges.filter(e => e.name.trim());
  const validRegions = regions.filter(r => r.desc.trim());

  if (validPoints.length > 0) {
    lines.push('YÊU CẦU MÀU SẮC CHO ĐIỂM/ĐỈNH:');
    validPoints.forEach(p => {
      lines.push(
        `  - Điểm ${p.name.trim()}: ${p.color.label}` +
        ` → circle((...), radius: 0.06, fill: ${p.color.typst}, stroke: none)` +
        ` + content() đặt nhãn`
      );
    });
    lines.push('');
  }

  if (validEdges.length > 0) {
    lines.push('YÊU CẦU MÀU SẮC CHO ĐƯỜNG KẺ/CẠNH:');
    validEdges.forEach(e => {
      const dashNote  = e.dashed ? ', kiểu nét đứt' : '';
      const dashTypst = e.dashed ? ', dash: "dashed"' : '';
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
        `    → line(<liệt kê các đỉnh>, close: true,` +
        ` fill: ${r.color.typst}.transparentize(${t}%), stroke: none)`
      );
    });
    lines.push('');
  }

  // Technical rules — expanded and precise
  lines.push('═══════════════════════════════════════════════');
  lines.push('QUY TẮC KỸ THUẬT BẮT BUỘC — CeTZ 0.3.2:');
  lines.push('');
  lines.push('1. Header bắt buộc (luôn đặt 2 dòng đầu file):');
  lines.push('     #import "@preview/cetz:0.3.2": canvas, draw');
  lines.push('     #set page(width: auto, height: auto, margin: 10pt)');
  lines.push('');
  lines.push('2. Cấu trúc canvas — "import draw: *" PHẢI nằm BÊN TRONG canvas:');
  lines.push('     #canvas({');
  lines.push('       import draw: *');
  lines.push('       // code vẽ ở đây');
  lines.push('     })');
  lines.push('');
  lines.push('3. Cú pháp điểm — dùng tuple (x, y):');
  lines.push('     let A = (0, 3)                        // khai báo biến điểm');
  lines.push('     line(A, B)                            // nối hai điểm');
  lines.push('     line(A, B, C, close: true)            // đa giác khép kín');
  lines.push('     circle((0, 0), radius: 1)             // đường tròn — tuple trực tiếp');
  lines.push('     content(A, [A], anchor: "south")      // nhãn điểm');
  lines.push('');
  lines.push('4. Màu sắc:');
  lines.push('     fill: red                             // tên màu Typst');
  lines.push('     fill: rgb("e74c3c")                   // hex → rgb("RRGGBB"), KHÔNG dùng #e74c3c');
  lines.push('     fill: blue.lighten(70%)               // màu nhạt');
  lines.push('     fill: green.transparentize(70%)       // trong suốt 70%');
  lines.push('');
  lines.push('5. Thứ tự vẽ (layer từ dưới lên trên):');
  lines.push('     ① Vùng tô màu (fill)  →  ② Cạnh/đường  →  ③ Điểm  →  ④ Nhãn content()');
  lines.push('');
  lines.push('6. Nét đứt:');
  lines.push('     stroke: (paint: black, thickness: 1pt, dash: "dashed")');
  lines.push('');
  lines.push('7. Đường tròn: circle((cx, cy), radius: r, stroke: 1pt, fill: none)');
  lines.push('');
  lines.push('8. Đặt nhãn content() cho TẤT CẢ điểm được đặt tên.');
  lines.push('     Dùng anchor phù hợp: "south", "north", "east", "west", "north-east"...');
  lines.push('');
  lines.push('9. Nếu cần vẽ đồ thị hàm số, thêm:');
  lines.push('     #import "@preview/cetz-plot:0.1.1": plot');
  lines.push('     Dùng plot.plot() và plot.add(domain: (a, b), samples: 200, x => biểu_thức)');
  lines.push('');
  lines.push('10. Chỉ trả về mã Typst thuần — KHÔNG giải thích, KHÔNG dùng ```typst ... ```');
  lines.push('');

  // Few-shot example
  lines.push('═══════════════════════════════════════════════');
  lines.push('VÍ DỤ MẪU CODE ĐÚNG CÚ PHÁP (tham khảo cấu trúc):');
  lines.push('');
  lines.push('#import "@preview/cetz:0.3.2": canvas, draw');
  lines.push('#set page(width: auto, height: auto, margin: 10pt)');
  lines.push('');
  lines.push('#canvas({');
  lines.push('  import draw: *');
  lines.push('  let A = (0, 3)');
  lines.push('  let B = (-2, 0)');
  lines.push('  let C = (2, 0)');
  lines.push('  let M = ((B.at(0) + C.at(0)) / 2, (B.at(1) + C.at(1)) / 2)  // trung điểm BC');
  lines.push('  // 1) Tô vùng trước');
  lines.push('  line(A, B, C, close: true, fill: blue.transparentize(80%), stroke: none)');
  lines.push('  // 2) Vẽ cạnh');
  lines.push('  line(A, B, C, close: true, stroke: (paint: black, thickness: 1.5pt))');
  lines.push('  line(A, M, stroke: (paint: red, thickness: 1pt, dash: "dashed"))');
  lines.push('  // 3) Vẽ điểm');
  lines.push('  for pt in (A, B, C, M) {');
  lines.push('    circle(pt, radius: 0.06, fill: black, stroke: none)');
  lines.push('  }');
  lines.push('  // 4) Đặt nhãn');
  lines.push('  content(A, [A], anchor: "south")');
  lines.push('  content(B, [B], anchor: "east")');
  lines.push('  content(C, [C], anchor: "west")');
  lines.push('  content(M, [M], anchor: "north")');
  lines.push('})');

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
  const [image,   setImage]   = useState(null);   // { dataUrl, type }
  const [dragOver, setDragOver] = useState(false);
  const [imgCopied, setImgCopied] = useState(false);

  // --- Image upload ---
  const handleImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => setImage({ dataUrl: e.target.result, type: file.type });
    reader.readAsDataURL(file);
  };
  const handleImageInput  = (e) => { if (e.target.files[0]) handleImageFile(e.target.files[0]); };
  const handleDrop        = (e) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) handleImageFile(e.dataTransfer.files[0]); };
  const handleDragOver    = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave   = ()  => setDragOver(false);
  const removeImage       = ()  => setImage(null);

  const handleCopyImage = async () => {
    if (!image) return;
    try {
      const res  = await fetch(image.dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      setImgCopied(true);
      setTimeout(() => setImgCopied(false), 2000);
    } catch {
      alert('Trình duyệt không hỗ trợ copy ảnh tự động. Hãy tải ảnh xuống và đính kèm thủ công vào Gemini.');
    }
  };

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

  const prompt = buildPrompt(description, points, edges, regions, !!image);

  const handleCopy = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToGemini = async () => {
    if (!prompt) return;
    if (image) {
      // Khi có ảnh: copy ảnh trước, prompt để user copy riêng sau
      try {
        const res  = await fetch(image.dataUrl);
        const blob = await res.blob();
        await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      } catch {
        // Nếu browser không hỗ trợ copy ảnh, copy text thay
        navigator.clipboard.writeText(prompt).catch(() => {});
      }
    } else {
      navigator.clipboard.writeText(prompt).catch(() => {});
    }
    const winW = 840;
    const winH = window.screen.availHeight;
    const winL = Math.max(0, window.screen.availWidth - winW);
    window.open(
      geminiUrl || 'https://gemini.google.com',
      'gemini_typst_window',
      `width=${winW},height=${winH},left=${winL},top=0,resizable=yes,scrollbars=yes`
    );
    setSent(true);
    setTimeout(() => setSent(false), 10000);
  };

  return (
    <div className="prompt-builder">

      {/* Mô tả hình vẽ */}
      <div className="pb-section">
        <label className="pb-label">
          Mô tả hình vẽ muốn AI vẽ
          {image && <span className="pb-label-optional"> — tùy chọn khi đã có ảnh</span>}
        </label>
        <textarea
          className="pb-textarea"
          rows={3}
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder={image
            ? "Để trống — Gemini sẽ nhìn ảnh đính kèm và tự vẽ. Hoặc gõ thêm yêu cầu cụ thể..."
            : "VD: Tam giác ABC nội tiếp đường tròn tâm O bán kính 2. M là trung điểm BC, AH là đường cao."}
        />
      </div>

      {/* Ảnh đề bài */}
      <div className="pb-section">
        <label className="pb-label">Ảnh đề bài (tùy chọn)</label>
        {image ? (
          <div className="pb-image-preview">
            <img src={image.dataUrl} alt="Đề bài" className="pb-image-img" />
            <div className="pb-image-actions">
              <button
                className={`pb-copy-btn ${imgCopied ? 'pb-copied' : ''}`}
                style={{ fontSize: '0.76rem', padding: '0.25rem 0.6rem' }}
                onClick={handleCopyImage}
                title="Copy ảnh vào clipboard để dán vào Gemini"
              >
                {imgCopied ? '✓ Đã copy!' : '📋 Copy ảnh'}
              </button>
              <button className="pb-image-remove" onClick={removeImage}>× Xóa ảnh</button>
            </div>
          </div>
        ) : (
          <div
            className={`pb-image-drop ${dragOver ? 'pb-image-drop--over' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => document.getElementById('pb-img-input').click()}
          >
            <span className="pb-image-drop-icon">🖼</span>
            <span>Kéo thả ảnh vào đây hoặc <u>bấm để chọn file</u></span>
            <span className="pb-image-drop-hint">Hỗ trợ JPG, PNG, GIF, WEBP...</span>
            <input
              id="pb-img-input"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageInput}
            />
          </div>
        )}
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
      {(description.trim() || image) ? (
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
                {image ? (
                  <>
                    <strong>Gemini đã mở! Ảnh đề bài đã copy vào clipboard.</strong>
                    <ol className="pb-sent-steps">
                      <li>Trong Gemini → <kbd>Ctrl</kbd>+<kbd>V</kbd> để <strong>dán ảnh đề bài</strong></li>
                      <li>Bấm <strong>📋 Sao chép</strong> bên dưới để copy câu lệnh kỹ thuật</li>
                      <li><kbd>Ctrl</kbd>+<kbd>V</kbd> lần nữa để dán câu lệnh → nhấn <kbd>Enter</kbd></li>
                      <li>Copy mã Typst từ Gemini → dán vào <strong>Code Editor</strong></li>
                    </ol>
                  </>
                ) : (
                  <>
                    <strong>Gemini đã mở! Prompt đã sao chép vào clipboard.</strong>
                    <ol className="pb-sent-steps">
                      <li>Trong cửa sổ Gemini vừa mở → nhấn <kbd>Ctrl</kbd>+<kbd>V</kbd> để dán prompt</li>
                      <li>Nhấn <kbd>Enter</kbd> để gửi cho Gemini</li>
                      <li>Copy mã Typst từ Gemini → Dán vào <strong>Code Editor (Manual)</strong></li>
                    </ol>
                  </>
                )}
              </div>
            </div>
          )}

          <textarea className="pb-prompt-preview" value={prompt} readOnly rows={10} />
        </div>
      ) : (
        <p className="pb-output-hint">Tải ảnh đề bài lên, hoặc điền mô tả hình vẽ ở trên để xem prompt được tạo tự động.</p>
      )}
    </div>
  );
}

export default PromptColorBuilder;
