import fs from 'node:fs/promises';
import path from 'node:path';
import type { Stock } from '../types';
import { TTLCache } from '../utils/cache';

const BASE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart';

// User-Agent para que Yahoo no nos bloquee
const USER_AGENT =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// Cache: 60 segundos para precios actuales
const quoteCache = new TTLCache<Stock>(60_000);

// ---- Tipos de la respuesta de Yahoo ----
type YahooChartResponse = {
    chart: {
        result: Array<{
            meta: {
                symbol: string;
                longName?: string;
                shortName?: string;
                regularMarketPrice: number;
                previousClose?: number;
                chartPreviousClose?: number;
                currency: string;
                exchangeName: string;
            };
            timestamp: number[];
            indicators: {
                quote: Array<{
                    close: (number | null)[];
                }>;
            };
        }> | null;
        error: { code: string; description: string } | null;
    };
};

// ---- Tipos de la lista de símbolos ----
export type SymbolEntry = {
    symbol: string;
    name: string;
    sector: string;
};

// ---- Cargar lista de símbolos ----
let symbolsCache: SymbolEntry[] | null = null;

export async function loadSymbols(): Promise<SymbolEntry[]> {
    if (symbolsCache) return symbolsCache;

    const filePath = path.resolve('data/symbols.json');
    const raw = await fs.readFile(filePath, 'utf-8');
    symbolsCache = JSON.parse(raw) as SymbolEntry[];
    return symbolsCache;
}

// ---- Fetch a Yahoo ----
async function fetchYahoo(symbol: string): Promise<YahooChartResponse> {
    const url = `${BASE_URL}/${encodeURIComponent(symbol)}?range=1d&interval=1m`;

    const res = await fetch(url, {
        headers: {
            'User-Agent': USER_AGENT,
            Accept: 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error(`Yahoo ${res.status}: ${res.statusText}`);
    }

    return (await res.json()) as YahooChartResponse;
}

// ---- Obtener una sola acción ----
export async function getStock(symbol: string): Promise<Stock | null> {
    const cached = quoteCache.get(symbol);
    if (cached) return cached;

    try {
        const json = await fetchYahoo(symbol);

        if (json.chart.error || !json.chart.result?.[0]) {
            return null;
        }

        const result = json.chart.result[0];
        const meta = result.meta;

        const price = meta.regularMarketPrice;
        const previousClose = meta.previousClose ?? meta.chartPreviousClose ?? price;
        const change = price - previousClose;
        const changePercent = previousClose !== 0 ? (change / previousClose) * 100 : 0;

        const stock: Stock = {
            symbol: meta.symbol,
            name: meta.longName ?? meta.shortName ?? meta.symbol,
            price,
            change,
            changePercent,
        };

        quoteCache.set(symbol, stock);
        return stock;
    } catch {
        return null;
    }
}

// ---- Obtener todas las acciones ----
export async function getStocks(): Promise<Stock[]> {
    const entries = await loadSymbols();

    // Concurrencia limitada para no saturar Yahoo
    const results = await Promise.allSettled(
        entries.map((entry) => getStock(entry.symbol))
    );

    return results
        .filter(
            (r): r is PromiseFulfilledResult<Stock | null> =>
                r.status === 'fulfilled' && r.value !== null
        )
        .map((r) => r.value as Stock);
}