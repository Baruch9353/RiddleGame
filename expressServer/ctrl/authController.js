import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUserByUsername } from '../DAL/playersDal.js';

// Handle user signup
export async function signup(req, res) {
  const { username, password, adminCode } = req.body;
  const existingUser = await getUserByUsername(username);
  if (existingUser) return res.status(409).send("Username already exists");
  const password_hash = await bcrypt.hash(password, 10);
  const role = adminCode === process.env.ADMIN_CODE ? "admin" : "user";
  await createUser(username, password_hash, role);
  const token = jwt.sign({ username, role }, process.env.JWT_SECRET, {
    expiresIn: '3d', 
  });
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3 * 24 * 60 * 60 * 1000, 
  });

  res.status(201).json({ message: "User created", username, role });
}
// Handle user login
export async function login(req, res) {
  const { username, password } = req.body;
  const user = await getUserByUsername(username);
  if (!user) return res.status(403).send("User not found");
  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) return res.status(403).send("Wrong password");
  const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
  res.json({ message: "Login successful", username, role: user.role });
}
