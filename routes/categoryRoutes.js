import express from 'express';
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
} from '../controllers/categoryController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(protect, authorize('admin'), createCategory);

router.route('/:id')
  .get(getCategory)
  .put(protect, authorize('admin'), updateCategory);

export default router;
