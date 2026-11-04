import { Router } from 'express';
import { overview, users, updateRole } from '../controllers/adminController.js';
import { protect, allow } from '../middleware/auth.js';
const router = Router();
router.use(protect, allow('admin'));
router.get('/overview', overview);
router.get('/users', users);
router.patch('/users/:id/role', updateRole);
export default router;
