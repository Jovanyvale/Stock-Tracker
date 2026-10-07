export default function SimulatorPage() {
    return (
        <div>
            <section className="mb-5 rounded-lg border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Simulador</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">Rendimiento hipotetico</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                    Calcula escenarios de inversion y compara resultados historicos cuando este listo.
                </p>
            </section>

            <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-[0_14px_34px_rgba(15,23,42,0.05)] sm:p-10">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-amber-50 text-xl font-bold text-amber-700 ring-1 ring-amber-100">
                    $
                </div>
                <p className="text-base font-semibold text-slate-900">Proximamente</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Estamos construyendo el simulador
                </p>
            </div>
        </div>
    );
}
