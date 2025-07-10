import express from 'express';
import { getAllRiddles, getRiddle, createRiddle } from '../ctrl/ctrlRiddles.js';

const router = express.Router();

router.get('/', getAllRiddles);
router.get('/:id', getRiddle);
router.post('/', createRiddle);

export default router;

