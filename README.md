# Ứng dụng Vẽ Hình Toán Học

Ứng dụng web giúp vẽ tất cả các loại hình toán học từ lớp 6-12 bằng Typst/CeTZ.

## Tính năng

### 1. Form Builder Mode (Chế độ Form)
- Giao diện trực quan với form động
- Hỗ trợ vẽ:
  - **Hình học phẳng**: Tam giác (thường, vuông, cân, đều, nội tiếp), Tứ giác (vuông, chữ nhật, thoi, bình hành, thang), Đường tròn (cơ bản, tiếp tuyến, cát tuyến, hai đường tròn), Đa giác đều
  - **Hình học không gian**: Hình chóp (tam giác, tứ giác), Lăng trụ, Hình hộp, Hình lập phương, Hình trụ, Hình nón, Hình cầu
  - **Đồ thị hàm số**: Bậc nhất, Bậc hai (Parabol), Bậc ba, Phân thức (y=k/x), Lượng giác (sin, cos, tan), Mũ & Logarit, Trị tuyệt đối
  - **Vectơ**: Vectơ 2D, Tổng/hiệu vectơ, Tích vô hướng

### 2. Code Editor Mode (Chế độ Code)
- Viết mã Typst/CeTZ thủ công
- Hỗ trợ cả Auto mode (đồ thị hàm số) và Manual mode (code tự do)

### 3. Template Gallery (Thư viện Mẫu)
- 50+ templates có sẵn
- Phân loại theo chủ đề
- Sao chép và chỉnh sửa nhanh

### 4. Style Customizer (Tùy chỉnh Style)
- Màu sắc: Stroke color, Fill color
- Độ dày nét vẽ
- Kiểu nét: Solid, Dashed, Dotted
- Độ trong suốt
- Hiển thị lưới, trục tọa độ

### 5. Export & History
- Xuất SVG, PNG
- Lưu lịch sử vẽ
- Sao chép mã Typst

## Cài đặt

### Yêu cầu
- Node.js 18+
- Typst CLI (đã có sẵn `typst.exe` trong thư mục)

### Cài đặt dependencies
```bash
npm install
```

### Chạy ứng dụng

**Terminal 1 - Frontend (Vite):**
```bash
npm run dev
```
Mở trình duyệt tại: http://localhost:5173

**Terminal 2 - Backend (Express):**
```bash
node server.js
```
Backend chạy tại: http://localhost:3001

## Cấu trúc dự án

```
src/
├── components/
│   ├── ShapeSelector.jsx          # Menu chọn loại hình
│   ├── DynamicShapeForm.jsx       # Form động theo loại hình
│   ├── StyleCustomizer.jsx        # Tùy chỉnh màu sắc, style
│   └── TemplateGallery.jsx        # Thư viện mẫu
├── generators/
│   ├── planeGeometry.js           # Generator hình phẳng
│   ├── solidGeometry.js           # Generator hình không gian
│   ├── graphs.js                  # Generator đồ thị & vectơ
│   └── index.js                   # Registry map shape → generator
├── data/
│   ├── shapeCategories.js         # Phân loại hình
│   ├── formSchemas.js             # Schema form cho từng loại
│   └── templates.js               # Thư viện templates
└── App.jsx                        # Component chính
```

## Hướng dẫn sử dụng

### Vẽ hình bằng Form Builder

1. Chọn **Form Builder** mode
2. Chọn loại hình từ menu bên trái:
   - Hình học phẳng → Tam giác → Tam giác vuông
3. Điền thông số vào form:
   - Cạnh góc vuông a: 3
   - Cạnh góc vuông b: 4
   - Góc vuông tại: A
4. Tùy chỉnh style (nếu muốn):
   - Màu nét vẽ: Đen
   - Độ dày: 1.5pt
   - Hiển thị độ dài cạnh: ✓
5. Nhấn **Generate** → Xem kết quả SVG
6. Nhấn **Export SVG** hoặc **Export PNG** để tải về

### Vẽ hình bằng Code Editor

1. Chọn **Code Editor** mode
2. Chọn **Manual** sub-mode
3. Viết mã Typst/CeTZ:
```typst
#import "@preview/cetz:0.3.2": canvas, draw
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *
  
  // Vẽ tam giác
  line((0, 0), (4, 0), (2, 3), close: true, stroke: 1.5pt + black)
  
  // Nhãn
  content((0, 0), [A], anchor: "north-east")
  content((4, 0), [B], anchor: "north-west")
  content((2, 3), [C], anchor: "south")
})
```
4. Nhấn **Compile** → Xem kết quả

### Sử dụng Template

1. Chọn **Template Gallery** mode
2. Chọn category: Hình học phẳng → Tam giác
3. Nhấn vào template muốn dùng
4. Mã Typst sẽ được sao chép vào clipboard
5. Chuyển sang Code Editor mode và paste để chỉnh sửa

## API Backend

### POST /api/compile

Compile mã Typst thành SVG.

**Request:**
```json
{
  "code": "#import \"@preview/cetz:0.3.2\": canvas, draw\n#canvas({draw.circle((0,0), radius: 2)})"
}
```

**Response:**
```json
{
  "svg": "<svg>...</svg>"
}
```

**Error Response:**
```json
{
  "error": "Compilation failed",
  "details": "error message from typst"
}
```

## Thêm hình mới

### Bước 1: Thêm vào shapeCategories.js
```javascript
{
  id: 'my-new-shape',
  name: 'Hình mới',
  icon: '📐',
  description: 'Mô tả hình'
}
```

### Bước 2: Thêm form schema vào formSchemas.js
```javascript
'my-new-shape': {
  fields: [
    { name: 'width', label: 'Chiều rộng', type: 'number', default: 5 },
    { name: 'height', label: 'Chiều cao', type: 'number', default: 3 }
  ]
}
```

### Bước 3: Tạo generator function
```javascript
// src/generators/planeGeometry.js
export function generateMyNewShape(params) {
  const { width, height } = params;
  return `#import "@preview/cetz:0.3.2": canvas, draw
#canvas({
  import draw: *
  rect((0, 0), (${width}, ${height}))
})`;
}
```

### Bước 4: Map vào registry
```javascript
// src/generators/index.js
import { generateMyNewShape } from './planeGeometry.js';

const GENERATOR_MAP = {
  'my-new-shape': generateMyNewShape,
  // ...
};
```

## Troubleshooting

### Lỗi "Cannot POST /api/compile"
- Kiểm tra backend server đã chạy chưa: `node server.js`
- Kiểm tra port 3001 có bị chiếm không

### Lỗi "Compilation failed"
- Kiểm tra cú pháp Typst có đúng không
- Xem chi tiết lỗi trong console
- Thử compile trực tiếp bằng `typst.exe compile temp.typ temp.svg`

### Hình vẽ không hiển thị
- Mở DevTools (F12) → Console để xem lỗi
- Kiểm tra mã Typst có hợp lệ không
- Thử với template có sẵn trước

### Frontend không kết nối được backend
- Kiểm tra CORS đã enable trong server.js
- Kiểm tra URL API trong App.jsx: `http://localhost:3001/api/compile`

## Công nghệ sử dụng

- **Frontend**: React 19 + Vite 8
- **Backend**: Express.js + Node.js
- **Typesetting**: Typst 0.12.0
- **Drawing**: CeTZ 0.3.2 + cetz-plot 0.1.1
- **Styling**: CSS3 (Flexbox, Grid)

## License

MIT

## Tác giả

Dự án học tập - Ứng dụng vẽ toán học cho giáo viên và học sinh THCS/THPT.
