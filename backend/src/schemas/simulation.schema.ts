// backend/src/schemas/simulation.schema.ts
import { z } from 'zod';

export const simulationSchema = z.object({
    symbol: z.string().min(1).max(20).toUpperCase(),
    amount: z.number().positive().max(1_000_000),
    range: z.enum(['1w', '1mo', '3mo', '6mo', '1y', '5y']),
});

// En el controller:
const parsed = simulationSchema.safeParse(req.body);
if (!parsed.success) {
    return res.status(400).json({
        error: 'Datos inválidos',
        details: parsed.error.issues,
    });
}