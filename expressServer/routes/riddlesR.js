import express from 'express';
import {
  getAllRiddlesHandler,
  getRiddleHandler,
  createRiddleHandler,
  updateRiddleHandler,
  deleteRiddleHandler
} from '../ctrl/ctrlRiddles.js';

const router = express.Router();

router.get('/', getAllRiddlesHandler);
router.get('/:id', getRiddleHandler);
router.post('/', createRiddleHandler);
router.put('/:id', updateRiddleHandler);
router.delete('/:id', deleteRiddleHandler);

export default router;

