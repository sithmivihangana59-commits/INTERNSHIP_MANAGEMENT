import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Company name is required'] },
  logo: String,
  logoColor: String,
  logoInitial: String,
  description: String,
  industry: String,
  website: String,
  location: String,
  employeeCount: String,
  isVerified: { type: Boolean, default: true },
  isPartner: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Company = mongoose.model('Company', companySchema);
export default Company;
