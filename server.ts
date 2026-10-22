import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { analyzeText } from './src/server/evaluator';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

app.post('/api/analyze', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'El texto es requerido para la evaluación.' });
    }
    const report = await analyzeText(text);
    return res.json(report);
  } catch (error: any) {
    console.error('Error in /api/analyze:', error);
    return res.status(500).json({ error: error.message || 'Error en el análisis de aitoxicación' });
  }
});

// Serve static frontend in production
const distPath = path.join(process.cwd(), 'dist');
app.use(express.static(distPath));

app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
