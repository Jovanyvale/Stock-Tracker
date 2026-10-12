CREATE DATABASE IF NOT EXISTS stocktracker
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE stocktracker;

CREATE TABLE IF NOT EXISTS simulations (
  id              CHAR(36)        NOT NULL,
  symbol          VARCHAR(20)     NOT NULL,
  amount          DECIMAL(12,2)   NOT NULL,
  `range`         VARCHAR(10)     NOT NULL,
  startDate       DATETIME(3)     NOT NULL,
  endDate         DATETIME(3)     NOT NULL,
  startPrice      DECIMAL(12,4)   NOT NULL,
  endPrice        DECIMAL(12,4)   NOT NULL,
  sharesBought    DECIMAL(16,8)   NOT NULL,
  currentValue    DECIMAL(14,2)   NOT NULL,
  profit          DECIMAL(14,2)   NOT NULL,
  profitPercent   DECIMAL(8,2)    NOT NULL,
  createdAt       DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  PRIMARY KEY (id),

  INDEX idx_simulations_symbol     (symbol),
  INDEX idx_simulations_createdAt  (createdAt)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


ALTER TABLE simulations
  MODIFY COLUMN symbol          VARCHAR(20)   NOT NULL COMMENT 'Símbolo bursátil (AAPL, MSFT…)',
  MODIFY COLUMN amount          DECIMAL(12,2) NOT NULL COMMENT 'Monto invertido en USD',
  MODIFY COLUMN `range`         VARCHAR(10)   NOT NULL COMMENT 'Período de simulación (1w, 1mo, 3mo, 6mo, 1y, 5y)',
  MODIFY COLUMN startDate       DATETIME(3)   NOT NULL COMMENT 'Fecha de inicio del período simulado',
  MODIFY COLUMN endDate         DATETIME(3)   NOT NULL COMMENT 'Fecha de fin del período simulado',
  MODIFY COLUMN startPrice      DECIMAL(12,4) NOT NULL COMMENT 'Precio del activo al inicio',
  MODIFY COLUMN endPrice        DECIMAL(12,4) NOT NULL COMMENT 'Precio del activo al final',
  MODIFY COLUMN sharesBought    DECIMAL(16,8) NOT NULL COMMENT 'Acciones compradas (amount / startPrice)',
  MODIFY COLUMN currentValue    DECIMAL(14,2) NOT NULL COMMENT 'Valor actual de la inversión',
  MODIFY COLUMN profit          DECIMAL(14,2) NOT NULL COMMENT 'Ganancia o pérdida en USD',
  MODIFY COLUMN profitPercent   DECIMAL(8,2)  NOT NULL COMMENT 'Ganancia o pérdida en porcentaje',
  MODIFY COLUMN createdAt       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT 'Fecha de creación del registro';

SHOW TABLES;
DESCRIBE simulations;