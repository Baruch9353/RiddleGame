// Displays the player leaderboard
import fs from 'fs';

export function showLeaderboard() {
  const players = JSON.parse(fs.readFileSync('./players/players.txt'));
  players.sort((a, b) => a.lowestTime - b.lowestTime);

  console.log('\nLeaderboard:');
  players.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name} - ${p.lowestTime.toFixed(2)} seconds`);
  });
}
