import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// ── CORS ────────────────────────────────────────────────────────
// Khi production: cho phép cùng origin (frontend được serve từ backend)
// Khi dev local: cho phép localhost
app.use(cors({
  origin: IS_PRODUCTION
    ? true  // cùng origin — backend serve frontend
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json({ limit: '2mb' }));

// ── Serve Frontend (chỉ khi production) ─────────────────────────
if (IS_PRODUCTION) {
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));
}

// ── Tìm đường dẫn typst phù hợp với OS ─────────────────────────
function getTypstCommand() {
  // Render (Linux): dùng binary đã download vào thư mục gốc
  if (process.platform !== 'win32') {
    const linuxBin = path.join(__dirname, 'typst-linux');
    if (fs.existsSync(linuxBin)) return `"${linuxBin}"`;
    // Fallback: typst trong PATH
    return 'typst';
  }
  // Windows (dev local)
  return `.\\typst.exe`;
}

// ── API: Compile Typst → SVG ─────────────────────────────────────
app.post('/api/compile', (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  // Dùng thư mục /tmp trên Linux, __dirname trên Windows
  const tmpDir = process.platform !== 'win32' ? '/tmp' : __dirname;
  const uid = Date.now() + '_' + Math.random().toString(36).slice(2, 7);
  const tempTypPath = path.join(tmpDir, `typst_${uid}.typ`);
  const tempSvgPath = path.join(tmpDir, `typst_${uid}.svg`);

  fs.writeFileSync(tempTypPath, code, 'utf8');

  const typstCmd = getTypstCommand();
  const command = `${typstCmd} compile "${tempTypPath}" "${tempSvgPath}"`;

  exec(command, { timeout: 30000 }, (error, stdout, stderr) => {
    // Dọn file tạm
    try { if (fs.existsSync(tempTypPath)) fs.unlinkSync(tempTypPath); } catch (_) {}

    if (error) {
      console.error(`Typst error:`, stderr || error.message);
      try { if (fs.existsSync(tempSvgPath)) fs.unlinkSync(tempSvgPath); } catch (_) {}
      return res.status(500).json({ error: 'Compilation failed', details: stderr || error.message });
    }

    try {
      if (fs.existsSync(tempSvgPath)) {
        const svgContent = fs.readFileSync(tempSvgPath, 'utf8');
        fs.unlinkSync(tempSvgPath);
        res.json({ svg: svgContent });
      } else {
        res.status(500).json({ error: 'SVG file was not generated' });
      }
    } catch (readError) {
      console.error(`Read SVG error:`, readError);
      res.status(500).json({ error: 'Failed to read generated SVG' });
    }
  });
});

// ── Health check ─────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString(), platform: process.platform });
});

// ── Fallback: trả về index.html cho mọi route (SPA) ─────────────
if (IS_PRODUCTION) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// ── Khởi động server ─────────────────────────────────────────────
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port} [${IS_PRODUCTION ? 'production' : 'development'}]`);
  console.log(`🔧 Typst command: ${getTypstCommand()}`);

  // ── Keep-Alive: tự ping mỗi 14 phút để không bị Render ngủ đông ──
  if (IS_PRODUCTION && process.env.RENDER_EXTERNAL_URL) {
    const pingUrl = `${process.env.RENDER_EXTERNAL_URL}/api/health`;
    console.log(`⏰ Keep-alive ping every 14 min → ${pingUrl}`);

    setInterval(async () => {
      try {
        const { default: https } = await import('https');
        const { default: http } = await import('http');
        const client = pingUrl.startsWith('https') ? https : http;
        client.get(pingUrl, (res) => {
          console.log(`[Keep-alive] ping OK — ${new Date().toLocaleTimeString('vi-VN')}`);
          res.resume();
        }).on('error', (err) => {
          console.warn(`[Keep-alive] ping failed:`, err.message);
        });
      } catch (e) {
        console.warn('[Keep-alive] error:', e.message);
      }
    }, 14 * 60 * 1000); // 14 phút
  }
});