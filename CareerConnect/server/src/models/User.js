import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['student', 'recruiter', 'admin'], default: 'student' },
  phone: String,
  location: String,
  skills: [String],
  bio: String,
  resumeUrl: String,
  companyName: String
}, { timestamps: true });
export default mongoose.model('User', userSchema);
