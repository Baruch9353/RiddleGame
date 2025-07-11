import readline from 'readline-sync';
import { createRiddle, readRiddles, updateRiddle, deleteRiddle } from './riddlesApi.js';

export async function manageRiddles() {
  console.log('\nRiddle Manager');
  console.log('1. Create');
  console.log('2. Read (all riddles)');
  console.log('3. Update');
  console.log('4. Delete');

  const choice = readline.question('Choose an option: ');

  try {
    switch (choice) {
      case '1':
        await createRiddle();
        break;
      case '2':
        await readRiddles();
        break;
      case '3':
        await updateRiddle();
        break;
      case '4':
        await deleteRiddle();
        break;
      default:
        console.log('Invalid choice! Please select a number between 1 and 4.');
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}
