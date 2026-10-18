import express from 'express';
import {
  applyToInternship,
  getMyApplications,
  getEmployerApplications,
  getApplicationsForInternship,
  updateApplicationStatus,
  viewApplicantCv,
  getApplication,
} from '../controllers/applicationController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadResume } from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('student'), uploadResume.single('resume'), applyToInternship);

router.route('/my')
  .get(protect, authorize('student'), getMyApplications);

router.route('/received')
  .get(protect, authorize('employer', 'admin'), getEmployerApplications);

router.route('/internship/:internshipId')
  .get(protect, authorize('employer', 'admin'), getApplicationsForInternship);

router.route('/:id/status')
  .put(protect, authorize('employer'), updateApplicationStatus);

router.route('/:id/cv')
  .get(protect, authorize('employer'), viewApplicantCv);

router.route('/:id')
  .get(protect, getApplication);

export default router;
