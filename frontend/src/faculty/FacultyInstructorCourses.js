import {
  Button,
  Input,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackendURLS from "../config";

export default function FacultyInstructorCourses() {
  const [courseData, setCourseData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New search state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [facultyData, setFacultyData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchCourses = async () => {
    const faculty = JSON.parse(sessionStorage.getItem("faculty"));
    setFacultyData(faculty);
    try {
      const response = await axios.get(
        `${BackendURLS.Faculty}/myinstructorcourses?id=${faculty.fid}`
      );
      const coursesWithCounts = await Promise.all(
        response.data.map(async (course) => {
          let count = await fetchCourseCount(course.cid);
          return { ...course, count: count };
        })
      );
      setCourseData(coursesWithCounts);
      setIsLoading(false);
      // console.log("data fetched")
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [facultyData.fid]);

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

  const filteredCourses = courseData.filter((course) => {
    return (
      course.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseDepartment
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      course.courseSemester.toLowerCase().includes(searchQuery) ||
      course.academicyear.toLowerCase().includes(searchQuery) ||
      course.courseInstructorID.toString().includes(searchQuery) ||
      course.courseInstructorName
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  // Calculate current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const spinnerContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  if (isLoading) {
    return (
      <div style={spinnerContainerStyle}>
        <Spinner label="Loading..." color="warning" size="xl" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-3">
        My Instructor Courses : {facultyData.fid}
      </h1>

      <div className="justify-center flex mt-3">
        <Input
          placeholder="Search...."
          className="p-2 mb-4 rounded border-gray-300 focus:outline-none focus:border-indigo-500 w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="table-container mt-4">
        <Table aria-label="Courses Mapped To Student">
          <TableHeader>
            <TableColumn style={{ textAlign: "center" }}>COURSE ID</TableColumn>
            <TableColumn style={{ textAlign: "center" }}>
              COURSE CODE
            </TableColumn>
            <TableColumn style={{ textAlign: "center" }}>
              COURSE NAME
            </TableColumn>
            <TableColumn style={{ textAlign: "center" }}>
              COURSE SEMESTER
            </TableColumn>
            <TableColumn style={{ textAlign: "center" }}>
              COURSE DEPARTMENT
            </TableColumn>
            <TableColumn style={{ textAlign: "center" }}>
              REGISTERED COUNT
            </TableColumn>
            <TableColumn style={{ textAlign: "center" }}>
              ACADEMIC YEAR
            </TableColumn>
            <TableColumn style={{ textAlign: "center" }}>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No Courses found"}>
            {currentCourses.map((course, index) => (
              <TableRow key={index}>
                <TableCell style={{ textAlign: "center" }}>
                  {course.cid}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {course.courseCode}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {course.courseName}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {course.courseSemester}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {course.courseDepartment}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {course.count}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {course.academicyear}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      variant="shadow"
                      color="primary"
                      className="mb-2"
                      onClick={() =>
                        navigate(`/faculty/uploadassignment/${course.cid}`)
                      }
                    >
                      Upload Assignments
                    </Button>
                    <Button
                      variant="shadow"
                      color="primary"
                      onClick={() =>
                        navigate(`/faculty/courseassignments/${course.cid}`)
                      }
                    >
                      View Assignments
                    </Button>
                    <Button variant="shadow" color="primary" onClick={()=>navigate(`/faculty/coureseregisteredstudents/${course.cid}`)} >
                      Registered Students
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-3" align="center">
          <Pagination
            loop
            color="danger"
            showControls
            total={Math.ceil(filteredCourses.length / itemsPerPage)}
            initialPage={currentPage}
            onChange={paginate}
          />
        </div>

        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
          className="mt-3"
        >
          <Button
            color="secondary"
            variant="shadow"
            onClick={() => window.history.back()}
          >
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}
