import readline from 'readline-sync';
import { deleteRiddle } from '../../api/riddlesApi.js';

export async function deleteRiddleById() {
  const id = readline.question('\nEnter riddle ID to delete: ').trim();

  if (!id) {
    console.log('Invalid ID.');
    return;
  }

  const confirm = readline.question('Are you sure you want to delete this riddle? (y/n): ').toLowerCase();

  if (confirm !== 'y') {
    console.log('Deletion cancelled.');
    return;
  }

  try {
    await deleteRiddle(id);
    console.log('Riddle deleted successfully.');
  } catch (err) {
    console.error('Failed to delete riddle:', err.message);
  }
}
