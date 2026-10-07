import type { Request, Response } from 'express';
import { getStocks } from '../services/yahoo.service';

export async function listStocks(_req: Request, res: Response) {
    try {
        const stocks = await getStocks();
        res.json({ data: stocks });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        res.status(500).json({ error: message });
    }
}