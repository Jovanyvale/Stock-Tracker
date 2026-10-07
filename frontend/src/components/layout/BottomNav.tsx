import type { TabId } from '../../types';

type Props = {
    active: TabId;
    onChange: (tab: TabId) => void;
};

const ITEMS: { id: TabId; label: string; icon: string }[] = [
    { id: 'market', label: 'Mercado', icon: 'M' },
    { id: 'simulator', label: 'Simulador', icon: '$' },
];

export default function BottomNav({ active, onChange }: Props) {
    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 shadow-[0_-12px_30px_rgba(15,23,42,0.06)] backdrop-blur">
            <div className="flex gap-2 px-4 py-3">
                {ITEMS.map((item) => {
                    const isActive = active === item.id;
                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onChange(item.id)}
                            className={`flex-1 flex flex-col items-center gap-1 rounded-lg py-2.5 text-xs font-semibold transition-colors ${isActive ? 'bg-slate-950 text-white' : 'text-slate-500 hover:bg-slate-100'
                                }`}
                        >
                            <span className="text-base leading-none">{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
