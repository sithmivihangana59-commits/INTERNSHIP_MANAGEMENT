import express from 'express';
import {
  getInternships,
  getInternship,
  getFeaturedInternships,
  createInternship,
  updateInternship,
  deleteInternship,
} from '../controllers/internshipController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getInternships)
  .post(protect, authorize('employer', 'admin'), createInternship);

router.route('/featured')
  .get(getFeaturedInternships);

router.route('/:id')
  .get(getInternship)
  .put(protect, authorize('employer', 'admin'), updateInternship)
  .delete(protect, authorize('employer', 'admin'), deleteInternship);

export default router;
