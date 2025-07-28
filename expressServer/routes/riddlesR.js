import express from 'express';
import {
  getAllRiddlesHandler,
  getRiddleHandler,
  createRiddleHandler,
  updateRiddleHandler,
  deleteRiddleHandler
} from '../ctrl/ctrlRiddles.js';
import { verifyToken, requireRole } from '../middlewares/auth.js';

const router = express.Router();

router.get('/',getAllRiddlesHandler);
router.get('/:id', verifyToken, requireRole(['user', 'admin']), getRiddleHandler);

router.post('/', verifyToken, requireRole(['user', 'admin']), createRiddleHandler);

router.put('/:id', verifyToken, requireRole(['admin']), updateRiddleHandler);
router.delete('/:id', verifyToken, requireRole(['admin']), deleteRiddleHandler);

export default router;
