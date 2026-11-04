import dotenv from 'dotenv'; dotenv.config();
import mongoose from 'mongoose'; import bcrypt from 'bcryptjs'; import User from '../models/User.js';
await mongoose.connect(process.env.MONGO_URI);
const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) throw new Error('Set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in .env');
const password = await bcrypt.hash(ADMIN_PASSWORD, 12);
await User.findOneAndUpdate({ email: ADMIN_EMAIL }, { name: ADMIN_NAME, email: ADMIN_EMAIL, password, role: 'admin' }, { upsert: true, new: true });
console.log(`Admin ready: ${ADMIN_EMAIL}`); await mongoose.disconnect();
