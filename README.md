App personal para rastrear precios de las 100 empresas más valiosas del S&P 500
y simular inversiones históricas.

---


##  Estructura
Stock Tracker/
├── backend/ # API REST (Express + TS)
├── frontend/ # App React (Vite + TS + Tailwind)
└── README.md


---

##  Pasos seguidos

### 1. Setup del frontend
- Proyecto creado con `npm create vite` (React + TS + ESLint)
- Tailwind CSS instalado con `@tailwindcss/vite`
- Alias `@/` descartado (se usan rutas relativas)

### 2. Setup del backend
- Proyecto Express + TypeScript en `backend/`
- Ejecución en dev con `tsx watch`
- CORS habilitado para `localhost:5173`
- Caché en memoria con TTL (60s para precios)

### 3. Integración con Yahoo Finance
- Un solo endpoint (`/v8/finance/chart/{symbol}`) cubre:
  - Precio actual
  - Histórico (por rango)
  - Nombre de la empresa
- Sin API key, sin registro, sin tarjeta
- Requiere `User-Agent` para evitar bloqueos
- Lista de 100 símbolos en `data/symbols.ts` (editable)

### 4. Endpoints del backend
GET /health → estado del servidor
GET /api/stocks → lista de 100 empresas
GET /api/stocks/:symbol/history → histórico por rango
POST /api/simulate → calcula inversión ficticia


### 5. Frontend — UI
- Diseño mobile-first, blanco predominante, redondeado
- **Desktop:** sidebar izquierda con navegación
- **Móvil:** header superior + bottom tabs
- Sin animaciones, solo hovers de color

### 6. Frontend — Componentes
- `Layout`, `Sidebar`, `BottomNav`, `Header`
- `MarketPage`, `SimulatorPage`
- `StocksList`, `StockCard`, `StockSearch`, `StockModal`
- `ListState` (loading / error / vacío)
- Hook `useFetch<T>(endpoint)` reutilizable

### 7. Pendiente
- [ ] Simulador completo (formulario + resultado + gráfico)
- [ ] Gráfico con `lightweight-charts`
- [ ] Métricas fundamentales
- [ ] Historial de simulaciones en localStorage
- [ ] Migrar historial a base de datos

---

## Cómo correr

```bash
# Terminal 1 — Backend
cd backend
npm install
npm run dev          # http://localhost:3001

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev          # http://localhost:5173
