import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD before running admin:ensure.');
}

try {
  await mongoose.connect(process.env.MONGODB_URI);

  let user = await User.findOne({ email }).select('+password');
  const created = !user;

  if (!user) {
    user = new User({
      firstName: 'CampusCare',
      lastName: 'Admin',
      email,
      password,
      role: 'admin',
      status: 'active'
    });
  } else {
    user.firstName ||= 'CampusCare';
    user.lastName ||= 'Admin';
    user.password = password;
    user.role = 'admin';
    user.status = 'active';
  }

  await user.save();

  console.log(
    JSON.stringify({
      success: true,
      created,
      email: user.email,
      role: user.role,
      status: user.status,
      passwordHashed: /^\$2[aby]\$/.test(user.password)
    })
  );
} catch (error) {
  console.error(`Could not ensure the admin account: ${error.message}`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect().catch(() => {});
}
