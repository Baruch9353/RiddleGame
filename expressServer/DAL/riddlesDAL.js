import { readFile, writeFile } from 'fs/promises';

const riddlesFile = './data/riddles.txt';

export async function getAllRiddles() {
  const data = await readFile(riddlesFile, 'utf8');
  return JSON.parse(data);
}

export async function getRiddleById(id) {
  const riddles = await getAllRiddles();
  return riddles.find(r => r.id === id);
}

export async function addRiddle(newRiddle) {
  const riddles = await getAllRiddles();
  const id = riddles.length > 0 ? riddles[riddles.length - 1].id + 1 : 1;
  const riddleToAdd = { id, ...newRiddle };
  riddles.push(riddleToAdd);
  await writeFile(riddlesFile, JSON.stringify(riddles, null, 2));
  return riddleToAdd;
}

// Update a riddle by id
export async function updateRiddle(id, updatedData) {
  const riddles = await getAllRiddles();
  const index = riddles.findIndex(r => r.id === id);
  if (index === -1) return null;

  riddles[index] = { ...riddles[index], ...updatedData, id }; // keep id intact
  await writeFile(riddlesFile, JSON.stringify(riddles, null, 2));
  return riddles[index];
}

// Delete a riddle by id
export async function deleteRiddle(id) {
  let riddles = await getAllRiddles();
  const lengthBefore = riddles.length;
  riddles = riddles.filter(r => r.id !== id);
  if (riddles.length === lengthBefore) return false; // no deletion happened
  await writeFile(riddlesFile, JSON.stringify(riddles, null, 2));
  return true;
}
