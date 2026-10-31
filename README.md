# InternSphere PRO – Frontend

## Project Description

The InternSphere PRO frontend is a responsive web application developed using Vue 3 and Quasar Framework.

It provides role-based user interfaces for Students, Employers, and Administrators to manage internship opportunities, applications, profiles, and platform activities.

## Features

### Student / Candidate
- User registration and login
- Browse internship opportunities
- Search and filter internships
- View internship details
- Apply for internships
- Upload and select CV
- Track application status
- Save/bookmark internships
- Manage profile

### Employer
- Employer dashboard
- Manage company information
- Create internship vacancies
- Edit and manage internship posts
- View applications
- View candidate information
- Update application statuses

### Administrator
- Admin dashboard
- View platform statistics
- Monitor users
- Monitor companies
- Monitor internships
- Monitor applications

## Technologies Used

- Vue 3
- Quasar Framework
- Vite
- Vue Router
- Pinia
- Axios
- SCSS
- TypeScript

## Project Structure

```text
INTERNSHIP_MANAGEMENT/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── router/
│   ├── stores/
│   ├── views/
│   ├── services/
│   └── types/
├── package.json
├── quasar.config.js
└── README.md
```

## Installation

Install the project dependencies:

```bash
npm install
```

## Development Server

Start the development server:

```bash
npm run dev
```

The frontend application runs on:

```text
http://localhost:9000
```

## Build for Production

To create a production build:

```bash
npm run build
```

## Code Quality

The project uses ESLint and Prettier to maintain consistent code formatting and quality.

Run linting with:

```bash
npm run lint
```

## Backend Connection

The frontend communicates with the backend through REST APIs.

```text
Vue 3 + Quasar
       ↓
    Axios
       ↓
REST API
       ↓
Node.js + Express
       ↓
MongoDB
```

The backend server runs on:

```text
http://localhost:5000
```

## Authentication

The frontend supports role-based authentication for:

- Student
- Employer
- Admin

Authentication is handled through the backend API using JWT.

## Application Workflow

```text
Student
   ↓
Login / Register
   ↓
Browse Internships
   ↓
View Details
   ↓
Apply
   ↓
Track Application
```

Employer workflow:

```text
Employer
   ↓
Login
   ↓
Create Internship
   ↓
Receive Applications
   ↓
Review Candidates
   ↓
Update Application Status
```

## Project Status

This frontend was developed as part of the EC4307 Web Application Development Mini Project.

**Project:** InternSphere PRO – Internship & Job Management System