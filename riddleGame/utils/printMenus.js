// Main menu: choose player type
export function printMainMenu() {
  console.log('\nWelcome to the Riddle Game! Good luck!\n');
  console.log('\n=== Main Menu ===');
  console.log('1. Play as guest');
  console.log('2. Login Or Signup');
  console.log('3. Exit');
}

// Second menu: choose action
export function printChoiceMenu() {
  console.log('\n=== Choose Action ===');
  console.log('1. Play');
  console.log('2. Manage riddles');
  console.log('3. View leaderboard');
  console.log('4. Logout');
}

// Admin menu for managing riddles
export function printRiddleAdminMenu() {
  console.log('\n=== Riddle Management ===');
  console.log('1. Show all riddles');
  console.log('2. View riddle by ID');
  console.log('3. Add new riddle');
  console.log('4. Edit riddle');
  console.log('5. Delete riddle');
  console.log('6. Back');
}
