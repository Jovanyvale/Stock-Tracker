import { Router } from 'express';
import { create, list, remove } from '../controllers/simulation.controller';

export const simulationRouter = Router();

simulationRouter.post('/', create);
simulationRouter.get('/', list);
simulationRouter.delete('/:id', remove);