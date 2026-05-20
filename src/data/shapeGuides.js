// Hướng dẫn sử dụng cho từng loại hình vẽ
// Cấu trúc: { description, tips[], examples[] }

export const SHAPE_GUIDES = {

  // ==================== TAM GIÁC ====================

  'triangle-general': {
    description: 'Vẽ tam giác bất kỳ từ 3 độ dài cạnh. Hệ thống tự tính tọa độ các đỉnh.',
    tips: [
      'Ba cạnh phải thỏa điều kiện tam giác: tổng 2 cạnh bất kỳ > cạnh còn lại',
      'Nhãn đỉnh có thể là chữ cái, số, hoặc ký hiệu bất kỳ',
      'Bật "Hiển thị độ dài cạnh" để ghi độ dài lên mỗi cạnh',
    ],
    examples: [
      { label: 'Tam giác vuông Pythagore', values: 'a=3, b=4, c=5' },
      { label: 'Tam giác đều', values: 'a=5, b=5, c=5' },
      { label: 'Tam giác cân', values: 'a=4, b=6, c=6' },
    ],
  },

  'triangle-right': {
    description: 'Vẽ tam giác vuông với góc vuông chính xác 90°. Nhập 2 cạnh góc vuông.',
    tips: [
      '"Góc vuông tại" chọn đỉnh nào sẽ có ký hiệu vuông □',
      'Cạnh huyền được tính tự động theo định lý Pythagore',
      'Bật "Hiển thị ký hiệu góc vuông" để thêm ký hiệu □ vào góc vuông',
    ],
    examples: [
      { label: 'Tam giác vuông 3-4', values: 'a=3, b=4, góc vuông tại A' },
      { label: 'Tam giác vuông cân', values: 'a=4, b=4, góc vuông tại A' },
    ],
  },

  'triangle-isosceles': {
    description: 'Vẽ tam giác cân với đáy và 2 cạnh bên bằng nhau.',
    tips: [
      '"Cạnh đáy" là cạnh không bằng nhau, "Cạnh bên" là 2 cạnh bằng nhau',
      'Điều kiện: 2 × cạnh bên > cạnh đáy',
      'Bật "Hiển thị dấu cạnh bằng nhau" để thêm ký hiệu gạch nhỏ trên 2 cạnh bên',
    ],
    examples: [
      { label: 'Tam giác cân điển hình', values: 'đáy=4, cạnh bên=5' },
      { label: 'Gần tam giác đều', values: 'đáy=5, cạnh bên=5' },
    ],
  },

  'triangle-equilateral': {
    description: 'Vẽ tam giác đều với 3 cạnh bằng nhau và 3 góc 60°.',
    tips: [
      'Chỉ cần nhập 1 số — độ dài cạnh',
      'Tâm tam giác đều nằm tại giao điểm của 3 đường trung tuyến',
    ],
    examples: [
      { label: 'Tam giác đều vừa', values: 'cạnh=5' },
      { label: 'Tam giác đều nhỏ', values: 'cạnh=3' },
    ],
  },

  'triangle-inscribed': {
    description: 'Vẽ tam giác nội tiếp đường tròn (tam giác nằm trong đường tròn).',
    tips: [
      '"Bán kính R" là bán kính đường tròn ngoại tiếp tam giác',
      '"Góc A" xác định vị trí đỉnh A trên đường tròn (0°–360°)',
      'Góc A, B, C xác định hình dạng tam giác — thay đổi để ra tam giác vuông, tù, nhọn',
    ],
    examples: [
      { label: 'Tam giác trong đường tròn R=3', values: 'R=3, góc A=90°, B=210°, C=330°' },
    ],
  },

  'triangle-circumscribed': {
    description: 'Vẽ tam giác ngoại tiếp đường tròn (đường tròn nằm trong tam giác, tiếp xúc 3 cạnh).',
    tips: [
      '"Bán kính r" là bán kính đường tròn nội tiếp',
      'Tam giác được xây dựng từ 3 góc, đường tròn nội tiếp có tâm I',
    ],
    examples: [
      { label: 'Tam giác ngoại tiếp đường tròn r=2', values: 'r=2' },
    ],
  },

  // ==================== TỨ GIÁC ====================

  'square': {
    description: 'Vẽ hình vuông với 4 cạnh bằng nhau và 4 góc vuông.',
    tips: [
      'Chỉ cần nhập 1 thông số — độ dài cạnh',
      'Nhãn 4 đỉnh mặc định là A, B, C, D (theo chiều kim đồng hồ)',
    ],
    examples: [
      { label: 'Hình vuông cạnh 4', values: 'cạnh=4' },
    ],
  },

  'rectangle': {
    description: 'Vẽ hình chữ nhật với chiều dài và chiều rộng tùy chọn.',
    tips: [
      'Nhập "Chiều rộng" (cạnh nằm ngang) và "Chiều cao" (cạnh đứng)',
      'Hệ thống tự vẽ 4 ký hiệu góc vuông',
    ],
    examples: [
      { label: 'Hình chữ nhật 6×4', values: 'rộng=6, cao=4' },
      { label: 'Hình chữ nhật vàng', values: 'rộng=6, cao=3.7' },
    ],
  },

  'rhombus': {
    description: 'Vẽ hình thoi với 4 cạnh bằng nhau, nhập từ độ dài 2 đường chéo.',
    tips: [
      '"Đường chéo lớn d1" và "Đường chéo nhỏ d2" — d1 ≥ d2',
      '2 đường chéo vuông góc nhau tại trung điểm mỗi đường',
      'Bật "Hiển thị đường chéo" để vẽ đường chéo bằng nét đứt',
    ],
    examples: [
      { label: 'Hình thoi d1=6, d2=4', values: 'd1=6, d2=4' },
      { label: 'Hình vuông (d1=d2)', values: 'd1=5, d2=5' },
    ],
  },

  'parallelogram': {
    description: 'Vẽ hình bình hành với 2 cặp cạnh đối song song và bằng nhau.',
    tips: [
      '"Cạnh đáy a" là cạnh nằm ngang, "Cạnh bên b" là cạnh nghiêng',
      '"Góc A" xác định độ nghiêng của hình (30°–150° cho đẹp nhất)',
      'Góc A = 90° cho ra hình chữ nhật',
    ],
    examples: [
      { label: 'Hình bình hành điển hình', values: 'a=5, b=3, góc=60°' },
      { label: 'Hình bình hành dẹt', values: 'a=6, b=2, góc=30°' },
    ],
  },

  'trapezoid': {
    description: 'Vẽ hình thang với 1 cặp cạnh đối song song (đáy lớn và đáy nhỏ).',
    tips: [
      '"Đáy lớn a" và "Đáy nhỏ b" — a > b',
      '"Chiều cao h" là khoảng cách vuông góc giữa 2 đáy',
      '"Độ lệch" xác định hình thang lệch trái/phải bao nhiêu',
    ],
    examples: [
      { label: 'Hình thang thường', values: 'a=6, b=3, h=4' },
      { label: 'Hình thang cân', values: 'a=6, b=3, h=4, lệch=1.5' },
    ],
  },

  // ==================== ĐƯỜNG TRÒN ====================

  'circle-basic': {
    description: 'Vẽ đường tròn với tâm O và bán kính R tùy chọn.',
    tips: [
      'Bật "Hiển thị bán kính" để vẽ đoạn thẳng OA kèm nhãn R',
      'Bật "Hiển thị tâm" để đánh dấu điểm O ở giữa',
    ],
    examples: [
      { label: 'Đường tròn R=3', values: 'R=3' },
      { label: 'Đường tròn lớn R=5', values: 'R=5' },
    ],
  },

  'circle-chord': {
    description: 'Vẽ đường tròn kèm dây cung AB.',
    tips: [
      '"Góc dây cung" là góc ở tâm O tương ứng với cung AB (0°–360°)',
      'Dây cung lớn nhất là đường kính (góc = 180°)',
      'Bật "Hiển thị khoảng cách" để vẽ đường thẳng từ tâm xuống dây cung (vuông góc)',
    ],
    examples: [
      { label: 'Dây cung 90°', values: 'R=3, góc=90°' },
      { label: 'Đường kính', values: 'R=3, góc=180°' },
    ],
  },

  'circle-tangent': {
    description: 'Vẽ tiếp tuyến của đường tròn từ điểm M bên ngoài.',
    tips: [
      '"Khoảng cách OM" phải lớn hơn bán kính R',
      'Từ điểm ngoài kẻ được 2 tiếp tuyến MA và MB bằng nhau',
      'Bật "Hiển thị MA = MB" để đánh dấu 2 tiếp tuyến bằng nhau',
    ],
    examples: [
      { label: 'Tiếp tuyến từ M cách O=5', values: 'R=2, OM=5' },
    ],
  },

  'circle-sector': {
    description: 'Vẽ hình quạt tròn — phần hình tròn giới hạn bởi 2 bán kính và cung.',
    tips: [
      '"Góc ở tâm" là góc của hình quạt (độ)',
      '"Góc bắt đầu" xác định hướng của cạnh đầu tiên',
      'Diện tích hình quạt = (góc/360) × π × R²',
    ],
    examples: [
      { label: 'Hình quạt 1/4 đường tròn', values: 'R=3, góc=90°' },
      { label: 'Hình quạt 1/3 đường tròn', values: 'R=3, góc=120°' },
    ],
  },

  // ==================== HÌNH KHÔNG GIAN ====================

  'cube': {
    description: 'Vẽ hình lập phương với 12 cạnh bằng nhau.',
    tips: [
      'Hình lập phương được vẽ theo phối cảnh nghiêng để nhìn thấy 3 mặt',
      'Các cạnh khuất vẽ bằng nét đứt tự động',
      'Nhãn 8 đỉnh có thể tùy chỉnh',
    ],
    examples: [
      { label: 'Hình lập phương cạnh 3', values: 'cạnh=3' },
    ],
  },

  'pyramid-square': {
    description: 'Vẽ hình chóp tứ giác S.ABCD với đáy là hình chữ nhật.',
    tips: [
      '"Chiều rộng đáy" và "Chiều dài đáy" xác định kích thước đáy hình chữ nhật',
      '"Chiều cao" là khoảng cách từ đỉnh S xuống đáy',
      'Các cạnh đáy khuất vẽ bằng nét đứt tự động',
    ],
    examples: [
      { label: 'Hình chóp cân S.ABCD', values: 'rộng=4, dài=4, cao=5' },
      { label: 'Hình chóp đáy chữ nhật', values: 'rộng=3, dài=5, cao=4' },
    ],
  },

  'prism-triangular': {
    description: 'Vẽ lăng trụ tam giác ABC.A′B′C′.',
    tips: [
      'Đáy là tam giác đều, chiều cao là độ dài cạnh bên',
      'Các cạnh khuất vẽ bằng nét đứt',
      '"Góc nghiêng" xác định góc nhìn phối cảnh',
    ],
    examples: [
      { label: 'Lăng trụ đều cạnh 3, cao 5', values: 'cạnh đáy=3, cao=5' },
    ],
  },

  'cylinder': {
    description: 'Vẽ hình trụ với 2 đáy tròn song song và mặt bên.',
    tips: [
      '"Bán kính" là bán kính 2 đáy tròn',
      '"Chiều cao" là khoảng cách giữa 2 đáy',
      'Đáy dưới vẽ đầy, đáy trên vẽ bằng nét đứt để thể hiện phối cảnh',
    ],
    examples: [
      { label: 'Hình trụ R=2, h=4', values: 'R=2, h=4' },
    ],
  },

  'cone': {
    description: 'Vẽ hình nón với đáy tròn và đỉnh S.',
    tips: [
      '"Bán kính đáy R" và "Chiều cao h" xác định hình nón',
      'Đường sinh l = √(R² + h²) được tính tự động',
      'Bật "Hiển thị đường sinh" để vẽ đoạn thẳng từ S đến điểm trên đáy',
    ],
    examples: [
      { label: 'Hình nón R=3, h=4', values: 'R=3, h=4' },
    ],
  },

  'sphere': {
    description: 'Vẽ hình cầu bán kính R nhìn từ phía trước.',
    tips: [
      'Đường tròn lớn ở giữa là tiết diện qua tâm',
      'Cung ở trên vẽ đầy, nửa dưới vẽ nét đứt (mặt khuất)',
      'Bật "Hiển thị tâm O" và "Hiển thị bán kính" để thêm thông tin',
    ],
    examples: [
      { label: 'Hình cầu R=3', values: 'R=3' },
    ],
  },

  // ==================== ĐỒ THỊ HÀM SỐ ====================

  'linear': {
    description: 'Vẽ đồ thị hàm số bậc nhất y = ax + b.',
    tips: [
      'a là hệ số góc: a > 0 đồ thị đi lên, a < 0 đi xuống, a = 0 là đường nằm ngang',
      'b là tung độ gốc (giá trị y khi x = 0)',
      '"Xmin, Xmax" xác định khoảng vẽ trên trục Ox',
      'Điểm đặc biệt: nhập dạng "A(1;2), B(-1;0)" để đánh dấu điểm',
    ],
    examples: [
      { label: 'Đường thẳng đi lên', values: 'a=2, b=-1, xmin=-3, xmax=3' },
      { label: 'Đường thẳng đi xuống', values: 'a=-1, b=3, xmin=-2, xmax=4' },
    ],
  },

  'quadratic': {
    description: 'Vẽ đồ thị hàm số bậc 2 y = ax² + bx + c (parabol).',
    tips: [
      'a > 0: parabol mở lên (hình chữ U); a < 0: mở xuống (hình ∩)',
      'Đỉnh parabol tại x = -b/(2a)',
      'Bật "Hiển thị đỉnh" để đánh dấu điểm đỉnh',
      'Bật "Hiển thị giao Ox" để đánh dấu nghiệm (nếu có)',
    ],
    examples: [
      { label: 'Parabol y = x²', values: 'a=1, b=0, c=0' },
      { label: 'Parabol y = x²−2x−3', values: 'a=1, b=-2, c=-3' },
      { label: 'Parabol ngược y = −x²+4', values: 'a=-1, b=0, c=4' },
    ],
  },

  'cubic': {
    description: 'Vẽ đồ thị hàm số bậc 3 y = ax³ + bx² + cx + d.',
    tips: [
      'a ≠ 0; đồ thị luôn có điểm uốn',
      'Điều chỉnh hệ số để thấy cực trị: y = x³ − 3x có cực đại và cực tiểu',
    ],
    examples: [
      { label: 'y = x³ − 3x', values: 'a=1, b=0, c=-3, d=0' },
      { label: 'y = x³', values: 'a=1, b=0, c=0, d=0' },
    ],
  },

  'hyperbola': {
    description: 'Vẽ đồ thị hàm số y = a/x (hyperbol đơn giản).',
    tips: [
      'Hàm số không xác định tại x = 0 (có tiệm cận đứng x = 0)',
      'a > 0: 2 nhánh ở góc phần tư 1 và 3; a < 0: ở góc 2 và 4',
      'Tiệm cận ngang: y = 0; tiệm cận đứng: x = 0',
    ],
    examples: [
      { label: 'y = 1/x', values: 'a=1' },
      { label: 'y = 2/x', values: 'a=2' },
      { label: 'y = −1/x', values: 'a=-1' },
    ],
  },

  'sine': {
    description: 'Vẽ đồ thị hàm số y = A·sin(ωx + φ) + d.',
    tips: [
      'A là biên độ (chiều cao sóng), ω là tần số góc, φ là pha ban đầu',
      'Chu kỳ T = 2π/ω',
      'Để vẽ y = sin(x): A=1, ω=1, φ=0, d=0',
      '"Xmin, Xmax" nên đặt bội số của π, ví dụ xmin=-6.28, xmax=6.28',
    ],
    examples: [
      { label: 'y = sin(x)', values: 'A=1, ω=1, φ=0' },
      { label: 'y = 2sin(2x)', values: 'A=2, ω=2, φ=0' },
    ],
  },

  'cosine': {
    description: 'Vẽ đồ thị hàm số y = A·cos(ωx + φ) + d.',
    tips: [
      'Tương tự sin nhưng dịch pha π/2',
      'y = cos(x) có cực đại tại x = 0',
    ],
    examples: [
      { label: 'y = cos(x)', values: 'A=1, ω=1, φ=0' },
      { label: 'y = cos(2x − π/2)', values: 'A=1, ω=2, φ=-1.57' },
    ],
  },

  'exponential': {
    description: 'Vẽ đồ thị hàm số mũ y = a·bˣ + c (b > 0, b ≠ 1).',
    tips: [
      'b > 1: hàm tăng dần; 0 < b < 1: hàm giảm dần',
      'Hàm mũ tự nhiên: dùng b = 2.718 (≈ e)',
      'Đường tiệm cận ngang: y = c',
    ],
    examples: [
      { label: 'y = 2ˣ', values: 'a=1, b=2, c=0' },
      { label: 'y = (1/2)ˣ', values: 'a=1, b=0.5, c=0' },
    ],
  },

  'logarithm': {
    description: 'Vẽ đồ thị hàm số logarit y = a·log_b(x) + c.',
    tips: [
      'Hàm chỉ xác định với x > 0 (có tiệm cận đứng x = 0)',
      'b > 1: hàm tăng; 0 < b < 1: hàm giảm',
      'Logarit thập phân: b = 10; Logarit tự nhiên: b = 2.718',
    ],
    examples: [
      { label: 'y = log₂(x)', values: 'a=1, b=2, c=0' },
      { label: 'y = lg(x)', values: 'a=1, b=10, c=0' },
    ],
  },

  // ==================== BẢNG BIẾN THIÊN ====================

  'bbt-quadratic': {
    description: 'Tạo bảng biến thiên cho hàm số bậc 2 y = ax² + bx + c.',
    tips: [
      'Nhập hệ số a, b, c của hàm số',
      'Bảng tự tính điểm cực trị và chiều biến thiên',
      'a > 0: hàm giảm rồi tăng; a < 0: hàm tăng rồi giảm',
    ],
    examples: [
      { label: 'y = x² − 2x + 1', values: 'a=1, b=-2, c=1' },
    ],
  },

  'bbt-cubic': {
    description: 'Tạo bảng biến thiên cho hàm số bậc 3 y = ax³ + bx² + cx + d.',
    tips: [
      'Bảng hiển thị cực đại và cực tiểu của hàm (nếu có)',
      'Hàm bậc 3 có thể có 0 hoặc 2 điểm cực trị',
      'Khi Δ = b² − 3ac < 0: không có cực trị, hàm đơn điệu',
    ],
    examples: [
      { label: 'y = x³ − 3x + 2', values: 'a=1, b=0, c=-3, d=2' },
    ],
  },

  // ==================== BIỂU ĐỒ THỐNG KÊ ====================

  'bar-chart': {
    description: 'Vẽ biểu đồ cột đứng để so sánh giá trị giữa các danh mục.',
    tips: [
      '"Nhãn danh mục" và "Giá trị" nhập cách nhau bằng dấu phẩy, số lượng phải bằng nhau',
      'Ví dụ nhãn: "2020, 2021, 2022" hoặc "Toán, Văn, Anh"',
      '"Giá trị Y tối đa" và "Bước nhảy" để tùy chỉnh thang đo trục Y',
      'Bật "Hiển thị giá trị" để ghi số trên đỉnh mỗi cột',
    ],
    examples: [
      { label: 'Doanh thu 4 năm', values: 'nhãn: 2020,2021,2022,2023 | giá trị: 10,25,15,30' },
      { label: 'Điểm môn học', values: 'nhãn: Toán,Văn,Anh,Lý | giá trị: 8,7,9,8.5' },
    ],
  },

  'line-chart': {
    description: 'Vẽ biểu đồ đường để thể hiện xu hướng thay đổi theo thời gian.',
    tips: [
      'Nhãn và giá trị nhập cách nhau bằng dấu phẩy',
      'Nhãn có thể là chữ (tên tháng, năm, danh mục)',
      'Bật "Hiển thị điểm" để đánh dấu điểm dữ liệu',
      '"Giá trị Y tối đa" và "Bước nhảy" để tùy chỉnh thang đo trục Y',
    ],
    examples: [
      { label: 'Nhiệt độ theo tháng', values: 'nhãn: T1,T2,T3,T4,T5 | giá trị: 18,20,24,28,32' },
      { label: 'Dân số qua các năm', values: 'nhãn: 2019,2020,2021,2022 | giá trị: 96,97,98,99' },
    ],
  },

  'pie-chart': {
    description: 'Vẽ biểu đồ hình tròn để thể hiện tỷ lệ phần trăm của các phần.',
    tips: [
      'Giá trị không cần tổng bằng 100 — hệ thống tự tính phần trăm',
      'Nhập tên danh mục và giá trị tương ứng, cách nhau bằng dấu phẩy',
      'Bật "Hiển thị nhãn" và "Hiển thị %" để ghi tên + tỷ lệ lên từng mảnh',
      'Bật "Chú giải" để hiển thị bảng màu ở bên phải',
    ],
    examples: [
      { label: 'Điểm môn học', values: 'nhãn: Toán,Văn,Anh,Lý,Hóa | giá trị: 30,20,25,15,10' },
      { label: 'Phương tiện đi lại', values: 'nhãn: Xe đạp,Xe máy,Ô tô,Xe bus | giá trị: 20,45,25,10' },
    ],
  },

  'donut-chart': {
    description: 'Biểu đồ hình tròn có lỗ ở giữa — thường dùng để thêm số tổng ở tâm.',
    tips: [
      '"Văn bản ở tâm" có thể là số tổng, tiêu đề, hoặc bỏ trống',
      '"Tỷ lệ lỗ" (0.3–0.7) điều chỉnh kích thước lỗ giữa: số nhỏ = lỗ nhỏ',
      'Nhãn phần trăm hiển thị ở vành ngoài',
    ],
    examples: [
      { label: 'Biểu đồ donut với tổng ở tâm', values: 'nhãn: A,B,C,D | giá trị: 25,30,20,25 | tâm: 100%' },
    ],
  },

  'bar-chart-grouped': {
    description: 'Vẽ biểu đồ cột nhóm để so sánh nhiều chuỗi dữ liệu cùng lúc.',
    tips: [
      'Nhập giá trị riêng cho từng chuỗi (Chuỗi 1, 2, 3)',
      'Số lượng giá trị mỗi chuỗi phải bằng số nhãn danh mục',
      'Chuỗi 3 có thể để trống nếu chỉ so sánh 2 nhóm',
    ],
    examples: [
      { label: 'Doanh thu 2 năm theo quý', values: 'nhãn: Q1,Q2,Q3,Q4 | chuỗi1: 10,25,15,30 | chuỗi2: 8,20,18,25' },
    ],
  },

  // ==================== BIỂU ĐỒ TẦN SỐ ====================

  'histogram': {
    description: 'Biểu đồ tần số ghép nhóm: các cột sát nhau thể hiện số lượng (tần số) trong mỗi khoảng giá trị.',
    tips: [
      'Nhãn khoảng dùng ký hiệu toán học như [0;0.5), [0.5;1), ...',
      'Trục Y là tần số (số học sinh, số lần, số sản phẩm, ...)',
      '"Tổng số" để trống thì trục Y hiển thị giá trị thực',
      'Bật "Hiển thị giá trị" để ghi số lên đỉnh mỗi cột',
    ],
    examples: [
      { label: 'Thời gian tự học theo nhóm', values: 'nhãn: [0;0.5),[0.5;1),[1;1.5),[1.5;2),[2;2.5) | giá trị: 21,15,33,25,6' },
      { label: 'Điểm thi theo thang 10', values: 'nhãn: [4;5),[5;6),[6;7),[7;8),[8;9),[9;10] | giá trị: 2,5,12,18,10,3' },
    ],
  },

  'histogram-relative': {
    description: 'Biểu đồ tần số tương đối ghép nhóm (dạng cột): trục Y là tỷ lệ phần trăm thay vì số lượng.',
    tips: [
      'Nhập dữ liệu gốc (số lượng), hệ thống tự tính % chia cho tổng',
      '"Tổng số" (n): để trống = tự tổng hợp từ các giá trị nhập vào; nhập số cụ thể nếu có cỡ mẫu riêng',
      'Trục Y hiển thị %, phù hợp khi cần so sánh tỷ lệ giữa các nhóm',
      'Bật "Hiển thị giá trị" để hiện % trên đỉnh mỗi cột',
    ],
    examples: [
      { label: 'Thời gian tự học — tỷ lệ %', values: 'nhãn: [0;0.5),[0.5;1),[1;1.5),[1.5;2),[2;2.5) | giá trị: 21,15,33,25,6 | tổng: (để trống)' },
      { label: 'Với cỡ mẫu biết trước n=200', values: 'giá trị: 40,30,60,50,20 | tổng: 200' },
    ],
  },

  'line-chart-relative': {
    description: 'Biểu đồ tần số tương đối ghép nhóm (đoạn thẳng): dùng đường gấp khúc nối điểm giữa các khoảng, trục Y là %.',
    tips: [
      'Nhãn khoảng dùng ký hiệu [a;b) — giống hệt biểu đồ cột tần số. Hệ thống tự đặt điểm tại giữa mỗi khoảng.',
      'Nhập dữ liệu gốc (số lượng), hệ thống tự tính %',
      '"Tổng số" để trống = tự tổng; nhập n nếu có cỡ mẫu riêng',
      'Bật "Hiển thị điểm" để vẽ chấm tròn tại mỗi điểm dữ liệu',
      'Bật "Hiển thị giá trị" để hiện % cạnh mỗi điểm',
    ],
    examples: [
      { label: 'Thời gian tự học — đường tần suất', values: 'nhãn: [0;0.5),[0.5;1),[1;1.5),[1.5;2),[2;2.5) | giá trị: 21,15,33,25,6' },
      { label: 'Điểm thi theo thang 10', values: 'nhãn: [4;5),[5;6),[6;7),[7;8),[8;9),[9;10] | giá trị: 2,5,12,18,10,3' },
    ],
  },

  // ==================== VẬT LÝ ====================

  'physics-fbd': {
    description: 'Vẽ biểu đồ lực (Free Body Diagram) — vật và các vector lực tác dụng.',
    tips: [
      'Mỗi lực có: độ lớn (tỷ lệ chiều dài mũi tên), hướng (độ), nhãn',
      'Hướng: 0° = phải, 90° = lên, 180° = trái, 270° = xuống',
      'Bật từng loại lực: Trọng lực (xuống), Phản lực (lên), Lực kéo, Ma sát',
    ],
    examples: [
      { label: 'Vật đứng yên trên mặt phẳng', values: 'trọng lực=10N hướng xuống, phản lực=10N hướng lên' },
    ],
  },

  'physics-convex-lens': {
    description: 'Vẽ đường đi của tia sáng qua thấu kính hội tụ.',
    tips: [
      '"Tiêu cự f" là khoảng cách từ tâm thấu kính đến tiêu điểm (f > 0)',
      '"Khoảng cách vật d" là khoảng từ vật AB đến thấu kính',
      '"Chiều cao vật" xác định độ dài đoạn AB',
      'Ảnh thật khi d > f; ảnh ảo khi d < f',
    ],
    examples: [
      { label: 'Vật ngoài tiêu cự (ảnh thật)', values: 'f=3, d=5, h=2' },
      { label: 'Vật trong tiêu cự (ảnh ảo)', values: 'f=3, d=2, h=2' },
    ],
  },

  'physics-concave-lens': {
    description: 'Vẽ đường đi của tia sáng qua thấu kính phân kỳ.',
    tips: [
      'Thấu kính phân kỳ luôn cho ảnh ảo, cùng chiều, nhỏ hơn vật',
      '"Tiêu cự f" nhập giá trị dương (hệ thống tự xử lý phân kỳ)',
      'Ảnh luôn nằm cùng phía với vật so với thấu kính',
    ],
    examples: [
      { label: 'Tia sáng qua thấu kính phân kỳ', values: 'f=3, d=5, h=2' },
    ],
  },
};

// Lấy guide cho 1 shape (trả về null nếu không có)
export function getShapeGuide(shapeId) {
  return SHAPE_GUIDES[shapeId] || null;
}
