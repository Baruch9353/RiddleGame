// Provides CRUD options for riddles
import fs from 'fs';
import readline from 'readline-sync';

export function manageRiddles() {
  const path = './riddles/db.txt';
  let riddles = JSON.parse(fs.readFileSync(path));

  console.log('\nRiddle Manager');
  console.log('1. Create');
  console.log('2. Read');
  console.log('3. Update');
  console.log('4. Delete');

  const choice = readline.question('Choose an option: ');

  switch (choice) {
    case '1':
      const id = riddles[riddles.length - 1].id + 1;
      const name = readline.question('Enter riddle name: ');
      const taskDescription = readline.question('Enter description: ');
      const correctAnswer = readline.question('Enter correct answer: ');
      riddles.push({ id, name, taskDescription, correctAnswer });
      break;

    case '2':
      console.log(riddles);
      break;

    case '3':
      const updateId = parseInt(readline.question('Enter riddle ID to update: '));
      const riddle = riddles.find(r => r.id === updateId);
      if (riddle) {
        riddle.name = readline.question('Enter new name: ');
        riddle.taskDescription = readline.question('Enter new description: ');
        riddle.correctAnswer = readline.question('Enter new answer: ');
      }
      break;

    case '4':
      const deleteId = parseInt(readline.question('Enter riddle ID to delete: '));
      riddles = riddles.filter(r => r.id !== deleteId);
      break;

    default:
      console.log('Invalid choice! Please select a number between 1 and 4.');
  }

  fs.writeFileSync(path, JSON.stringify(riddles, null, 2));
}
