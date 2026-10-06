import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { stocksRouter } from './routes/stocks.routes';

const app = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
});

// Rutas
app.use('/api/stocks', stocksRouter);

// 404
app.use((_req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Arrancar servidor
app.listen(env.port, () => {
    console.log(`🚀 Backend en http://localhost:${env.port}`);
    console.log(`📡 Health check: http://localhost:${env.port}/health`);
});