import type { Request, Response } from 'express';
import { z } from 'zod';
import { createSimulation, getAllSimulations, deleteSimulation } from '../services/simulation.service';

const createSchema = z.object({
    symbol: z.string().min(1).max(20),
    amount: z.number().positive().max(1_000_000),
    range: z.enum(['1w', '1mo', '3mo', '6mo', '1y', '5y']),
});

export async function create(req: Request, res: Response) {
    try {
        const parsed = createSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                error: 'Datos inválidos',
                details: parsed.error.issues,
            });
        }

        const result = await createSimulation(parsed.data);
        return res.status(201).json({ data: result });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        return res.status(500).json({ error: message });
    }
}

export async function list(_req: Request, res: Response) {
    try {
        const simulations = await getAllSimulations();
        res.json({ data: simulations });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        res.status(500).json({ error: message });
    }
}

export async function remove(req: Request, res: Response) {
    try {
        const id = req.params.id;
        if (typeof id !== 'string') return res.status(400).json({ error: 'Identificador inválido' });

        const ok = await deleteSimulation(id);
        if (!ok) return res.status(404).json({ error: 'No encontrada' });
        res.json({ data: { deleted: true } });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        res.status(500).json({ error: message });
    }
}