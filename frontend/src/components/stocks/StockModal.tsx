import { useEffect } from 'react';
import type { Stock } from '../../types';

type Props = {
    stock: Stock;
    onClose: () => void;
};

export default function StockModal({ stock, onClose }: Props) {
    const isUp = stock.change >= 0;

    // Cerrar con Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    // Bloquear scroll del body mientras está abierto
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 p-0 sm:p-4"
            onClick={onClose}
        >
            <div
                className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-6">
                    <div className="min-w-0">
                        <h2 className="text-xl font-bold text-slate-800">{stock.symbol}</h2>
                        <p className="text-sm text-slate-400 truncate mt-0.5">
                            {stock.name}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors text-lg leading-none p-1"
                        aria-label="Cerrar"
                    >
                        ✕
                    </button>
                </div>

                {/* Precio actual */}
                <div className="rounded-2xl bg-slate-50 p-4 mb-4">
                    <p className="text-xs text-slate-400 mb-1">Precio actual</p>
                    <div className="flex items-baseline justify-between gap-3">
                        <p className="text-2xl font-bold text-slate-800 tabular-nums">
                            ${stock.price.toFixed(2)}
                        </p>
                        <p
                            className={`text-sm font-semibold tabular-nums ${isUp ? 'text-emerald-600' : 'text-red-500'
                                }`}
                        >
                            {isUp ? '+' : ''}
                            {stock.change.toFixed(2)} ({isUp ? '+' : ''}
                            {stock.changePercent.toFixed(2)}%)
                        </p>
                    </div>
                </div>

                {/* Acciones */}
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-2xl bg-blue-500 text-white py-3 text-sm font-semibold hover:bg-blue-600 transition-colors"
                >
                    Cerrar
                </button>

                {/* Placeholder para futuras features */}
                <p className="text-xs text-slate-400 text-center mt-3">
                    Más detalles próximamente
                </p>
            </div>
        </div>
    );
}