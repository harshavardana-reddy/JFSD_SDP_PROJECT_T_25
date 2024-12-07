import React from 'react';
import ArchitectureIMG from './images/FINAL ARCHITECTURE.png';

export default function About() {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="flex justify-center py-8">
        <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
          <h1 className="text-4xl font-semibold text-blue-600 text-center mb-8">
            <u>Online Assignment and Grading System</u>
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            The Online Assignment Submission and Grading System is designed as an Internet medium in order to save time
            when communicating with learners and teachers in the learning environment. Such an approach enables learners
            to present the assignments electronically while the educators are able to view, evaluate, and mark them along
            with comments with ease. The system's objective is that fewer manual processes will help more people to
            improve, and cut down on the volumes of paperwork as well as automation of the grades which aids in enhancing
            productivity and improving schooling.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            <u>System Architecture</u>
          </h2>
          <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 mb-12 border-4 border-black">
            <img
              src={ArchitectureIMG}
              alt="System Architecture"
              className="w-full object-cover h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 hover:opacity-30 transition-opacity"></div>
          </div>

          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            <u>Key Features to be Implemented</u>
          </h2>
          <ul className="space-y-6 mb-12">
            <li className="transition-transform transform hover:translate-x-3 hover:shadow-md p-4 bg-gray-100 border-l-4 border-blue-500">
              <strong className="text-xl text-blue-600"><u>Email Notifications:</u></strong>
              <ul className="pl-6 text-gray-700 mt-2">
                <li><strong>Deadline Alerts:</strong> Automatic email reminders to students when assignment deadlines are approaching.</li>
                <li><strong>Submission Confirmation:</strong> Email notification for successful submissions.</li>
                <li><strong>Feedback Notification:</strong> Notify students when grades and feedback are published.</li>
              </ul>
            </li>
            <li className="transition-transform transform hover:translate-x-3 hover:shadow-md p-4 bg-gray-100 border-l-4 border-blue-500">
              <strong className="text-xl text-blue-600"><u>Dashboard and Reports:</u></strong>
              <ul className="pl-6 text-gray-700 mt-2">
                <li><strong>Student Dashboard:</strong> View assignments, deadlines, grades, and feedback.</li>
                <li><strong>Admin Dashboard:</strong> Monitor submission statuses, pending reviews, and overall progress.</li>
                <li><strong>Performance Reports:</strong> Generate detailed reports based on student performance for specific assignments, overall progress, and grade distribution. Ability to export reports in CSV/PDF format for academic review.</li>
              </ul>
            </li>
            <li className="transition-transform transform hover:translate-x-3 hover:shadow-md p-4 bg-gray-100 border-l-4 border-blue-500">
              <strong className="text-xl text-blue-600"><u>Secure Login and Data Privacy:</u></strong>
              <ul className="pl-6 text-gray-700 mt-2">
                <li><strong>Role-based access control (RBAC)</strong> for students and teachers.</li>
                <li><strong>Secure login mechanisms</strong> with password recovery options.</li>
              </ul>
            </li>
          </ul>

          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            <u>Team Members</u>
          </h2>
          <ul className="space-y-4 mb-8">
            <li className="transition-all transform hover:translate-x-2 hover:text-blue-500">
              <a href="https://www.linkedin.com/in/pathiputtoor-harshavardana-reddy-2800bb285/" target="_blank" rel="noopener noreferrer">
                P.Harshavardana Reddy
              </a>
            </li>
            <li className="transition-all transform hover:translate-x-2 hover:text-blue-500">
              <a href="https://www.linkedin.com/in/sanjay-kamisetty-137aa7284/" target="_blank" rel="noopener noreferrer">
                K.Sanjay
              </a>
            </li>
            <li className="transition-all transform hover:translate-x-2 hover:text-blue-500">
              <a href="https://www.linkedin.com/in/shanmukh-vasupalli/" target="_blank" rel="noopener noreferrer">
                V.Shanmukh
              </a>
            </li>
          </ul>

          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Conclusion:
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The Online Assignment Submission and Grading System successfully simplifies everything associated with
            academics and digitizes them for better and effective management of assignments between students and teachers.
            Some of the good features of this system are automated email notifications, feedback tracking, and performance
            reports that make the grading process very smooth.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            A note of thanks to Mr. Jonnalagadda Surya Kiran Sir, who supported and guided us throughout the development
            phase of this project, which actually helped in the improvement of both technical as well as subject-related
            skills.
          </p>
        </div>
      </div>
    </div>
  );
}
