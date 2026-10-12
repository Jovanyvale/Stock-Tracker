import type { Stock, Simulation, SimulationRange, ApiResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error ?? `Error ${res.status}`);
    }

    const json: ApiResponse<T> = await res.json();
    return json.data;
}

export const api = {
    getStocks: () => request<Stock[]>('/stocks'),

    createSimulation: (payload: { symbol: string; amount: number; range: SimulationRange }) =>
        request<Simulation>('/simulations', {
            method: 'POST',
            body: JSON.stringify(payload),
        }),

    getSimulations: () => request<Simulation[]>('/simulations'),

    deleteSimulation: (id: string) =>
        request<{ deleted: boolean }>(`/simulations/${id}`, { method: 'DELETE' }),
};