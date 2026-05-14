import { useState } from 'react';
import { SHAPE_CATEGORIES, getShapesByCategory, getShapesBySubcategory } from '../data/shapeCategories.js';

function ShapeSelector({ onSelectShape, selectedShapeId }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
    setActiveSubcategory(null);
  };

  const handleSubcategoryClick = (subcategoryId) => {
    setActiveSubcategory(activeSubcategory === subcategoryId ? null : subcategoryId);
  };

  const handleShapeClick = (shape) => {
    onSelectShape(shape);
  };

  return (
    <div className="shape-selector">
      <h3>Chọn Loại Hình</h3>

      <div className="categories">
        {Object.values(SHAPE_CATEGORIES).map((category) => (
          <div key={category.id} className="category-group">
            <button
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.icon} {category.name}
            </button>

            {activeCategory === category.id && (
              <div className="subcategories">
                {Object.values(category.subcategories).map((subcategory) => {
                  const shapes = getShapesBySubcategory(category.id, subcategory.id);
                  return (
                    <div key={subcategory.id} className="subcategory-group">
                      <button
                        className={`subcategory-btn ${activeSubcategory === subcategory.id ? 'active' : ''}`}
                        onClick={() => handleSubcategoryClick(subcategory.id)}
                      >
                        {subcategory.name} ({shapes.length})
                      </button>

                      {activeSubcategory === subcategory.id && (
                        <div className="shapes-grid">
                          {shapes.map((shape) => (
                            <button
                              key={shape.id}
                              className={`shape-btn ${selectedShapeId === shape.id ? 'selected' : ''}`}
                              onClick={() => handleShapeClick(shape)}
                            >
                              {shape.name}
                              <span className="shape-desc">{shape.description}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShapeSelector;
