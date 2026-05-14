import { getFormSchema, getDefaultValues } from '../data/formSchemas.js';

function DynamicShapeForm({ shapeId, formValues, onValueChange, onGenerate }) {
  const schema = getFormSchema(shapeId);

  if (!schema) {
    return (
      <div className="empty-form">
        <p>Chưa có form cho loại hình này.</p>
        <p>Vui lòng chọn chế độ Code Editor để tự viết mã Typst.</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <form className="dynamic-form" onSubmit={handleSubmit}>
      <div className="form-fields">
        {schema.fields.map((field) => (
          <div key={field.name} className="field-group">
            <label htmlFor={field.name}>
              {field.label}
              {field.unit && <span className="unit"> ({field.unit})</span>}
            </label>

            {field.type === 'text' && (
              <input
                id={field.name}
                type="text"
                value={formValues[field.name] || field.default}
                onChange={(e) => onValueChange(field.name, e.target.value)}
              />
            )}

            {field.type === 'number' && (
              <input
                id={field.name}
                type="number"
                min={field.min}
                max={field.max}
                step={field.step || 0.1}
                value={formValues[field.name] || field.default}
                onChange={(e) => onValueChange(field.name, e.target.value)}
              />
            )}

            {field.type === 'select' && (
              <select
                id={field.name}
                value={formValues[field.name] || field.default}
                onChange={(e) => onValueChange(field.name, e.target.value)}
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}

            {field.type === 'checkbox' && (
              <input
                id={field.name}
                type="checkbox"
                checked={formValues[field.name] ?? field.default}
                onChange={(e) => onValueChange(field.name, e.target.checked)}
              />
            )}
          </div>
        ))}
      </div>

      <button type="submit" className="primary generate-btn">
        Tạo Hình Vẽ
      </button>
    </form>
  );
}

export default DynamicShapeForm;
