import { useState } from 'react';

const DEFAULT_COLOR = '#2196f3';

const EMPTY_FORM = {
  color: DEFAULT_COLOR,
  opacity: 0.3,
  width: 1.5,
  size: 0.08,
  label: '',
  x: '', y: '',
  x1: '', y1: '', x2: '', y2: '',
  verticesStr: '',
};

function AnnotationPanel({ annotations, onAdd, onDelete }) {
  const [addingType, setAddingType] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const handleAdd = () => {
    if (addingType === 'point') {
      const x = parseFloat(form.x);
      const y = parseFloat(form.y);
      if (isNaN(x) || isNaN(y)) return;
      onAdd({ id: Date.now(), type: 'point', x, y, label: form.label, color: form.color, size: parseFloat(form.size) || 0.08 });
    } else if (addingType === 'segment') {
      const x1 = parseFloat(form.x1), y1 = parseFloat(form.y1);
      const x2 = parseFloat(form.x2), y2 = parseFloat(form.y2);
      if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return;
      onAdd({ id: Date.now(), type: 'segment', x1, y1, x2, y2, color: form.color, width: parseFloat(form.width) || 1.5 });
    } else if (addingType === 'region') {
      if (!form.verticesStr || !form.verticesStr.trim()) return;
      // Validate: need at least 3 valid vertex pairs
      const parts = form.verticesStr.split(';').map(s => s.trim().split(',').map(n => parseFloat(n.trim())));
      const valid = parts.filter(([x, y]) => !isNaN(x) && !isNaN(y));
      if (valid.length < 3) return;
      onAdd({ id: Date.now(), type: 'region', verticesStr: form.verticesStr, color: form.color, opacity: parseFloat(form.opacity) || 0.3 });
    }
    setAddingType(null);
    setForm(EMPTY_FORM);
  };

  const handleCancel = () => {
    setAddingType(null);
    setForm(EMPTY_FORM);
  };

  const startAdding = (type) => {
    setAddingType(type);
    setForm(EMPTY_FORM);
  };

  const typeLabel = { point: 'Điểm màu', segment: 'Cạnh màu', region: 'Vùng tô' };

  return (
    <div className="annotation-panel">

      {/* Danh sách annotation hiện có */}
      {annotations.length > 0 && (
        <div className="annotation-list">
          {annotations.map((a, i) => (
            <div key={a.id} className="annotation-item">
              <span className="annot-color-dot" style={{ background: a.color }} />
              <span className="annot-type-tag">{typeLabel[a.type]}</span>
              <span className="annot-desc">
                {a.type === 'point' && `(${a.x}, ${a.y})${a.label ? ` · [${a.label}]` : ''}`}
                {a.type === 'segment' && `(${a.x1},${a.y1}) → (${a.x2},${a.y2})`}
                {a.type === 'region' && (a.verticesStr.length > 30 ? a.verticesStr.slice(0, 30) + '…' : a.verticesStr)}
              </span>
              <button className="annot-delete" onClick={() => onDelete(a.id)} title="Xóa">×</button>
            </div>
          ))}
        </div>
      )}

      {annotations.length === 0 && !addingType && (
        <p className="annot-hint">Thêm điểm màu, cạnh màu, hoặc vùng tô để tô màu từng phần của hình vẽ (ý a, ý b...)</p>
      )}

      {/* Nút thêm */}
      {!addingType && (
        <div className="annotation-add-btns">
          <button className="annot-add-btn" onClick={() => startAdding('point')}>⦿ Điểm màu</button>
          <button className="annot-add-btn" onClick={() => startAdding('segment')}>— Cạnh màu</button>
          <button className="annot-add-btn" onClick={() => startAdding('region')}>▲ Vùng tô</button>
        </div>
      )}

      {/* Form thêm mới */}
      {addingType && (
        <div className="annotation-form">
          <div className="annot-form-title">{typeLabel[addingType]}</div>

          {addingType === 'point' && (
            <>
              <div className="annot-row">
                <label>Tọa độ X:</label>
                <input type="number" step="0.1" value={form.x} onChange={e => set('x', e.target.value)} placeholder="x" />
                <label>Y:</label>
                <input type="number" step="0.1" value={form.y} onChange={e => set('y', e.target.value)} placeholder="y" />
              </div>
              <div className="annot-row">
                <label>Nhãn:</label>
                <input type="text" value={form.label} onChange={e => set('label', e.target.value)} placeholder="A, M, ..." className="annot-label-input" />
                <label>Cỡ:</label>
                <input type="number" step="0.01" min="0.03" max="0.3" value={form.size} onChange={e => set('size', e.target.value)} className="annot-size-input" />
              </div>
            </>
          )}

          {addingType === 'segment' && (
            <>
              <div className="annot-row">
                <label>Từ:</label>
                <input type="number" step="0.1" value={form.x1} onChange={e => set('x1', e.target.value)} placeholder="x1" />
                <input type="number" step="0.1" value={form.y1} onChange={e => set('y1', e.target.value)} placeholder="y1" />
              </div>
              <div className="annot-row">
                <label>Đến:</label>
                <input type="number" step="0.1" value={form.x2} onChange={e => set('x2', e.target.value)} placeholder="x2" />
                <input type="number" step="0.1" value={form.y2} onChange={e => set('y2', e.target.value)} placeholder="y2" />
              </div>
              <div className="annot-row">
                <label>Độ dày:</label>
                <input type="number" step="0.5" min="0.5" max="5" value={form.width} onChange={e => set('width', e.target.value)} className="annot-size-input" />
                <span>pt</span>
              </div>
            </>
          )}

          {addingType === 'region' && (
            <>
              <div className="annot-col">
                <label>Đỉnh (mỗi điểm: x,y — phân cách bằng ";")</label>
                <input
                  type="text"
                  value={form.verticesStr}
                  onChange={e => set('verticesStr', e.target.value)}
                  placeholder="0,0 ; 5,0 ; 1.8,2.4"
                  className="annot-vertices-input"
                />
                <span className="annot-hint-small">Ví dụ ý a - △ABC: 0,0 ; 5,0 ; 1.8,2.4</span>
              </div>
              <div className="annot-row">
                <label>Độ mờ:</label>
                <input
                  type="range" min="0.1" max="0.9" step="0.05"
                  value={form.opacity}
                  onChange={e => set('opacity', parseFloat(e.target.value))}
                />
                <span className="annot-range-val">{Math.round(form.opacity * 100)}%</span>
              </div>
            </>
          )}

          {/* Màu — dùng chung cho tất cả loại */}
          <div className="annot-row">
            <label>Màu:</label>
            <input type="color" value={form.color} onChange={e => set('color', e.target.value)} />
            <span className="annot-color-preview" style={{ background: form.color }} />
          </div>

          <div className="annot-actions">
            <button className="primary btn-sm" onClick={handleAdd}>Thêm</button>
            <button className="secondary btn-sm" onClick={handleCancel}>Hủy</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnnotationPanel;
