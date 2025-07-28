import readline from 'readline-sync';
import { getRiddleById, updateRiddle } from '../../api/riddlesApi.js';

export async function editRiddle() {
  const id = readline.question('\nEnter riddle ID to edit: ').trim();
  if (!id) {
    console.log('Invalid ID.');
    return;
  }
  try {
    const existing = await getRiddleById(id);
    if (!existing) {
      console.log('Riddle not found.');
      return;
    }
    const name = readline.question(`Name [${existing.name}]: `).trim() || existing.name;
    const taskDescription = readline.question(`Description [${existing.taskDescription}]: `).trim() || existing.taskDescription;
    const correctAnswer = readline.question(`Answer [${existing.correctAnswer}]: `).trim() || existing.correctAnswer;
    const updated = { name, taskDescription, correctAnswer };
    await updateRiddle(id, updated);
    console.log('Riddle updated successfully.');
  } catch (err) {
    console.error('Failed to edit riddle:', err.message);
  }
}
