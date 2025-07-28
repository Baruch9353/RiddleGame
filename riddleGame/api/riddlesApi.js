const BASE_URL = 'http://localhost:3000/riddles';

// Get all riddles from the server
export async function getAllRiddles() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch riddles');
  return res.json();
}

// Get a single riddle by ID
export async function getRiddleById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Riddle not found');
  return res.json();
}

// Add a new riddle
export async function createRiddle(data) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to add riddle');
  return res.json();
}

// Update an existing riddle
export async function updateRiddle(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update riddle');
  return res.json();
}

// Delete a riddle by ID
export async function deleteRiddle(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete riddle');
  return res.json();
}
