// Form schemas định nghĩa input fields cho từng loại hình

export const FORM_SCHEMAS = {
  // ==================== HÌNH HỌC PHẲNG ====================

  // Tam giác
  'triangle-general': {
    fields: [
      { name: 'sideA', label: 'Cạnh a', type: 'number', min: 0.1, max: 20, default: 5, unit: 'đơn vị' },
      { name: 'sideB', label: 'Cạnh b', type: 'number', min: 0.1, max: 20, default: 4, unit: 'đơn vị' },
      { name: 'sideC', label: 'Cạnh c', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'labelA', label: 'Nhãn đỉnh A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn đỉnh B', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn đỉnh C', type: 'text', default: 'C' },
      { name: 'showSides', label: 'Hiển thị độ dài cạnh', type: 'checkbox', default: true },
      { name: 'showAngles', label: 'Hiển thị góc', type: 'checkbox', default: false }
    ]
  },

  'triangle-right': {
    fields: [
      { name: 'sideA', label: 'Cạnh góc vuông a', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'sideB', label: 'Cạnh góc vuông b', type: 'number', min: 0.1, max: 20, default: 4, unit: 'đơn vị' },
      { name: 'rightAngleAt', label: 'Góc vuông tại', type: 'select', options: ['A', 'B', 'C'], default: 'A' },
      { name: 'labelA', label: 'Nhãn đỉnh A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn đỉnh B', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn đỉnh C', type: 'text', default: 'C' },
      { name: 'showRightAngleSymbol', label: 'Hiển thị ký hiệu góc vuông', type: 'checkbox', default: true },
      { name: 'showSides', label: 'Hiển thị độ dài cạnh', type: 'checkbox', default: true }
    ]
  },

  'triangle-isosceles': {
    fields: [
      { name: 'base', label: 'Cạnh đáy', type: 'number', min: 0.1, max: 20, default: 4, unit: 'đơn vị' },
      { name: 'leg', label: 'Cạnh bên', type: 'number', min: 0.1, max: 20, default: 5, unit: 'đơn vị' },
      { name: 'labelA', label: 'Nhãn đỉnh trên', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn đỉnh đáy trái', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn đỉnh đáy phải', type: 'text', default: 'C' },
      { name: 'showSides', label: 'Hiển thị độ dài cạnh', type: 'checkbox', default: true },
      { name: 'showEqualMarks', label: 'Hiển thị dấu cạnh bằng nhau', type: 'checkbox', default: true }
    ]
  },

  'triangle-equilateral': {
    fields: [
      { name: 'side', label: 'Độ dài cạnh', type: 'number', min: 0.1, max: 20, default: 5, unit: 'đơn vị' },
      { name: 'labelA', label: 'Nhãn đỉnh A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn đỉnh B', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn đỉnh C', type: 'text', default: 'C' },
      { name: 'showSides', label: 'Hiển thị độ dài cạnh', type: 'checkbox', default: true },
      { name: 'showEqualMarks', label: 'Hiển thị dấu cạnh bằng nhau', type: 'checkbox', default: true }
    ]
  },

  'triangle-inscribed': {
    fields: [
      { name: 'radius', label: 'Bán kính đường tròn', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'triangleType', label: 'Loại tam giác', type: 'select', options: ['Thường', 'Vuông', 'Cân', 'Đều'], default: 'Đều' },
      { name: 'labelO', label: 'Nhãn tâm', type: 'text', default: 'O' },
      { name: 'labelA', label: 'Nhãn đỉnh A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn đỉnh B', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn đỉnh C', type: 'text', default: 'C' },
      { name: 'showRadius', label: 'Hiển thị bán kính', type: 'checkbox', default: false }
    ]
  },

  // Tứ giác
  'square': {
    fields: [
      { name: 'side', label: 'Độ dài cạnh', type: 'number', min: 0.1, max: 20, default: 4, unit: 'đơn vị' },
      { name: 'labelA', label: 'Nhãn đỉnh A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn đỉnh B', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn đỉnh C', type: 'text', default: 'C' },
      { name: 'labelD', label: 'Nhãn đỉnh D', type: 'text', default: 'D' },
      { name: 'showDiagonals', label: 'Hiển thị đường chéo', type: 'checkbox', default: false },
      { name: 'showSides', label: 'Hiển thị độ dài cạnh', type: 'checkbox', default: true }
    ]
  },

  'rectangle': {
    fields: [
      { name: 'width', label: 'Chiều rộng', type: 'number', min: 0.1, max: 20, default: 4, unit: 'đơn vị' },
      { name: 'height', label: 'Chiều cao', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'labelA', label: 'Nhãn đỉnh A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn đỉnh B', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn đỉnh C', type: 'text', default: 'C' },
      { name: 'labelD', label: 'Nhãn đỉnh D', type: 'text', default: 'D' },
      { name: 'showDiagonals', label: 'Hiển thị đường chéo', type: 'checkbox', default: false },
      { name: 'showSides', label: 'Hiển thị độ dài cạnh', type: 'checkbox', default: true }
    ]
  },

  'rhombus': {
    fields: [
      { name: 'side', label: 'Độ dài cạnh', type: 'number', min: 0.1, max: 20, default: 4, unit: 'đơn vị' },
      { name: 'angle', label: 'Góc nhọn', type: 'number', min: 10, max: 170, default: 60, unit: '°' },
      { name: 'labelA', label: 'Nhãn đỉnh A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn đỉnh B', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn đỉnh C', type: 'text', default: 'C' },
      { name: 'labelD', label: 'Nhãn đỉnh D', type: 'text', default: 'D' },
      { name: 'showDiagonals', label: 'Hiển thị đường chéo', type: 'checkbox', default: false },
      { name: 'showSides', label: 'Hiển thị độ dài cạnh', type: 'checkbox', default: true }
    ]
  },

  'parallelogram': {
    fields: [
      { name: 'width', label: 'Cạnh đáy', type: 'number', min: 0.1, max: 20, default: 5, unit: 'đơn vị' },
      { name: 'height', label: 'Chiều cao', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'angle', label: 'Góc A', type: 'number', min: 10, max: 170, default: 60, unit: '°' },
      { name: 'labelA', label: 'Nhãn đỉnh A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn đỉnh B', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn đỉnh C', type: 'text', default: 'C' },
      { name: 'labelD', label: 'Nhãn đỉnh D', type: 'text', default: 'D' },
      { name: 'showDiagonals', label: 'Hiển thị đường chéo', type: 'checkbox', default: false },
      { name: 'showSides', label: 'Hiển thị độ dài cạnh', type: 'checkbox', default: true }
    ]
  },

  'trapezoid': {
    fields: [
      { name: 'bottomWidth', label: 'Cạnh đáy lớn', type: 'number', min: 0.1, max: 20, default: 6, unit: 'đơn vị' },
      { name: 'topWidth', label: 'Cạnh đáy nhỏ', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'height', label: 'Chiều cao', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'labelA', label: 'Nhãn đỉnh A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn đỉnh B', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn đỉnh C', type: 'text', default: 'C' },
      { name: 'labelD', label: 'Nhãn đỉnh D', type: 'text', default: 'D' },
      { name: 'showDiagonals', label: 'Hiển thị đường chéo', type: 'checkbox', default: false },
      { name: 'showSides', label: 'Hiển thị độ dài cạnh', type: 'checkbox', default: true }
    ]
  },

  'isosceles-trapezoid': {
    fields: [
      { name: 'bottomWidth', label: 'Cạnh đáy lớn', type: 'number', min: 0.1, max: 20, default: 6, unit: 'đơn vị' },
      { name: 'topWidth', label: 'Cạnh đáy nhỏ', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'height', label: 'Chiều cao', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'labelA', label: 'Nhãn đỉnh A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn đỉnh B', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn đỉnh C', type: 'text', default: 'C' },
      { name: 'labelD', label: 'Nhãn đỉnh D', type: 'text', default: 'D' },
      { name: 'showDiagonals', label: 'Hiển thị đường chéo', type: 'checkbox', default: false },
      { name: 'showSides', label: 'Hiển thị độ dài cạnh', type: 'checkbox', default: true }
    ]
  },

  'kite': {
    fields: [
      { name: 'diagH', label: 'Đường chéo dài', type: 'number', min: 0.1, max: 20, default: 5, unit: 'đơn vị' },
      { name: 'diagW', label: 'Đường chéo ngang', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'topRatio', label: 'Tỉ lệ phần trên (0-1)', type: 'number', min: 0.1, max: 0.9, default: 0.35, step: 0.05 },
      { name: 'labelA', label: 'Nhãn đỉnh trên', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn đỉnh phải', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn đỉnh dưới', type: 'text', default: 'C' },
      { name: 'labelD', label: 'Nhãn đỉnh trái', type: 'text', default: 'D' },
      { name: 'showDiagonals', label: 'Hiển thị đường chéo', type: 'checkbox', default: false }
    ]
  },

  'quadrilateral-general': {
    fields: [
      { name: 'ax', label: 'A: tọa độ x', type: 'number', min: -10, max: 20, default: 0, step: 0.5 },
      { name: 'ay', label: 'A: tọa độ y', type: 'number', min: -10, max: 20, default: 0, step: 0.5 },
      { name: 'bx', label: 'B: tọa độ x', type: 'number', min: -10, max: 20, default: 5, step: 0.5 },
      { name: 'by', label: 'B: tọa độ y', type: 'number', min: -10, max: 20, default: 0, step: 0.5 },
      { name: 'cx', label: 'C: tọa độ x', type: 'number', min: -10, max: 20, default: 6, step: 0.5 },
      { name: 'cy', label: 'C: tọa độ y', type: 'number', min: -10, max: 20, default: 4, step: 0.5 },
      { name: 'dx', label: 'D: tọa độ x', type: 'number', min: -10, max: 20, default: 1, step: 0.5 },
      { name: 'dy', label: 'D: tọa độ y', type: 'number', min: -10, max: 20, default: 4, step: 0.5 },
      { name: 'labelA', label: 'Nhãn đỉnh A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn đỉnh B', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn đỉnh C', type: 'text', default: 'C' },
      { name: 'labelD', label: 'Nhãn đỉnh D', type: 'text', default: 'D' }
    ]
  },

  // Đường tròn
  // Đa giác
  'pentagon': {
    fields: [
      { name: 'radius', label: 'Bán kính ngoại tiếp', type: 'number', min: 0.5, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'showSides', label: 'Hiển thị độ dài cạnh', type: 'checkbox', default: true }
    ]
  },

  'pentagon-regular': {
    fields: [
      { name: 'radius', label: 'Bán kính ngoại tiếp', type: 'number', min: 0.5, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'showSides', label: 'Hiển thị độ dài cạnh', type: 'checkbox', default: true }
    ]
  },

  'hexagon': {
    fields: [
      { name: 'radius', label: 'Bán kính ngoại tiếp', type: 'number', min: 0.5, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'showSides', label: 'Hiển thị độ dài cạnh', type: 'checkbox', default: true }
    ]
  },

  'hexagon-regular': {
    fields: [
      { name: 'radius', label: 'Bán kính ngoại tiếp', type: 'number', min: 0.5, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'showSides', label: 'Hiển thị độ dài cạnh', type: 'checkbox', default: true }
    ]
  },

  'octagon-regular': {
    fields: [
      { name: 'radius', label: 'Bán kính ngoại tiếp', type: 'number', min: 0.5, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'showSides', label: 'Hiển thị độ dài cạnh', type: 'checkbox', default: true }
    ]
  },

  'polygon-regular': {
    fields: [
      { name: 'sides', label: 'Số cạnh', type: 'number', min: 3, max: 12, default: 6 },
      { name: 'radius', label: 'Bán kính ngoại tiếp', type: 'number', min: 0.5, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'showSides', label: 'Hiển thị độ dài cạnh', type: 'checkbox', default: true }
    ]
  },

  // Tam giác đặc biệt
  'triangle-with-medians': {
    fields: [
      { name: 'sideA', label: 'Cạnh a', type: 'number', min: 0.1, max: 20, default: 5, unit: 'đơn vị' },
      { name: 'sideB', label: 'Cạnh b', type: 'number', min: 0.1, max: 20, default: 4, unit: 'đơn vị' },
      { name: 'sideC', label: 'Cạnh c', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'labelA', label: 'Nhãn đỉnh A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn đỉnh B', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn đỉnh C', type: 'text', default: 'C' }
    ]
  },

  'triangle-with-altitudes': {
    fields: [
      { name: 'sideA', label: 'Cạnh a', type: 'number', min: 0.1, max: 20, default: 5, unit: 'đơn vị' },
      { name: 'sideB', label: 'Cạnh b', type: 'number', min: 0.1, max: 20, default: 4, unit: 'đơn vị' },
      { name: 'sideC', label: 'Cạnh c', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'labelA', label: 'Nhãn đỉnh A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn đỉnh B', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn đỉnh C', type: 'text', default: 'C' }
    ]
  },

  'triangle-with-bisectors': {
    fields: [
      { name: 'sideA', label: 'Cạnh a', type: 'number', min: 0.1, max: 20, default: 5, unit: 'đơn vị' },
      { name: 'sideB', label: 'Cạnh b', type: 'number', min: 0.1, max: 20, default: 4, unit: 'đơn vị' },
      { name: 'sideC', label: 'Cạnh c', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'labelA', label: 'Nhãn đỉnh A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn đỉnh B', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn đỉnh C', type: 'text', default: 'C' }
    ]
  },

  'circle-basic': {
    fields: [
      { name: 'radius', label: 'Bán kính', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'labelO', label: 'Nhãn tâm', type: 'text', default: 'O' },
      { name: 'showRadius', label: 'Hiển thị bán kính', type: 'checkbox', default: true },
      { name: 'showCenter', label: 'Hiển thị tâm', type: 'checkbox', default: true }
    ]
  },

  'circle-chord': {
    fields: [
      { name: 'radius', label: 'Bán kính', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'chordAngle', label: 'Góc dây cung (°)', type: 'number', min: 10, max: 350, default: 60, unit: '°' },
      { name: 'labelO', label: 'Nhãn tâm', type: 'text', default: 'O' },
      { name: 'labelA', label: 'Nhãn điểm A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn điểm B', type: 'text', default: 'B' },
      { name: 'showRadius', label: 'Hiển thị bán kính', type: 'checkbox', default: true }
    ]
  },

  'circle-tangent': {
    fields: [
      { name: 'radius', label: 'Bán kính đường tròn', type: 'number', min: 0.1, max: 20, default: 2, unit: 'đơn vị' },
      { name: 'distance', label: 'Khoảng cách từ M đến O', type: 'number', min: 0.1, max: 20, default: 5, unit: 'đơn vị' },
      { name: 'labelO', label: 'Nhãn tâm', type: 'text', default: 'O' },
      { name: 'labelM', label: 'Nhãn điểm ngoài', type: 'text', default: 'M' },
      { name: 'labelA', label: 'Nhãn tiếp điểm 1', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn tiếp điểm 2', type: 'text', default: 'B' },
      { name: 'showBothTangents', label: 'Hiển thị cả 2 tiếp tuyến', type: 'checkbox', default: true }
    ]
  },

  'circle-secant': {
    fields: [
      { name: 'radius', label: 'Bán kính', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'distance', label: 'Khoảng cách từ tâm đến cát tuyến', type: 'number', min: 0, max: 19, default: 1.5, step: 0.1, unit: 'đơn vị' },
      { name: 'labelO', label: 'Nhãn tâm', type: 'text', default: 'O' },
      { name: 'labelA', label: 'Nhãn giao điểm A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn giao điểm B', type: 'text', default: 'B' }
    ]
  },

  'two-circles-intersect': {
    fields: [
      { name: 'radius1', label: 'Bán kính R₁', type: 'number', min: 0.5, max: 20, default: 2, unit: 'đơn vị' },
      { name: 'radius2', label: 'Bán kính R₂', type: 'number', min: 0.5, max: 20, default: 2, unit: 'đơn vị' },
      { name: 'distance', label: 'Khoảng cách tâm', type: 'number', min: 0.5, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'labelO1', label: 'Nhãn tâm O₁', type: 'text', default: 'O' },
      { name: 'labelO2', label: "Nhãn tâm O₂", type: 'text', default: "O'" }
    ]
  },

  'two-circles-tangent-external': {
    fields: [
      { name: 'radius1', label: 'Bán kính R₁', type: 'number', min: 0.5, max: 20, default: 2, unit: 'đơn vị' },
      { name: 'radius2', label: 'Bán kính R₂', type: 'number', min: 0.5, max: 20, default: 1.5, unit: 'đơn vị' },
      { name: 'labelO1', label: 'Nhãn tâm O₁', type: 'text', default: 'O' },
      { name: 'labelO2', label: "Nhãn tâm O₂", type: 'text', default: "O'" }
    ]
  },

  'two-circles-tangent-internal': {
    fields: [
      { name: 'radius1', label: 'Bán kính lớn R₁', type: 'number', min: 1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'radius2', label: 'Bán kính nhỏ R₂', type: 'number', min: 0.5, max: 19, default: 1.5, unit: 'đơn vị' },
      { name: 'labelO1', label: 'Nhãn tâm O₁', type: 'text', default: 'O' },
      { name: 'labelO2', label: "Nhãn tâm O₂", type: 'text', default: "O'" }
    ]
  },

  'circle-sector': {
    fields: [
      { name: 'radius', label: 'Bán kính', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'sectorAngle', label: 'Góc ở tâm (°)', type: 'number', min: 5, max: 355, default: 60, unit: '°' },
      { name: 'startAngle', label: 'Góc bắt đầu (°)', type: 'number', min: 0, max: 360, default: 0, unit: '°' },
      { name: 'labelO', label: 'Nhãn tâm', type: 'text', default: 'O' },
      { name: 'labelA', label: 'Nhãn điểm A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn điểm B', type: 'text', default: 'B' },
      { name: 'showRadius', label: 'Hiển thị bán kính', type: 'checkbox', default: true }
    ]
  },

  'circle-segment': {
    fields: [
      { name: 'radius', label: 'Bán kính', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'chordAngle', label: 'Góc dây cung (°)', type: 'number', min: 5, max: 175, default: 60, unit: '°' },
      { name: 'labelO', label: 'Nhãn tâm', type: 'text', default: 'O' },
      { name: 'labelA', label: 'Nhãn điểm A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn điểm B', type: 'text', default: 'B' }
    ]
  },

  // ==================== HÌNH HỌC KHÔNG GIAN ====================

  'pyramid-triangular': {
    fields: [
      { name: 'baseSize', label: 'Cạnh đáy', type: 'number', min: 0.1, max: 20, default: 4, unit: 'đơn vị' },
      { name: 'height', label: 'Chiều cao', type: 'number', min: 0.1, max: 20, default: 5, unit: 'đơn vị' },
      { name: 'perspective', label: 'Góc nhìn', type: 'select', options: ['Trước', 'Trái', 'Phải'], default: 'Trước' },
      { name: 'labelS', label: 'Nhãn đỉnh', type: 'text', default: 'S' },
      { name: 'labelA', label: 'Nhãn đáy A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn đáy B', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn đáy C', type: 'text', default: 'C' },
      { name: 'showHiddenEdges', label: 'Hiển thị cạnh khuất', type: 'checkbox', default: true },
      { name: 'showHeight', label: 'Hiển thị đường cao', type: 'checkbox', default: false }
    ]
  },

  'pyramid-square': {
    fields: [
      { name: 'baseSize', label: 'Cạnh đáy', type: 'number', min: 0.1, max: 20, default: 4, unit: 'đơn vị' },
      { name: 'height', label: 'Chiều cao', type: 'number', min: 0.1, max: 20, default: 5, unit: 'đơn vị' },
      { name: 'perspective', label: 'Góc nhìn', type: 'select', options: ['Trước', 'Trái', 'Phải'], default: 'Trước' },
      { name: 'labelS', label: 'Nhãn đỉnh', type: 'text', default: 'S' },
      { name: 'labelA', label: 'Nhãn đáy A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn đáy B', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn đáy C', type: 'text', default: 'C' },
      { name: 'labelD', label: 'Nhãn đáy D', type: 'text', default: 'D' },
      { name: 'showHiddenEdges', label: 'Hiển thị cạnh khuất', type: 'checkbox', default: true },
      { name: 'showHeight', label: 'Hiển thị đường cao', type: 'checkbox', default: false }
    ]
  },

  'cube': {
    fields: [
      { name: 'side', label: 'Độ dài cạnh', type: 'number', min: 0.1, max: 20, default: 4, unit: 'đơn vị' },
      { name: 'perspective', label: 'Góc nhìn', type: 'select', options: ['Trước', 'Trái', 'Phải', 'Trên'], default: 'Trước' },
      { name: 'labelA', label: 'Nhãn đỉnh A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn đỉnh B', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn đỉnh C', type: 'text', default: 'C' },
      { name: 'labelD', label: 'Nhãn đỉnh D', type: 'text', default: 'D' },
      { name: 'showHiddenEdges', label: 'Hiển thị cạnh khuất', type: 'checkbox', default: true },
      { name: 'showDiagonals', label: 'Hiển thị đường chéo', type: 'checkbox', default: false }
    ]
  },

  'cylinder': {
    fields: [
      { name: 'radius', label: 'Bán kính đáy', type: 'number', min: 0.1, max: 20, default: 2, unit: 'đơn vị' },
      { name: 'height', label: 'Chiều cao', type: 'number', min: 0.1, max: 20, default: 5, unit: 'đơn vị' },
      { name: 'perspective', label: 'Góc nhìn', type: 'select', options: ['Trước', 'Nghiêng'], default: 'Nghiêng' },
      { name: 'showAxis', label: 'Hiển thị trục', type: 'checkbox', default: true },
      { name: 'showHiddenLines', label: 'Hiển thị đường khuất', type: 'checkbox', default: true }
    ]
  },

  'cone': {
    fields: [
      { name: 'radius', label: 'Bán kính đáy', type: 'number', min: 0.1, max: 20, default: 2, unit: 'đơn vị' },
      { name: 'height', label: 'Chiều cao', type: 'number', min: 0.1, max: 20, default: 5, unit: 'đơn vị' },
      { name: 'perspective', label: 'Góc nhìn', type: 'select', options: ['Trước', 'Nghiêng'], default: 'Nghiêng' },
      { name: 'labelS', label: 'Nhãn đỉnh', type: 'text', default: 'S' },
      { name: 'labelO', label: 'Nhãn tâm đáy', type: 'text', default: 'O' },
      { name: 'showAxis', label: 'Hiển thị trục', type: 'checkbox', default: true },
      { name: 'showGeneratrix', label: 'Hiển thị đường sinh', type: 'checkbox', default: true }
    ]
  },

  'sphere': {
    fields: [
      { name: 'radius', label: 'Bán kính', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'labelO', label: 'Nhãn tâm', type: 'text', default: 'O' },
      { name: 'showGreatCircle', label: 'Hiển thị đường tròn lớn', type: 'checkbox', default: true },
      { name: 'showAxis', label: 'Hiển thị trục', type: 'checkbox', default: false }
    ]
  },

  // ==================== ĐỒ THỊ HÀM SỐ ====================

  'linear': {
    fields: [
      { name: 'a', label: 'Hệ số a', type: 'number', min: -10, max: 10, default: 1, step: 0.1 },
      { name: 'b', label: 'Hệ số b', type: 'number', min: -10, max: 10, default: 0, step: 0.1 },
      { name: 'minX', label: 'X min', type: 'number', default: -5 },
      { name: 'maxX', label: 'X max', type: 'number', default: 5 },
      { name: 'showGrid', label: 'Hiển thị lưới', type: 'checkbox', default: true },
      { name: 'showAxis', label: 'Hiển thị trục tọa độ', type: 'checkbox', default: true }
    ]
  },

  'quadratic': {
    fields: [
      { name: 'a', label: 'Hệ số a', type: 'number', min: -10, max: 10, default: 1, step: 0.1 },
      { name: 'b', label: 'Hệ số b', type: 'number', min: -10, max: 10, default: 0, step: 0.1 },
      { name: 'c', label: 'Hệ số c', type: 'number', min: -10, max: 10, default: 0, step: 0.1 },
      { name: 'minX', label: 'X min', type: 'number', default: -5 },
      { name: 'maxX', label: 'X max', type: 'number', default: 5 },
      { name: 'showGrid', label: 'Hiển thị lưới', type: 'checkbox', default: true },
      { name: 'showVertex', label: 'Hiển thị đỉnh parabol', type: 'checkbox', default: true },
      { name: 'showAxis', label: 'Hiển thị trục tọa độ', type: 'checkbox', default: true }
    ]
  },

  'cubic': {
    fields: [
      { name: 'a', label: 'Hệ số a', type: 'number', min: -10, max: 10, default: 1, step: 0.1 },
      { name: 'b', label: 'Hệ số b', type: 'number', min: -10, max: 10, default: 0, step: 0.1 },
      { name: 'c', label: 'Hệ số c', type: 'number', min: -10, max: 10, default: 0, step: 0.1 },
      { name: 'd', label: 'Hệ số d', type: 'number', min: -10, max: 10, default: 0, step: 0.1 },
      { name: 'minX', label: 'X min', type: 'number', default: -5 },
      { name: 'maxX', label: 'X max', type: 'number', default: 5 },
      { name: 'showGrid', label: 'Hiển thị lưới', type: 'checkbox', default: true },
      { name: 'showAxis', label: 'Hiển thị trục tọa độ', type: 'checkbox', default: true }
    ]
  },

  'hyperbola': {
    fields: [
      { name: 'k', label: 'Hệ số k', type: 'number', min: -10, max: 10, default: 1, step: 0.1 },
      { name: 'minX', label: 'X min', type: 'number', default: -5 },
      { name: 'maxX', label: 'X max', type: 'number', default: 5 },
      { name: 'showGrid', label: 'Hiển thị lưới', type: 'checkbox', default: true },
      { name: 'showAsymptotes', label: 'Hiển thị tiệm cận', type: 'checkbox', default: true },
      { name: 'showAxis', label: 'Hiển thị trục tọa độ', type: 'checkbox', default: true }
    ]
  },

  'sine': {
    fields: [
      { name: 'amplitude', label: 'Biên độ A', type: 'number', min: 0.1, max: 10, default: 1, step: 0.1 },
      { name: 'frequency', label: 'Tần số B', type: 'number', min: 0.1, max: 10, default: 1, step: 0.1 },
      { name: 'phase', label: 'Pha C', type: 'number', min: -10, max: 10, default: 0, step: 0.1 },
      { name: 'offset', label: 'Dịch D', type: 'number', min: -10, max: 10, default: 0, step: 0.1 },
      { name: 'minX', label: 'X min', type: 'number', default: -6.28 },
      { name: 'maxX', label: 'X max', type: 'number', default: 6.28 },
      { name: 'showGrid', label: 'Hiển thị lưới', type: 'checkbox', default: true },
      { name: 'showAxis', label: 'Hiển thị trục tọa độ', type: 'checkbox', default: true }
    ]
  },

  // ==================== VECTƠ ====================

  'vector-2d': {
    fields: [
      { name: 'x', label: 'Tọa độ x', type: 'number', min: -10, max: 10, default: 3, step: 0.1 },
      { name: 'y', label: 'Tọa độ y', type: 'number', min: -10, max: 10, default: 2, step: 0.1 },
      { name: 'startX', label: 'Điểm đầu x', type: 'number', min: -10, max: 10, default: 0, step: 0.1 },
      { name: 'startY', label: 'Điểm đầu y', type: 'number', min: -10, max: 10, default: 0, step: 0.1 },
      { name: 'label', label: 'Nhãn vectơ', type: 'text', default: 'a' },
      { name: 'showComponents', label: 'Hiển thị thành phần', type: 'checkbox', default: true },
      { name: 'showGrid', label: 'Hiển thị lưới', type: 'checkbox', default: true }
    ]
  },

  'vector-sum': {
    fields: [
      { name: 'x1', label: 'Vectơ a - x', type: 'number', min: -10, max: 10, default: 3, step: 0.1 },
      { name: 'y1', label: 'Vectơ a - y', type: 'number', min: -10, max: 10, default: 2, step: 0.1 },
      { name: 'x2', label: 'Vectơ b - x', type: 'number', min: -10, max: 10, default: 1, step: 0.1 },
      { name: 'y2', label: 'Vectơ b - y', type: 'number', min: -10, max: 10, default: 3, step: 0.1 },
      { name: 'method', label: 'Phương pháp', type: 'select', options: ['Hình bình hành', 'Nối tiếp'], default: 'Hình bình hành' },
      { name: 'showGrid', label: 'Hiển thị lưới', type: 'checkbox', default: true }
    ]
  },

  // ==================== ĐỒ THỊ BỔ SUNG ====================

  'tangent': {
    fields: [
      { name: 'amplitude', label: 'Biên độ A', type: 'number', min: 0.1, max: 10, default: 1, step: 0.1 },
      { name: 'frequency', label: 'Tần số B', type: 'number', min: 0.1, max: 10, default: 1, step: 0.1 },
      { name: 'minX', label: 'X min', type: 'number', default: -2 },
      { name: 'maxX', label: 'X max', type: 'number', default: 2 },
      { name: 'showGrid', label: 'Hiển thị lưới', type: 'checkbox', default: true },
      { name: 'showAxis', label: 'Hiển thị trục tọa độ', type: 'checkbox', default: true },
      { name: 'showAsymptotes', label: 'Hiển thị tiệm cận', type: 'checkbox', default: true }
    ]
  },

  'exponential': {
    fields: [
      { name: 'base', label: 'Cơ số a', type: 'number', min: 0.1, max: 10, default: 2, step: 0.1 },
      { name: 'minX', label: 'X min', type: 'number', default: -3 },
      { name: 'maxX', label: 'X max', type: 'number', default: 3 },
      { name: 'showGrid', label: 'Hiển thị lưới', type: 'checkbox', default: true },
      { name: 'showAxis', label: 'Hiển thị trục tọa độ', type: 'checkbox', default: true }
    ]
  },

  'logarithm': {
    fields: [
      { name: 'minX', label: 'X min', type: 'number', default: 0.1 },
      { name: 'maxX', label: 'X max', type: 'number', default: 10 },
      { name: 'showGrid', label: 'Hiển thị lưới', type: 'checkbox', default: true },
      { name: 'showAxis', label: 'Hiển thị trục tọa độ', type: 'checkbox', default: true },
      { name: 'showAsymptotes', label: 'Hiển thị tiệm cận', type: 'checkbox', default: true }
    ]
  },

  'absolute-linear': {
    fields: [
      { name: 'a', label: 'Hệ số a', type: 'number', min: -10, max: 10, default: 1, step: 0.1 },
      { name: 'b', label: 'Hệ số b', type: 'number', min: -10, max: 10, default: 0, step: 0.1 },
      { name: 'minX', label: 'X min', type: 'number', default: -5 },
      { name: 'maxX', label: 'X max', type: 'number', default: 5 },
      { name: 'showGrid', label: 'Hiển thị lưới', type: 'checkbox', default: true },
      { name: 'showAxis', label: 'Hiển thị trục tọa độ', type: 'checkbox', default: true }
    ]
  },

  'absolute-quadratic': {
    fields: [
      { name: 'a', label: 'Hệ số a', type: 'number', min: -10, max: 10, default: 1, step: 0.1 },
      { name: 'b', label: 'Hệ số b', type: 'number', min: -10, max: 10, default: -2, step: 0.1 },
      { name: 'c', label: 'Hệ số c', type: 'number', min: -10, max: 10, default: -3, step: 0.1 },
      { name: 'minX', label: 'X min', type: 'number', default: -5 },
      { name: 'maxX', label: 'X max', type: 'number', default: 5 },
      { name: 'showGrid', label: 'Hiển thị lưới', type: 'checkbox', default: true },
      { name: 'showAxis', label: 'Hiển thị trục tọa độ', type: 'checkbox', default: true }
    ]
  },

  // ==================== MẶT PHẲNG & ĐƯỜNG THẲNG KHÔNG GIAN ====================

  'plane-basic': {
    fields: [
      { name: 'planeName', label: 'Tên mặt phẳng', type: 'text', default: 'α' },
      { name: 'showLabels', label: 'Hiển thị nhãn góc', type: 'checkbox', default: false },
      { name: 'labelA', label: 'Nhãn góc A', type: 'text', default: 'A' },
      { name: 'labelB', label: 'Nhãn góc B', type: 'text', default: 'B' },
      { name: 'labelC', label: 'Nhãn góc C', type: 'text', default: 'C' },
      { name: 'labelD', label: 'Nhãn góc D', type: 'text', default: 'D' }
    ]
  },

  'line-plane-intersect': {
    fields: [
      { name: 'planeName', label: 'Tên mặt phẳng', type: 'text', default: 'α' },
      { name: 'lineName', label: 'Tên đường thẳng', type: 'text', default: 'd' },
      { name: 'intersectLabel', label: 'Nhãn điểm giao', type: 'text', default: 'A' }
    ]
  },

  'two-planes-intersect': {
    fields: [
      { name: 'plane1Name', label: 'Tên mặt phẳng 1', type: 'text', default: 'α' },
      { name: 'plane2Name', label: 'Tên mặt phẳng 2', type: 'text', default: 'β' },
      { name: 'intersectLineName', label: 'Tên giao tuyến', type: 'text', default: 'd' }
    ]
  },

  'line-perpendicular-plane': {
    fields: [
      { name: 'planeName', label: 'Tên mặt phẳng', type: 'text', default: 'α' },
      { name: 'lineName', label: 'Tên đường thẳng', type: 'text', default: 'd' },
      { name: 'footLabel', label: 'Nhãn chân đường vuông góc', type: 'text', default: 'H' },
      { name: 'showFoot', label: 'Hiển thị chân', type: 'checkbox', default: true }
    ]
  },

  // ==================== VECTƠ 3D ====================

  'vector-3d': {
    fields: [
      { name: 'x', label: 'Tọa độ x', type: 'number', min: -10, max: 10, default: 2, step: 0.5 },
      { name: 'y', label: 'Tọa độ y', type: 'number', min: -10, max: 10, default: 2, step: 0.5 },
      { name: 'z', label: 'Tọa độ z', type: 'number', min: -10, max: 10, default: 3, step: 0.5 },
      { name: 'label', label: 'Nhãn vectơ', type: 'text', default: 'a' },
      { name: 'showComponents', label: 'Hiển thị thành phần', type: 'checkbox', default: true }
    ]
  },

  'vector-3d-sum': {
    fields: [
      { name: 'x1', label: 'Vectơ a - x', type: 'number', min: -10, max: 10, default: 2, step: 0.5 },
      { name: 'y1', label: 'Vectơ a - y', type: 'number', min: -10, max: 10, default: 1, step: 0.5 },
      { name: 'z1', label: 'Vectơ a - z', type: 'number', min: -10, max: 10, default: 1, step: 0.5 },
      { name: 'x2', label: 'Vectơ b - x', type: 'number', min: -10, max: 10, default: 1, step: 0.5 },
      { name: 'y2', label: 'Vectơ b - y', type: 'number', min: -10, max: 10, default: 2, step: 0.5 },
      { name: 'z2', label: 'Vectơ b - z', type: 'number', min: -10, max: 10, default: 1, step: 0.5 }
    ]
  },

  'vector-cross-product': {
    fields: [
      { name: 'x1', label: 'Vectơ a - x', type: 'number', min: -10, max: 10, default: 3, step: 0.5 },
      { name: 'y1', label: 'Vectơ a - y', type: 'number', min: -10, max: 10, default: 0, step: 0.5 },
      { name: 'z1', label: 'Vectơ a - z', type: 'number', min: -10, max: 10, default: 0, step: 0.5 },
      { name: 'x2', label: 'Vectơ b - x', type: 'number', min: -10, max: 10, default: 0, step: 0.5 },
      { name: 'y2', label: 'Vectơ b - y', type: 'number', min: -10, max: 10, default: 3, step: 0.5 },
      { name: 'z2', label: 'Vectơ b - z', type: 'number', min: -10, max: 10, default: 0, step: 0.5 }
    ]
  },

  'coordinate-system-3d': {
    fields: [
      { name: 'axisLength', label: 'Độ dài trục', type: 'number', min: 2, max: 10, default: 4, step: 0.5 },
      { name: 'labelX', label: 'Nhãn trục x', type: 'text', default: 'x' },
      { name: 'labelY', label: 'Nhãn trục y', type: 'text', default: 'y' },
      { name: 'labelZ', label: 'Nhãn trục z', type: 'text', default: 'z' }
    ]
  },

  // ==================== BẢNG BIẾN THIÊN ====================

  'bbt-quadratic': {
    fields: [
      { name: 'a', label: 'Hệ số a', type: 'number', min: -10, max: 10, step: 0.5, default: 1 },
      { name: 'b', label: 'Hệ số b', type: 'number', min: -20, max: 20, step: 0.5, default: -2 },
      { name: 'c', label: 'Hệ số c', type: 'number', min: -20, max: 20, step: 0.5, default: 1 }
    ]
  },

  'bbt-cubic': {
    fields: [
      { name: 'a', label: 'Hệ số a', type: 'number', min: -5, max: 5, step: 0.5, default: 1 },
      { name: 'b', label: 'Hệ số b', type: 'number', min: -10, max: 10, step: 0.5, default: -3 },
      { name: 'c', label: 'Hệ số c', type: 'number', min: -10, max: 10, step: 0.5, default: 0 },
      { name: 'd', label: 'Hệ số d', type: 'number', min: -10, max: 10, step: 0.5, default: 2 }
    ]
  },

  'bbt-rational-11': {
    fields: [
      { name: 'numerA', label: 'Tử số: hệ số a', type: 'number', min: -10, max: 10, step: 1, default: 1 },
      { name: 'numerB', label: 'Tử số: hệ số b', type: 'number', min: -10, max: 10, step: 1, default: 0 },
      { name: 'denomC', label: 'Mẫu số: hệ số c', type: 'number', min: -10, max: 10, step: 1, default: 1 },
      { name: 'denomD', label: 'Mẫu số: hệ số d', type: 'number', min: -10, max: 10, step: 1, default: -1 }
    ]
  },

  'bbt-custom': {
    fields: [
      { name: 'critPoints', label: 'Điểm tới hạn x (cách nhau bởi dấu phẩy)', type: 'text', default: '-1, 2' },
      { name: 'intervalSigns', label: 'Dấu f\'(x) trong từng khoảng (+/-)', type: 'text', default: '+, -, +' },
      { name: 'fxAtCrits', label: 'Giá trị f(x) tại điểm tới hạn', type: 'text', default: '3, -1' },
      { name: 'fxAtLeft', label: 'Giá trị f(x) khi x→-∞', type: 'text', default: '+∞' },
      { name: 'fxAtRight', label: 'Giá trị f(x) khi x→+∞', type: 'text', default: '+∞' }
    ]
  }
};

// Helper function để lấy schema theo shape id
export function getFormSchema(shapeId) {
  return FORM_SCHEMAS[shapeId] || null;
}

// Helper function để lấy giá trị mặc định
export function getDefaultValues(shapeId) {
  const schema = FORM_SCHEMAS[shapeId];
  if (!schema) return {};

  const defaults = {};
  schema.fields.forEach(field => {
    defaults[field.name] = field.default;
  });
  return defaults;
}
