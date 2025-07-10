import express from 'express';
import {
  getAllRiddlesHandler,
  getRiddleHandler,
  createRiddleHandler,
  updateRiddleHandler,
  deleteRiddleHandler
} from '../ctrl/ctrlRiddles.js';

const router = express.Router();

router.get('/riddles', getAllRiddlesHandler);
router.get('/riddles/:id', getRiddleHandler);
router.post('/riddles', createRiddleHandler);
router.put('/riddles/:id', updateRiddleHandler);
router.delete('/riddles/:id', deleteRiddleHandler);

export default router;

