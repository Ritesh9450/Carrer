# CareerConnect — Job & Internship Portal

A full-stack MERN final-year project starter with student, recruiter, and admin roles.

## Features
- JWT authentication with bcrypt password hashing
- Role-based access control (student / recruiter / admin)
- Student profile and resume upload
- Recruiter company profile and job/internship CRUD
- Search and filter opportunities
- Student applications and application status tracking
- Recruiter applicant review and status updates
- Admin overview and user/listing management
- Responsive React UI

## Requirements
- Node.js 18+
- MongoDB local instance or MongoDB Atlas

## Setup

### 1. Backend
```bash
cd server
cp .env.example .env
npm install
npm run dev
```
Edit `server/.env` and set `MONGO_URI` and `JWT_SECRET`.

### 2. Frontend
In another terminal:
```bash
cd client
npm install
npm run dev
```
Open the Vite URL (normally http://localhost:5173).

### 3. Create an admin
Register a normal account, then in MongoDB update that user's `role` to `admin`, or use the seed script:
```bash
cd server
npm run seed:admin
```
Set `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in `.env` before running it.

## Default API
Backend runs on `http://localhost:5000/api`.

| Method | Endpoint | Access |
|---|---|---|
| POST | /auth/register | Public |
| POST | /auth/login | Public |
| GET | /auth/me | Logged in |
| GET | /jobs | Public |
| GET | /jobs/:id | Public |
| POST | /jobs | Recruiter |
| PUT | /jobs/:id | Owner recruiter |
| DELETE | /jobs/:id | Owner recruiter / admin |
| POST | /jobs/:id/apply | Student |
| GET | /applications/my | Student |
| GET | /applications/received | Recruiter |
| PATCH | /applications/:id/status | Recruiter |
| GET | /admin/overview | Admin |
| GET | /admin/users | Admin |
| PATCH | /admin/users/:id/role | Admin |

## Project structure
```text
CareerConnect/
  client/   React + Vite frontend
  server/   Express API + Mongoose models
```

## Notes
- This is a runnable academic project foundation, not a production-hardened recruitment system.
- Configure HTTPS, email verification, rate limiting, secure cookie/token strategy, file scanning, backups, and privacy controls before real-world deployment.
- Resume uploads are stored locally in `server/uploads` by default. For production, use object storage.
