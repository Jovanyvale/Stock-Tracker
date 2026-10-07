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
        </div>
    );
}
