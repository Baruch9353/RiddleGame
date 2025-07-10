import * as riddlesDAL from '../DAL/riddlesDAL.js';

export async function getAllRiddles(req, res) {
  const riddles = await riddlesDAL.getAllRiddles();
  res.json(riddles);
}

export async function getRiddle(req, res) {
  const id = Number(req.params.id);
  const riddle = await riddlesDAL.getRiddleById(id);
  if (!riddle) return res.status(404).send('Riddle not found');
  res.json(riddle);
}

export async function createRiddle(req, res) {
  const { name, taskDescription, correctAnswer } = req.body;

  if (!name || !taskDescription || !correctAnswer) {
    return res.status(400).send("Missing fields");
  }

  const newRiddle = await riddlesDAL.addRiddle({ name, taskDescription, correctAnswer });
  res.status(201).json(newRiddle);
}
