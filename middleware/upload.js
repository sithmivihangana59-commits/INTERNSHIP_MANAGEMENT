import multer from 'multer';
import path from 'path';
import { mkdir } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const uploadDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../uploads'
);

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    mkdir(uploadDirectory, { recursive: true })
      .then(() => cb(null, uploadDirectory))
      .catch(cb);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${randomUUID()}${path.extname(file.originalname).toLowerCase()}`);
  },
});

// File filter for images (jpeg, jpg, png)
const imageFileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mimetype
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Images Only (jpeg, jpg, png)!'), false);
  }
};

// File filter for PDFs (resumes, etc.)
const pdfFileFilter = (req, file, cb) => {
  const filetypes = /pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: PDFs Only!'), false);
  }
};

// Configure upload limits
const limits = {
  fileSize: 5 * 1024 * 1024, // 5 MB max file size
};

/**
 * @desc Middleware to handle single image uploads
 */
export const uploadImage = multer({
  storage,
  limits,
  fileFilter: imageFileFilter,
});

/**
 * @desc Middleware to handle single PDF (resume) uploads
 */
export const uploadResume = multer({
  storage,
  limits,
  fileFilter: pdfFileFilter,
});
