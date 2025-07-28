import readline from 'readline-sync';
import { createRiddle } from '../../api/riddlesApi.js';

export async function addRiddle() {
  const name = readline.question('\nEnter riddle name: ').trim();
  const taskDescription = readline.question('Enter task description: ').trim();
  const correctAnswer = readline.question('Enter correct answer: ').trim();

  if (!name || !taskDescription || !correctAnswer) {
    console.log('All fields are required.');
    return;
  }

  const newRiddle = { name, taskDescription, correctAnswer };

  try {
    const added = await createRiddle(newRiddle);
    console.log('\nRiddle added successfully with ID:', added._id);
  } catch (err) {
    console.error('Failed to add riddle:', err.message);
  }
}
