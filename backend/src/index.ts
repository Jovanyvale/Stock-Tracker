import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { prisma } from './config/prisma'; 
import { stocksRouter } from './routes/stocks.routes';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
});

app.get('/health/db', async (_req, res) => {
    try {
        const start = Date.now();

        // SELECT 1: confirma que hay conexión
        await prisma.$queryRaw`SELECT 1`;

        // Cuenta registros reales
        const total = await prisma.simulation.count();

        res.json({
            status: 'ok',
            database: 'connected',
            tables: {
                simulations: total,
            },
            latencyMs: Date.now() - start,
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        res.status(500).json({
            status: 'error',
            database: 'disconnected',
            message,
        });
    }
});

app.use('/api/stocks', stocksRouter);

app.use((_req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(env.port, () => {
    console.log(`Backend en http://localhost:${env.port}`);
    console.log(`Health:    http://localhost:${env.port}/health`);
    console.log(`DB check:  http://localhost:${env.port}/health/db`);   // ← NUEVO
});