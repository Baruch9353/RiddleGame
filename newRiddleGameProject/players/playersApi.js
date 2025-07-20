const baseUrl = 'http://localhost:3000/players';

// Fetch helper - send request and parse JSON
async function fetchJson(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Server error: ${res.status} ${res.statusText}`);
  return res.json();
}

// Get all players
export async function getAllPlayers() {
  return (await fetchJson(baseUrl));
};

// Create a new player
export async function createPlayer(player) {
    const rus = await fetchJson(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(player),
  });
  console.log(rus);
};

// Update a player by ID
export async function updatePlayer(id, lowestTime) {
    const rus = await fetchJson(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lowestTime),
  });
  console.log(rus);
};