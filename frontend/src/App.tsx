import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StocksList from './components/stocks/StockList';

function App() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="hidden lg:block mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Mercado</h2>
            <p className="text-sm text-slate-400 mt-1">
              Precios en tiempo real
            </p>
          </div>

          <div className="max-w-2xl">
            <StocksList />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;