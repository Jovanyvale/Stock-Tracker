type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function StockSearch({ value, onChange }: Props) {
    return (
        <div className="relative">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Buscar por nombre o simbolo..."
                className="w-full rounded-lg border border-slate-200 bg-white py-4 pl-14 pr-12 text-sm text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.04)] outline-none transition-colors placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
            />
            {value && (
                <button
                    type="button"
                    onClick={() => onChange('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1.5 text-sm text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Limpiar"
                >
                    x
                </button>
            )}
        </div>
    );
}
