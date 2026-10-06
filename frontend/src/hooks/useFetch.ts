import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

type State<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
};

export function useFetch<T>(endpoint: string): State<T> {
    const [state, setState] = useState<State<T>>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        let cancelled = false;

        fetch(`${API_URL}${endpoint}`)
            .then(async (res) => {
                if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
                const json = await res.json();
                return json.data as T;
            })
            .then((data) => {
                if (!cancelled) setState({ data, loading: false, error: null });
            })
            .catch((err: unknown) => {
                if (cancelled) return;
                const message = err instanceof Error ? err.message : 'Error desconocido';
                setState({ data: null, loading: false, error: message });
            });

        return () => {
            cancelled = true;
        };
    }, [endpoint]);

    return state;
}