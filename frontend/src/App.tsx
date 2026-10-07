import { useState } from 'react';
import type { TabId } from './types';
import Layout from './components/layout/Layout';
import SimulatorPage from './components/simulator/SimulatorPage';
import MarketPage from './components/stocks/MarketPage';


const TITLES: Record<TabId, string> = {
  market: 'Mercado',
  simulator: 'Simulador',
};

function App() {
  const [tab, setTab] = useState<TabId>('market');

  return (
    <Layout active={tab} onChange={setTab} title={TITLES[tab]}>
      {tab === 'market' && <MarketPage />}
      {tab === 'simulator' && <SimulatorPage />}
    </Layout>
  );
}

export default App;