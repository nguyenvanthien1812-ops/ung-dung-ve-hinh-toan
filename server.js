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

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', process.env.FRONTEND_URL],
  credentials: true
}));
app.use(express.json());

app.post('/api/compile', (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  const tempTypPath = path.join(__dirname, 'temp.typ');
  const tempSvgPath = path.join(__dirname, 'temp.svg');

  // Write typst code to a temporary file
  fs.writeFileSync(tempTypPath, code);

  // Run typst.exe to compile to SVG
  // Using .\typst.exe for Windows
  const command = `.\\typst.exe compile "${tempTypPath}" "${tempSvgPath}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing typst: ${error}`);
      console.error(`stderr: ${stderr}`);
      return res.status(500).json({ error: 'Compilation failed', details: stderr });
    }

    try {
      // Read the generated SVG file
      if (fs.existsSync(tempSvgPath)) {
        const svgContent = fs.readFileSync(tempSvgPath, 'utf8');
        
        // Clean up
        if (fs.existsSync(tempTypPath)) fs.unlinkSync(tempTypPath);
        if (fs.existsSync(tempSvgPath)) fs.unlinkSync(tempSvgPath);

        res.json({ svg: svgContent });
      } else {
        res.status(500).json({ error: 'SVG file was not generated' });
      }
    } catch (readError) {
      console.error(`Error reading SVG: ${readError}`);
      res.status(500).json({ error: 'Failed to read generated SVG' });
    }
  });
});

// Health check endpoint - để giữ server awake
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});