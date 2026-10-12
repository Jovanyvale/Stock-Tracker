export type SimulationRange = '1w' | '1mo' | '3mo' | '6mo' | '1y' | '5y';

export type SimulationRequest = {
    symbol: string;
    amount: number;
    range: SimulationRange;
};

export type SimulationResult = {
    id: string;
    symbol: string;
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
    createdAt: string;
};