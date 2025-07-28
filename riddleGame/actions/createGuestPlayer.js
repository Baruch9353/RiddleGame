import { Player } from '../classes/Player.js';

export function createGuestPlayer() {
  console.log(`\nWelcome guest`);
  return new Player('guest', 'guest', []);
}
