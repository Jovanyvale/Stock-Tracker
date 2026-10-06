import { Router } from 'express';
import { listStocks } from '../controllers/stocks.controller';

export const stocksRouter = Router();

stocksRouter.get('/', listStocks);