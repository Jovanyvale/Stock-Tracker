import { useMemo, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import type { Stock } from '../../types';
import StockCard from './StockCard';
import StockSearch from './StockSearch';
import StockModal from './StockModal';
import ListState from '../ListState';

export default function StocksList() {
    const { data: stocks, loading, error } = useFetch<Stock[]>('/stocks');
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<Stock | null>(null);

    const filtered = useMemo(() => {
        if (!stocks) return [];
        if (!query.trim()) return stocks;

        const q = query.trim().toLowerCase();
        return stocks.filter(
            (s) =>
                s.symbol.toLowerCase().includes(q) ||
                s.name.toLowerCase().includes(q)
        );
    }, [stocks, query]);

    const isEmpty = !loading && !error && filtered.length === 0;

    return (
        <>
            <section className="rounded-lg border border-slate-200 bg-white/95 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)] sm:p-6 lg:p-7">
                <div className="flex flex-col gap-5">
                    <StockSearch value={query} onChange={setQuery} />

                    {stocks && stocks.length > 0 && (
                        <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                            <span className="font-semibold text-slate-800">{filtered.length} de {stocks.length} empresas</span>
                            <span>Precios en USD</span>
                        </div>
                    )}

                    {loading || error || isEmpty ? (
                        <ListState loading={loading} error={error} empty={isEmpty} />
                    ) : (
                        <div className="grid gap-4 lg:grid-cols-2">
                            {filtered.map((stock) => (
                                <StockCard
                                    key={stock.symbol}
                                    stock={stock}
                                    onClick={setSelected}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {selected && (
                <StockModal stock={selected} onClose={() => setSelected(null)} />
            )}
        </>
    );
}
