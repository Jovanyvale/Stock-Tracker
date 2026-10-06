import type { Stock, ApiResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

async function request<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    const json: ApiResponse<T> = await res.json();
    return json.data;
}

export const api = {
    getStocks: () => request<Stock[]>('/stocks'),
};