type Props = {
  loading: boolean;
  error: string | null;
  empty: boolean;
};

export default function ListState({ loading, error, empty }: Props) {
  if (loading) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-6 py-14 text-center shadow-[0_12px_28px_rgba(15,23,42,0.04)]">
        <p className="text-sm font-medium text-slate-500">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-100 bg-red-50 p-6 text-center shadow-sm">
        <p className="text-sm font-medium text-red-600">Error al cargar</p>
        <p className="mt-1 text-xs text-slate-500 break-words">{error}</p>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-6 py-14 text-center shadow-[0_12px_28px_rgba(15,23,42,0.04)]">
        <p className="text-sm text-slate-400">Sin resultados</p>
      </div>
    );
  }

  return null;
}
