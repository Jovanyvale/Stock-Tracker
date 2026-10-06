import type { Crypto } from '../../types';

type Props = {
    crypto: Crypto;
};

export default function CryptoCard({ crypto }: Props) {
    const isUp = crypto.change >= 0;

    return (
        <li className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/40 transition-colors cursor-pointer">
            {/* Izquierda: nombre y símbolo */}
            <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0">
                    {crypto.symbol.slice(0, 2)}
                </div>
                <div className="min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">
                        {crypto.symbol}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{crypto.name}</p>
                </div>
            </div>

            {/* Derecha: precio y cambio */}
            <div className="text-right shrink-0 ml-2">
                <p className="font-semibold text-slate-800 text-sm">
                    ${crypto.price.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: crypto.price < 1 ? 4 : 2,
                    })}
                </p>
                <p
                    className={`text-xs font-medium ${isUp ? 'text-emerald-600' : 'text-red-500'
                        }`}
                >
                    {isUp ? '+' : ''}
                    {crypto.changePercent.toFixed(2)}%
                </p>
            </div>
        </li>
    );
}