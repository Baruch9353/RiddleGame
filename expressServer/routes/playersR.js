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
router.put('/:id', updatePlayerController);
// This route isn't essential because users are created as players during signup,
// but it's kept as an optional utility for potential future use.
router.post('/createPlayer', createPlayerController);

export default router;
