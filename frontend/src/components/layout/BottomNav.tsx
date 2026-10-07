import type { TabId } from '../../types';

type Props = {
    active: TabId;
    onChange: (tab: TabId) => void;
};

const ITEMS: { id: TabId; label: string; icon: string }[] = [
    { id: 'market', label: 'Mercado', icon: '📈' },
    { id: 'simulator', label: 'Simulador', icon: '🎯' },
];

export default function BottomNav({ active, onChange }: Props) {
    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white">
            <div className="flex">
                {ITEMS.map((item) => {
                    const isActive = active === item.id;
                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onChange(item.id)}
                            className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400'
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-xs font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}