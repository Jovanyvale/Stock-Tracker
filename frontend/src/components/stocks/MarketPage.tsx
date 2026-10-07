import StocksList from './StockList';

export default function MarketPage() {
    return (
        <div>
            <div className="mb-5">
                <h2 className="text-xl font-bold text-slate-800">Mercado</h2>
                <p className="text-xs text-slate-400 mt-1">
                    Top 100 empresas · Precios en vivo
                </p>
            </div>

            <StocksList />
        </div>
    );
}