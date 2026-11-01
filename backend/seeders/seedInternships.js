import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import dns from 'dns';
import { fileURLToPath } from 'url';

import User from '../models/User.js';
import Company from '../models/Company.js';
import Category from '../models/Category.js';
import Internship from '../models/Internship.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({
  path: path.join(__dirname, '../.env')
});

// MongoDB Atlas SRV DNS fix
dns.setServers(['1.1.1.1', '8.8.8.8']);

const seedInternships = async () => {
  try {
    // ------------------------------------------------
    // Connect MongoDB
    // ------------------------------------------------

    console.log('Connecting to MongoDB...');

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      family: 4
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // ------------------------------------------------
    // 1. Find an existing employer
    // ------------------------------------------------

    console.log('Checking employer...');

    let employer = await User.findOne({
      role: 'employer'
    });

    if (!employer) {
      console.log('No employer found. Creating demo employer...');

      employer = await User.create({
        firstName: 'John',
        lastName: 'Manager',
        email: 'employer@internsphere.lk',
        password: 'employer123',
        role: 'employer'
      });

      console.log('Demo employer created.');
    } else {
      console.log(`Employer found: ${employer.email}`);
    }

    // ------------------------------------------------
    // 2. Create / Find Companies
    // ------------------------------------------------

    console.log('Checking companies...');

    const companiesData = [
      {
        name: 'WSO2 LLC',
        logoInitial: 'W',
        logoColor: '#E53935',
        location: 'Colombo 03',
        industry: 'Software & Technology',
        description:
          'Open-source technology provider for digital transformation.',
        isPartner: true,
        isVerified: true
      },
      {
        name: 'IFS World',
        logoInitial: 'IFS',
        logoColor: '#1565C0',
        location: 'Colombo 01',
        industry: 'Enterprise Software',
        description:
          'Global enterprise applications company.',
        isPartner: true,
        isVerified: true
      },
      {
        name: 'Virtusa',
        logoInitial: 'V',
        logoColor: '#7B1FA2',
        location: 'Colombo 07',
        industry: 'IT Consulting',
        description:
          'Global IT consulting and technology company.',
        isPartner: true,
        isVerified: true
      },
      {
        name: 'Sysco LABS',
        logoInitial: 'SL',
        logoColor: '#2E7D32',
        location: 'Colombo 03',
        industry: 'Software Engineering',
        description:
          'Technology innovation hub of Sysco Corporation.',
        isPartner: true,
        isVerified: true
      },
      {
        name: 'LSEG Tech',
        logoInitial: 'L',
        logoColor: '#0D47A1',
        location: 'Colombo 02',
        industry: 'Financial Technology',
        description:
          'Technology arm of London Stock Exchange Group.',
        isPartner: true,
        isVerified: true
      },
      {
        name: 'Dialog Axiata',
        logoInitial: 'D',
        logoColor: '#E53935',
        location: 'Colombo 02',
        industry: 'Telecommunications',
        description:
          'Leading telecommunications provider in Sri Lanka.',
        isPartner: true,
        isVerified: true
      },
      {
        name: 'London Stock Exchange Group',
        logoInitial: 'LSEG',
        logoColor: '#0D47A1',
        location: 'Colombo 02',
        industry: 'Financial Services',
        description:
          'Global financial markets infrastructure.',
        isPartner: false,
        isVerified: true
      },
      {
        name: 'Nova Global Labs',
        logoInitial: 'N',
        logoColor: '#2E7D32',
        location: 'Remote',
        industry: 'Software Development',
        description:
          'Global remote-first technology company.',
        isPartner: false,
        isVerified: true
      }
    ];

    const companies = [];

    for (const companyData of companiesData) {
      let company = await Company.findOne({
        name: companyData.name
      });

      if (!company) {
        company = await Company.create(companyData);
        console.log(`Company created: ${company.name}`);
      } else {
        console.log(`Company already exists: ${company.name}`);
      }

      companies.push(company);
    }

    // ------------------------------------------------
    // 3. Create / Find Categories
    // ------------------------------------------------

    console.log('Checking categories...');

    const categoriesData = [
      {
        name: 'Software & Cloud',
        roleCount: 480,
        icon: 'code',
        skills: [
          'Full-stack',
          'Java',
          'React',
          'Microservices',
          'Node & Cloud Infra.'
        ],
        description:
          'Full-stack, Java, React, Microservices, Node & Cloud Infra.'
      },
      {
        name: 'AI & Data Science',
        roleCount: 195,
        icon: 'brain',
        skills: [
          'Machine Learning',
          'PyTorch',
          'Data Analysis & Big Data'
        ],
        description:
          'Machine Learning, PyTorch, Data Analysis, and Big Data.'
      },
      {
        name: 'UI/UX Design',
        roleCount: 140,
        icon: 'palette',
        skills: [
          'Figma prototypes',
          'User Research',
          'Design Systems'
        ],
        description:
          'Figma prototypes, User Research, and Design Systems.'
      },
      {
        name: 'Business & Finance',
        roleCount: 220,
        icon: 'trending-up',
        skills: [
          'Business Analysis',
          'Agile Sprint Stories',
          'Strategy'
        ],
        description:
          'Business Analysis, Agile Sprint Stories, and Strategy.'
      },
      {
        name: 'DevOps & Systems',
        roleCount: 95,
        icon: 'server',
        skills: [
          'CI/CD',
          'Kubernetes',
          'Docker'
        ],
        description:
          'CI/CD, Kubernetes, Docker, and cloud infrastructure.'
      },
      {
        name: 'QA & Cybersecurity',
        roleCount: 110,
        icon: 'shield',
        skills: [
          'Test automation',
          'Selenium',
          'InfoSec'
        ],
        description:
          'Test automation, Selenium, InfoSec, and more.'
      }
    ];

    const categories = [];

    for (const categoryData of categoriesData) {
      let category = await Category.findOne({
        name: categoryData.name
      });

      if (!category) {
        category = await Category.create(categoryData);
        console.log(`Category created: ${category.name}`);
      } else {
        console.log(`Category already exists: ${category.name}`);
      }

      categories.push(category);
    }

    // ------------------------------------------------
    // Helper functions
    // ------------------------------------------------

    const companyId = (name) =>
      companies.find((company) => company.name === name)?._id;

    const categoryId = (name) =>
      categories.find((category) => category.name === name)?._id;

    // ------------------------------------------------
    // 4. Internship data
    // ------------------------------------------------

    const today = new Date();

    const addDays = (days) => {
      const date = new Date(today);
      date.setDate(today.getDate() + days);
      return date;
    };

    const internshipsData = [
      {
        title: 'Associate Software Engineer Intern',
        company: companyId('WSO2 LLC'),
        category: categoryId('Software & Cloud'),

        description:
          'Join the API Management and Choreo Cloud platform teams. Work on distributed microservices, Ballerina runtime, and cloud-native applications.',

        requirements: [
          'Basic programming knowledge in Java or similar',
          'Understanding of REST APIs and web concepts',
          'Familiarity with Git'
        ],

        responsibilities: [
          'Develop microservices',
          'Write unit tests',
          'Participate in code reviews'
        ],

        skills: [
          'Java',
          'React',
          'Docker',
          'Ballerina'
        ],

        salary: {
          amount: 80000,
          currency: 'LKR',
          period: 'month'
        },

        duration: '6 Months',
        workMode: 'Hybrid',
        location: 'Colombo 03',
        applicationDeadline: addDays(4),
        isActive: true,
        isFeatured: true,
        postedBy: employer._id
      },

      {
        title: 'AI & Machine Learning Intern',
        company: companyId('IFS World'),
        category: categoryId('AI & Data Science'),

        description:
          'Collaborate with the industrial AI research group to implement predictive maintenance models and generative AI solutions.',

        requirements: [
          'Python proficiency',
          'Basic ML/DL knowledge',
          'Statistics and linear algebra'
        ],

        responsibilities: [
          'Train ML models',
          'Process datasets',
          'Write research documentation'
        ],

        skills: [
          'Python',
          'PyTorch',
          'FastAPI',
          'Pandas'
        ],

        salary: {
          amount: 85000,
          currency: 'LKR',
          period: 'month'
        },

        duration: '6 Months',
        workMode: 'On-Site',
        location: 'Colombo 01',
        applicationDeadline: addDays(6),
        isActive: true,
        isFeatured: true,
        postedBy: employer._id
      },

      {
        title: 'UI/UX Product Design Intern',
        company: companyId('Sysco LABS'),
        category: categoryId('UI/UX Design'),

        description:
          'Design intuitive enterprise workflows. Create prototypes in Figma, conduct user tests, and improve design systems.',

        requirements: [
          'Figma experience',
          'Portfolio of design work',
          'Understanding of UX principles'
        ],

        responsibilities: [
          'Create wireframes',
          'Create prototypes',
          'Conduct usability testing'
        ],

        skills: [
          'Figma',
          'Wireframing',
          'Design Systems',
          'Testing'
        ],

        salary: {
          amount: 75000,
          currency: 'LKR',
          period: 'month'
        },

        duration: '6 Months',
        workMode: 'Hybrid',
        location: 'Colombo 03',
        applicationDeadline: addDays(8),
        isActive: true,
        isFeatured: true,
        postedBy: employer._id
      },

      {
        title: 'DevOps & Cloud Engineering Intern',
        company: companyId('Virtusa'),
        category: categoryId('DevOps & Systems'),

        description:
          'Help automate and deploy scalable cloud infrastructure. Work with CI/CD pipelines and container orchestration.',

        requirements: [
          'Linux basics',
          'Cloud concepts',
          'Basic scripting skills'
        ],

        responsibilities: [
          'Manage CI/CD pipelines',
          'Deploy applications',
          'Automate infrastructure'
        ],

        skills: [
          'Docker',
          'Kubernetes',
          'AWS',
          'Jenkins'
        ],

        salary: {
          amount: 70000,
          currency: 'LKR',
          period: 'month'
        },

        duration: '6 Months',
        workMode: 'Hybrid',
        location: 'Colombo 07',
        applicationDeadline: addDays(14),
        isActive: true,
        isFeatured: true,
        postedBy: employer._id
      },

      {
        title: 'Trainee Business Analyst',
        company: companyId('London Stock Exchange Group'),
        category: categoryId('Business & Finance'),

        description:
          'Analyze business requirements for complex financial systems and work with stakeholders.',

        requirements: [
          'Excellent communication skills',
          'Analytical mindset',
          'Basic financial market knowledge'
        ],

        responsibilities: [
          'Gather requirements',
          'Create user stories',
          'Facilitate meetings'
        ],

        skills: [
          'Business Analysis',
          'SQL',
          'Excel',
          'Agile'
        ],

        salary: {
          amount: 90000,
          currency: 'LKR',
          period: 'month'
        },

        duration: '6 Months',
        workMode: 'Hybrid',
        location: 'Colombo 02',
        applicationDeadline: addDays(14),
        isActive: true,
        isFeatured: true,
        postedBy: employer._id
      },

      {
        title: 'Frontend React & Next.js Intern',
        company: companyId('Nova Global Labs'),
        category: categoryId('Software & Cloud'),

        description:
          'Build fast and responsive frontends using modern web technologies in a fully remote team.',

        requirements: [
          'React knowledge',
          'HTML/CSS/JS proficiency',
          'Git version control'
        ],

        responsibilities: [
          'Build responsive UI',
          'Integrate REST APIs',
          'Write unit tests'
        ],

        skills: [
          'React',
          'Next.js',
          'TypeScript',
          'Tailwind CSS'
        ],

        salary: {
          amount: 65000,
          currency: 'LKR',
          period: 'month'
        },

        duration: '3 Months',
        workMode: 'Remote',
        location: 'Remote',
        applicationDeadline: addDays(14),
        isActive: true,
        isFeatured: true,
        postedBy: employer._id
      },

      {
        title: 'QA Automation Engineer Intern',
        company: companyId('LSEG Tech'),
        category: categoryId('QA & Cybersecurity'),

        description:
          'Ensure software quality through automated testing frameworks.',

        requirements: [
          'Basic Java programming',
          'Understanding of QA concepts',
          'Attention to detail'
        ],

        responsibilities: [
          'Write automated tests',
          'Execute regression tests',
          'Report defects'
        ],

        skills: [
          'Selenium',
          'Java',
          'TestNG',
          'CI/CD'
        ],

        salary: {
          amount: 78000,
          currency: 'LKR',
          period: 'month'
        },

        duration: '6 Months',
        workMode: 'On-Site',
        location: 'Colombo 02',
        applicationDeadline: addDays(14),
        isActive: true,
        isFeatured: false,
        postedBy: employer._id
      },

      {
        title: 'Data Engineering Intern',
        company: companyId('Dialog Axiata'),
        category: categoryId('AI & Data Science'),

        description:
          'Build and maintain large-scale data pipelines for telecommunications analytics.',

        requirements: [
          'SQL knowledge',
          'Python scripting',
          'Data warehousing'
        ],

        responsibilities: [
          'Build ETL pipelines',
          'Optimize queries',
          'Monitor data quality'
        ],

        skills: [
          'Python',
          'SQL',
          'Spark',
          'Airflow'
        ],

        salary: {
          amount: 72000,
          currency: 'LKR',
          period: 'month'
        },

        duration: '6 Months',
        workMode: 'Hybrid',
        location: 'Colombo 02',
        applicationDeadline: addDays(14),
        isActive: true,
        isFeatured: false,
        postedBy: employer._id
      }
    ];

    // ------------------------------------------------
    // 5. Prevent duplicates
    // ------------------------------------------------

    let createdCount = 0;

    for (const internshipData of internshipsData) {
      const exists = await Internship.findOne({
        title: internshipData.title
      });

      if (!exists) {
        await Internship.create(internshipData);

        createdCount++;

        console.log(
          `Internship created: ${internshipData.title}`
        );
      } else {
        console.log(
          `Already exists: ${internshipData.title}`
        );
      }
    }

    // ------------------------------------------------
    // Summary
    // ------------------------------------------------

    console.log('');
    console.log('========================================');
    console.log(' Internship seeding completed!');
    console.log(` New internships created: ${createdCount}`);
    console.log('========================================');

    await mongoose.connection.close();

    process.exit(0);

  } catch (error) {

    console.error('Error seeding internships:', error);

    try {
      await mongoose.connection.close();
    } catch (closeError) {
      console.error('Error closing MongoDB connection:', closeError);
    }

    process.exit(1);
  }
};

seedInternships();