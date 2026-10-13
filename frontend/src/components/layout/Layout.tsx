import type { ReactNode } from 'react';
import type { TabId } from '../../types';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import Header from './Header';

type Props = {
    active: TabId;
    onChange: (tab: TabId) => void;
    title: string;
    children: ReactNode;
};

export default function Layout({ active, onChange, title, children }: Props) {
    return (
        <div className="min-h-screen bg-transparent flex">
            <Sidebar active={active} onChange={onChange} />

            <div className="flex-1 flex flex-col min-w-0">
                <Header title={title} />

                <main className="flex-1 px-5 py-6 pb-28 sm:px-8 lg:px-10 xl:px-12 lg:py-8 lg:pb-10">
                    <div className="mx-auto w-full max-w-6xl">
                        {children}
                    </div>
                </main>
            </div>

            <BottomNav active={active} onChange={onChange} />
            <footer className="pt-6 mt-8 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-400">© 2025 Stock Tracker</p>
                <div className="flex justify-center gap-2 mt-1 text-xs">
                    <button
                        onClick={() => onChange('legal')}
                        className="text-slate-400 hover:text-blue-600 transition-colors"
                    >
                        Privacidad
                    </button>
                    <span className="text-slate-300">·</span>
                    <button
                        onClick={() => onChange('legal')}
                        className="text-slate-400 hover:text-blue-600 transition-colors"
                    >
                        Términos
                    </button>
                </div>
            </footer>
        </div>

    );
}
