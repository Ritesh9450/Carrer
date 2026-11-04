import { Router } from 'express';
import { myApplications, receivedApplications, updateStatus } from '../controllers/applicationController.js';
import { protect, allow } from '../middleware/auth.js';
const router = Router();
router.get('/my', protect, allow('student'), myApplications);
router.get('/received', protect, allow('recruiter', 'admin'), receivedApplications);
router.patch('/:id/status', protect, allow('recruiter', 'admin'), updateStatus);
export default router;
