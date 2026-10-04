import type { Crypto } from '../../types';
import CryptoCard from './CryptoCard';

export default function CryptoList() {
    return (
        <section className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm">
            {/* Título */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <h2 className="text-lg font-semibold text-slate-800">Criptomonedas</h2>
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    {mockCryptos.length} monedas
                </span>
            </div>

            {/* Lista */}
            <ul className="flex flex-col gap-2">
                {mockCryptos.map((crypto) => (
                    <CryptoCard key={crypto.symbol} crypto={crypto} />
                ))}
            </ul>
        </section>
    );
}