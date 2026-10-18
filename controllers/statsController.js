import Internship from '../models/Internship.js';
import Company from '../models/Company.js';
import Application from '../models/Application.js';
import User from '../models/User.js';

// @desc    Get platform stats (for hero section)
// @route   GET /api/stats
// @access  Public
export const getStats = async (req, res) => {
  try {
    const activeInternships = await Internship.countDocuments({ isActive: true });
    const vettedCompanies = await Company.countDocuments({ isVerified: true });
    const totalApplications = await Application.countDocuments();
    const studentsPlaced = await Application.countDocuments({ status: 'accepted' });
    const totalStudents = await User.countDocuments({ role: 'student' });

    // Recent activity - 5 most recently created internships
    const recentActivity = await Internship.find({ isActive: true })
      .select('title createdAt salary workMode location')
      .populate('company', 'name logoInitial logoColor')
      .sort('-createdAt')
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        activeInternships,
        vettedCompanies,
        totalApplications,
        studentsPlaced,
        totalStudents,
        recentActivity
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

