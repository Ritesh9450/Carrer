import Job from '../models/Job.js';
import Application from '../models/Application.js';

export async function listJobs(req, res) {
  const { q, type, location, workMode } = req.query;
  const filter = { active: true };
  if (type && ['job', 'internship'].includes(type)) filter.type = type;
  if (location) filter.location = { $regex: location, $options: 'i' };
  if (workMode) filter.workMode = workMode;
  if (q) filter.$or = ['title', 'company', 'description', 'skills'].map(k => ({ [k]: { $regex: q, $options: 'i' } }));
  const jobs = await Job.find(filter).populate('recruiter', 'name companyName').sort({ createdAt: -1 });
  res.json({ jobs });
}
export async function getJob(req, res) {
  const job = await Job.findById(req.params.id).populate('recruiter', 'name companyName email');
  if (!job) return res.status(404).json({ message: 'Opportunity not found' });
  res.json({ job });
}
export async function createJob(req, res) {
  const { title, description, type, company, location, workMode, salary, skills, experience, deadline } = req.body;
  if (!title || !description || !type || !company) return res.status(400).json({ message: 'Title, description, type and company are required' });
  const job = await Job.create({ title, description, type, company, location, workMode, salary,
    skills: Array.isArray(skills) ? skills : String(skills || '').split(',').map(s => s.trim()).filter(Boolean),
    experience, deadline: deadline || undefined, recruiter: req.user._id });
  res.status(201).json({ job });
}
export async function updateJob(req, res) {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Opportunity not found' });
  if (String(job.recruiter) !== String(req.user._id) && req.user.role !== 'admin') return res.status(403).json({ message: 'Not your listing' });
  Object.assign(job, req.body);
  await job.save();
  res.json({ job });
}
export async function deleteJob(req, res) {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Opportunity not found' });
  if (String(job.recruiter) !== String(req.user._id) && req.user.role !== 'admin') return res.status(403).json({ message: 'Not your listing' });
  await job.deleteOne();
  await Application.deleteMany({ job: job._id });
  res.json({ message: 'Opportunity deleted' });
}
export async function applyJob(req, res) {
  const job = await Job.findOne({ _id: req.params.id, active: true });
  if (!job) return res.status(404).json({ message: 'Opportunity not found' });
  try {
    const application = await Application.create({ job: job._id, student: req.user._id, coverLetter: req.body.coverLetter || '' });
    res.status(201).json({ application });
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ message: 'You have already applied' });
    throw e;
  }
}
