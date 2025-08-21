## Online Assignment and Grading System

![Architecture](frontend/src/components/images/FINAL%20ARCHITECTURE.png)

Modern web platform for managing assignment lifecycles end-to-end. Students submit work online; faculty review, grade, and provide feedback; admins manage users and course mappings. Built with React and Spring Boot, secured with JWT.

![Home](frontend/src/components/images/home_page.png)

### At a glance

- **Frontend**: React + Tailwind
- **Backend**: Spring Boot 3, Spring Security, JWT, JPA/Hibernate
- **Database**: MySQL
- **Auth**: Role-based (Admin, Faculty, Student)
- **Deploy ready**: Netlify (SPA redirect), Railway-ready backend

---

### Table of contents

- Overview
- Features
- Benefits
- Roles & permissions
- Architecture
- Tech stack
- Getting started (local)
- Configuration
- Deployment
- Project structure
- License

---

### Overview

This system streamlines assignment submission and grading for educational institutions. It reduces manual effort, enables faster feedback loops, and provides dashboards for progress tracking.

### Features

- Assignment submission with file validation (PDF and common document formats)
- Electronic grading with comments and feedback
- Automatic grade calculations using rubrics
- Role-based access (Admin, Faculty, Student)
- Secure login with JWT-based authentication/authorization
- Notification emails (e.g., deadlines, evaluations)
- Basic analytics for completion and performance tracking

### Benefits

- Time savings: automate assignment distribution, submission tracking, and grading workflows
- Faster feedback: real-time status, email alerts for deadlines, reviews, and revisions
- Consistency: rubric-based grading and standardized feedback comments
- Transparency: students see status, due dates, grades, and feedback in one place
- Compliance: centralized records for audits with immutable timestamps
- Scalability: handles many courses, users, and submissions across terms
- Security: JWT auth, role-based access, and least-privilege endpoints

### Roles & permissions

- **Admin**
  - User and course administration: add/edit faculty and students, create courses
  - Mapping: assign courses to faculty and enroll students in courses
  - Oversight: view system-level reports and submission activity
  - Key pages: `admin/AdminHome.js`, `admin/AddCourse.js`, `admin/MapCourseFaculty.js`, `admin/MapCourseStudent.js`
- **Faculty**
  - Authoring: create and manage course assignments
  - Evaluation: review submissions, grade with rubrics, publish feedback
  - Insights: view course rosters and basic analytics
  - Key pages: `faculty/FacultyHome.js`, `faculty/UploadAssignments.js`, `faculty/ReviewAssignmentSubmissions.js`
- **Student**
  - Participation: view assigned coursework and deadlines per course
  - Submission: upload files before deadlines, track status and history
  - Outcomes: view grades and feedback; resubmit if enabled before due date
  - Key pages: `student/StudentHome.js`, `student/ViewAssignments.js`, `student/SubmitAssignment.js`, `student/MySubmissions.js`

### Architecture

React SPA consumes REST APIs from a Spring Boot service. Authentication uses stateless JWT; persistence is backed by MySQL. Email notifications are sent via SMTP.

### Tech stack

- React 18, Tailwind CSS
- Spring Boot 3.x, Spring Security, JWT
- JPA/Hibernate, MySQL 8
- Netlify (frontend), Railway/Any JVM-friendly host (backend)

---

## Getting started (local)

### Prerequisites

- Node.js 18+
- Java 17+
- Maven 3.8+
- MySQL 8 (local) or a hosted MySQL instance

### 1) Run the backend (Spring Boot)

1. Create a MySQL database (example: `sdpproject25`).
2. Configure datasource and mail settings via environment variables or by editing `SDPBACKENDSPRINGBOOT/src/main/resources/application.properties`.
   - Recommended: set environment variables instead of hardcoding secrets.
     - `SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/sdpproject25`
     - `SPRING_DATASOURCE_USERNAME=<your_user>`
     - `SPRING_DATASOURCE_PASSWORD=<your_password>`
     - `SPRING_MAIL_USERNAME=<your_gmail>`
     - `SPRING_MAIL_PASSWORD=<your_app_password>`
3. From the `SDPBACKENDSPRINGBOOT` directory, start the app:
   - Linux/macOS: `./mvnw spring-boot:run`
   - Windows: `mvnw.cmd spring-boot:run`
4. Backend runs at `http://localhost:6969/`.

### 2) Run the frontend (React)

1. From the `frontend` directory:
   - Install deps: `npm install`
   - Start dev server: `npm start`
2. Frontend runs at `http://localhost:3000/`.

### Configure API base URLs

Update `frontend/src/config.js` for local development. Example:

```js
const BackendURLS = {
  Admin: "http://localhost:6969/admin",
  Student: "http://localhost:6969/student",
  Faculty: "http://localhost:6969/faculty",
};
export default BackendURLS;
```

---

## Configuration

Key files:

- Frontend API config: `frontend/src/config.js`
- Backend application properties: `SDPBACKENDSPRINGBOOT/src/main/resources/application.properties`
- Netlify SPA redirects: `frontend/netlify.toml`

Default backend port is `6969` (see `server.port` in properties).

Mail is sent via Gmail SMTP. Use an app password and enable TLS.

---

## Deployment

### Frontend (Netlify)

- Build: `npm run build` (within `frontend`)
- Deploy the `frontend/build` directory
- SPA redirect is already configured via `frontend/netlify.toml`

### Backend (Railway or similar)

- Provide environment variables for datasource and mail
- Expose port matching `server.port` or rely on platform port env; adjust as needed

---

## Project structure

```
JFSD_SDP_PROJECT_T_25/
├─ frontend/                # React app
│  ├─ src/
│  │  ├─ admin/ faculty/ student/ components/ ...
│  │  └─ config.js          # API base URLs
│  └─ netlify.toml          # SPA redirect
└─ SDPBACKENDSPRINGBOOT/    # Spring Boot service
   ├─ src/main/java/...     # Controllers, services, models, repos
   └─ src/main/resources/   # application.properties, templates
```

---

## License

This project is licensed under the terms of the LICENSE file in the repository.
