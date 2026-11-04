import mongoose from 'mongoose';
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['job', 'internship'], required: true },
  company: { type: String, required: true },
  location: { type: String, default: 'Remote' },
  workMode: { type: String, enum: ['Remote', 'Hybrid', 'On-site'], default: 'On-site' },
  salary: String,
  skills: [String],
  experience: { type: String, default: 'Fresher' },
  deadline: Date,
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model('Job', jobSchema);
