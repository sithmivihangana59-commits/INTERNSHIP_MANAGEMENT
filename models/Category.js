import mongoose from 'mongoose';
import slugify from 'slugify';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Category name is required'], unique: true },
  slug: { type: String, unique: true },
  description: String,
  icon: String,
  roleCount: { type: Number, default: 0 },
  skills: [String],
  createdAt: { type: Date, default: Date.now }
});

// Create slug from name
categorySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
