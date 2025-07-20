import express from 'express';
import {
    getAllPlayersController,
    createPlayerController,
    updatePlayerController
} from '../ctrl/ctrlPlayers.js';

const router = express.Router();

router.get('/', getAllPlayersController);
router.post('/', createPlayerController);
router.put('/:id', updatePlayerController);

export default router;