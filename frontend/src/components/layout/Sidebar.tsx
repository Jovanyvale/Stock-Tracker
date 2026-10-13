import type { TabId } from '../../types';
import icon1 from "../../assets/img/1.webp";
import icon2 from "../../assets/img/2.webp";

type Props = {
    active: TabId;
    onChange: (tab: TabId) => void;
};

const ITEMS: { id: TabId; label: string; icon: string; isEmoji?: boolean }[] = [
    { id: 'market', label: 'Mercado', icon: icon1 },
    { id: 'simulator', label: 'Simulador', icon: icon2 },
    { id: 'legal', label: 'Legal', icon: '📄', isEmoji: true },
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

            <nav className="flex flex-col gap-2 flex-1">
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
                            {item.isEmoji
                                ? <span className="text-lg">{item.icon}</span>
                                : <img src={item.icon} alt="" className='max-h-12' />
                            }
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <footer className="pt-4 mt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500">© 2025 Stock Tracker</p>
                <p className="mt-1 text-xs text-slate-400">Uso personal y educativo</p>
                <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-xs">
                    <button
                        type="button"
                        onClick={() => onChange('legal')}
                        className="text-slate-500 hover:text-slate-950 transition-colors"
                    >
                        Privacidad
                    </button>
                    <span className="text-slate-300">·</span>
                    <button
                        type="button"
                        onClick={() => onChange('legal')}
                        className="text-slate-500 hover:text-slate-950 transition-colors"
                    >
                        Términos
                    </button>
                </div>
            </footer>
        </aside>
    );
}