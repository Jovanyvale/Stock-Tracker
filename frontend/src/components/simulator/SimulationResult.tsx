import type { Simulation } from '../../types';

type Props = {
    simulation: Simulation;
};

export default function SimulationResult({ simulation }: Props) {
    const isProfit = simulation.profit >= 0;

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <h3 className="text-xs font-medium text-slate-500 mb-3">
                Resultado para {simulation.symbol}
            </h3>

            {/* Valor actual */}
            <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-bold text-slate-800 tabular-nums">
                    ${simulation.currentValue.toFixed(2)}
                </span>
                <span
                    className={`text-sm font-semibold tabular-nums ${isProfit ? 'text-emerald-600' : 'text-red-500'
                        }`}
                >
                    {isProfit ? '+' : ''}${simulation.profit.toFixed(2)} ({isProfit ? '+' : ''}
                    {simulation.profitPercent.toFixed(2)}%)
                </span>
            </div>

            {/* Detalles */}
            <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-slate-400 mb-1">Invertido</p>
                    <p className="font-semibold text-slate-800">${simulation.amount.toFixed(2)}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-slate-400 mb-1">Acciones</p>
                    <p className="font-semibold text-slate-800">{simulation.sharesBought.toFixed(4)}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-slate-400 mb-1">Precio inicio</p>
                    <p className="font-semibold text-slate-800">${simulation.startPrice.toFixed(2)}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-slate-400 mb-1">Precio fin</p>
                    <p className="font-semibold text-slate-800">${simulation.endPrice.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}