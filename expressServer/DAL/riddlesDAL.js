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

  const riddleToAdd = {
    id: id,
    name: newRiddle.name,
    taskDescription: newRiddle.taskDescription,
    correctAnswer: newRiddle.correctAnswer
  };

  riddles.push(riddleToAdd);

  await writeFile(riddlesFile, JSON.stringify(riddles, null, 2));
  return riddleToAdd;
}
