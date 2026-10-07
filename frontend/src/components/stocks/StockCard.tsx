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
            className="!p-6 group min-h-[124px] w-full rounded-lg border border-slate-200 bg-white text-left shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-0.5 hover:border-teal-300 hover:bg-slate-50 hover:shadow-[0_16px_34px_rgba(15,23,42,0.07)] focus:outline-none focus:ring-4 focus:ring-teal-100 "
        >
            <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 flex-1 items-start gap-4 sm:items-center sm:pr-3">
                    <div className="min-w-0">
                        <p className="break-words text-base font-bold text-slate-950">
                            {stock.symbol}
                        </p>
                        <p className="mt-1 break-words text-sm leading-5 text-slate-500">
                            {stock.name}
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-100 pt-4 sm:block sm:border-t-0 sm:pt-0 sm:text-right">
                    <p className="text-base font-bold text-slate-950 tabular-nums">
                        ${stock.price.toFixed(2)}
                    </p>
                    <p
                        className={`rounded-lg px-2.5 py-1 text-xs font-semibold tabular-nums sm:mt-1.5 ${isUp ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
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
