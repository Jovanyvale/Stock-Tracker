type Props = {
    title: string;
};

export default function Header({ title }: Props) {
    return (
        <header className="lg:hidden sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-5 py-4 shadow-sm backdrop-blur">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-xs font-bold text-white shadow-sm">
                    ST
                </div>
                <div>
                    <h1 className="text-base font-bold text-slate-900">Stock Tracker</h1>
                    <p className="text-xs text-slate-500">{title}</p>
                </div>
            </div>
        </header>
    );
}
