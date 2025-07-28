import readline from 'readline-sync';
import { printMainMenu } from '../utils/printMenus.js';
import { createGuestPlayer } from '../actions/createGuestPlayer.js';
import { loginOrSignup } from '../actions/loginPlayer.js'
import { handleChoiceMenu } from './handleChoiceMenu.js';

// handle Main Menu
export async function handleMainMenu() {
  let choice;
  do {
    printMainMenu();
    choice = readline.question('Choose an option: ').trim();

    switch (choice) {
      case '1': {
        const player = createGuestPlayer();
        await handleChoiceMenu(player);
        break;
      }
      case '2': {
        const player = await loginOrSignup();
        if (player) {
          await handleChoiceMenu(player);
        }
        break;
      }
      case '3':
        console.log('Goodbye!');
        process.exit(0);
      default:
        console.log('Invalid choice. Try again.');
    }
  } while (true);
}
