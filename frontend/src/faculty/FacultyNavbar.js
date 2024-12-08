import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import logo from "./images/logo.jpeg";
import PageNotFound from "./PageNotFound";
import FacultyHome from "./FacultyHome";
import FacultyMappedCourse from "./FacultyMappedCourse";
import UploadAssignments from "./UploadAssignments";
import FacultyProfile from "./FacultyProfile";
import FacultyInstructorCourses from "./FacultyInstructorCourses";
import CourseAssignments from "./CourseAssignments";
import AssignmentSubmissions from "./AssignmentSubmissions";
import ReviewAssignmentSubmissions from "./ReviewAssignmentSubmissions";
import ViewPDF from "./ViewPDF";
import FacultyCourseAssignments from "./FacultyCourseAssignments";
import FacultySubmissions from "./FacultySubmissions";
import FacultyReviewAssignment from "./FacultyReviewAssignment";
import CourseRegisteredStudents from './CourseRegisteredStudents';

export default function FacultyNavbar() {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [profile, setprofile] = useState("");
  const [faculty,setFaculty] = useState({});
  const navigate = useNavigate();
  const toggleProfileOpen = () => setProfileOpen(!isProfileOpen);

  const handleLogOut = () => {
    sessionStorage.removeItem("faculty");
    sessionStorage.removeItem("isFacultyLoggedIn");
    navigate("/facultylogin");
    window.location.reload();
  };

  const fetch = ()=>{
    const object = JSON.parse(sessionStorage.getItem("faculty")) || {};
  setFaculty(object);
  if (object.fprofile) {
    setprofile(`data:image/jpeg;base64,${object.fprofile}`);
}

  }

  useEffect(()=>{
    fetch();
  },[])




  return (
    <div className="admin-layout">
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => toggleProfileOpen()}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Link to="/faculty/facultyhome" className="flex ms-2 md:me-24">
              <img
                src={logo}
                className="h-9 w-9 rounded-full border border-gray-300"
                alt="Logo"
              />
              &nbsp;
              <span className="self-center text-xl sm:text-2xl font-bold tracking-wider uppercase text-gray-900 dark:text-white hover:text-blue-500 transition-all duration-200 ease-in-out">
                SHV Institutions
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              title="Click to get Side Bar"
              className="flex items-center text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 space-x-2"
              aria-expanded="false"
              onClick={toggleProfileOpen}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={profile}
                alt="Profile"
              />
              <div className="flex flex-col items-start">
                <span className="text-gray-900 dark:text-white font-semibold">
                  {faculty.fname}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  FACULTY
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
        isProfileOpen ? "translate-x-0" : "-translate-x-full"
      } bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/faculty/facultyhome"
              className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <i className="fas fa-link"></i>
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="faculty/myprofile"
              className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <i className="fas fa-link"></i>
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                My Profile
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="faculty/mycourses"
              className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <i className="fas fa-link"></i>
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                My Courses
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/faculty/myinstructorcourses"
              className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <i className="fas fa-file-alt"></i>
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                My Instructor Courses
              </span>
            </Link>
          </li>
          {/* <li>
            <Link
              className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              to="/faculty/mypendingassignments"
            >
              <i className="fa fa-sign-out"></i>
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                View Students
              </span>
            </Link>
          </li> */}
          <li>
            <Link
              className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              onClick={() => handleLogOut()}
            >
              <i className="fa fa-sign-out"></i>
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                LogOut
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>

    <div
      className={`admin-content p-4 mt-20 transition-all duration-300 ${
        isProfileOpen ? "ml-64" : "ml-0"
      }`}
    >
      <Routes>
        <Route path="/faculty/facultyhome" element={<FacultyHome/>} />
        <Route path="/faculty/mycourses" element={<FacultyMappedCourse/>} />
        <Route path="/faculty/myinstructorcourses" element={<FacultyInstructorCourses/>} />
        <Route path="/faculty/uploadassignment/:cid" element={<UploadAssignments/>}/>
        <Route path="/faculty/courseassignments/:cid" element={<CourseAssignments/>} />
        <Route path="/faculty/facultycourseassignments/:cid" element={<FacultyCourseAssignments/>}   />
        <Route path="/faculty/facultyassignmentsubmissions/:aid" element={<FacultySubmissions/>} />
        <Route path="/faculty/myprofile" element={<FacultyProfile/>} />
        <Route path="/faculty/viewsubmissions/:aid" element={<AssignmentSubmissions/>} />
        <Route path="/faculty/reviewassignment/:subid" element={<ReviewAssignmentSubmissions/>} />
        <Route path="/faculty/facultyreviewassignment/:subid" element={<FacultyReviewAssignment/>}/>
        <Route path="/faculty/view-assignment-pdf" element={<ViewPDF/>} />
        <Route path="/faculty/view-submission-pdf" element={<ViewPDF/>} />
        <Route path="/faculty/coureseregisteredstudents/:cid" element={<CourseRegisteredStudents/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>

    </div>
  </div>
  )
}
