import React,{useState,useEffect} from 'react';
import BackendURLS from "../config";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Button, Pagination, Input } from "@nextui-org/react";
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function FacultyMappedCourse() {
  const [courseData, setCourseData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New search state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [ facultyData,setFacultyData] = useState({})
  const navigate = useNavigate()

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const fetchCourses = async () => {
    const faculty = JSON.parse(sessionStorage.getItem("faculty"));
    setFacultyData(faculty)
    try {
      const response = await axios.get(
        `${BackendURLS.Faculty}/mycourses?id=${faculty.fid}`
      );
      setCourseData(response.data);
      // console.log("data fetched")
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [facultyData.fid]);

  const filteredCourses = courseData.filter((course) => {
    return (
      course.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseDepartment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseSemester.toLowerCase().includes(searchQuery) ||
      course.academicyear.toLowerCase().includes(searchQuery) ||
      course.courseInstructorID.toString().includes(searchQuery) ||
      course.courseInstructorName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Calculate current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-3">
        Courses Mapped To Faculty ID : {facultyData.fid}
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
            <TableColumn>COURSE ID</TableColumn>
            <TableColumn>COURSE CODE</TableColumn>
            <TableColumn>COURSE NAME</TableColumn>
            <TableColumn>COURSE SEMESTER</TableColumn>
            <TableColumn>COURSE DEPARTMENT</TableColumn>
            <TableColumn>ACADEMIC YEAR</TableColumn>
            <TableColumn>INSTRUCTOR ID</TableColumn>
            <TableColumn>INSTRUCTOR NAME</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No Courses Are Mapped to This Faculty."}>
            {currentCourses.map((course, index) => (
              <TableRow key={index}>
                <TableCell>{course.cid}</TableCell>
                <TableCell>{course.courseCode}</TableCell>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.courseSemester}</TableCell>
                <TableCell>{course.courseDepartment}</TableCell>
                <TableCell>{course.academicyear}</TableCell>
                <TableCell>{course.courseInstructorID}</TableCell>
                <TableCell>{course.courseInstructorName}</TableCell>
                <TableCell>
                  <Button color='success' variant='shadow' onClick={()=>navigate(`/faculty/facultycourseassignments/${course.cid}`)} >View Assignments</Button>
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

        <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }} className="mt-3">
          <Button color="secondary" variant="shadow" onClick={()=>window.history.back()}>
            Go back
          </Button>
        </div>
      </div>
    </div>
  )
}
