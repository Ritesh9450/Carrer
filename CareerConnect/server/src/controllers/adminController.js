import User from '../models/User.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
export async function overview(_req, res) {
  const [users, students, recruiters, jobs, internships, applications] = await Promise.all([
    User.countDocuments(), User.countDocuments({ role: 'student' }), User.countDocuments({ role: 'recruiter' }),
    Job.countDocuments({ type: 'job', active: true }), Job.countDocuments({ type: 'internship', active: true }), Application.countDocuments()
  ]);
  res.json({ overview: { users, students, recruiters, jobs, internships, applications } });
}
export async function users(_req, res) {
  res.json({ users: await User.find().select('-password').sort({ createdAt: -1 }) });
}
export async function updateRole(req, res) {
  if (!['student', 'recruiter', 'admin'].includes(req.body.role)) return res.status(400).json({ message: 'Invalid role' });
  const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user });
}
