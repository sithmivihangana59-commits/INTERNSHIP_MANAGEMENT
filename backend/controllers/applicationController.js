import mongoose from 'mongoose';
import { access, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Application from '../models/Application.js';
import Internship from '../models/Internship.js';
import {
  getApplicationCvReference,
  isCvReference,
  withResolvedCvReference
} from '../utils/cvReferences.js';

const applicationStatuses = [
  'pending',
  'reviewed',
  'shortlisted',
  'interview',
  'accepted',
  'rejected'
];

const applicantFields =
  'firstName lastName email profileImage phone university skills bio resumeUrl linkedinUrl githubUrl';

const applicationPopulation = [
  { path: 'applicant', select: applicantFields },
  {
    path: 'internship',
    populate: { path: 'company', select: 'name logo logoInitial logoColor location' }
  }
];

const allowedTransitions = {
  pending: ['reviewed', 'shortlisted', 'rejected'],
  reviewed: ['shortlisted', 'rejected'],
  shortlisted: ['interview', 'accepted', 'rejected'],
  interview: ['accepted', 'rejected'],
  accepted: [],
  rejected: []
};

const uploadsDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../uploads'
);

async function discardUploadedResume(req) {
  if (!req.file) return;
  try {
    await unlink(req.file.path);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

function isSafeExternalUrl(value) {
  if (!value) return true;
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

export const applyToInternship = async (req, res, next) => {
  let applicationCreated = false;
  try {
    const { resumeUrl, coverLetter } = req.body;
    const internshipId =
      typeof req.body.internshipId === 'string'
        ? req.body.internshipId.trim()
        : req.body.internshipId;

    if (!mongoose.isValidObjectId(internshipId)) {
      await discardUploadedResume(req);
      return res.status(400).json({ success: false, message: 'A valid internship is required.' });
    }
    const applicationResumeUrl = req.file
      ? `/uploads/${req.file.filename}`
      : (typeof resumeUrl === 'string' ? resumeUrl.trim() : '') ||
        req.user.resumeUrl ||
        '';
    if (!isCvReference(applicationResumeUrl)) {
      await discardUploadedResume(req);
      return res.status(400).json({
        success: false,
        message: applicationResumeUrl
          ? 'Provide a supported CV PDF URL, upload a PDF, or use your saved profile CV.'
          : 'Upload a PDF CV or add one to your student profile before applying.'
      });
    }

    const internship = await Internship.findById(internshipId);
    if (!internship || !internship.isActive) {
      await discardUploadedResume(req);
      return res.status(404).json({
        success: false,
        message: 'Internship not found or no longer active'
      });
    }
    if (!internship.postedBy) {
      await discardUploadedResume(req);
      return res.status(409).json({
        success: false,
        message: 'This vacancy is not linked to an employer account and cannot receive applications.'
      });
    }

    const application = await Application.create({
      internship: internship._id,
      applicant: req.user._id,
      employer: internship.postedBy,
      resumeUrl: applicationResumeUrl,
      coverLetter: coverLetter?.trim(),
      status: 'pending',
      statusHistory: [{ status: 'pending', changedAt: new Date(), note: 'Application submitted' }]
    });
    applicationCreated = true;

    await Internship.updateOne({ _id: internship._id }, { $inc: { applicantCount: 1 } });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    if (req.file && !applicationCreated) {
      try {
        await discardUploadedResume(req);
      } catch (cleanupError) {
        return next(cleanupError);
      }
    }
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'You have already applied to this internship'
      });
    }
    next(error);
  }
};

export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate({
        path: 'internship',
        populate: {
          path: 'company',
          select: 'name logo logoInitial logoColor location'
        }
      })
      .sort('-appliedAt')
      .lean();

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications.map(withResolvedCvReference)
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployerApplications = async (req, res, next) => {
  try {
    const filter =
      req.user.role === 'admin'
        ? {}
        : {
            internship: {
              $in: await Internship.find({ postedBy: req.user._id }).distinct('_id')
            }
          };

    const population =
      req.user.role === 'admin'
        ? [
            {
              path: 'applicant',
              select: applicantFields.replace(' resumeUrl', '')
            },
            applicationPopulation[1]
          ]
        : applicationPopulation;
    const query = Application.find(filter);
    if (req.user.role === 'admin') {
      query.select('-resumeUrl');
    }
    const applications = await query
      .populate(population)
      .sort('-appliedAt')
      .lean();

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications.map(withResolvedCvReference)
    });
  } catch (error) {
    next(error);
  }
};

export const getApplicationsForInternship = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.internshipId)) {
      return res.status(400).json({ success: false, message: 'Invalid internship ID.' });
    }

    const internship = await Internship.findById(req.params.internshipId);
    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }

    if (
      req.user.role !== 'admin' &&
      internship.postedBy?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view these applications'
      });
    }

    const applications = await Application.find({ internship: internship._id })
      .populate(applicationPopulation)
      .sort('-appliedAt')
      .lean();

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications.map(withResolvedCvReference)
    });
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status, note, interview } = req.body;
    if (!applicationStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${applicationStatuses.join(', ')}`
      });
    }

    const application = await Application.findById(req.params.id).populate('internship');
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.internship.postedBy?.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only the employer who posted this internship can review its applications.'
      });
    }

    const isReschedulingInterview =
      status === 'interview' && application.status === 'interview';
    if (
      status !== application.status &&
      !allowedTransitions[application.status]?.includes(status)
    ) {
      return res.status(409).json({
        success: false,
        message: `Cannot change an application from ${application.status} to ${status}.`
      });
    }

    if (status === 'interview') {
      const scheduledAt = new Date(interview?.scheduledAt);
      if (!interview?.scheduledAt || Number.isNaN(scheduledAt.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'A valid interview date and time are required.'
        });
      }
      if (!isSafeExternalUrl(interview.meetingUrl)) {
        return res.status(400).json({
          success: false,
          message: 'Interview meeting link must use HTTP or HTTPS.'
        });
      }
      application.interview = {
        scheduledAt,
        location: interview.location?.trim() || '',
        meetingUrl: interview.meetingUrl?.trim() || '',
        notes: interview.notes?.trim() || ''
      };
    }

    const statusChanged = application.status !== status;
    application.status = status;
    if (statusChanged) {
      application.statusHistory.push({
        status,
        changedAt: new Date(),
        note: note?.trim() || `Application status updated to ${status}.`
      });
    } else if (isReschedulingInterview) {
      application.statusHistory.push({
        status,
        changedAt: new Date(),
        note: note?.trim() || 'Interview details updated.'
      });
    }

    await application.save();
    res.status(200).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

export const getApplication = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid application ID.' });
    }

    const application = await Application.findById(req.params.id)
      .populate(applicationPopulation);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    const isApplicant = application.applicant._id.equals(req.user._id);
    const internship = await Internship.findById(application.internship._id).select('postedBy');
    const isEmployer = internship?.postedBy?.equals(req.user._id) ?? false;
    const isAdmin = req.user.role === 'admin';

    if (!isApplicant && !isEmployer && !isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (isAdmin) {
      application.resumeUrl = undefined;
      application.applicant.resumeUrl = undefined;
    }

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

export const viewApplicantCv = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid application ID.' });
    }

    const application = await Application.findById(req.params.id)
      .populate('applicant', 'resumeUrl')
      .populate('internship', 'postedBy');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    if (application.internship.postedBy?.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only the employer who posted this internship can view this applicant CV.'
      });
    }

    const cvReference = getApplicationCvReference(application);
    if (!cvReference) {
      return res.status(404).json({ success: false, message: 'CV not available.' });
    }

    const normalizedReference = cvReference.startsWith('uploads/')
      ? `/${cvReference}`
      : cvReference;
    const parsedUrl = normalizedReference.startsWith('/')
      ? null
      : new URL(normalizedReference);
    const localHosts = new Set(['localhost', '127.0.0.1', '[::1]']);
    const localPath = parsedUrl?.pathname || normalizedReference;
    const isLocalUpload =
      localPath.startsWith('/uploads/') &&
      (!parsedUrl || localHosts.has(parsedUrl.hostname));
    if (isLocalUpload) {
      const filename = decodeURIComponent(localPath.slice('/uploads/'.length));
      if (!filename || path.basename(filename) !== filename || filename.includes('\\')) {
        return res.status(400).json({ success: false, message: 'Invalid CV file reference.' });
      }

      const filePath = path.resolve(uploadsDirectory, filename);
      if (path.dirname(filePath) !== uploadsDirectory) {
        return res.status(400).json({ success: false, message: 'Invalid CV file reference.' });
      }

      try {
        await access(filePath);
      } catch (error) {
        if (error.code === 'ENOENT') {
          return res.status(404).json({ success: false, message: 'The applicant CV file could not be found.' });
        }
        throw error;
      }

      if (path.extname(filename).toLowerCase() !== '.pdf') {
        return res.status(415).json({ success: false, message: 'The applicant CV is not a PDF file.' });
      }

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename.replace(/["\r\n]/g, '')}"`,
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'private, no-store'
      });
      return res.sendFile(filePath);
    }

    if (
      !parsedUrl ||
      !['http:', 'https:'].includes(parsedUrl.protocol) ||
      parsedUrl.username ||
      parsedUrl.password
    ) {
      return res.status(400).json({ success: false, message: 'The applicant CV URL is invalid.' });
    }

    res.set('Cache-Control', 'private, no-store');
    return res.status(200).json({ success: true, data: { url: parsedUrl.href } });
  } catch (error) {
    if (error instanceof URIError || error instanceof TypeError) {
      return res.status(400).json({ success: false, message: 'The applicant CV URL is invalid.' });
    }
    next(error);
  }
};
