import Application from '../models/Application.js';
import Bookmark from '../models/Bookmark.js';
import Company from '../models/Company.js';
import Internship from '../models/Internship.js';
import User from '../models/User.js';
import { withResolvedCvReference } from '../utils/cvReferences.js';

const APPLICATION_STATUSES = [
  'pending',
  'reviewed',
  'shortlisted',
  'interview',
  'accepted',
  'rejected'
];

function getProfileCompletion(user) {
  const fields = [
    user.firstName,
    user.lastName,
    user.email,
    user.phone,
    user.bio,
    user.university,
    user.skills?.length,
    user.resumeUrl,
    user.linkedinUrl
  ];

  return Math.round((fields.filter(Boolean).length / fields.length) * 100);
}

async function getAdminDashboard() {
  const [
    totalUsers,
    students,
    employers,
    admins,
    totalCompanies,
    pendingCompanies,
    totalInternships,
    activeInternships,
    totalApplications,
    userStats,
    applicationStats,
    recentUsers,
    recentInternships
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: 'student' }),
    User.countDocuments({ role: 'employer' }),
    User.countDocuments({ role: 'admin' }),
    Company.countDocuments(),
    Company.countDocuments({ isVerified: false }),
    Internship.countDocuments(),
    Internship.countDocuments({ isActive: true }),
    Application.countDocuments(),
    User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]),
    Application.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]),
    User.find()
      .select('firstName lastName email role status createdAt')
      .sort('-createdAt')
      .limit(6)
      .lean(),
    Internship.find()
      .select('title company isActive createdAt')
      .populate('company', 'name')
      .sort('-createdAt')
      .limit(6)
      .lean()
  ]);

  return {
    role: 'admin',
    stats: {
      totalUsers,
      students,
      employers,
      admins,
      totalCompanies,
      pendingCompanies,
      totalInternships,
      activeInternships,
      totalApplications
    },
    userStats,
    applicationStats: APPLICATION_STATUSES.map(status => ({
      status,
      count: applicationStats.find(item => item._id === status)?.count ?? 0
    })),
    recentUsers,
    recentInternships
  };
}

async function getStudentDashboard(user) {
  const [applications, savedOpportunities, savedJobs, recentInternships] = await Promise.all([
    Application.find({ applicant: user._id })
      .populate({
        path: 'internship',
        populate: { path: 'company', select: 'name logoInitial logoColor' }
      })
      .sort('-appliedAt')
      .limit(8)
      .lean(),
    Bookmark.find({ user: user._id })
      .populate({
        path: 'internship',
        populate: [
          { path: 'company', select: 'name logoInitial logoColor' },
          { path: 'category', select: 'name' }
        ]
      })
      .sort('-createdAt')
      .limit(6)
      .lean(),
    Bookmark.countDocuments({ user: user._id }),
    Internship.find({ isActive: true })
      .populate('company', 'name logoInitial logoColor')
      .populate('category', 'name')
      .sort('-createdAt')
      .limit(6)
      .lean()
  ]);

  const applicationCounts = await Application.aggregate([
    { $match: { applicant: user._id } },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  return {
    role: 'student',
    profileCompletion: getProfileCompletion(user),
    stats: {
      totalApplications: applicationCounts.reduce((sum, item) => sum + item.count, 0),
      pendingApplications:
        applicationCounts.find(item => item._id === 'pending')?.count ?? 0,
      shortlisted:
        applicationCounts.find(item => item._id === 'shortlisted')?.count ?? 0,
      interviews: applicationCounts.find(item => item._id === 'interview')?.count ?? 0,
      accepted: applicationCounts.find(item => item._id === 'accepted')?.count ?? 0,
      rejected: applicationCounts.find(item => item._id === 'rejected')?.count ?? 0,
      savedJobs
    },
    applicationStats: APPLICATION_STATUSES.map(status => ({
      status,
      count: applicationCounts.find(item => item._id === status)?.count ?? 0
    })),
    recentApplications: applications,
    recentInternships,
    savedOpportunities
  };
}

async function getEmployerDashboard(user) {
  const internships = await Internship.find({ postedBy: user._id })
    .populate('company', 'name')
    .sort('-createdAt')
    .lean();
  const internshipIds = internships.map(internship => internship._id);

  const [applications, applicationStats] = await Promise.all([
    Application.find({ internship: { $in: internshipIds } })
      .populate(
        'applicant',
        'firstName lastName email profileImage university skills bio resumeUrl linkedinUrl githubUrl'
      )
      .populate('internship', 'title')
      .sort('-appliedAt')
      .limit(8)
      .lean(),
    Application.aggregate([
      { $match: { internship: { $in: internshipIds } } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ])
  ]);

  const totalApplicants = applicationStats.reduce((sum, item) => sum + item.count, 0);
  const countFor = status =>
    applicationStats.find(item => item._id === status)?.count ?? 0;

  return {
    role: 'employer',
    stats: {
      totalInternships: internships.length,
      activeInternships: internships.filter(internship => internship.isActive).length,
      totalApplicants,
      newApplications: countFor('pending'),
      shortlisted: countFor('shortlisted'),
      interviews: countFor('interview')
    },
    applicationStats: APPLICATION_STATUSES.map(status => ({
      status,
      count: countFor(status)
    })),
    internships: internships.slice(0, 6),
    recentApplications: applications.map(withResolvedCvReference)
  };
}

export const getDashboard = async (req, res, next) => {
  try {
    let data;

    switch (req.user.role) {
      case 'admin':
        data = await getAdminDashboard();
        break;
      case 'student':
        data = await getStudentDashboard(req.user);
        break;
      case 'employer':
        data = await getEmployerDashboard(req.user);
        break;
      default:
        return res.status(403).json({
          success: false,
          error: 'This account role does not have a dashboard.'
        });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
