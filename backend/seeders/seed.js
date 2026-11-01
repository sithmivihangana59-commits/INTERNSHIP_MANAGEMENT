import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

import User from '../models/User.js';
import Company from '../models/Company.js';
import Category from '../models/Category.js';
import Internship from '../models/Internship.js';
import Application from '../models/Application.js';
import Bookmark from '../models/Bookmark.js';

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/internsphere_pro');
    console.log(`${colors.cyan}MongoDB Connected: ${conn.connection.host}${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}Error connecting to MongoDB: ${error.message}${colors.reset}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    console.log(`${colors.yellow}Clearing existing data...${colors.reset}`);
    await User.deleteMany();
    await Company.deleteMany();
    await Category.deleteMany();
    await Internship.deleteMany();
    await Application.deleteMany();
    await Bookmark.deleteMany();
    console.log(`${colors.green}✓ Existing data cleared!${colors.reset}`);

    // ─── Users ──────────────────────────────────
    console.log(`${colors.yellow}Creating Users...${colors.reset}`);
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'InternSphere',
      email: 'admin@internsphere.lk',
      password: 'admin123',
      role: 'admin'
    });

    const testStudent = await User.create({
      firstName: 'Sithmi',
      lastName: 'Vihangana',
      email: 'sithmivihangana59@gmail.com',
      password: 'password123',
      role: 'student',
      university: 'University of Colombo',
      skills: ['React', 'JavaScript', 'Node.js', 'Python']
    });

    const testEmployer = await User.create({
      firstName: 'John',
      lastName: 'Manager',
      email: 'employer@wso2.com',
      password: 'employer123',
      role: 'employer'
    });
    console.log(`${colors.green}✓ 3 Users created (admin, student, employer)${colors.reset}`);

    // ─── Companies ──────────────────────────────
    console.log(`${colors.yellow}Creating Companies...${colors.reset}`);
    const companiesData = [
      {
        name: 'WSO2 LLC',
        logoInitial: 'W',
        logoColor: '#E53935',
        location: 'Colombo 03',
        industry: 'Software & Technology',
        description: 'Open-source technology provider for digital transformation.',
        isPartner: true,
        isVerified: true
      },
      {
        name: 'IFS World',
        logoInitial: 'IFS',
        logoColor: '#1565C0',
        location: 'Colombo 01',
        industry: 'Enterprise Software',
        description: 'Global enterprise applications company.',
        isPartner: true,
        isVerified: true
      },
      {
        name: 'Virtusa',
        logoInitial: 'V',
        logoColor: '#7B1FA2',
        location: 'Colombo 07',
        industry: 'IT Consulting',
        description: 'Global IT consulting and technology company.',
        isPartner: true,
        isVerified: true
      },
      {
        name: 'Sysco LABS',
        logoInitial: 'SL',
        logoColor: '#2E7D32',
        location: 'Colombo 03',
        industry: 'Software Engineering',
        description: 'Technology innovation hub of Sysco Corporation.',
        isPartner: true,
        isVerified: true
      },
      {
        name: 'LSEG Tech',
        logoInitial: 'L',
        logoColor: '#0D47A1',
        location: 'Colombo 02',
        industry: 'Financial Technology',
        description: 'Technology arm of London Stock Exchange Group.',
        isPartner: true,
        isVerified: true
      },
      {
        name: 'Dialog Axiata',
        logoInitial: 'D',
        logoColor: '#E53935',
        location: 'Colombo 02',
        industry: 'Telecommunications',
        description: 'Leading telecommunications provider in Sri Lanka.',
        isPartner: true,
        isVerified: true
      },
      {
        name: 'London Stock Exchange Group',
        logoInitial: 'SEG',
        logoColor: '#0D47A1',
        location: 'Colombo 02',
        industry: 'Financial Services',
        description: 'Global financial markets infrastructure.',
        isPartner: false,
        isVerified: true
      },
      {
        name: 'Nova Global Labs',
        logoInitial: 'N',
        logoColor: '#2E7D32',
        location: 'Remote',
        industry: 'Software Development',
        description: 'Global remote-first technology company.',
        isPartner: false,
        isVerified: true
      }
    ];
    const createdCompanies = await Company.insertMany(companiesData);
    console.log(`${colors.green}✓ 8 Companies created${colors.reset}`);

    // ─── Categories ─────────────────────────────
    console.log(`${colors.yellow}Creating Categories...${colors.reset}`);
    const categoriesData = [
      { name: 'Software & Cloud', roleCount: 480, icon: 'code', skills: ['Full-stack', 'Java', 'React', 'Microservices', 'Node & Cloud Infra.'], description: 'Full-stack, Java, React, Microservices, Node & Cloud Infra.' },
      { name: 'AI & Data Science', roleCount: 195, icon: 'brain', skills: ['Machine Learning', 'PyTorch', 'Data Analysis & Big Data'], description: 'Machine Learning, PyTorch, Data Analysis & Big Data.' },
      { name: 'UI/UX Design', roleCount: 140, icon: 'palette', skills: ['Figma prototypes', 'User Research', 'Design Systems'], description: 'Figma prototypes, User Research, and Design Systems.' },
      { name: 'Business & Finance', roleCount: 220, icon: 'trending-up', skills: ['Business Analysis', 'Agile Sprint Stories', '& Strategy'], description: 'Business Analysis, Agile Sprint Stories, & Strategy.' },
      { name: 'DevOps & Systems', roleCount: 95, icon: 'server', skills: ['CI/CD', 'Kubernetes', 'Docker'], description: 'CI/CD, Kubernetes, Docker, and cloud infrastructure.' },
      { name: 'QA & Cybersecurity', roleCount: 110, icon: 'shield', skills: ['Test automation', 'Selenium', 'InfoSec'], description: 'Test automation, Selenium, InfoSec, and more.' },
      { name: 'Fintech & Banking', roleCount: 85, icon: 'building', skills: ['Capital markets', 'risk analysis'], description: 'Capital markets, risk analysis, and financial tech.' },
      { name: 'Product & Growth', roleCount: 165, icon: 'megaphone', skills: ['Digital marketing', 'user acquisition'], description: 'Digital marketing, user acquisition, and growth.' }
    ];
    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`${colors.green}✓ 8 Categories created${colors.reset}`);

    // ─── Internships ────────────────────────────
    console.log(`${colors.yellow}Creating Internships...${colors.reset}`);

    const getCompanyId = (name) => createdCompanies.find(c => c.name === name)?._id;
    const getCategoryId = (name) => createdCategories.find(c => c.name === name)?._id;

    const today = new Date();
    const addDays = (days) => { const d = new Date(today); d.setDate(today.getDate() + days); return d; };

    const internshipsData = [
      {
        title: 'Associate Software Engineer Intern',
        company: getCompanyId('WSO2 LLC'),
        category: getCategoryId('Software & Cloud'),
        description: 'Join the API Management and Choreo Cloud platform teams. Work on distributed microservices, Ballerina runtime, and cloud-native applications.',
        requirements: ['Basic programming knowledge in Java or similar', 'Understanding of REST APIs and web concepts', 'Familiarity with version control (Git)'],
        responsibilities: ['Develop microservices using Java and Ballerina', 'Write unit tests and integration tests', 'Participate in code reviews and agile ceremonies'],
        skills: ['Java', 'React', 'Docker', 'Ballerina'],
        salary: { amount: 80000, currency: 'LKR', period: 'month' },
        duration: '6 Months',
        workMode: 'Hybrid',
        location: 'Colombo 03',
        applicationDeadline: addDays(4),
        isActive: true,
        isFeatured: true,
        postedBy: testEmployer._id
      },
      {
        title: 'AI & Machine Learning Intern',
        company: getCompanyId('IFS World'),
        category: getCategoryId('AI & Data Science'),
        description: 'Collaborate with the industrial AI research group to implement predictive maintenance models and generative AI solutions for enterprise applications.',
        requirements: ['Python proficiency', 'Basic ML/DL algorithms knowledge', 'Statistics and linear algebra foundations'],
        responsibilities: ['Train and evaluate ML models', 'Process and clean datasets', 'Write research documentation'],
        skills: ['Python', 'PyTorch', 'FastAPI', 'Pandas'],
        salary: { amount: 85000, currency: 'LKR', period: 'month' },
        duration: '6 Months',
        workMode: 'On-Site',
        location: 'Colombo 01',
        applicationDeadline: addDays(6),
        isActive: true,
        isFeatured: true,
        postedBy: testEmployer._id
      },
      {
        title: 'UI/UX Product Design Intern',
        company: getCompanyId('Sysco LABS'),
        category: getCategoryId('UI/UX Design'),
        description: 'Design intuitive enterprise supply chain workflows. Create prototypes in Figma, conduct user tests, and iterate on design systems.',
        requirements: ['Figma experience', 'Portfolio of design work', 'Understanding of UX principles'],
        responsibilities: ['Create wireframes and prototypes', 'Conduct usability testing', 'Maintain and extend design systems'],
        skills: ['Figma', 'Wireframing', 'Design Systems', 'Testing'],
        salary: { amount: 75000, currency: 'LKR', period: 'month' },
        duration: '6 Months',
        workMode: 'Hybrid',
        location: 'Colombo 03',
        applicationDeadline: addDays(8),
        isActive: true,
        isFeatured: true,
        postedBy: testEmployer._id
      },
      {
        title: 'DevOps & Cloud Engineering Intern',
        company: getCompanyId('Virtusa'),
        category: getCategoryId('DevOps & Systems'),
        description: 'Help automate and deploy scalable cloud infrastructure. Work with CI/CD pipelines, container orchestration, and cloud services.',
        requirements: ['Linux basics', 'Understanding of cloud concepts', 'Basic scripting skills'],
        responsibilities: ['Manage CI/CD pipelines', 'Deploy and monitor containerized applications', 'Automate infrastructure provisioning'],
        skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins'],
        salary: { amount: 70000, currency: 'LKR', period: 'month' },
        duration: '6 Months',
        workMode: 'Hybrid',
        location: 'Colombo 07',
        applicationDeadline: addDays(14),
        isActive: true,
        isFeatured: true,
        postedBy: testEmployer._id
      },
      {
        title: 'Trainee Business Analyst',
        company: getCompanyId('London Stock Exchange Group'),
        category: getCategoryId('Business & Finance'),
        description: 'Analyze business requirements for complex financial systems. Work with stakeholders to define user stories and acceptance criteria.',
        requirements: ['Excellent communication skills', 'Analytical mindset', 'Basic understanding of financial markets'],
        responsibilities: ['Gather and document requirements', 'Create user stories and acceptance criteria', 'Facilitate stakeholder meetings'],
        skills: ['Business Analysis', 'SQL', 'Excel', 'Agile'],
        salary: { amount: 90000, currency: 'LKR', period: 'month' },
        duration: '6 Months',
        workMode: 'Hybrid',
        location: 'Colombo 02',
        applicationDeadline: addDays(14),
        isActive: true,
        isFeatured: true,
        postedBy: testEmployer._id
      },
      {
        title: 'Frontend React & Next.js Intern',
        company: getCompanyId('Nova Global Labs'),
        category: getCategoryId('Software & Cloud'),
        description: 'Build fast and responsive frontends using modern web technologies. Work in a fully remote, globally distributed team.',
        requirements: ['React knowledge', 'HTML/CSS/JS proficiency', 'Git version control'],
        responsibilities: ['Build responsive UI components', 'Integrate with REST APIs', 'Write unit tests with Jest'],
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
        salary: { amount: 65000, currency: 'LKR', period: 'month' },
        duration: '3 Months',
        workMode: 'Remote',
        location: 'Remote',
        applicationDeadline: addDays(14),
        isActive: true,
        isFeatured: true,
        postedBy: testEmployer._id
      },
      {
        title: 'QA Automation Engineer Intern',
        company: getCompanyId('LSEG Tech'),
        category: getCategoryId('QA & Cybersecurity'),
        description: 'Ensure software quality through automated testing frameworks. Build and maintain test suites for critical financial applications.',
        requirements: ['Basic Java programming', 'Understanding of QA concepts', 'Attention to detail'],
        responsibilities: ['Write automated test scripts', 'Execute regression test suites', 'Report and track defects'],
        skills: ['Selenium', 'Java', 'TestNG', 'CI/CD'],
        salary: { amount: 78000, currency: 'LKR', period: 'month' },
        duration: '6 Months',
        workMode: 'On-Site',
        location: 'Colombo 02',
        applicationDeadline: addDays(14),
        isActive: true,
        isFeatured: false,
        postedBy: testEmployer._id
      },
      {
        title: 'Data Engineering Intern',
        company: getCompanyId('Dialog Axiata'),
        category: getCategoryId('AI & Data Science'),
        description: 'Build and maintain large-scale data pipelines for telecommunications analytics and business intelligence.',
        requirements: ['SQL knowledge', 'Python scripting', 'Understanding of data warehousing'],
        responsibilities: ['Build ETL pipelines', 'Optimize data queries', 'Monitor data quality'],
        skills: ['Python', 'SQL', 'Spark', 'Airflow'],
        salary: { amount: 72000, currency: 'LKR', period: 'month' },
        duration: '6 Months',
        workMode: 'Hybrid',
        location: 'Colombo 02',
        applicationDeadline: addDays(14),
        isActive: true,
        isFeatured: false,
        postedBy: testEmployer._id
      }
    ];

    await Internship.insertMany(internshipsData);
    console.log(`${colors.green}✓ 8 Internships created${colors.reset}`);

    // ─── Summary ────────────────────────────────
    console.log(`\n${colors.blue}============================================${colors.reset}`);
    console.log(`${colors.blue}   🎉 Database Successfully Seeded!${colors.reset}`);
    console.log(`${colors.blue}============================================${colors.reset}`);
    console.log(`${colors.cyan}   Users:        3${colors.reset}`);
    console.log(`${colors.cyan}   Companies:    8${colors.reset}`);
    console.log(`${colors.cyan}   Categories:   8${colors.reset}`);
    console.log(`${colors.cyan}   Internships:  8${colors.reset}`);
    console.log(`${colors.blue}============================================${colors.reset}`);
    console.log(`\n${colors.yellow}Login Credentials:${colors.reset}`);
    console.log(`${colors.cyan}  Admin:    admin@internsphere.lk / admin123${colors.reset}`);
    console.log(`${colors.cyan}  Student:  sithmivihangana59@gmail.com / password123${colors.reset}`);
    console.log(`${colors.cyan}  Employer: employer@wso2.com / employer123${colors.reset}`);
    console.log(`${colors.blue}============================================${colors.reset}\n`);

    process.exit();
  } catch (error) {
    console.error(`${colors.red}Error seeding data:${colors.reset}`, error);
    process.exit(1);
  }
};

seedData();

