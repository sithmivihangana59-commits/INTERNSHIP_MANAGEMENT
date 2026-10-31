# InternSphere PRO – Internship & Job Management System

## Project Description

InternSphere PRO is a web-based Internship and Job Management System designed to connect students and job seekers with employers.

The system allows candidates to search for internship opportunities, view internship details, submit applications, upload CVs, save opportunities, and track application progress.

Employers can create and manage internship vacancies, review applications, view candidate information and CVs, and update application statuses.

Administrators can monitor users, companies, internships, applications, and overall platform activity.

## Main Features

### Student / Candidate
- User registration and login
- Search and filter internship opportunities
- View internship details
- Apply for internships
- Upload and select CV
- Track application status
- Save/bookmark internships
- Manage personal profile

### Employer
- Employer dashboard
- Manage company information
- Create and manage internship vacancies
- View received applications
- View candidate profiles and CVs
- Update application status
- Shortlist candidates
- Schedule interviews
- Accept or reject applications

### Administrator
- Admin dashboard
- Monitor platform statistics
- Manage users
- Monitor companies
- Monitor internship opportunities
- Monitor application activities

## Technologies Used

### Frontend
- Vue 3
- Quasar Framework
- Vite
- Vue Router
- Pinia
- Axios
- SCSS

### Backend
- Node.js
- Express.js
- REST API
- JWT Authentication
- bcrypt
- Mongoose

### Database
- MongoDB Atlas

### Development Tools
- Visual Studio Code
- Git & GitHub
- Postman

## System Architecture

The system follows a client-server architecture.

```text
Frontend
   ↓
REST API
   ↓
Backend Server
   ↓
MongoDB Atlas
```

### Components

- **Frontend:** Vue 3 + Quasar
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT
- **Password Security:** bcrypt

## Database Design

The system uses MongoDB with Mongoose for database management.

The main collections are:

- User
- Company
- Category
- Internship
- Application
- Bookmark

### Entity Relationships

The main relationships include:

- User → Internship
- Company → Internship
- Category → Internship
- User → Application
- Internship → Application
- User → Bookmark
- Internship → Bookmark

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sithmivihangana59-commits/INTERNSHIP_MANAGEMENT.git
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install the required dependencies:

```bash
npm install
```

Create a `.env` file and configure the required environment variables.

Start the backend server:

```bash
node server.js
```

The backend server runs on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Navigate to the frontend project:

```bash
cd frontend/INTERNSHIP_MANAGEMENT
```

Install the required dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend application runs on:

```text
http://localhost:9000
```

## Project Structure

```text
WEB APPLICATION/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seeders/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   └── INTERNSHIP_MANAGEMENT/
│       ├── public/
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   ├── layouts/
│       │   ├── router/
│       │   ├── stores/
│       │   ├── views/
│       │   ├── services/
│       │   └── types/
│       ├── package.json
│       └── README.md
│
└── README.md
```

## Authentication and Security

The system uses JWT-based authentication for secure login and role-based access control.

Supported user roles are:

- Student
- Employer
- Admin

User passwords are securely hashed using bcrypt before being stored in the database.

Role-based access ensures that users can access only the features relevant to their role.

## Application Workflow

```text
Student
   ↓
Search Internship
   ↓
View Internship Details
   ↓
Select / Upload CV
   ↓
Submit Application
   ↓
Employer Reviews Application
   ↓
Shortlist / Interview / Reject / Accept
   ↓
Student Tracks Application Status
```

## Application Statuses

Applications can move through the following statuses:

- Pending
- Reviewed
- Shortlisted
- Interview
- Accepted
- Rejected

## Validation and Error Handling

The system provides validation and error handling for important operations, including:

- Required fields
- Valid email addresses
- Password requirements
- Duplicate applications
- Duplicate bookmarks
- Invalid authentication
- Unauthorized access
- Database errors

## CRUD Operations

The system supports CRUD operations for the main entities.

### Create
Users can create accounts, while employers can create internship opportunities.

### Read
Users can view internship opportunities, company information, applications, and dashboard information.

### Update
Users can update profiles, while employers can update internship details and application statuses.

### Delete
Authorized users can remove or delete relevant records according to their role and permissions.

## User Interface

The system provides role-based interfaces for:

- Candidate Registration
- Internship Listing
- Internship Details
- Internship Application
- Application Tracking
- Employer Dashboard
- Admin Dashboard

## Team

**Module:** EC4307 – Web Application Development

**Project:** InternSphere PRO – Internship & Job Management System

## Project Status

This project was developed as an academic mini project for the EC4307 Web Application Development module.

### Technology Stack

**Vue 3 | Quasar | Vite | Node.js | Express.js | MongoDB | Mongoose | JWT**