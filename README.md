# Online Assignment and Grading System

The Online Assignment Submission and Grading System is an internet-based platform designed to streamline communication between learners and teachers in the educational environment. By leveraging this system, learners can electronically submit assignments, while teachers can easily review, grade, and provide feedback. This system reduces manual tasks and paperwork, automates grade calculations, and enhances productivity within educational institutions.

## Key Features:

### 1. **Assignment Submission:**
   - Learners can submit assignments in various formats (e.g., PDFs, Word documents).
   - Supports automatic file validation and format checking before submission.

### 2. **Assignment Grading:**
   - Teachers can view, evaluate, and grade assignments electronically.
   - Teachers can leave detailed comments and feedback on student submissions.
   - Grades are automatically calculated based on pre-defined grading rubrics.

### 3. **Role-based Access Control (RBAC):**
   - Secure and restricted access based on user roles (students and teachers).
   - Different interfaces and features are accessible to students and teachers based on their role.
   
### 4. **Secure Login and Data Privacy:**
   - **Role-based access control (RBAC)** ensures only authorized users can access sensitive data.
   - **Secure login mechanisms** with encrypted passwords.
   - Password recovery options for users who forget their credentials.
   - Data privacy measures ensure all personal and academic data is kept secure.

### 5. **JWT Authentication and Authorization:**
   - JSON Web Tokens (JWT) are used for secure and stateless authentication.
   - When a user logs in, the backend generates a JWT token that contains user information and role.
   - This token is then used for authorization on subsequent requests, ensuring that only authenticated users can access protected resources.
   - JWT ensures that users can remain logged in for a certain period, providing convenience and security.

### 6. **Notification System:**
   - Students receive notifications upon submission deadlines, grading updates, and feedback.
   - Teachers receive alerts for new assignments and students' queries.

### 7. **Automated Grading & Reporting:**
   - The system automates grade calculations based on predefined rubrics.
   - Teachers can generate reports based on class performance and individual student progress.

### 8. **Analytics Dashboard:**
   - The system provides both teachers and students with an analytics dashboard.
   - Teachers can track assignment completion rates, average grades, and student performance over time.
   - Students can monitor their progress and compare their performance on different assignments.

## Technology Stack:
- **Frontend:**
  - Developed using **React.js** for building interactive and dynamic user interfaces.
  - Utilizes state management techniques for seamless data flow across components.
  
- **Backend:**
  - Developed using **Spring Boot (Version 3.3.4)** for building RESTful APIs and handling backend logic.
  - Uses **Spring Security** and **JWT** for implementing secure authentication and authorization mechanisms.
  - Leverages **JPA/Hibernate** for database interaction and data persistence.
  
- **Database:**
  - Uses **MySQL** as the relational database to store user data, assignments, grades, and other system-related information.
  
- **Deployment:**
  - The system can be deployed on cloud platforms like AWS, Heroku, or on-premise servers.
  - Continuous integration and deployment (CI/CD) pipelines to automate testing and deployment.

## System Workflow:

### 1. **Student Interaction:**
   - Login with credentials.
   - Submit assignments before deadlines.
   - View grades and feedback after evaluation.

### 2. **Teacher Interaction:**
   - Login with credentials.
   - View submitted assignments.
   - Grade assignments and provide feedback.
   - Generate reports on class and student performance.

## Benefits of the System:
- Reduces administrative burden by automating the assignment submission and grading process.
- Improves communication between students and teachers.
- Provides real-time feedback and performance tracking for both students and teachers.
- Enhances data security and privacy with secure login mechanisms, JWT authentication, and RBAC.



