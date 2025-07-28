import readline from 'readline-sync';
import { printRiddleAdminMenu } from '../utils/printMenus.js';

import { showAllRiddles } from '../actions/riddlesCRUD/showAllRiddles.js';
import { viewRiddleById } from '../actions/riddlesCRUD/viewRiddleById.js';
import { addRiddle } from '../actions/riddlesCRUD/addRiddle.js';
import { editRiddle } from '../actions/riddlesCRUD/editRiddle.js';
import { deleteRiddleById } from '../actions/riddlesCRUD/deleteRiddle.js';

// handle Riddle Manager Menu
export async function handleRiddleManagerMenu() {
  let choice;
  do {
    printRiddleAdminMenu();
    choice = readline.question('Choose an option: ').trim();

    switch (choice) {
      case '1':
        await showAllRiddles();
        break;

      case '2':
        await viewRiddleById();
        break;

      case '3':
        await addRiddle();
        break;

      case '4':
        await editRiddle();
        break;

      case '5':
        await deleteRiddleById();
        break;

      case '6':
        return; // Exit back to previous menu

      default:
        console.log('Invalid choice. Try again.');
    }
  } while (true);
}
