import readline from 'readline-sync';
import { loginOrSignupFlow } from '../api/authApi.js';
import { Player } from '../classes/Player.js';

export async function loginOrSignup() {
  const name = readline.question('Username: ').trim();
  const password = readline.question('Password: ').trim();

  try {
    const data = await loginOrSignupFlow(name, password);
    const { id, role, times } = data;
    console.log(`\nWelcome back, ${name}!`);
    return new Player(id, name, times, role);
  } catch (err) {
    console.log('Login failed:', err.message);
    return null;
  }
}
