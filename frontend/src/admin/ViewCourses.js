import { Button, Pagination, Spinner } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackendURLS from "../config";

export default function ViewCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${BackendURLS.Admin}/viewcourses`);
      const coursesWithCounts = await Promise.all(
        response.data.map(async (course) => {
          let count = await fetchCourseCount(course.cid);
          return { ...course, count: count };
        })
      );
      setCourses(coursesWithCounts);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourseCount = async (cid) => {
    try {
      const response = await axios.get(
        `${BackendURLS.Admin}/registerdcount?id=${cid}`
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const spinnerContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter the courses first, then slice them for pagination
  const filteredCourses = courses.filter((course) => {
    const courseCid = course.cid ? course.cid.toString().toLowerCase() : "";
    const courseName = course.courseName ? course.courseName.toLowerCase() : "";
    const courseSemester = course.courseSemester
      ? course.courseSemester.toLowerCase()
      : "";
    const instructorId = course.courseInstructorID
      ? course.courseInstructorID.toLowerCase()
      : "";
    const instructorName = course.courseInstructorName
      ? course.courseInstructorName.toLowerCase()
      : "";
    const academicYear = course.academicyear
      ? course.academicyear.toLowerCase()
      : "";
    const department = course.courseDepartment
      ? course.courseDepartment.toLowerCase()
      : "";

    const query = searchQuery.toLowerCase();

    return (
      courseCid.includes(query) ||
      courseName.includes(query) ||
      courseSemester.includes(query) ||
      instructorId.includes(query) ||
      instructorName.includes(query) ||
      academicYear.includes(query) ||
      department.includes(query)
    );
  });

  const currentCourses = filteredCourses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div style={spinnerContainerStyle}>
        <Spinner label="Loading..." color="warning" size="lg" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-3">View Courses</h1>
      <div>
        <div className="m-5" align="center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 mb-4 rounded border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="overflow-x-auto rounded-2xl bg-white mt-4 mx-5">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th align="center" className="text-black">
                  COURSE ID
                </th>
                <th align="center" className="text-black">
                  COURSE CODE
                </th>
                <th align="center" className="text-black">
                  COURSE NAME
                </th>
                <th align="center" className="text-black">
                  COURSE DEPARTMENT
                </th>
                <th align="center" className="text-black">
                  COURSE SEMESTER
                </th>
                <th align="center" className="text-black">
                  INSTRUCTOR ID
                </th>
                <th align="center" className="text-black">
                  INSTRUCTOR NAME
                </th>
                <th align="center" className="text-black">
                  ACADEMIC YEAR
                </th>
                <th align="center" className="text-black">
                  COURSE REGISTERED COUNT
                </th>
                <th align="center" className="text-black">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCourses.length > 0 ? (
                currentCourses.map((course) => (
                  <tr key={course.cid}>
                    <td align="center">{course.cid}</td>
                    <td align="center">{course.courseCode}</td>
                    <td align="center">{course.courseName}</td>
                    <td align="center">{course.courseDepartment}</td>
                    <td align="center">{course.courseSemester}</td>
                    <td align="center">{course.courseInstructorID}</td>
                    <td align="center">{course.courseInstructorName}</td>
                    <td align="center">{course.academicyear}</td>
                    <td align="center">{course.count}</td>

                    <td align="center">
                      {/* <Button
                        variant="shadow"
                        color="warning"
                        onClick={() =>
                          navigate(`/admin/uploadassignment/${course.cid}`)
                        }
                        aria-label={`Upload assignment for course ${course.coursename}`}
                      >
                        Upload Assignment
                      </Button>
                      <br />
                      <br /> */}
                      <Button
                        variant="shadow"
                        color="warning"
                        onClick={() =>
                          navigate(`/admin/viewcourseassignments/${course.cid}`, {
                            state: { courseName: course.courseName },
                          })
                        }
                        aria-label={`View Assignments for course ${course.coursename}`}
                      >
                        View Assignments
                      </Button>
                      <br />
                      <br />
                      <Button
                        variant="shadow"
                        color="warning"
                        onClick={() =>
                          navigate(`/admin/registeredstudents/${course.cid}`, {
                            state: { courseName: course.courseName },
                          })
                        }
                        aria-label={`View registered students for course ${course.coursename}`}
                      >
                        View Registered Students
                      </Button>
                      
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} align="center">
                    No course records found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-3" align="center">
          <Pagination
            loop
            showControls
            color="success"
            total={Math.ceil(filteredCourses.length / itemsPerPage)}
            initialPage={currentPage}
            onChange={paginate}
          />
        </div>
      </div>
    </div>
  );
}
