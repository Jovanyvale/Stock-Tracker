export type Stock = {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
};

// Reservados para fases siguientes:
export type Candle = {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
};

export type SimulationRange = '1w' | '1mo' | '3mo' | '6mo' | '1y' | '5y';

export type SimulationRequest = {
    symbol: string;
    amount: number;
    range: SimulationRange;
};

export type SimulationResult = {
    symbol: string;
    name: string;
    amount: number;
    range: SimulationRange;
    startDate: string;
    endDate: string;
    startPrice: number;
    endPrice: number;
    sharesBought: number;
    currentValue: number;
    profit: number;
    profitPercent: number;
    candles: Candle[];
};