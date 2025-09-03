import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createPlayer, getUserByUsername } from '../DAL/playersDal.js';

// Cookie setter
function setAuthCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
  });
}

// Signup
export async function signup(req, res) {
  try {
    const { username, password, adminCode } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const role = adminCode === process.env.ADMIN_CODE ? "admin" : "user";
    console.log("New signup:", { username, role });

    await createPlayer(username, password_hash, role);

    const token = jwt.sign({ username, role }, process.env.JWT_SECRET, { expiresIn: '100d' });

    setAuthCookie(res, token);
    res.status(201).json({ message: "User created", username, role });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: err.message });
  }
}

// Login
export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);

    if (!user) return res.status(403).json({ message: "User not found" });

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return res.status(403).json({ message: "Wrong password" });

    const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '100d' });

    setAuthCookie(res, token);

    res.json({ message: "Login successful", username, role: user.role, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
}
