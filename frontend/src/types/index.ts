export type Stock = {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
};

export type ApiResponse<T> = {
    data: T;
};

export type TabId = 'market' | 'simulator' | 'legal';

export type SimulationRange = '1w' | '1mo' | '3mo' | '6mo' | '1y' | '5y';

export type Simulation = {
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