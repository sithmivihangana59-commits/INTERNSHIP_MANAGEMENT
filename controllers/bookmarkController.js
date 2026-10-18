import Bookmark from '../models/Bookmark.js';

// @desc    Toggle bookmark for an internship
// @route   POST /api/bookmarks
// @access  Private
export const toggleBookmark = async (req, res) => {
  try {
    const { internshipId } = req.body;
    const userId = req.user.id;

    const existingBookmark = await Bookmark.findOne({
      internship: internshipId,
      user: userId
    });

    if (existingBookmark) {
      // Remove bookmark
      await existingBookmark.deleteOne();
      return res.status(200).json({ success: true, message: 'Bookmark removed', bookmarked: false });
    } else {
      // Add bookmark
      await Bookmark.create({
        internship: internshipId,
        user: userId
      });
      return res.status(201).json({ success: true, message: 'Bookmark added', bookmarked: true });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user's bookmarks
// @route   GET /api/bookmarks
// @access  Private
export const getMyBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id })
      .populate({
        path: 'internship',
        populate: [
          { path: 'company', select: 'name logo' },
          { path: 'category', select: 'name' }
        ]
      })
      .sort('-createdAt');

    res.status(200).json({ success: true, count: bookmarks.length, data: bookmarks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
