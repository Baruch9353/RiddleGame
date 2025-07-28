import { getAllRiddles } from '../api/riddlesApi.js';
import { updatePlayerLowestTime } from '../api/playersApi.js';
import { Riddle } from '../classes/Riddle.js';
import { Player } from '../classes/Player.js';

// Runs the game by asking all riddles one after another.
// Measures time for each and updates player's time stats.
export async function playGame(player) {
  try {
    const riddlesData = await getAllRiddles();
    for (const riddleData of riddlesData) {
      const riddle = new Riddle(riddleData);
      const start = Date.now();
      riddle.ask();
      const end = Date.now();
      player.recordTime(start, end);
    }
    const avgTime = player.showStats();

    if (player.id !== 'guest') {
      try {
        await updatePlayerLowestTime(player.id, avgTime);
      } catch (err) {
        console.log('Could not update lowest time:', err.message);
      }
    }
  } catch (err) {
    console.log('Error during game:', err.message);
  }
}
