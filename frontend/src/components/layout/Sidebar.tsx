import type { TabId } from '../../types';

type Props = {
    active: TabId;
    onChange: (tab: TabId) => void;
};

const ITEMS: { id: TabId; label: string; icon: string }[] = [
    { id: 'market', label: 'Mercado', icon: 'M' },
    { id: 'simulator', label: 'Simulador', icon: '$' },
];

export default function Sidebar({ active, onChange }: Props) {
    return (
        <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-slate-200 bg-white/95 px-5 py-6 shadow-[10px_0_30px_rgba(15,23,42,0.04)] backdrop-blur">
            <div className="mb-8 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-white shadow-sm">
                    ST
                </div>
                <div className="min-w-0">
                    <h1 className="truncate text-base font-bold text-slate-950">Stock Tracker</h1>
                    <p className="mt-0.5 text-xs text-slate-500">Panel de mercado</p>
                </div>
            </div>

            <nav className="flex flex-col gap-2">
                {ITEMS.map((item) => {
                    const isActive = active === item.id;
                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onChange(item.id)}
                            className={`flex items-center gap-3 rounded-lg px-3.5 py-3 text-sm font-semibold transition-all ${isActive
                                ? 'bg-slate-950 text-white shadow-sm'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                                }`}
                        >
                            <span className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs ${isActive ? 'bg-white/12 text-white ring-1 ring-white/15' : 'bg-white text-slate-500 ring-1 ring-slate-200'}`}>
                                {item.icon}
                            </span>
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="mt-auto rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Resumen</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">Top 100 empresas</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">Datos de mercado organizados para consulta rapida.</p>
            </div>
        </aside>
    );
}
