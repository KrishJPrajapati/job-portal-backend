# 🧑‍💻 Job Application Portal – Backend API

A production-ready RESTful API built with Node.js, Express.js, and MongoDB for managing job listings and candidate applications with enterprise-grade security features.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Testing](#-api-testing)
- [Security Features](#-security-features)
- [Deployment](#-deployment)
- [Author](#-author)

---

## 🎯 Problem Statement

Modern recruitment systems require a secure, scalable, and efficient backend to manage job listings and candidate applications. Traditional systems often lack:

- Proper authentication mechanisms
- Security hardening against common vulnerabilities
- Abuse protection (rate limiting)
- Standardized testing mechanisms
- Scalable architecture

---

## 💡 Solution

This project implements a **production-ready backend API** that provides:

✅ Secure user authentication with JWT  
✅ Resume upload functionality  
✅ Job listing management  
✅ Application tracking system  
✅ Protection against common web vulnerabilities  
✅ Complete API testing suite  
✅ Clean, scalable MVC architecture  

---

## ✨ Features

### Core Functionalities

- **User Management**: Registration and login with JWT authentication
- **Resume Upload**: Support for PDF, DOC, and DOCX files using Multer
- **Job Listings**: Retrieve and browse available positions
- **Application System**: Apply for jobs and track application status
- **Application History**: View all submitted applications

### Production-Grade Enhancements

- **Rate Limiting**: API abuse prevention with configurable thresholds
- **Security Hardening**: 
  - MongoDB injection protection
  - HTTP Parameter Pollution (HPP) protection
  - Secure HTTP headers via Helmet
  - Request payload size limiting
- **Error Handling**: Centralized error management with async wrapper
- **Performance**: Database indexing and response compression
- **Environment Configuration**: Flexible deployment settings
- **API Documentation**: Comprehensive Postman collection

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT) |
| **File Upload** | Multer |
| **Security** | helmet, express-rate-limit, hpp, mongo-sanitize |
| **Performance** | compression, morgan |
| **Testing** | Postman |

---

## 🏗 System Architecture
```
┌─────────────────────────────┐
│  Client (Postman/Frontend)  │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│      Express Router         │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│  Authentication Middleware  │
│         (JWT)               │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│  Controllers (Business      │
│       Logic)                │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│    Mongoose Models          │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│        MongoDB              │
└─────────────────────────────┘
```

---

## 📁 Project Structure
```
job-portal-backend/
│
├── controllers/              # Business logic for all features
│   ├── authController.js    # Authentication handlers
│   ├── userController.js    # User management
│   ├── jobController.js     # Job listing operations
│   └── applicationController.js  # Application management
│
├── db/
│   └── db.js                # MongoDB connection configuration
│
├── generateSampleJobs/
│   └── generateJobs.js      # Database seeding script
│
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   ├── upload.js            # File upload configuration
│   └── errorHandler.js      # Centralized error handling
│
├── models/                  # Mongoose schemas
│   ├── User.js              # User model with indexes
│   ├── Job.js               # Job listing model
│   └── Application.js       # Application model
│
├── router/
│   └── routes.js            # Unified API routes
│
├── utils/
│   ├── asyncHandler.js      # Async error wrapper
│   └── validate.js          # Validation helpers
│
├── validators/
│   ├── authValidator.js     # Authentication validation
│   └── applicationValidator.js  # Application validation
│
├── uploads/                 # Resume file storage
│
├── PostManTestingFile/
│   └── Job-Portal-API.postman_collection.json
│
├── index.js                 # Application entry point
├── .env                     # Environment variables
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/KrishJPrajapati/job-portal-backend.git
   cd job-portal-backend
```

2. **Install dependencies**
```bash
   npm install
```

3. **Environment setup**
   
   Create a `.env` file in the root directory:
```env
   PORT=8000
   DB_USERNAME=your_mongodb_username
   DB_PASSWORD=your_mongodb_password
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
```

4. **Seed sample data**
```bash
   node generateSampleJobs/generateJobs.js
```
   Expected output: `Jobs Seeded Successfully`

5. **Start the server**
   
   Development mode:
```bash
   npm run dev
```
   
   Production mode:
```bash
   NODE_ENV=production node index.js
```

The server will be running at `http://localhost:8000/`

---

## 🧪 API Testing

### Import Postman Collection

1. Open Postman
2. Click **Import**
3. Select `PostManTestingFile/Job-Portal-API.postman_collection.json`

### Configure Environment

Create a Postman environment with these variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `base_url` | `https://job-portal-backend-mpmt.onrender.com/` or `http://localhost:8000/` | API base URL |
| `token` | (auto-filled) | JWT token after login |
| `jobId` | (auto-filled) | Job ID after fetching jobs |

### API Endpoints Workflow

Run these requests in order:

1. **Register User** → Create new account
2. **Login User** → Get JWT token (auto-saved to environment)
3. **Get All Jobs** → Fetch job listings (jobId auto-saved)
4. **Upload Resume** → Upload PDF/DOC/DOCX file (form-data)
5. **Apply for Job** → Submit application
6. **View Applications** → Retrieve user's applications

### Rate Limiting Test

**Option 1: Postman Runner**
- Select "Rate Limit Test" request
- Set Iterations: 150
- Set Delay: 0 ms
- Run collection
- Expected: `429 Too Many Requests` error

**Option 2: PowerShell**
```powershell
1..150 | ForEach-Object { Invoke-WebRequest https://job-portal-backend-mpmt.onrender.com/jobs }
```

---

## 🔐 Security Features

| Feature | Implementation | Purpose |
|---------|---------------|---------|
| **JWT Authentication** | Token-based auth | Secure user sessions |
| **Rate Limiting** | express-rate-limit | Prevent API abuse |
| **NoSQL Injection Protection** | mongo-sanitize | Sanitize user inputs |
| **Request Validation** | Custom validators | Validate request payloads |
| **Secure Headers** | Helmet.js | Set security HTTP headers |
| **File Upload Restrictions** | Multer configuration | Limit file types and sizes |
| **HPP Protection** | hpp middleware | Prevent parameter pollution |
| **Payload Limiting** | Express body-parser | Prevent DOS attacks |

---

## 📦 Deployment

This application can be deployed to various platforms:

- **Render** (can be viewed at `https://job-portal-backend-mpmt.onrender.com`)
- **Railway**
- **Heroku**
- **AWS EC2**
- **DigitalOcean**

### Deployment Checklist

- [ ] Set all environment variables on the platform
- [ ] Update `DB_USERNAME` and `DB_PASSWORD` for production database
- [ ] Set `NODE_ENV=production`
- [ ] Configure MongoDB Atlas IP whitelist (do 0.0.0.0)
- [ ] Update CORS settings if needed ( * allowed)

---

## 👨‍💻 Author

**Krish Prajapati**  
---

**Made with ❤️ and Node.js**
