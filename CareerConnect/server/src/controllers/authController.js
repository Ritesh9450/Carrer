import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const makeToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const safeUser = user => ({ id: user._id, name: user.name, email: user.email, role: user.role,
  phone: user.phone, location: user.location, skills: user.skills, bio: user.bio,
  resumeUrl: user.resumeUrl, companyName: user.companyName });

export async function register(req, res) {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' });
  if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters' });
  if (role && !['student', 'recruiter'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email is already registered' });
  const user = await User.create({ name, email, password: await bcrypt.hash(password, 12), role: role || 'student' });
  res.status(201).json({ token: makeToken(user._id), user: safeUser(user) });
}
export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await bcrypt.compare(password || '', user.password)))
    return res.status(401).json({ message: 'Incorrect email or password' });
  res.json({ token: makeToken(user._id), user: safeUser(user) });
}
export async function me(req, res) { res.json({ user: safeUser(req.user) }); }
export async function updateProfile(req, res) {
  const allowed = ['name', 'phone', 'location', 'skills', 'bio', 'companyName'];
  for (const key of allowed) if (req.body[key] !== undefined) req.user[key] = req.body[key];
  await req.user.save();
  res.json({ user: safeUser(req.user) });
}
