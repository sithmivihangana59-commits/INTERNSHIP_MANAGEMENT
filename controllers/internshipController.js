import Internship from '../models/Internship.js';
import Category from '../models/Category.js';

// @desc    Get all internships with filtering, search, sorting, pagination
// @route   GET /api/internships
// @access  Public
export const getInternships = async (req, res) => {
  try {
    const {
      search,
      category,
      specialization,
      workMode,
      location,
      minSalary,
      maxSalary,
      duration,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    let query = {};

    // Base query conditions
    query.isActive = true;

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Specialization mapping to category
    if (specialization) {
      const specializations = {
        'Software & Engineering': 'software-engineering',
        'AI & Data Science': 'ai-data-science',
        'UI/UX & Product Design': 'ui-ux-design',
        'Business & Finance': 'business-finance',
      };
      
      const specSlug = specializations[specialization];
      if (specSlug) {
        const cat = await Category.findOne({ slug: specSlug });
        if (cat) {
          query.category = cat._id;
        }
      }
    }

    // Work Mode
    if (workMode) {
      query.workMode = workMode;
    }

    // Location
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Salary range
    if (minSalary || maxSalary) {
      query['salary.amount'] = {};
      if (minSalary) query['salary.amount'].$gte = Number(minSalary);
      if (maxSalary) query['salary.amount'].$lte = Number(maxSalary);
    }

    // Duration
    if (duration) {
      query.duration = duration;
    }

    // Sorting
    let sortOptions = {};
    switch (sort) {
      case 'oldest':
        sortOptions = { createdAt: 1 };
        break;
      case 'salary-high':
        sortOptions = { salary: -1 };
        break;
      case 'salary-low':
        sortOptions = { salary: 1 };
        break;
      case 'newest':
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;

    const total = await Internship.countDocuments(query);

    const internships = await Internship.find(query)
      .populate('company', 'name logo location isPartner')
      .populate('category', 'name slug')
      .sort(sortOptions)
      .skip(startIndex)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: internships.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: internships,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single internship
// @route   GET /api/internships/:id
// @access  Public
export const getInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id)
      .populate('company')
      .populate('category');

    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }

    res.status(200).json({ success: true, data: internship });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get featured internships
// @route   GET /api/internships/featured
// @access  Public
export const getFeaturedInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ isFeatured: true, isActive: true })
      .populate('company', 'name logo location')
      .populate('category', 'name')
      .limit(6);

    res.status(200).json({ success: true, data: internships });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new internship
// @route   POST /api/internships
// @access  Private (Employer/Admin)
export const createInternship = async (req, res) => {
  try {
    // Add employer user to req.body
    req.body.postedBy = req.user.id;

    const internship = await Internship.create(req.body);

    // Increment category roleCount
    if (internship.category) {
      await Category.findByIdAndUpdate(internship.category, { $inc: { roleCount: 1 } });
    }

    res.status(201).json({ success: true, data: internship });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update internship
// @route   PUT /api/internships/:id
// @access  Private (Employer who created or Admin)
export const updateInternship = async (req, res) => {
  try {
    let internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }

    // Make sure user is internship employer or admin
    if (internship.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to update this internship' });
    }

    internship = await Internship.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: internship });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete internship
// @route   DELETE /api/internships/:id
// @access  Private (Employer who created or Admin)
export const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }

    // Make sure user is internship employer or admin
    if (internship.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this internship' });
    }

    const categoryId = internship.category;

    await internship.deleteOne();

    // Decrement category roleCount
    if (categoryId) {
      await Category.findByIdAndUpdate(categoryId, { $inc: { roleCount: -1 } });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
