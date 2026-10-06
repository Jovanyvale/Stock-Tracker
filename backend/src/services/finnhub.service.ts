import { env } from '../config/env';
import type { Stock } from '../types';

const BASE_URL = 'https://finnhub.io/api/v1';

// Símbolos que vamos a rastrear (por ahora hardcoded)
const TRACKED_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'];

type QuoteResponse = {
    c: number;  // current price
    d: number;  // change
    dp: number; // change percent
    h: number;  // high
    l: number;  // low
    o: number;  // open
    pc: number; // previous close
};

type ProfileResponse = {
    name: string;
    ticker: string;
};

async function fetchJSON<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Finnhub error ${res.status}: ${res.statusText}`);
    }
    return res.json() as Promise<T>;
}

export async function getStockQuote(symbol: string): Promise<Stock> {
    const token = env.finnhubApiKey;

    const [quote, profile] = await Promise.all([
        fetchJSON<QuoteResponse>(`${BASE_URL}/quote?symbol=${symbol}&token=${token}`),
        fetchJSON<ProfileResponse>(`${BASE_URL}/stock/profile2?symbol=${symbol}&token=${token}`),
    ]);

    return {
        symbol,
        name: profile.name || symbol,
        price: quote.c,
        change: quote.d,
        changePercent: quote.dp,
    };
}

export async function getStocks(): Promise<Stock[]> {
    const results = await Promise.allSettled(
        TRACKED_SYMBOLS.map((symbol) => getStockQuote(symbol))
    );

    return results
        .filter((r): r is PromiseFulfilledResult<Stock> => r.status === 'fulfilled')
        .map((r) => r.value);
}