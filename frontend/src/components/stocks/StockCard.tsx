import type { Stock } from '../../types';

type Props = {
    stock: Stock;
    onClick: (stock: Stock) => void;
};

export default function StockCard({ stock, onClick }: Props) {
    const isUp = stock.change >= 0;

    return (
        <button
            type="button"
            onClick={() => onClick(stock)}
            className="w-full text-left rounded-2xl border border-slate-200 bg-white p-4 hover:border-blue-300 hover:bg-blue-50/40 transition-colors"
        >
            <div className="flex items-start justify-between gap-3">
                {/* Izquierda: símbolo + nombre */}
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                        {stock.symbol}
                    </p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                        {stock.name}
                    </p>
                </div>

                {/* Derecha: precio + cambio */}
                <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-slate-800 tabular-nums">
                        ${stock.price.toFixed(2)}
                    </p>
                    <p
                        className={`text-xs font-medium tabular-nums mt-0.5 ${isUp ? 'text-emerald-600' : 'text-red-500'
                            }`}
                    >
                        {isUp ? '+' : ''}
                        {stock.changePercent.toFixed(2)}%
                    </p>
                </div>
            </div>
        </button>
    );
}