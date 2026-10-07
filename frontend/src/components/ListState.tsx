type Props = {
  loading: boolean;
  error: string | null;
  empty: boolean;
};

export default function ListState({ loading, error, empty }: Props) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-sm text-slate-400">Cargando…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 p-4 text-center">
        <p className="text-sm font-medium text-red-600">Error al cargar</p>
        <p className="mt-1 text-xs text-slate-500 break-words">{error}</p>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-sm text-slate-400">Sin resultados</p>
      </div>
    );
  }

  return null;
}