import readline from 'readline-sync';

const baseUrl = 'http://localhost:3000/riddles';

// Fetch helper - send request and parse JSON
async function fetchJson(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Server error: ${res.status} ${res.statusText}`);
  return res.json();
}
// Create a new riddle
export async function createRiddle() {
  const name = readline.question('Enter riddle name: ');
  const taskDescription = readline.question('Enter description: ');
  const correctAnswer = readline.question('Enter correct answer: ');

  const newRiddle = await fetchJson(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, taskDescription, correctAnswer }),
  });
  console.log('Riddle created:', newRiddle);
}
// Read all riddles
export async function readRiddles() {
  const riddles = await fetchJson(baseUrl);
  console.log('All riddles from server:', riddles);
}
// Read riddle by _id
export async function readRiddleById() {
  const id = readline.question('Enter riddle ID: ');
  const riddles = await fetchJson(`${baseUrl}/${id}`);
  console.log(`Riddle ${id} from server:`, riddles);
}
// Update a riddle by ID
export async function updateRiddle() {
  const id = readline.question('Enter riddle ID to update: ');
  const name = readline.question('Enter new name: ');
  const taskDescription = readline.question('Enter new description: ');
  const correctAnswer = readline.question('Enter new answer: ');

  const updated = await fetchJson(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, taskDescription, correctAnswer }),
  });
  console.log('Riddle updated:', updated);
}
// Delete a riddle by ID
export async function deleteRiddle() {
  const id = readline.question('Enter riddle ID to delete: ');

  const deleted = await fetchJson(`${baseUrl}/${id}`, {
     method: 'DELETE' 
    });
  console.log('Riddle deleted:', deleted);
}
