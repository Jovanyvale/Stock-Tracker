-- CreateTable
CREATE TABLE `simulations` (
    `id` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(20) NOT NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `range` VARCHAR(10) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `startPrice` DECIMAL(12, 4) NOT NULL,
    `endPrice` DECIMAL(12, 4) NOT NULL,
    `sharesBought` DECIMAL(16, 8) NOT NULL,
    `currentValue` DECIMAL(14, 2) NOT NULL,
    `profit` DECIMAL(14, 2) NOT NULL,
    `profitPercent` DECIMAL(8, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `simulations_symbol_idx`(`symbol`),
    INDEX `simulations_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
