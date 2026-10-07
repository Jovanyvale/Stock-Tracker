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
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar (desktop) */}
            <Sidebar active={active} onChange={onChange} />

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header (móvil) */}
                <Header title={title} />

                {/* Contenido */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
                    <div className="max-w-2xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>

            {/* Bottom nav (móvil) */}
            <BottomNav active={active} onChange={onChange} />
        </div>
    );
}