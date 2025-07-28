import readline from 'readline-sync';
import { printChoiceMenu } from '../utils/printMenus.js';
import { playGame } from '../actions/playGame.js';
import { handleRiddleManagerMenu } from './handleRiddleManagerMenu.js';
import { showLeaderboard } from '../actions/showLeaderboard.js';

// handle Choice Menu
export async function handleChoiceMenu(player) {
  let choice;
  do {
    printChoiceMenu();
    choice = readline.question('Choose an option: ').trim();

    switch (choice) {
      case '1':
        await playGame(player);
        break;
      case '2':
        await handleRiddleManagerMenu();
        break;
      case '3':
        await showLeaderboard();
        break;
      case '4':
        console.log('Goodbye!');
        return;
      default:
        console.log('Invalid choice. Try again.');
    }
  } while (true);
}
