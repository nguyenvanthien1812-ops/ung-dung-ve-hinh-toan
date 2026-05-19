import { useState } from 'react';
import { getShapeGuide } from '../data/shapeGuides.js';

function ShapeGuidePanel({ shapeId }) {
  const [open, setOpen] = useState(false);
  const guide = getShapeGuide(shapeId);

  if (!guide) return null;

  return (
    <div className="shape-guide-wrapper">
      <button
        type="button"
        className={`guide-toggle-btn ${open ? 'active' : ''}`}
        onClick={() => setOpen(v => !v)}
        title="Hướng dẫn sử dụng"
      >
        <span className="guide-icon">?</span>
        {open ? 'Ẩn hướng dẫn' : 'Hướng dẫn'}
      </button>

      {open && (
        <div className="shape-guide-panel">
          <p className="guide-description">{guide.description}</p>

          {guide.tips?.length > 0 && (
            <div className="guide-section">
              <div className="guide-section-title">Lưu ý</div>
              <ul className="guide-tips">
                {guide.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {guide.examples?.length > 0 && (
            <div className="guide-section">
              <div className="guide-section-title">Ví dụ</div>
              <ul className="guide-examples">
                {guide.examples.map((ex, i) => (
                  <li key={i}>
                    <span className="example-label">{ex.label}:</span>
                    <span className="example-values">{ex.values}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ShapeGuidePanel;
