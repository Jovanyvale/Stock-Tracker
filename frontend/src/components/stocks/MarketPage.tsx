import StocksList from './StockList';
import spLogo from "../../assets/img/sp500.webp";

export default function MarketPage() {
    return (
        <div className="space-y-5">
            <section className="rounded-lg border border-slate-200 bg-white !p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Mercado</p>
                        <div className='flex gap-2'>
                            <img src={spLogo} alt="S&P Logo" className='max-h-10 items-center rounded-sm' />
                            <h2 className="mt-3 text-2xl font-bold text-slate-950 sm:text-3xl">Top 100</h2>
                        </div>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                            Precios actualizados de las empresas mas relevantes del mercado.
                        </p>
                    </div>
                    <div className="flex w-fit items-center gap-2 rounded-lg border border-teal-200 bg-teal-50 px-4 py-2.5 text-xs font-semibold text-teal-800">
                        <span className="h-2 w-2 rounded-full bg-teal-600" />
                        Top 100
                    </div>
                </div>
            </section>

            <StocksList />
        </div>
    );
}
