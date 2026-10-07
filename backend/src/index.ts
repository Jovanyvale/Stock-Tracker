import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { stocksRouter } from './routes/stocks.routes';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
});

app.use('/api/stocks', stocksRouter);

app.use((_req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(env.port, () => {
    console.log(`Backend en http://localhost:${env.port}`);
});