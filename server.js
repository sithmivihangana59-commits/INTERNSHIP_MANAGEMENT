import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import internshipRoutes from './routes/internshipRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import bookmarkRoutes from './routes/bookmarkRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();

// Connect to database
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    const isConfiguredOrigin = !origin || allowedOrigins.includes(origin);
    const isLocalDevelopmentOrigin =
      process.env.NODE_ENV === 'development' &&
      /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/.test(origin || '');

    callback(null, isConfiguredOrigin || isLocalDevelopmentOrigin);
  },
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use('/api', limiter);

// Request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', (req, res, next) => {
  let requestedPath = req.path;
  try {
    requestedPath = decodeURIComponent(requestedPath);
  } catch {
    return res.status(400).json({ success: false, message: 'Invalid upload path.' });
  }
  if (path.extname(requestedPath).toLowerCase() === '.pdf') {
    return res.status(404).json({
      success: false,
      message: 'CV files must be accessed through an authorized application.'
    });
  }
  next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('InternSphere PRO API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
