import express from 'express';
import {
  getAllPlayersController,
  createPlayerController,
  updatePlayerController,
} from '../ctrl/ctrlPlayers.js';
import { signup, login } from '../ctrl/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/', getAllPlayersController);

router.post('/createPlayer', createPlayerController);

router.put('/:id', updatePlayerController);

export default router;
