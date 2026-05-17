import { useState, useEffect, useCallback } from 'react'
import './App.css'

import { SHAPE_CATEGORIES, getShapeById } from './data/shapeCategories.js'
import { getFormSchema, getDefaultValues } from './data/formSchemas.js'
import { getGenerator } from './generators/index.js'
import { appendAnnotations } from './generators/utils.js'
import { TEMPLATE_LIBRARY, getTemplatesByCategory } from './data/templates.js'

import ShapeSelector from './components/ShapeSelector.jsx'
import DynamicShapeForm from './components/DynamicShapeForm.jsx'
import StyleCustomizer from './components/StyleCustomizer.jsx'
import AnnotationPanel from './components/AnnotationPanel.jsx'
import PromptColorBuilder from './components/PromptColorBuilder.jsx'
import HelpModal from './components/HelpModal.jsx'

// Danh sách các mẫu hình vẽ phổ biến
const TEMPLATES = [
  {
    name: 'Tam giác nội tiếp',
    code: `#import "@preview/cetz:0.3.2": canvas, draw\n#set page(width: auto, height: auto, margin: 10pt)\n\n#canvas({\n  import draw: *\n  let O = (0,0)\n  let R = 2\n  circle(O, radius: R, stroke: gray)\n  line((0,2), (-1.73, -1), (1.73, -1), close: true, fill: blue.lighten(90%))\n  content((0,2.3), [A])\n  content((-1.9, -1.2), [B])\n  content((1.9, -1.2), [C])\n})`
  },
  {
    name: 'Tiếp tuyến đường tròn',
    code: `#import "@preview/cetz:0.3.2": canvas, draw\n#set page(width: auto, height: auto, margin: 10pt)\n\n#canvas({\n  import draw: *\n  let O = (0,0)\n  let R = 2\n  let M = (5,0)\n  let alpha = calc.acos(R/5)\n  let A = (R*calc.cos(alpha), R*calc.sin(alpha))\n  let B = (R*calc.cos(alpha), -R*calc.sin(alpha))\n  \n  circle(O, radius: R)\n  line(M, A, stroke: 1pt)\n  line(M, B, stroke: 1pt)\n  line(A, B, stroke: (thickness: 0.5pt, dash: "dashed"))\n  line(O, M, stroke: 0.5pt + gray)\n  \n  content(O, [O], anchor: "north-east")\n  content(M, [M], anchor: "west")\n  content(A, [A], anchor: "south")\n  content(B, [B], anchor: "north")\n})`
  },
  {
    name: 'Hình chóp tam giác',
    code: `#import "@preview/cetz:0.3.2": canvas, draw\n#set page(width: auto, height: auto, margin: 10pt)\n\n#canvas({\n  import draw: *\n  let S = (1, 4)\n  let A = (0, 0)\n  let B = (3, -1)\n  let C = (4, 1)\n  \n  line(A, B, C)\n  line(S, A)\n  line(S, B)\n  line(S, C)\n  line(A, C, stroke: (dash: "dashed")) // Cạnh khuất\n  \n  content(S, [S], anchor: "south")\n  content(A, [A], anchor: "east")\n  content(B, [B], anchor: "north")\n  content(C, [C], anchor: "west")\n})`
  }
]

// Gợi ý câu lệnh cho AI
const PROMPT_SUGGESTIONS = [
  {
    name: 'Tam giác chuẩn',
    text: 'Hãy viết mã Typst sử dụng thư viện CeTZ 0.3.2 để vẽ một tam giác ABC. Đặt nhãn cho các đỉnh và ký hiệu góc. Yêu cầu trang tự động co giãn.'
  },
  {
    name: 'Hình chóp S.ABC',
    text: 'Tạo mã Typst/CeTZ vẽ hình chóp S.ABC. Cạnh AC nằm sau vẽ bằng nét đứt. Đặt đỉnh S ở trên cao. Thêm nhãn cho các điểm.'
  },
  {
    name: 'Đồ thị sin/cos',
    text: 'Viết mã Typst dùng CeTZ và plot để vẽ đồ thị hàm số y = sin(x) từ -3 đến 3. Có trục tọa độ Ox, Oy và lưới mờ.'
  },
  {
    name: 'Hình tròn nội tiếp',
    text: 'Viết mã Typst/CeTZ vẽ một tam giác và đường tròn nội tiếp của nó. Thêm các đường phân giác bằng nét đứt mờ.'
  }
]

const HISTORY_KEY = 'typst_draw_history'
const GEMINI_GEM_URL = 'https://gemini.google.com/gem/1kO2UILx2K833tdJSqC0DWiTTtsOVEz_5?usp=sharing'

function App() {
  // App Mode: 'builder' | 'code' | 'templates'
  const [appMode, setAppMode] = useState('builder')

  // Builder mode state
  const [selectedShape, setSelectedShape] = useState(null)
  const [formValues, setFormValues] = useState({})
  const [generatedCode, setGeneratedCode] = useState('')

  // Code editor mode state (old)
  const [mode, setMode] = useState('auto')
  const [equation, setEquation] = useState('x*x - 2*x + 1')
  const [minX, setMinX] = useState('-2')
  const [maxX, setMaxX] = useState('4')
  const [showGrid, setShowGrid] = useState(true)
  const [typstCode, setTypstCode] = useState('')
  const [manualCode, setManualCode] = useState(TEMPLATES[0].code)

  // Style options
  const [styleOptions, setStyleOptions] = useState({
    strokeColor: 'black',
    strokeWidth: 1.5,
    strokeStyle: 'solid',
    fillColor: 'transparent',
    fillOpacity: 0.1,
    showGrid: true,
    showAxis: true
  })

  // Color annotations (overlay points, segments, regions)
  const [annotations, setAnnotations] = useState([])

  // Shared state
  const [svgImage, setSvgImage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showDonate, setShowDonate] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem(HISTORY_KEY)
    return saved ? JSON.parse(saved) : []
  })

  // Update form values when shape changes
  useEffect(() => {
    if (selectedShape) {
      const defaults = getDefaultValues(selectedShape.id)
      setFormValues(defaults)
      setGeneratedCode('')
      setAnnotations([])
    }
  }, [selectedShape])

  // Handle form value changes
  const handleFormValueChange = useCallback((fieldName, value) => {
    setFormValues(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }, [])

  // Generate code from form
  const handleGenerateFromForm = useCallback(() => {
    if (!selectedShape) {
      setError('Vui lòng chọn loại hình trước khi tạo.')
      return
    }

    setError('')
    const generator = getGenerator(selectedShape.id)

    if (!generator) {
      setError('Chưa có generator cho loại hình này. Vui lòng dùng chế độ Code Editor.')
      return
    }

    try {
      const baseCode = generator({ ...formValues, styleOptions })
      const code = appendAnnotations(baseCode, annotations)
      setGeneratedCode(code)
      handleCompile(code)
    } catch (err) {
      console.error('Generator error:', err)
      setError('Lỗi khi tạo mã: ' + err.message)
    }
  }, [selectedShape, formValues, styleOptions, annotations])

  // Auto-generate khi chọn shape hoặc thay đổi form values
  useEffect(() => {
    if (appMode === 'builder' && selectedShape && getGenerator(selectedShape.id)) {
      const timer = setTimeout(() => {
        handleGenerateFromForm()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [formValues, styleOptions, appMode, selectedShape, handleGenerateFromForm])

  // Save to history
  const saveToHistory = useCallback((code, currentMode, params) => {
    setHistory(prev => {
      if (prev.length > 0 && prev[0].code === code) return prev

      const newItem = {
        id: Date.now(),
        code,
        mode: currentMode,
        params,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }
      const newHistory = [newItem, ...prev].slice(0, 10)
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory))
      return newHistory
    })
  }, [])

  // Compile code to SVG
  const handleCompile = useCallback(async (code) => {
    setError('')
    setIsLoading(true)

    try {
      // Production: cùng origin (relative URL). Dev: localhost:3001
      const apiUrl = import.meta.env.PROD
        ? '/api/compile'
        : 'http://localhost:3001/api/compile'
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || 'Không thể tạo hình vẽ.')
      }

      const data = await response.json()
      if (data.svg) {
        setSvgImage(data.svg)
        saveToHistory(code, appMode, { shapeId: selectedShape?.id })
      }
    } catch (err) {
      console.error('Lỗi:', err)
      setError(err.message || 'Chưa kết nối được với máy chủ cục bộ (port 3001).')
    } finally {
      setIsLoading(false)
    }
  }, [appMode, selectedShape, saveToHistory])

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    alert('Đã sao chép!')
  }

  const downloadSVG = () => {
    const blob = new Blob([svgImage], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `hinh_ve_${Date.now()}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadPNG = () => {
    const svgElement = document.querySelector('.svg-container svg')
    if (!svgElement) return

    const clonedSvg = svgElement.cloneNode(true)
    const bbox = svgElement.getBBox()
    const padding = 5
    const viewBox = `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`

    clonedSvg.setAttribute('viewBox', viewBox)
    clonedSvg.setAttribute('width', bbox.width + padding * 2)
    clonedSvg.setAttribute('height', bbox.height + padding * 2)

    const svgData = new XMLSerializer().serializeToString(clonedSvg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    const scale = 2
    canvas.width = (bbox.width + padding * 2) * scale
    canvas.height = (bbox.height + padding * 2) * scale

    img.onload = () => {
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const pngUrl = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.href = pngUrl
      downloadLink.download = `hinh_ve_${Date.now()}.png`
      downloadLink.click()
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  }

  const loadFromHistory = (item) => {
    setMode(item.mode)
    if (item.mode === 'auto' && item.params) {
      setSelectedShape(getShapeById(item.params.shapeId) || null)
      setEquation(item.params.equation)
      setMinX(item.params.minX)
      setMaxX(item.params.maxX)
      setShowGrid(item.params.showGrid)
    } else {
      setManualCode(item.code)
    }
  }

  const examQuestionText = mode === 'auto'
    ? `Câu 1. Đường cong trong hình bên là đồ thị của hàm số nào dưới đây?\nA. y = ${equation}.\nB. y = -(${equation}).\nC. y = ${equation.replace('+', '-')}.\nD. y = 2*(${equation}).`
    : `Câu 1. Cho hình vẽ như hình bên. Khẳng định nào sau đây là đúng?\nA. Hình vẽ minh họa tính chất hình học sư phạm.\nB. Hình vẽ được tạo bởi thư viện CeTZ Typst.\nC. Đây là một câu hỏi trắc nghiệm hình học.\nD. Tất cả các phương án trên đều đúng.`

  return (
    <div className="app-layout">

      {/* ==================== TOP BAR ==================== */}
      <header className="top-bar">
        <div className="top-bar-left">
          <h1 className="app-title">📐 Ứng Dụng Vẽ Toán</h1>
        </div>
        <nav className="mode-switcher">
          <button
            className={`mode-btn ${appMode === 'builder' ? 'active' : ''}`}
            onClick={() => setAppMode('builder')}
          >
            🎨 Form Builder
          </button>
          <button
            className={`mode-btn ${appMode === 'code' ? 'active' : ''}`}
            onClick={() => setAppMode('code')}
          >
            💻 Code Editor
          </button>
          <button
            className={`mode-btn ${appMode === 'templates' ? 'active' : ''}`}
            onClick={() => setAppMode('templates')}
          >
            📚 Templates
          </button>
        </nav>
        <div className="top-bar-right">
          <button className="help-btn" onClick={() => setShowHelp(true)} title="Hướng dẫn sử dụng">
            📖 Hướng dẫn
          </button>
          <button className="coffee-btn" onClick={() => setShowDonate(true)} title="Mời cà phê">
            ☕ Mời cà phê
          </button>
          <a
            href={GEMINI_GEM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gemini-btn"
          >
            🤖 Gemini AI
          </a>
          {svgImage && (
            <div className="top-actions">
              <button className="btn-icon" onClick={downloadSVG} title="Tải SVG">⬇ SVG</button>
              <button className="btn-icon" onClick={downloadPNG} title="Tải PNG">⬇ PNG</button>
            </div>
          )}
        </div>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="main-area">

        {/* ---- FORM BUILDER MODE ---- */}
        {appMode === 'builder' && (
          <div className="two-col-layout">
            <div className="col-left">
              {/* Shape Selector */}
              <div className="section-card">
                <ShapeSelector
                  onSelectShape={setSelectedShape}
                  selectedShapeId={selectedShape?.id}
                />
              </div>

              {selectedShape ? (
                <>
                  {/* Shape Info + Form */}
                  <div className="section-card">
                    <div className="shape-info">
                      <h3>{selectedShape.name}</h3>
                      <p className="shape-desc">{selectedShape.description}</p>
                    </div>
                    <DynamicShapeForm
                      shapeId={selectedShape.id}
                      formValues={formValues}
                      onValueChange={handleFormValueChange}
                      onGenerate={handleGenerateFromForm}
                    />
                  </div>

                  {/* Style Customizer (collapsible) */}
                  <details className="section-card style-section" open>
                    <summary><strong>🎨 Tùy chỉnh Style</strong></summary>
                    <StyleCustomizer
                      styleOptions={styleOptions}
                      onChange={setStyleOptions}
                    />
                  </details>

                  {/* Annotation Panel (collapsible) */}
                  <details className="section-card annotation-section">
                    <summary><strong>✏️ Chú Thích Màu</strong></summary>
                    <AnnotationPanel
                      annotations={annotations}
                      onAdd={(a) => setAnnotations(prev => [...prev, a])}
                      onDelete={(id) => setAnnotations(prev => prev.filter(a => a.id !== id))}
                    />
                  </details>
                </>
              ) : (
                <div className="section-card empty-state">
                  <p>👈 Chọn một loại hình để bắt đầu vẽ</p>
                </div>
              )}

              {/* Generated code preview */}
              {generatedCode && (
                <details className="section-card code-preview-section" open>
                  <summary><strong>📄 Mã Typst Tự Động Sinh</strong></summary>
                  <div className="code-block">
                    <textarea value={generatedCode} readOnly rows={8} />
                  </div>
                  <button className="secondary btn-sm" onClick={() => handleCopy(generatedCode)}>Sao chép mã</button>
                </details>
              )}

              {!generatedCode && selectedShape && (
                <div className="generate-actions">
                  <button
                    className="primary generate-btn"
                    onClick={handleGenerateFromForm}
                    disabled={isLoading}
                  >
                    {isLoading ? '⏳ Đang xử lý...' : '🚀 Tạo Hình Vẽ'}
                  </button>
                </div>
              )}
            </div>

            <div className="col-right">
              {svgImage ? (
                <div className="result-panel">
                  <div className="svg-container" dangerouslySetInnerHTML={{ __html: svgImage }} />
                </div>
              ) : (
                <div className="result-panel result-empty">
                  <div className="empty-svg-placeholder">
                    <span className="placeholder-icon">📐</span>
                    <p>Chọn hình và điền thông số, sau đó nhấn <strong>Tạo Hình Vẽ</strong></p>
                  </div>
                </div>
              )}
              {error && <div className="error-msg">{error}</div>}
            </div>
          </div>
        )}

        {/* ---- CODE EDITOR MODE ---- */}
        {appMode === 'code' && (
          <div className="two-col-layout">
            <div className="col-left">
              {/* Mode toggle */}
              <div className="section-card">
                <div className="mode-toggle">
                  <button
                    className={`mode-btn ${mode === 'auto' ? 'active' : ''}`}
                    onClick={() => setMode('auto')}
                  >
                    🤖 Auto (Đồ thị)
                  </button>
                  <button
                    className={`mode-btn ${mode === 'manual' ? 'active' : ''}`}
                    onClick={() => setMode('manual')}
                  >
                    ✏️ Manual (Tự do)
                  </button>
                </div>

                {mode === 'auto' ? (
                  <div className="code-editor">
                    <div className="equation-inputs">
                      <label>y = f(x)</label>
                      <input value={equation} onChange={(e) => setEquation(e.target.value)} placeholder="x*x - 2*x + 1" />
                    </div>
                    <div className="range-inputs">
                      <div>
                        <label>X min</label>
                        <input type="number" value={minX} onChange={(e) => setMinX(e.target.value)} />
                      </div>
                      <div>
                        <label>X max</label>
                        <input type="number" value={maxX} onChange={(e) => setMaxX(e.target.value)} />
                      </div>
                    </div>
                    <label className="checkbox-label">
                      <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} />
                      Hiển thị lưới
                    </label>
                  </div>
                ) : (
                  <div className="code-editor">
                    <label>Mã Typst / CeTZ:</label>
                    <textarea
                      className="code-input"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      rows={16}
                      placeholder="Nhập mã Typst tại đây..."
                    />
                  </div>
                )}
              </div>

              {/* Templates for Code mode */}
              <details className="section-card" open={mode === 'manual'}>
                <summary><strong>📋 Mẫu Có Sẵn</strong></summary>
                <div className="template-chips-list">
                  {TEMPLATES.map((t, i) => (
                    <div key={i} className="template-chip" onClick={() => { setMode('manual'); setManualCode(t.code) }}>
                      {t.name}
                    </div>
                  ))}
                </div>
              </details>

              {/* Prompt Color Builder */}
              <details className="section-card">
                <summary><strong>🎨 Tạo Prompt Màu Sắc Cho AI</strong></summary>
                <PromptColorBuilder geminiUrl={GEMINI_GEM_URL} />
              </details>

              {/* AI Prompts */}
              <details className="section-card">
                <summary><strong>🤖 Gợi Ý Prompt AI</strong></summary>
                <div className="template-chips-list">
                  {PROMPT_SUGGESTIONS.map((p, i) => (
                    <div key={i} className="template-chip prompt-chip" onClick={() => { setMode('manual'); setManualCode(p.text) }}>
                      {p.name}
                    </div>
                  ))}
                  <a href={GEMINI_GEM_URL} target="_blank" rel="noopener noreferrer" className="template-chip gemini-link-inline" style={{ textAlign: 'center' }}>
                    Mở Gemini AI →
                  </a>
                </div>
              </details>

              {/* Generate button */}
              <div className="generate-actions">
                <button
                  className="primary generate-btn"
                  onClick={() => {
                    setError('')
                    const code = mode === 'auto' ? generateTypstCode(equation, minX, maxX, showGrid) : manualCode
                    if (mode === 'auto') setTypstCode(code)
                    handleCompile(code)
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? '⏳ Đang xử lý...' : '🚀 Tạo Hình Vẽ'}
                </button>
              </div>

              {error && <div className="error-msg">{error}</div>}
            </div>

            <div className="col-right">
              {svgImage ? (
                <div className="result-panel">
                  <div className="svg-container" dangerouslySetInnerHTML={{ __html: svgImage }} />
                  {mode === 'auto' && typstCode && (
                    <details className="section-card" style={{ marginTop: '1rem' }}>
                      <summary><strong>📄 Mã Typst</strong></summary>
                      <div className="code-block">
                        <textarea value={typstCode} readOnly rows={8} />
                      </div>
                      <button className="secondary btn-sm" onClick={() => handleCopy(typstCode)}>Sao chép</button>
                    </details>
                  )}
                  {mode === 'manual' && (
                    <details className="section-card" style={{ marginTop: '1rem' }}>
                      <summary><strong>📝 Mẫu câu hỏi trắc nghiệm</strong></summary>
                      <pre className="exam-text">{examQuestionText}</pre>
                      <button className="secondary btn-sm" onClick={() => handleCopy(examQuestionText)}>Copy văn bản</button>
                    </details>
                  )}
                </div>
              ) : (
                <div className="result-panel result-empty">
                  <div className="empty-svg-placeholder">
                    <span className="placeholder-icon">💻</span>
                    <p>Viết mã Typst và nhấn <strong>Tạo Hình Vẽ</strong></p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---- TEMPLATES MODE ---- */}
        {appMode === 'templates' && (
          <div className="templates-container">
            <div className="templates-header">
              <h2>📚 Thư Viện Mẫu</h2>
              <p className="subtitle">Chọn mẫu để dùng trong Code Editor, hoặc chọn hình để mở Form Builder</p>
            </div>

            {/* Template Library */}
            <div className="templates-grid">
              {Object.entries(TEMPLATE_LIBRARY).map(([catKey, subcats]) => (
                <div key={catKey} className="template-category">
                  <h3 className="cat-title">
                    {SHAPE_CATEGORIES[catKey]?.icon || '📐'}
                    {' '}{SHAPE_CATEGORIES[catKey]?.name || catKey}
                  </h3>
                  {Object.entries(subcats).map(([subcatKey, templates]) => (
                    <div key={subcatKey} className="subcategory-group">
                      <h4 className="subcat-title">
                        {SHAPE_CATEGORIES[catKey]?.subcategories?.[subcatKey]?.name || subcatKey}
                      </h4>
                      <div className="template-list">
                        {templates.map((template) => (
                          <div
                            key={template.id}
                            className="tplate-item"
                            onClick={() => {
                              setAppMode('code')
                              setMode('manual')
                              setManualCode(template.code)
                            }}
                            title="Nhấp để dùng trong Code Editor"
                          >
                            <span className="tplate-name">{template.name}</span>
                            <span className="tplate-badge">Code</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Shape shortcuts */}
            <div className="shape-shortcuts">
              <h3>⚡ Truy cập nhanh Form Builder</h3>
              <div className="shortcuts-grid">
                {Object.values(SHAPE_CATEGORIES).map((category) => (
                  <div key={category.id} className="shortcut-category">
                    <h4>{category.icon} {category.name}</h4>
                    <div className="shortcut-list">
                      {Object.values(category.subcategories).map((subcategory) =>
                        subcategory.shapes.map((shape) => (
                          <button
                            key={shape.id}
                            className="shortcut-btn"
                            onClick={() => {
                              setSelectedShape(shape)
                              setAppMode('builder')
                            }}
                          >
                            {shape.name}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== HISTORY (bottom bar) ==================== */}
        {history.length > 0 && (
          <details className="history-bar" open={false}>
            <summary className="history-summary">
              <strong>📜 Lịch Sử</strong> ({history.length} hình đã vẽ)
            </summary>
            <div className="history-list">
              {history.map((item) => (
                <div key={item.id} className="history-item" onClick={() => loadFromHistory(item)}>
                  <span className="history-time">{item.time}</span>
                  <span className="history-mode">{item.mode === 'builder' ? '🏗' : '💻'}</span>
                  <span className="history-snippet">{item.code.substring(0, 80)}...</span>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>

      {/* ==================== HELP MODAL ==================== */}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

      {/* ==================== DONATE MODAL ==================== */}
      {showDonate && (
        <div className="modal-overlay" onClick={() => setShowDonate(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowDonate(false)}>×</button>
            <div className="modal-icon">☕</div>
            <h3>Mời mình ly cà phê nhé!</h3>
            <p className="modal-desc">Nếu ứng dụng hữu ích với bạn, bạn có thể ủng hộ qua thông tin sau:</p>
            <div className="donate-card">
              <div className="donate-row">
                <span className="donate-label">Ngân hàng</span>
                <span className="donate-value">Vietcombank</span>
              </div>
              <div className="donate-row">
                <span className="donate-label">Chủ tài khoản</span>
                <span className="donate-value">Nguyễn Văn Thiện</span>
              </div>
              <div className="donate-row">
                <span className="donate-label">Số tài khoản</span>
                <span className="donate-value copyable" onClick={() => { navigator.clipboard.writeText('9988250112'); alert('Đã sao chép số tài khoản!'); }}>
                  9988250112
                  <span className="copy-badge">Sao chép</span>
                </span>
              </div>
            </div>
            <p className="modal-thanks">Cảm ơn bạn rất nhiều! ❤️</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Legacy function for backward compatibility
function generateTypstCode(equation, minX, maxX, showGrid) {
  const axisMinX = parseFloat(minX) - 1
  const axisMaxX = parseFloat(maxX) + 1
  const axisMinY = -5
  const axisMaxY = 5

  return `
#import "@preview/cetz:0.3.2": canvas, draw
#import "@preview/cetz-plot:0.1.1": plot
#set page(width: auto, height: auto, margin: 10pt)

#canvas({
  import draw: *

  ${showGrid ? `grid((${axisMinX}, ${axisMinY}), (${axisMaxX}, ${axisMaxY}), step: 1, stroke: luma(240))` : ''}

  line((${axisMinX}, 0), (${axisMaxX}, 0), mark: (end: ">"), name: "ox", stroke: 0.8pt + black)
  content((${axisMaxX + 0.2}, 0), [$x$], anchor: "west")

  line((0, ${axisMinY}), (0, ${axisMaxY}), mark: (end: ">"), name: "oy", stroke: 0.8pt + black)
  content((0, ${axisMaxY + 0.2}), [$y$], anchor: "south")
  content((-0.3, -0.3), [$O$])

  plot.plot(
    size: (${axisMaxX - axisMinX}, ${axisMaxY - axisMinY}),
    x-tick-step: none, y-tick-step: none, axis-style: none,
    {
      plot.add(domain: (${minX}, ${maxX}), x => ${equation}, style: (stroke: black + 1.5pt))
    }
  )
})
`.trim()
}

export default App
