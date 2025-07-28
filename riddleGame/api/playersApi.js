const baseUrl = 'http://localhost:3000/players';

// Get all players
export async function getAllPlayers() {
  const res = await fetch(baseUrl);
  if (!res.ok) throw new Error('Failed to fetch players');
  return res.json();
}

// Update the lowest time of a player
export async function updatePlayerLowestTime(playerId, newTime) {
    const res = await fetch(`${baseUrl}/${playerId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lowestTime: newTime }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update lowest time');
  }
  return data;
}

