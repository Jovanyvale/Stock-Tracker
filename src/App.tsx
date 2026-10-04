import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StocksList from './components/stocks/StockList';
import CryptoList from './components/crypto/CryptoList';


function App() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar (solo desktop) */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Título grande (solo desktop) */}
          <div className="hidden lg:block mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Mercado</h2>
            <p className="text-sm text-slate-400 mt-1">
              Precios en tiempo real (datos de ejemplo)
            </p>
          </div>

          {/* Grid de secciones */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-6">
            <StocksList />
            <CryptoList />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;