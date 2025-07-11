// Handles main menu logic
import readline from 'readline-sync';
import { playGame } from './play.js';
import { showLeaderboard } from './leaderboard.js';
import { manageRiddles } from './riddleManager.js';

export async function menu() {
  const playerName = readline.question("What is your name? ");
  console.log(`        Hi ${playerName}!
Welcome to the Riddle Game!
===========================`);
  while (true) {
    console.log(`\nWhat do you want to do?
   1. Play the game
   2. Manage riddles
   3. View leaderboard
   4. Exit`);

    const choice = readline.question('Choose an option: ');

    switch (choice) {
      case '1':
        await playGame(playerName);
        break;
      case '2':
        await manageRiddles();
        break;
      case '3':
        showLeaderboard();
        break;
      case '4':
        return;
      default:
        console.log('Invalid choice! Please select 1-4.');
    }
  }
}
