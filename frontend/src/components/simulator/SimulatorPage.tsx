import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import type { Stock, Simulation, SimulationRange } from '../../types';
import SimulatorForm from './SimulatorForm';
import SimulationResult from './SimulationResult';

export default function SimulatorPage() {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [result, setResult] = useState<Simulation | null>(null);
    const [history, setHistory] = useState<Simulation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Cargar stocks + historial al montar
    useEffect(() => {
        Promise.all([api.getStocks(), api.getSimulations()])
            .then(([s, h]) => {
                setStocks(s);
                setHistory(h);
            })
            .catch((e) => setError(e.message));
    }, []);

    const handleSubmit = async (data: {
        symbol: string;
        amount: number;
        range: SimulationRange;
    }) => {
        setLoading(true);
        setError(null);
        try {
            const sim = await api.createSimulation(data);
            setResult(sim);
            setHistory((prev) => [sim, ...prev]);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await api.deleteSimulation(id);
            setHistory((prev) => prev.filter((s) => s.id !== id));
            if (result?.id === id) setResult(null);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Error');
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <div>
                <h2 className="text-xl font-bold text-slate-800">Simulador</h2>
                <p className="text-xs text-slate-400 mt-1">
                    ¿Cuánto habrías ganado si hubieras invertido?
                </p>
            </div>

            <SimulatorForm stocks={stocks} onSubmit={handleSubmit} loading={loading} />

            {error && (
                <div className="rounded-2xl bg-red-50 p-4 text-center">
                    <p className="text-sm font-medium text-red-600">{error}</p>
                </div>
            )}

            {result && <SimulationResult simulation={result} />}

            {/* Historial */}
            {history.length > 0 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                    <h3 className="text-sm font-semibold text-slate-800 mb-3">Historial</h3>
                    <ul className="flex flex-col gap-2">
                        {history.map((sim) => {
                            const isProfit = sim.profit >= 0;
                            return (
                                <li
                                    key={sim.id}
                                    className="flex items-center justify-between rounded-2xl border border-slate-100 p-3"
                                >
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-slate-800">
                                            {sim.symbol}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            ${sim.amount} · {sim.range}
                                        </p>
                                    </div>
                                    <div className="text-right ml-2 shrink-0">
                                        <p className="text-sm font-semibold text-slate-800 tabular-nums">
                                            ${sim.currentValue.toFixed(2)}
                                        </p>
                                        <p
                                            className={`text-xs font-medium tabular-nums ${isProfit ? 'text-emerald-600' : 'text-red-500'
                                                }`}
                                        >
                                            {isProfit ? '+' : ''}
                                            {sim.profitPercent.toFixed(2)}%
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(sim.id)}
                                        className="ml-3 text-slate-300 hover:text-red-500 transition-colors text-sm"
                                        aria-label="Eliminar"
                                    >
                                        ✕
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}