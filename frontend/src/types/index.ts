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

export type TabId = 'market' | 'simulator';