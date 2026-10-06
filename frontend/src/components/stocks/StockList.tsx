import StockCard from './StockCard';
import ListState from '../ListState';
import { useFetch } from '../../hooks/useFetch';
import type { Stock } from '../../types';

export default function StocksList() {
    const { data: stocks, loading, error } = useFetch<Stock[]>('/stocks');
    const isEmpty = !loading && !error && (!stocks || stocks.length === 0);

    return (
        <section className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm">
            {/* Título */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <h2 className="text-lg font-semibold text-slate-800">Acciones</h2>
                </div>
                {stocks && stocks.length > 0 && (
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                        {stocks.length} empresas
                    </span>
                )}
            </div>

            {/* Contenido */}
            {loading || error || isEmpty ? (
                <ListState loading={loading} error={error} empty={isEmpty} />
            ) : (
                <ul className="flex flex-col gap-2">
                    {stocks!.map((stock) => (
                        <StockCard key={stock.symbol} stock={stock} />
                    ))}
                </ul>
            )}
        </section>
    );
}