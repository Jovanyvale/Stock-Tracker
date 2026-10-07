import type { TabId } from '../../types';

type Props = {
    active: TabId;
    onChange: (tab: TabId) => void;
};

const ITEMS: { id: TabId; label: string; icon: string }[] = [
    { id: 'market', label: 'Mercado', icon: '📈' },
    { id: 'simulator', label: 'Simulador', icon: '🎯' },
];

export default function Sidebar({ active, onChange }: Props) {
    return (
        <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-slate-200 bg-white p-5">
            {/* Logo */}
            <div className="mb-8">
                <h1 className="text-lg font-bold text-slate-800">Stock Tracker</h1>
                <p className="text-xs text-slate-400 mt-1">Tu portfolio personal</p>
            </div>

            {/* Navegación */}
            <nav className="flex flex-col gap-1">
                {ITEMS.map((item) => {
                    const isActive = active === item.id;
                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onChange(item.id)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}