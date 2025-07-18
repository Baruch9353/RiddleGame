import { getAllRiddles, getRiddleById, addRiddle, updateRiddle, deleteRiddle } from '../DAL/riddlesDall.js';

// Handles GET /riddles - returns all riddles
export async function getAllRiddlesHandler(req, res) {
  const riddles = await getAllRiddles();
  res.json(riddles);
}

// Handles GET /riddles/:id - returns a specific riddle by ID (MongoDB _id string)
export async function getRiddleHandler(req, res) {
  const id = req.params.id; 
  const riddle = await getRiddleById(id);
  if (!riddle) return res.status(404).send('Riddle not found');
  res.json(riddle);
}

// Handles POST /riddles - creates a new riddle
export async function createRiddleHandler(req, res) {
  const { name, taskDescription, correctAnswer } = req.body;
  if (!name || !taskDescription || !correctAnswer) {
    return res.status(400).send("Missing fields");
  }
  const newRiddle = await addRiddle({ name, taskDescription, correctAnswer });
  res.status(201).json(newRiddle);
}

// Handles PUT /riddles/:id - updates an existing riddle by MongoDB _id string
export async function updateRiddleHandler(req, res) {
  const id = req.params.id; 
  const { name, taskDescription, correctAnswer } = req.body;
  if (!name || !taskDescription || !correctAnswer) {
    return res.status(400).send("All fields are required");
  }
  const updated = await updateRiddle(id, { name, taskDescription, correctAnswer });
  if (!updated) return res.status(404).send("Riddle not found");
  res.json(updated);
}

// Handles DELETE /riddles/:id - deletes a riddle by MongoDB _id string
export async function deleteRiddleHandler(req, res) {
  const id = req.params.id; 
  const deleted = await deleteRiddle(id);
  if (!deleted) return res.status(404).send('Riddle not found');
  res.status(200).json({ deleted: true });
}
