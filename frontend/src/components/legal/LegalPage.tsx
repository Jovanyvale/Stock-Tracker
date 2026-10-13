export default function LegalPage() {
    return (
        <div className="flex flex-col gap-5">
            <div>
                <h2 className="text-xl font-bold text-slate-800">Legal</h2>
                <p className="text-xs text-slate-400 mt-1">
                    Aviso de Privacidad y Términos y Condiciones
                </p>
            </div>

            {/* Aviso de Privacidad */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6">
                <h3 className="text-base font-bold text-slate-800 mb-3">
                    Aviso de Privacidad
                </h3>

                <div className="flex flex-col gap-3 text-sm text-slate-600 leading-relaxed">
                    <p>
                        Esta aplicación guarda únicamente los datos que ingresas en el
                        simulador: símbolo de la empresa, monto y período.
                        <strong> No recolecta datos personales</strong> como nombre, correo
                        o información financiera real.
                    </p>

                    <p>
                        La información se usa solo para calcular y mostrar tus simulaciones,
                        y se almacena en una base de datos local protegida con validación
                        de datos y credenciales en variables de entorno.
                    </p>

                    <p>
                        No se comparte con terceros. Puedes eliminar cualquier simulación
                        en cualquier momento desde el historial.
                    </p>

                    <p className="text-xs text-slate-400">Última actualización: octubre 2025</p>
                </div>
            </section>

            {/* Términos y Condiciones */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6">
                <h3 className="text-base font-bold text-slate-800 mb-3">
                    Términos y Condiciones
                </h3>

                <div className="flex flex-col gap-3 text-sm text-slate-600 leading-relaxed">
                    <p>
                        Esta aplicación es de <strong>uso personal y educativo</strong>.
                        No está permitido usarla con fines comerciales ni extraer sus
                        datos de forma automatizada.
                    </p>

                    <p>
                        Los precios provienen de Yahoo Finance y pueden tener retrasos o
                        imprecisiones. Los resultados son hipotéticos.
                        <strong> Esto no es asesoría financiera</strong> ni recomendación
                        de compra o venta.
                    </p>

                    <p>
                        El desarrollador no se responsabiliza por decisiones tomadas a
                        partir del uso de esta herramienta.
                    </p>

                    <p className="text-xs text-slate-400">Última actualización: octubre 2025</p>
                </div>
            </section>
        </div>
    );
}