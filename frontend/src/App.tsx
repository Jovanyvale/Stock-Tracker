import { useState } from 'react';
import type { TabId } from './types';
import Layout from './components/layout/Layout';
import MarketPage from './components/stocks/MarketPage';
import SimulatorPage from './components/simulator/SimulatorPage';
import LegalPage from './components/legal/LegalPage';

const TITLES: Record<TabId, string> = {
  market: 'Mercado',
  simulator: 'Simulador',
  legal: 'Legal',
};

function App() {
  const [tab, setTab] = useState<TabId>('market');

  return (
    <Layout active={tab} onChange={setTab} title={TITLES[tab]}>
      {tab === 'market' && <MarketPage />}
      {tab === 'simulator' && <SimulatorPage />}
      {tab === 'legal' && <LegalPage />}
    </Layout>
  );
}

export default App;