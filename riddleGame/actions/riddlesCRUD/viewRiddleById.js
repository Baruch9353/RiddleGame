import readline from 'readline-sync';
import { getRiddleById } from '../../api/riddlesApi.js';

export async function viewRiddleById() {
  const id = readline.question('\nEnter riddle ID to view: ').trim();

  if (!id) {
    console.log('Invalid ID.');
    return;
  }

  try {
    const riddle = await getRiddleById(id);
    if (!riddle) {
      console.log('Riddle not found.');
      return;
    }

    console.log('\n--- Riddle Details ---');
    console.log(`Name: ${riddle.name}`);
    console.log(`Description: ${riddle.taskDescription}`);
  } catch (err) {
    console.error('Failed to load riddle:', err.message);
  }
}
