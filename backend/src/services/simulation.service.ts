import { prisma } from '../config/prisma';
import type { SimulationRequest, SimulationResult } from '../types';

// Obtiene el precio histórico de Yahoo (simplificado)
async function fetchPriceHistory(symbol: string, range: string): Promise<{ startPrice: number; endPrice: number; startDate: Date; endDate: Date }> {
    const yahooRange: Record<string, { range: string; interval: string }> = {
        '1w': { range: '5d', interval: '1h' },
        '1mo': { range: '1mo', interval: '1d' },
        '3mo': { range: '3mo', interval: '1d' },
        '6mo': { range: '6mo', interval: '1d' },
        '1y': { range: '1y', interval: '1d' },
        '5y': { range: '5y', interval: '1wk' },
    };

    const { range: yRange, interval } = yahooRange[range] ?? yahooRange['1y'];
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=${yRange}&interval=${interval}`;

    const res = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
    });

    if (!res.ok) throw new Error(`Yahoo ${res.status}`);

    const json: any = await res.json();
    const result = json.chart?.result?.[0];
    if (!result) throw new Error('Sin datos históricos');

    const closes = result.indicators.quote[0].close.filter((c: number | null) => c !== null);
    const times = result.timestamp.filter((_: any, i: number) => result.indicators.quote[0].close[i] !== null);

    if (closes.length < 2) throw new Error('Datos insuficientes');

    return {
        startPrice: closes[0],
        endPrice: closes[closes.length - 1],
        startDate: new Date(times[0] * 1000),
        endDate: new Date(times[times.length - 1] * 1000),
    };
}

export async function createSimulation(req: SimulationRequest): Promise<SimulationResult> {
    const { symbol, amount, range } = req;

    const { startPrice, endPrice, startDate, endDate } = await fetchPriceHistory(symbol, range);

    const sharesBought = amount / startPrice;
    const currentValue = sharesBought * endPrice;
    const profit = currentValue - amount;
    const profitPercent = (profit / amount) * 100;

    const saved = await prisma.simulation.create({
        data: {
            symbol: symbol.toUpperCase(),
            amount,
            range,
            startDate,
            endDate,
            startPrice,
            endPrice,
            sharesBought,
            currentValue,
            profit,
            profitPercent,
        },
    });

    return {
        id: saved.id,
        symbol: saved.symbol,
        amount: Number(saved.amount),
        range: saved.range as SimulationResult['range'],
        startDate: saved.startDate.toISOString(),
        endDate: saved.endDate.toISOString(),
        startPrice: Number(saved.startPrice),
        endPrice: Number(saved.endPrice),
        sharesBought: Number(saved.sharesBought),
        currentValue: Number(saved.currentValue),
        profit: Number(saved.profit),
        profitPercent: Number(saved.profitPercent),
        createdAt: saved.createdAt.toISOString(),
    };
}

export async function getAllSimulations(): Promise<SimulationResult[]> {
    const list = await prisma.simulation.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return list.map((s) => ({
        id: s.id,
        symbol: s.symbol,
        amount: Number(s.amount),
        range: s.range as SimulationResult['range'],
        startDate: s.startDate.toISOString(),
        endDate: s.endDate.toISOString(),
        startPrice: Number(s.startPrice),
        endPrice: Number(s.endPrice),
        sharesBought: Number(s.sharesBought),
        currentValue: Number(s.currentValue),
        profit: Number(s.profit),
        profitPercent: Number(s.profitPercent),
        createdAt: s.createdAt.toISOString(),
    }));
}

export async function deleteSimulation(id: string): Promise<boolean> {
    try {
        await prisma.simulation.delete({ where: { id } });
        return true;
    } catch {
        return false;
    }
}