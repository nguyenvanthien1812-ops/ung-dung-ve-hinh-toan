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

  // Đường tròn
  'circle-basic': {
    fields: [
      { name: 'radius', label: 'Bán kính', type: 'number', min: 0.1, max: 20, default: 3, unit: 'đơn vị' },
      { name: 'labelO', label: 'Nhãn tâm', type: 'text', default: 'O' },
      { name: 'showRadius', label: 'Hiển thị bán kính', type: 'checkbox', default: true },
      { name: 'showCenter', label: 'Hiển thị tâm', type: 'checkbox', default: true }
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
