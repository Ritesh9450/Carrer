import mongoose from 'mongoose';
const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coverLetter: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'Shortlisted', 'Rejected', 'Selected'], default: 'Pending' }
}, { timestamps: true });
applicationSchema.index({ job: 1, student: 1 }, { unique: true });
export default mongoose.model('Application', applicationSchema);
