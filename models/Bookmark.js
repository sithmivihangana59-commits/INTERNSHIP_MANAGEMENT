import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  internship: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship', required: true },
  createdAt: { type: Date, default: Date.now }
});

// Prevent duplicate bookmarks
bookmarkSchema.index({ user: 1, internship: 1 }, { unique: true });

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;
