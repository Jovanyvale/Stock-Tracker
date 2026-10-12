import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.simulation.createMany({
        data: [
            {
                symbol: 'AAPL',
                amount: 1000,
                range: '1y',
                startDate: new Date('2024-10-12'),
                endDate: new Date('2025-10-12'),
                startPrice: 227.5,
                endPrice: 250.3,
                sharesBought: 4.3956,
                currentValue: 1100.15,
                profit: 100.15,
                profitPercent: 10.02,
            },
            {
                symbol: 'MSFT',
                amount: 500,
                range: '6mo',
                startDate: new Date('2025-04-12'),
                endDate: new Date('2025-10-12'),
                startPrice: 400.0,
                endPrice: 418.79,
                sharesBought: 1.25,
                currentValue: 523.49,
                profit: 23.49,
                profitPercent: 4.7,
            },
            {
                symbol: 'NVDA',
                amount: 2000,
                range: '1mo',
                startDate: new Date('2025-09-12'),
                endDate: new Date('2025-10-12'),
                startPrice: 118.0,
                endPrice: 132.5,
                sharesBought: 16.9492,
                currentValue: 2245.76,
                profit: 245.76,
                profitPercent: 12.29,
            },
        ],
    });

    console.log('✅ Seed ejecutado: 3 simulaciones insertadas');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());