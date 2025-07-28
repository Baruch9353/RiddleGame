const BASE_URL = 'http://localhost:3000/players';

// Login with username and password
export async function login(username, password) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const user = await res.json();
    return user;
  } catch (err) {
    console.error('Error logging in:', err.message);
    return null;
  }
}

// Signup with username, password and optional admin code
export async function signup(username, password, adminCode = null) {
  try {
    const body = { username, password };
    if (adminCode) body.adminCode = adminCode;

    const res = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const user = await res.json();
    return user;
  } catch (err) {
    console.error('Error signing up:', err.message);
    return null;
  }
}

// Try login, if not found – automatically signup
export async function loginOrSignupFlow(username, password, adminCode = null) {
  const user = await login(username, password);
  if (user) {
    console.log(`Welcome back, ${user.username}!`);
    return user;
  }
  console.log('User not found. Creating new account...');
  const newUser = await signup(username, password, adminCode);
  if (newUser) {
    console.log(`Welcome, ${newUser.username}! Your account was created.`);
    return newUser;
  }
}
