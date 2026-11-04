import Application from '../models/Application.js';
import Job from '../models/Job.js';
export async function myApplications(req, res) {
  const applications = await Application.find({ student: req.user._id }).populate('job').sort({ createdAt: -1 });
  res.json({ applications });
}
export async function receivedApplications(req, res) {
  const jobs = await Job.find({ recruiter: req.user._id }).select('_id');
  const applications = await Application.find({ job: { $in: jobs.map(j => j._id) } })
    .populate('job').populate('student', 'name email phone location skills resumeUrl').sort({ createdAt: -1 });
  res.json({ applications });
}
export async function updateStatus(req, res) {
  const app = await Application.findById(req.params.id).populate('job');
  if (!app) return res.status(404).json({ message: 'Application not found' });
  if (String(app.job.recruiter) !== String(req.user._id) && req.user.role !== 'admin')
    return res.status(403).json({ message: 'Not your applicant' });
  const allowed = ['Pending', 'Shortlisted', 'Rejected', 'Selected'];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ message: 'Invalid status' });
  app.status = req.body.status;
  await app.save();
  res.json({ application: app });
}
