import React from 'react';

export default function About() {
  return (
    <div>
      <style>
        {
          `
      .about-container {
        max-width: 800px;
        margin: auto;
        padding: 20px;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        animation: fadeIn 1s ease-in;
    }

    .about-title {
        text-align: center;
        color: #4A90E2;
        margin-bottom: 20px;
        font-size: 2.5em;
    }

    .about-description {
        line-height: 1.6;
        font-size: 1.1em;
        margin-bottom: 20px;
    }

    .about-subtitle {
        color: #333;
        margin-top: 30px;
        margin-bottom: 10px;
        font-size: 1.8em;
    }

    .features-list,
    .team-list {
        list-style: none;
        padding: 0;
    }

    .features-list li,
    .team-list li {
        margin-bottom: 15px;
        padding: 10px;
        border-left: 4px solid #4A90E2;
        background: #f9f9f9;
        transition: transform 0.2s;
    }

    .features-list li:hover,
    .team-list li:hover {
        transform: translateX(5px);
    }

    .about-conclusion,
    .about-thanks {
        line-height: 1.6;
        margin-top: 20px;
    }

    .team-list a {
        text-decoration: none;
        color: #4A90E2;
    }

    .team-list a:hover {
        text-decoration: underline;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

          `
        }
      </style>
    <div className="about-container">
      <h1 className="about-title">
        <u>Online Assignment and Grading System</u>
      </h1>
      <p className="about-description">
        The Online Assignment Submission and Grading System is designed as an Internet medium in order to save time
        when communicating with learners and teachers in the learning environment. Such an approach enables learners
        to present the assignments electronically while the educators are able to view, evaluate, and mark them along
        with comments with ease. The system's objective is that fewer manual processes will help more people to
        improve, and cut down on the volumes of paperwork as well as automation of the grades which aids in enhancing
        productivity and improving schooling.
      </p>

      <h2 className="about-subtitle"><u>Key Features to be Implemented</u></h2>
      <ul className="features-list">
        <li>
          <strong><u>Email Notifications:</u></strong>
          <ul>
            <li><strong>Deadline Alerts:</strong> Automatic email reminders to students when assignment deadlines are approaching.</li>
            <li><strong>Submission Confirmation:</strong> Email notification for successful submissions.</li>
            <li><strong>Feedback Notification:</strong> Notify students when grades and feedback are published.</li>
          </ul>
        </li>
        <li>
          <strong><u>Dashboard and Reports:</u></strong>
          <ul>
            <li><strong>Student Dashboard:</strong> View assignments, deadlines, grades, and feedback.</li>
            <li><strong>Admin Dashboard:</strong> Monitor submission statuses, pending reviews, and overall progress.</li>
            <li>
              <strong>Performance Reports:</strong> Generate detailed reports based on student performance for specific
              assignments, overall progress, and grade distribution. Ability to export reports in CSV/PDF format for
              academic review.
            </li>
          </ul>
        </li>
        <li>
          <strong><u>Secure Login and Data Privacy:</u></strong>
          <ul>
            <li><strong>Role-based access control (RBAC)</strong> for students and teachers.</li>
            <li><strong>Secure login mechanisms</strong> with password recovery options.</li>
          </ul>
        </li>
      </ul>

      <h2 className="about-subtitle"><u>Team Members</u></h2>
      <ul className="team-list">
        <a href="https://www.linkedin.com/in/pathiputtoor-harshavardana-reddy-2800bb285/" target='_blank' rel="noopener noreferrer"><li>P.Harshavardana Reddy</li></a>
        <a href="https://www.linkedin.com/in/sanjay-kamisetty-137aa7284/" target='_blank' rel="noopener noreferrer"><li>K.Sanjay</li></a>
        <a href="https://www.linkedin.com/in/shanmukh-vasupalli/" target='_blank' rel="noopener noreferrer"><li>V.Shanmukh</li></a>
      </ul>

      <h2 className="about-subtitle">Conclusion:</h2>
      <p className="about-conclusion">
        The Online Assignment Submission and Grading System successfully simplifies everything associated with
        academics and digitizes them for better and effective management of assignments between students and teachers.
        Some of the good features of this system are automated email notifications, feedback tracking, and performance
        reports that make the grading process very smooth.
      </p>
      <br/>
      <p className="about-thanks">
        A note of thanks to Mr. Jonnalagadda Surya Kiran Sir, who supported and guided us throughout the development
        phase of this project, which actually helped in the improvement of both technical as well as subject-related
        skills.
      </p>
    </div>
    </div>

  );
}
