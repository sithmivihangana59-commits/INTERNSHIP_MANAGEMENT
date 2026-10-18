import express from 'express';
import {
  toggleBookmark,
  getMyBookmarks,
} from '../controllers/bookmarkController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All bookmark routes require authentication

router.route('/')
  .post(toggleBookmark)
  .get(getMyBookmarks);

export default router;
