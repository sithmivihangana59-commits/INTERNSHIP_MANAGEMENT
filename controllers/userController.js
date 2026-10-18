import User from '../models/User.js';
import Application from '../models/Application.js';
import Internship from '../models/Internship.js';
import { access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isCvReference } from '../utils/cvReferences.js';

const uploadsDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../uploads'
);

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const getCandidates = async (req, res, next) => {
  try {
    const { search, skills, education, experience, category, location } = req.query;
    const filter = { role: 'student', status: 'active' };
    const conditions = [];

    if (typeof search === 'string' && search.trim()) {
      const searchPattern = new RegExp(escapeRegex(search.trim()), 'i');
      conditions.push({
        $or: [
          { firstName: searchPattern },
          { lastName: searchPattern },
          { skills: searchPattern }
        ]
      });
    }
    if (typeof skills === 'string' && skills.trim()) {
      filter.skills = new RegExp(escapeRegex(skills.trim()), 'i');
    }
    if (typeof education === 'string' && education.trim()) {
      const educationPattern = new RegExp(escapeRegex(education.trim()), 'i');
      conditions.push({
        $or: [
        { education: educationPattern },
        { university: educationPattern }
        ]
      });
    }
    if (typeof experience === 'string' && experience.trim()) {
      filter.experience = new RegExp(escapeRegex(experience.trim()), 'i');
    }
    if (typeof category === 'string' && category.trim()) {
      filter.preferredCategories = new RegExp(escapeRegex(category.trim()), 'i');
    }
    if (typeof location === 'string' && location.trim()) {
      filter.location = new RegExp(escapeRegex(location.trim()), 'i');
    }
    if (conditions.length) filter.$and = conditions;

    const candidates = await User.find(filter)
      .select(
        'firstName lastName email profileImage university education experience location preferredCategories skills bio linkedinUrl githubUrl resumeUrl'
      )
      .sort({ firstName: 1, lastName: 1 })
      .limit(100)
      .lean();
    const applicantIds = candidates.map(candidate => candidate._id);
    const applicationCvs = applicantIds.length
      ? await Application.find({
          applicant: { $in: applicantIds },
          resumeUrl: { $exists: true, $ne: '' }
        })
          .select('applicant resumeUrl appliedAt')
          .sort({ appliedAt: -1 })
          .lean()
      : [];
    const applicationCvByApplicant = new Map();
    for (const application of applicationCvs) {
      const applicantId = application.applicant.toString();
      if (
        !applicationCvByApplicant.has(applicantId) &&
        isCvReference(application.resumeUrl)
      ) {
        applicationCvByApplicant.set(applicantId, application.resumeUrl);
      }
    }

    res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates.map(({ resumeUrl, ...candidate }) => ({
        ...candidate,
        hasCv:
          isCvReference(resumeUrl) ||
          applicationCvByApplicant.has(candidate._id.toString())
      }))
    });
  } catch (error) {
    next(error);
  }
};

export const viewCandidateCv = async (req, res, next) => {
  try {
    if (!/^[a-f\d]{24}$/i.test(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid candidate ID.' });
    }

    const candidate = await User.findOne({
      _id: req.params.id,
      role: 'student',
      status: 'active'
    }).select('resumeUrl');

    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found.' });
    }

    let cvReference = isCvReference(candidate.resumeUrl)
      ? candidate.resumeUrl
      : '';
    if (!cvReference) {
      const applicationWithCv = await Application.findOne({
        applicant: candidate._id,
        resumeUrl: { $exists: true, $ne: '' }
      })
        .select('resumeUrl')
        .sort({ appliedAt: -1 })
        .lean();
      if (isCvReference(applicationWithCv?.resumeUrl)) {
        cvReference = applicationWithCv.resumeUrl;
      }
    }
    if (!cvReference) {
      return res.status(404).json({ success: false, message: 'CV not available.' });
    }

    const reference = cvReference.trim();
    const normalizedReference = reference.startsWith('uploads/')
      ? `/${reference}`
      : reference;
    const parsedUrl = normalizedReference.startsWith('/')
      ? null
      : new URL(normalizedReference);
    const localHosts = new Set(['localhost', '127.0.0.1', '[::1]']);
    const localPath = parsedUrl?.pathname || normalizedReference;
    const isLocalUpload =
      localPath.startsWith('/uploads/') &&
      (!parsedUrl || localHosts.has(parsedUrl.hostname));

    if (!isLocalUpload) {
      if (
        !parsedUrl ||
        !['http:', 'https:'].includes(parsedUrl.protocol) ||
        parsedUrl.username ||
        parsedUrl.password
      ) {
        return res.status(400).json({ success: false, message: 'The candidate CV URL is invalid.' });
      }
      res.set('Cache-Control', 'private, no-store');
      return res.status(200).json({ success: true, data: { url: parsedUrl.href } });
    }

    const filename = decodeURIComponent(localPath.slice('/uploads/'.length));
    if (!filename || path.basename(filename) !== filename || filename.includes('\\')) {
      return res.status(400).json({ success: false, message: 'Invalid CV file reference.' });
    }
    if (path.extname(filename).toLowerCase() !== '.pdf') {
      return res.status(415).json({ success: false, message: 'The candidate CV is not a PDF file.' });
    }

    const filePath = path.resolve(uploadsDirectory, filename);
    if (path.dirname(filePath) !== uploadsDirectory) {
      return res.status(400).json({ success: false, message: 'Invalid CV file reference.' });
    }

    try {
      await access(filePath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return res.status(404).json({ success: false, message: 'The candidate CV file could not be found.' });
      }
      throw error;
    }

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${filename.replace(/["\r\n]/g, '')}"`,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'private, no-store'
    });
    return res.sendFile(filePath);
  } catch (error) {
    if (error instanceof URIError || error instanceof TypeError) {
      return res.status(400).json({ success: false, message: 'The candidate CV URL is invalid.' });
    }
    next(error);
  }
};

/**
 * @desc    Get all users (with basic pagination)
 * @route   GET /api/users
 * @access  Private/Admin
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const total = await User.countDocuments();
    const users = await User.find().select('-resumeUrl').skip(startIndex).limit(limit);

    res.status(200).json({
      success: true,
      count: users.length,
      pagination: {
        page,
        limit,
        total,
      },
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single user by ID
 * @route   GET /api/users/:id
 * @access  Private
 */
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const isSelf = user._id.equals(req.user._id);
    const isAdmin = req.user.role === 'admin';
    let isEmployerOfApplicant = false;

    if (!isSelf && !isAdmin && req.user.role === 'employer') {
      const internshipIds = await Internship.find({ postedBy: req.user._id }).distinct('_id');
      isEmployerOfApplicant = Boolean(
        await Application.exists({
          applicant: user._id,
          internship: { $in: internshipIds }
        })
      );
    }

    if (!isSelf && !isAdmin && !isEmployerOfApplicant) {
      return res.status(403).json({
        success: false,
        error: 'You are not authorized to view this user profile.'
      });
    }

    const profile = user.toObject();
    if (!isSelf && !isEmployerOfApplicant) {
      delete profile.resumeUrl;
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMyResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Attach a PDF CV to upload.'
      });
    }

    const resumeUrl = `/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { resumeUrl },
      { new: true, runValidators: true }
    ).select('firstName lastName email role resumeUrl');

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    res.status(200).json({ success: true, data: { resumeUrl: user.resumeUrl } });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
