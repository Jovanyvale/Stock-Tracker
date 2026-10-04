export default function Sidebar() {
    return (
        <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-slate-200 bg-white p-5">
            <div className="mb-8">
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                    📈 Mi Portfolio
                </h1>
                <p className="text-xs text-slate-400 mt-1">Rastreador de precios</p>
            </div>

            {/* Espacio reservado para futuras secciones */}
            <div className="flex-1 flex items-center justify-center rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-xs text-slate-300 text-center px-4">
                    Espacio reservado
                </p>
            </div>
        </aside>
    );
}