import { useEffect } from 'react';
import type { Stock } from '../../types';

type Props = {
    stock: Stock;
    onClose: () => void;
};

export default function StockModal({ stock, onClose }: Props) {
    const isUp = stock.change >= 0;

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    return (
        <div
            className=" fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 backdrop-blur-sm sm:items-center sm:p-5"
            onClick={onClose}
        >
            <div
                className="!p-6 w-full rounded-t-lg border border-white/80 bg-white p-7 shadow-2xl sm:max-w-lg sm:rounded-lg sm:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-7 flex items-start justify-between gap-5">
                    <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Detalle</p>
                        <h2 className="mt-1 text-3xl font-bold text-slate-950">{stock.symbol}</h2>
                        <p className="mt-1 break-words text-sm leading-6 text-slate-600">
                            {stock.name}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="shrink-0 rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                        aria-label="Cerrar"
                    >
                        x
                    </button>
                </div>

                <div className="mb-5 rounded-lg border border-slate-200 bg-slate-50 p-5">
                    <p className="mb-2 text-xs font-medium text-slate-500">Precio actual</p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                        <p className="break-words text-3xl font-bold text-slate-950 tabular-nums sm:text-4xl">
                            ${stock.price.toFixed(2)}
                        </p>
                        <p
                            className={`w-fit rounded-lg px-3 py-1 text-sm font-semibold tabular-nums ${isUp ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                                }`}
                        >
                            {isUp ? '+' : ''}
                            {stock.change.toFixed(2)} ({isUp ? '+' : ''}
                            {stock.changePercent.toFixed(2)}%)
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-lg bg-slate-950 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-colors hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-teal-100"
                >
                    Cerrar
                </button>

                <p className="mt-4 text-center text-xs text-slate-400">
                    Mas detalles proximamente
                </p>
            </div>
        </div>
    );
}
