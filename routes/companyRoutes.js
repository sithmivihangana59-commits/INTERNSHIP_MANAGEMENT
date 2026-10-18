import express from 'express';
import {
  getCompanies,
  getPartnerCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} from '../controllers/companyController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getCompanies)
  .post(protect, authorize('admin'), createCompany);

router.route('/partners')
  .get(getPartnerCompanies);

router.route('/:id')
  .get(getCompany)
  .put(protect, authorize('admin'), updateCompany)
  .delete(protect, authorize('admin'), deleteCompany);

export default router;
