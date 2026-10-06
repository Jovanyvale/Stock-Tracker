import type { Stock } from '../../types';

type Props = {
    stock: Stock;
};

export default function StockCard({ stock }: Props) {
    const isUp = stock.change >= 0;

    return (
        <li className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                    {stock.symbol.slice(0, 2)}
                </div>
                <div className="min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{stock.symbol}</p>
                    <p className="text-xs text-slate-400 truncate">{stock.name}</p>
                </div>
            </div>

            <div className="text-right shrink-0 ml-2">
                <p className="font-semibold text-slate-800 text-sm">
                    ${stock.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className={`text-xs font-medium ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>
                    {isUp ? '+' : ''}
                    {stock.changePercent.toFixed(2)}%
                </p>
            </div>
        </li>
    );
}