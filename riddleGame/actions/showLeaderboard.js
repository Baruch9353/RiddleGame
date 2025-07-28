import { getAllPlayers } from '../api/playersApi.js';

// Shows leaderboard sorted by lowestTime
export async function showLeaderboard() {
  try {
    const players = await getAllPlayers();
    // Filter out players without lowestTime and sort ascending
    const sorted = players
      .filter(p => p.lowestTime != null)
      .sort((a, b) => a.lowestTime - b.lowestTime);
    console.log('\n=== Leaderboard ===');
    sorted.forEach((p, i) => {
      console.log(`${i + 1}. ${p.username} - ${p.lowestTime.toFixed(2)} seconds`);
    });
  } catch (err) {
    console.error('Failed to load leaderboard:', err.message);
  }
}
