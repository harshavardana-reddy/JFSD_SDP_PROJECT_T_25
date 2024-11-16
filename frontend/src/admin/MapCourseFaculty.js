import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import BackendURLS from "../config";

export default function MapCourseFaculty() {
  const [facultyData, setFacultyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [mapperModel, setMapperModel] = useState(false);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCourseID, setCourseID] = useState("");
  const [fid, setFid] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BackendURLS.Admin}/viewfaculties`);
        const activefaculty = response.data
          .filter((faculty) => faculty.fstatus === "ACTIVE")
          .map(({ fprofile, ...rest }) => rest);
        setFacultyData(activefaculty);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
        console.log(error.response.data);
      }
    };

    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${BackendURLS.Admin}/viewcourses`);
        setCourses(response.data);
      } catch (error) {
        console.error(error.message);
        console.log(error.response.data);
      }
    };

    fetchData();
    fetchCourseData();
  }, []);

  useEffect(() => {
    if (selectedSemester && selectedAcademicYear && selectedDepartment) {
      const filtered = courses.filter(
        (course) =>
          course.courseSemester === selectedSemester &&
          course.academicyear === selectedAcademicYear &&
          course.courseDepartment === selectedDepartment
      );
      setFilteredCourses(filtered);
    }
  }, [selectedSemester, selectedAcademicYear, courses, selectedDepartment]);

  const spinnerContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredfacultys = facultyData.filter((faculty) => {
    const facultyCid = faculty.fid ? faculty.fid.toString().toLowerCase() : "";
    const facultyName = faculty.fname ? faculty.fname.toLowerCase() : "";
    const facultyDepartment = faculty.fdepartment
      ? faculty.fdepartment.toLowerCase()
      : "";
    const query = searchQuery.toLowerCase();
    return (
      facultyCid.includes(query) ||
      facultyName.includes(query) ||
      facultyDepartment.includes(query)
    );
  });

  const currentfacultys = filteredfacultys.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const mapCourse = async () => {
    const data = {
      fid: fid,
      cid: selectedCourseID,
    };
    // console.log(data)
    try {
      const response = await axios.post(
        `${BackendURLS.Admin}/mapcoursetofaculty`,
        data
      );
      if (response.status === 200) {
        toast.success(response.data, { theme: "colored" });
        setMapperModel(false);
        setSelectedAcademicYear("");
        setSelectedDepartment("");
        setSelectedSemester("");
        setFilteredCourses([]);
      }
    } catch (error) {
      toast.error(error.response.data, { theme: "colored" });
      console.log(error.response.data);
    }
  };

  if (isLoading) {
    return (
      <div style={spinnerContainerStyle}>
        <Spinner label="Loading..." color="warning" size="lg" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-3">
        faculty Course Mapping
      </h1>
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
          <table className="table table-auto">
            <thead>
              <tr>
                <th align="center" className="text-black">
                  FACULTY ID
                </th>
                <th align="center" className="text-black">
                  FACULTY NAME
                </th>
                <th align="center" className="text-black">
                  FACULTY DEPARTMENT
                </th>
                <th align="center" className="text-black">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentfacultys.length > 0 ? (
                currentfacultys.map((faculty) => (
                  <tr key={faculty.fid}>
                    <td align="center">{faculty.fid}</td>
                    <td align="center">{faculty.fname}</td>
                    <td align="center">{faculty.fdepartment}</td>
                    <td align="center">
                      <Button
                        color="secondary"
                        variant="shadow"
                        className="transform transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl hover:translate-y-1 mb-2 mr-2"
                        onClick={() => {
                          setFid(faculty.fid);
                          setMapperModel(true);
                        }}
                      >
                        Map New Course
                      </Button>
                      <Button
                        color="secondary"
                        variant="shadow"
                        className="transform transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl hover:translate-y-1"
                        onClick={()=>navigate(`/admin/viewfacultycourse/${faculty.fid}`)}
                      >
                        View Mapped Course
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} align="center">
                    No faculty records found!
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
            total={Math.ceil(filteredfacultys.length / itemsPerPage)}
            initialPage={currentPage}
            onChange={paginate}
          />
        </div>
      </div>
      <Modal
        backdrop="blur"
        isOpen={mapperModel}
        onClose={() => setMapperModel(false)}
      >
        <ModalContent>
          <ModalHeader className="text-2xl font-semibold">
            Map Course
          </ModalHeader>
          <ModalBody className="space-y-4">
            <Select
              label="Select Semester"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              fullWidth
            >
              <SelectItem key="ODD-SEM" value="ODD-SEM">
                ODD-SEM
              </SelectItem>
              <SelectItem key="EVEN-SEM" value="EVEN-SEM">
                EVEN-SEM
              </SelectItem>
            </Select>

            <Select
              label="Select Academic Year"
              value={selectedAcademicYear}
              onChange={(e) => setSelectedAcademicYear(e.target.value)}
              fullWidth
            >
              <SelectItem key="2023-2024" value="2023-2024">
                2023-2024
              </SelectItem>
              <SelectItem key="2024-2025" value="2024-2025">
                2024-2025
              </SelectItem>
            </Select>

            <Select
              label="Select Department"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              fullWidth
            >
              <SelectItem key="CSE" value="CSE">
                CSE
              </SelectItem>
              <SelectItem key="ECE" value="ECE">
                ECE
              </SelectItem>
              <SelectItem key="EEE" value="EEE">
                EEE
              </SelectItem>
              <SelectItem key="MECH" value="MECH">
                MECH
              </SelectItem>
              <SelectItem key="BT" value="BT">
                BT
              </SelectItem>
            </Select>

            {filteredCourses.length > 0 ? (
              <Select
                label="Select Course"
                value={selectedCourseID}
                onChange={(e) => setCourseID(e.target.value)}
                fullWidth
              >
                {filteredCourses.map((course) => (
                  <SelectItem key={course.cid} value={course.cid}>
                    {course.courseName}
                  </SelectItem>
                ))}
              </Select>
            ) : (
              <p className="text-red-500">
                No courses found for the selected criteria.
              </p>
            )}
          </ModalBody>
          <ModalFooter style={{ justifyContent: "center" }}>
            <Button
              color="success"
              onClick={mapCourse}
              disabled={!selectedCourseID}
            >
              Map Course
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </div>
  );
}
