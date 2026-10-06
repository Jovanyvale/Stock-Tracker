type Props = {
  loading: boolean;
  error: string | null;
  empty: boolean;
};

export default function ListState({ loading, error, empty }: Props) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="w-6 h-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        <p className="mt-3 text-xs text-slate-400">Cargando…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-blue-50 p-4 text-center">
        <p className="text-sm font-medium text-blue-600">⚠️ Error al cargar</p>
        <p className="mt-1 text-xs text-slate-500 break-words">{error}</p>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-xs text-slate-400">No hay datos disponibles</p>
      </div>
    );
  }

  return null;
}