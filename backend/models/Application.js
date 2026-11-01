import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  internship: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship', required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  coverLetter: String,
  resumeUrl: String,
  status: { 
    type: String, 
    enum: ['pending', 'reviewed', 'shortlisted', 'interview', 'accepted', 'rejected'], 
    default: 'pending' 
  },
  appliedAt: { type: Date, default: Date.now },
  interview: {
    scheduledAt: Date,
    location: String,
    meetingUrl: String,
    notes: String
  },
  statusHistory: [{
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'shortlisted', 'interview', 'accepted', 'rejected']
    },
    changedAt: Date,
    note: String
  }]
});

// Prevent user from submitting more than one application per internship
applicationSchema.index({ internship: 1, applicant: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
