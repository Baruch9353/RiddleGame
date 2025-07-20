import {getAllPlayers} from '../players/playersApi.js'

// Displays the player leaderboard
export async function showLeaderboard() {
  const players = await getAllPlayers();
  players.sort((a, b) => a.lowestTime - b.lowestTime);

  console.log('\nLeaderboard:');
  players.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name} - ${Number(p.lowestTime).toFixed(2)} seconds.`);
  });
}
