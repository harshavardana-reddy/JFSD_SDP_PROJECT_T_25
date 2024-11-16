import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AddCourse from "./AddCourse";
import AddFaculty from "./AddFaculty";
import AddStudent from "./AddStudent";
import AdminHome from "./AdminHome";
import MapCourseFaculty from "./MapCourseFaculty";
import MapCourseStudent from "./MapCourseStudent";
import PageNotFound from "./PageNotFound";
import ReviewSubmissions from "./ReviewSubmissions";
import ViewCourses from "./ViewCourses";
import ViewFaculty from "./ViewFaculty";
import ViewFacultyCourse from "./ViewFacultyCourse";
import ViewFacultyProfile from "./ViewFacultyProfile";
import ViewStudentCourse from "./ViewStudentCourse";
import ViewStudentProfile from "./ViewStudentProfile";
import ViewStudents from "./ViewStudents";
import ViewSubmissions from "./ViewSubmissions";
import logo from "./images/logo.jpeg";
import ProfileIMG from "./images/noimage.jpg";
import UploadAssignment from "./UploadAssignment";
import ViewAssignments from "./ViewAssignments";
import ViewAssignmentByID from "./ViewAssignmentByID";


export default function AdminNavBar() {
  const [isStudentDropdownOpen, setStudentDropdownOpen] = useState(false);
  const [isFacultyDropdownOpen, setFacultyDropdownOpen] = useState(false);
  const [isCourseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleStudentDropdown = () =>
    setStudentDropdownOpen(!isStudentDropdownOpen);
  const toggleFacultyDropdown = () =>
    setFacultyDropdownOpen(!isFacultyDropdownOpen);
  const toggleCourseDropdown = () =>
    setCourseDropdownOpen(!isCourseDropdownOpen);
  const toggleProfileOpen = () => setProfileOpen(!isProfileOpen);


  const logOut = ()=>{
    sessionStorage.removeItem("admin");
    sessionStorage.removeItem("isAdminLoggedIn");
    navigate('/adminlogin');
    window.location.reload();
  }

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
              <Link to="/admin/adminhome" className="flex ms-2 md:me-24">
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
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex items-center text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 space-x-2"
                    aria-expanded="false"
                    onClick={toggleProfileOpen}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={ProfileIMG}
                      alt="Profile"
                    />
                    <span className="text-gray-900 dark:text-white font-semibold">
                      ADMINISTRATOR
                    </span>
                  </button>
                </div>
              </div>
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
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={toggleStudentDropdown}
              >
                <i className="fa fa-graduation-cap"></i>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Student
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isStudentDropdownOpen && (
                <ul className="py-2 space-y-2">
                  <li>
                    <Link
                      to="/admin/addstudent"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Add Student
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/viewstudents"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      View Students
                    </Link>
                  </li>
                  
                </ul>
              )}
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={toggleFacultyDropdown}
              >
                <i className="fas fa-chalkboard-teacher"></i>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Faculty
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isFacultyDropdownOpen && (
                <ul className="py-2 space-y-2">
                  <li>
                    <Link
                      to="/admin/addfaculty"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Add Faculty
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/viewfaculty"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      View Faculty
                    </Link>
                  </li>
                  
                  
                </ul>
              )}
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={toggleCourseDropdown}
              >
                <i className="fas fa-book"></i>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Course
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isCourseDropdownOpen && (
                <ul className="py-2 space-y-2">
                  <li>
                    <Link
                      to="/admin/addcourse"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Add Course
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/viewcourses"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      View Courses
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/admin/mapcoursefaculty"
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <i className="fas fa-link"></i>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Map Course Faculty
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/mapcoursestudent"
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <i className="fas fa-link"></i>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Map Course Student
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/viewallassignments"
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <i className="fas fa-file-alt"></i>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Assignments
                </span>
              </Link>
            </li>
            
            <li>
             
              <Link
                onClick={logOut}
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
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
          <Route path="/admin/adminhome" element={<AdminHome />} />
          <Route path="/admin/addcourse" element={<AddCourse />} />
          <Route path="/admin/addfaculty" element={<AddFaculty />} />
          <Route path="/admin/addstudent" element={<AddStudent />} />
          <Route
            path="/admin/mapcoursefaculty"
            element={<MapCourseFaculty />}
          />
          <Route
            path="/admin/mapcoursestudent"
            element={<MapCourseStudent />}
          />
          <Route path="/admin/viewcourses" element={<ViewCourses />} />
          <Route path="/admin/viewfaculty" element={<ViewFaculty />} />
          <Route
            path="/admin/viewfacultycourse/:fid"
            element={<ViewFacultyCourse />}
          />
          <Route
            path="/admin/viewfacultyprofile"
            element={<ViewFacultyProfile />}
          />
          <Route path="/admin/viewstudents" element={<ViewStudents />} />
          <Route
            path="/admin/viewstudentcourses/:sid"
            element={<ViewStudentCourse />}
          />
          <Route
            path="/admin/viewstudentprofile"
            element={<ViewStudentProfile />}
          />
          <Route
            path="/admin/reviewsubmissions"
            element={<ReviewSubmissions />}
          />
          <Route path="/admin/viewsubmissions" element={<ViewSubmissions />} />
          <Route path="/admin/uploadassignment/:cid" element={<UploadAssignment/> } />
          <Route path="/admin/viewallassignments" element={<ViewAssignments/> } />
          <Route path="/admin/viewassignment/:id" element={<ViewAssignmentByID/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}
