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
                placeholder="Buscar por nombre o símbolo…"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none transition-colors"
            />
            {value && (
                <button
                    type="button"
                    onClick={() => onChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors text-sm"
                    aria-label="Limpiar"
                >
                    ✕
                </button>
            )}
        </div>
    );
}