import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateMyResume,
  deleteUser,
  getCandidates,
  viewCandidateCv,
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadResume } from '../middleware/upload.js';

const router = express.Router();

// Protect all routes below
router.use(protect);

router.get('/', authorize('admin'), getAllUsers);
router.post('/me/resume', authorize('student'), uploadResume.single('resume'), updateMyResume);
router.get('/candidates', authorize('employer'), getCandidates);
router.get('/candidates/:id/cv', authorize('employer'), viewCandidateCv);
router.get('/:id', getUserById);
router.delete('/:id', authorize('admin'), deleteUser);

export default router;
