import { useState } from 'react';

const COLORS = [
  '#000000', '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728',
  '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22',
  '#17becf', '#333333'
];

const STROKE_STYLES = [
  { value: 'solid', label: 'Nét liền' },
  { value: 'dashed', label: 'Nét đứt' },
  { value: 'dotted', label: 'Nét chấm' }
];

function StyleCustomizer({ styleOptions, onChange }) {
  const [expanded, setExpanded] = useState(false);

  const handleColorChange = (field, color) => {
    onChange({ ...styleOptions, [field]: color });
  };

  const handleStrokeChange = (field, value) => {
    onChange({ ...styleOptions, [field]: parseFloat(value) || value });
  };

  const handleCheckboxChange = (field, checked) => {
    onChange({ ...styleOptions, [field]: checked });
  };

  return (
    <div className="style-customizer glass-card">
      <div
        className="style-header"
        onClick={() => setExpanded(!expanded)}
      >
        <h4>🎨 Tùy Chỉnh Giao Diện</h4>
        <span className="toggle-icon">{expanded ? '▼' : '▶'}</span>
      </div>

      {expanded && (
        <div className="style-options">
          {/* Màu nét vẽ */}
          <div className="option-group">
            <label>Màu nét vẽ</label>
            <div className="color-grid">
              {COLORS.map((color) => (
                <button
                  key={color}
                  className={`color-btn ${styleOptions.strokeColor === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange('strokeColor', color)}
                />
              ))}
            </div>
          </div>

          {/* Độ dày nét vẽ */}
          <div className="option-group">
            <label>Độ dày nét vẽ</label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={styleOptions.strokeWidth || 1.5}
              onChange={(e) => handleStrokeChange('strokeWidth', e.target.value)}
            />
            <span className="range-value">{styleOptions.strokeWidth || 1.5}pt</span>
          </div>

          {/* Kiểu nét */}
          <div className="option-group">
            <label>Kiểu nét</label>
            <select
              value={styleOptions.strokeStyle || 'solid'}
              onChange={(e) => handleStrokeChange('strokeStyle', e.target.value)}
            >
              {STROKE_STYLES.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>

          {/* Màu nền */}
          <div className="option-group">
            <label>Màu nền (fill)</label>
            <input
              type="color"
              value={styleOptions.fillColor || '#ffffff'}
              onChange={(e) => handleColorChange('fillColor', e.target.value)}
            />
          </div>

          {/* Độ trong suốt */}
          <div className="option-group">
            <label>Độ trong suốt</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={styleOptions.fillOpacity ?? 0.1}
              onChange={(e) => handleStrokeChange('fillOpacity', e.target.value)}
            />
            <span className="range-value">{Math.round((styleOptions.fillOpacity ?? 0.1) * 100)}%</span>
          </div>

          {/* Checkbox options */}
          <div className="option-group checkboxes">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={styleOptions.showGrid ?? true}
                onChange={(e) => handleCheckboxChange('showGrid', e.target.checked)}
              />
              Hiển thị lưới
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={styleOptions.showAxis ?? true}
                onChange={(e) => handleCheckboxChange('showAxis', e.target.checked)}
              />
              Hiển thị trục tọa độ
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default StyleCustomizer;
