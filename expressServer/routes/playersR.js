import express from 'express';
import {
    getAllPlayersController,
    createPlayerController,
    updatePlayerController,
} from '../ctrl/ctrlPlayers.js';
import { verifyToken, requireRole } from '../middlewares/auth.js';
import authorizeRole from '../middlewares/authorizeRole.js';

const router = express.Router();

router.get('/', verifyToken, authorizeRole('admin'), getAllPlayersController);

router.post('/', verifyToken, requireRole(['user', 'admin']), createPlayerController);

router.put('/:id', verifyToken, requireRole(['admin']), updatePlayerController);

export default router;
