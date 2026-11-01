import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Internship title is required'] },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String, required: [true, 'Description is required'] },
  requirements: [String],
  responsibilities: [String],
  skills: [String],
  salary: {
    amount: Number,
    currency: { type: String, default: 'LKR' },
    period: { type: String, default: 'month' }
  },
  duration: String,
  workMode: { type: String, enum: ['On-Site', 'Hybrid', 'Remote'], default: 'Hybrid' },
  location: String,
  applicationDeadline: Date,
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  applicantCount: { type: Number, default: 0 },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field daysUntilDeadline
internshipSchema.virtual('daysUntilDeadline').get(function() {
  if (!this.applicationDeadline) return null;
  const diffTime = this.applicationDeadline - new Date();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
});

// Indexes
internshipSchema.index({ category: 1 });
internshipSchema.index({ company: 1 });
internshipSchema.index({ workMode: 1 });
internshipSchema.index({ isActive: 1 });

const Internship = mongoose.model('Internship', internshipSchema);
export default Internship;
