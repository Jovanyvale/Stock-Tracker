import { useState } from 'react';
import type { Stock, SimulationRange } from '../../types';

type Props = {
    stocks: Stock[];
    onSubmit: (data: { symbol: string; amount: number; range: SimulationRange }) => void;
    loading: boolean;
};

const RANGES: { value: SimulationRange; label: string }[] = [
    { value: '1w', label: '1 semana' },
    { value: '1mo', label: '1 mes' },
    { value: '3mo', label: '3 meses' },
    { value: '6mo', label: '6 meses' },
    { value: '1y', label: '1 año' },
    { value: '5y', label: '5 años' },
];

export default function SimulatorForm({ stocks, onSubmit, loading }: Props) {
    const [symbol, setSymbol] = useState('AAPL');
    const [amount, setAmount] = useState('1000');
    const [range, setRange] = useState<SimulationRange>('1y');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const num = Number(amount);
        if (!symbol || !num || num <= 0) return;
        onSubmit({ symbol, amount: num, range });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-5 flex flex-col gap-4"
        >
            {/* Empresa */}
            <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">Empresa</label>
                <select
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-blue-400 focus:outline-none"
                >
                    {stocks.map((s) => (
                        <option key={s.symbol} value={s.symbol}>
                            {s.symbol} — {s.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Monto */}
            <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">Monto (USD)</label>
                <input
                    type="number"
                    min="1"
                    step="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-blue-400 focus:outline-none"
                />
            </div>

            {/* Período */}
            <div>
                <label className="text-xs font-medium text-slate-500 mb-1.5 block">Período</label>
                <select
                    value={range}
                    onChange={(e) => setRange(e.target.value as SimulationRange)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-blue-400 focus:outline-none"
                >
                    {RANGES.map((r) => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                </select>
            </div>

            {/* Botón */}
            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-blue-500 text-white py-3 text-sm font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Calculando…' : 'Simular inversión'}
            </button>
        </form>
    );
}