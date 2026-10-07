type Props = {
    title: string;
};

export default function Header({ title }: Props) {
    return (
        <header className="lg:hidden border-b border-slate-200 bg-white px-4 py-3 sticky top-0 z-30">
            <h1 className="text-base font-bold text-slate-800">Stock Tracker</h1>
            <p className="text-xs text-slate-400">{title}</p>
        </header>
    );
}