import { env } from '../config/env';
import type { Stock } from '../types';

const BASE_URL = 'https://finnhub.io/api/v1';
const TOKEN = env.finnhubApiKey;

// Top 30 del S&P 500
const TRACKED_SYMBOLS = [
    'AAPL', 'MSFT', 'NVDA', 'GOOGL', 'AMZN',
    'META', 'BRK.B', 'TSLA', 'AVGO', 'LLY',
    'JPM', 'V', 'UNH', 'XOM', 'MA',
    'COST', 'HD', 'PG', 'WMT', 'NFLX',
    'JNJ', 'CRM', 'BAC', 'ORCL', 'ABBV',
    'CVX', 'MRK', 'KO', 'AMD', 'PEP',
];

// ---- Cache simple con TTL ----
type CacheEntry<T> = { data: T; expiresAt: number };

const cache = new Map<string, CacheEntry<Stock>>();
const CACHE_TTL_MS = 60_000; // 1 minuto

function getCached(symbol: string): Stock | null {
    const entry = cache.get(symbol);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
        cache.delete(symbol);
        return null;
    }
    return entry.data;
}

function setCache(symbol: string, stock: Stock): void {
    cache.set(symbol, { data: stock, expiresAt: Date.now() + CACHE_TTL_MS });
}

// ---- Finnhub types ----
type QuoteResponse = {
    c: number;  // current price
    d: number;  // change
    dp: number; // change percent
};

type ProfileResponse = {
    name: string;
};

// ---- Fetch helpers ----
async function fetchJSON<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Finnhub ${res.status}: ${res.statusText}`);
    }
    return res.json() as Promise<T>;
}

const profilesCache = new Map<string, string>();

async function fetchName(symbol: string): Promise<string> {
    const cached = profilesCache.get(symbol);
    if (cached) return cached;

    try {
        const profile = await fetchJSON<ProfileResponse>(
            `${BASE_URL}/stock/profile2?symbol=${symbol}&token=${TOKEN}`
        );
        const name = profile.name || symbol;
        profilesCache.set(symbol, name);
        return name;
    } catch {
        profilesCache.set(symbol, symbol);
        return symbol;
    }
}

async function fetchStock(symbol: string): Promise<Stock | null> {
    const cached = getCached(symbol);
    if (cached) return cached;

    try {
        const [quote, name] = await Promise.all([
            fetchJSON<QuoteResponse>(`${BASE_URL}/quote?symbol=${symbol}&token=${TOKEN}`),
            fetchName(symbol),
        ]);

        if (!quote.c || quote.c === 0) return null;

        const stock: Stock = {
            symbol,
            name,
            price: quote.c,
            change: quote.d,
            changePercent: quote.dp,
        };

        setCache(symbol, stock);
        return stock;
    } catch {
        return null;
    }
}

// ---- API pública ----
export async function getStocks(): Promise<Stock[]> {
    const results = await Promise.allSettled(TRACKED_SYMBOLS.map(fetchStock));

    return results
        .filter((r): r is PromiseFulfilledResult<Stock | null> => r.status === 'fulfilled')
        .map((r) => r.value)
        .filter((s): s is Stock => s !== null);
}