import { readFile, writeFile } from 'fs/promises';

const path = './data/riddles.txt';

// Get all riddles
export async function getAllRiddles() {
  const data = await readFile(path, 'utf8');
  return JSON.parse(data);
};

// Get a riddle by id
export async function getRiddleById(id) {
  const riddles = await getAllRiddles();
  return riddles.find(r => r.id === id);
};

// Add a riddle
export async function addRiddle(newRiddle) {
  const riddles = await getAllRiddles();
  const id = riddles.length > 0 ? riddles[riddles.length - 1].id + 1 : 1;

  const riddleToAdd = {
    id: id,
    name: newRiddle.name,
    taskDescription: newRiddle.taskDescription,
    correctAnswer: newRiddle.correctAnswer
  };

  riddles.push(riddleToAdd);
  await writeFile(path, JSON.stringify(riddles, null, 2));
  return riddleToAdd;
}

// Update a riddle by id
export async function updateRiddle(id, updatedData) {
  const riddles = await getAllRiddles();
  const index = riddles.findIndex(r => r.id === id);
  if (index === -1) return null;

  if (!updatedData.name || !updatedData.taskDescription || !updatedData.correctAnswer) {
    return null;}

  const updatedRiddle = {
    id: id,
    name: updatedData.name,
    taskDescription: updatedData.taskDescription,
    correctAnswer: updatedData.correctAnswer
  };

  riddles[index] = updatedRiddle;
  await writeFile(path, JSON.stringify(riddles, null, 2));
  return updatedRiddle;
}

// Delete a riddle by id
export async function deleteRiddle(id) {
  const riddles = await getAllRiddles();
  const updatedRiddles = riddles.filter(r => r.id !== id);

  await writeFile(path, JSON.stringify(updatedRiddles, null, 2));
  return true;
}

