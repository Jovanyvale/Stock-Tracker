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
            <div className="flex flex-col gap-3">
                {/* Buscador */}
                <StockSearch value={query} onChange={setQuery} />

                {/* Contador */}
                {stocks && stocks.length > 0 && (
                    <p className="text-xs text-slate-400 px-1">
                        {filtered.length} de {stocks.length} empresas
                    </p>
                )}

                {/* Lista */}
                {loading || error || isEmpty ? (
                    <ListState loading={loading} error={error} empty={isEmpty} />
                ) : (
                    <div className="flex flex-col gap-2">
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

            {/* Modal de detalles */}
            {selected && (
                <StockModal stock={selected} onClose={() => setSelected(null)} />
            )}
        </>
    );
}