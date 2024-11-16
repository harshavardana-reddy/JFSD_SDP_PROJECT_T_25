import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import BackendURLS from "../config";
export default function AddCourse() {
  const [course, setCourse] = useState({
    courseCode: "",
    courseName: "",
    courseDepartment: "",
    courseSemester: "",
    academicyear: "",
    courseInstructorID: "",
  });

  const [facultyData, setFacultyData] = useState([]);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get(`${BackendURLS.Admin}/viewfaculties`);
      setFacultyData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleChange = (e) => {
    //console.log(e.target.value)
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(course)
    try {
      console.log(course)
      const response = await axios.post(`${BackendURLS.Admin}/addcourse`,course);
      if(response.status === 200){
        toast.success(response.data);
      }
    } catch (error) {
      toast.error(error.response.data)
      console.log(error.response.data)
      
    }
  }

  return (
    <div>
      <div className="p-4 bg-gray-200 shadow-lg rounded-md" id="wrapper">
        <h2 className="text-2xl text-center font-bold mb-4">Add Faculty</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputLabel id="name-label">Course Name</InputLabel>
            <TextField
              label="Course Name"
              name="courseName"
              value={course.courseName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />

            <InputLabel id="name-label">Course Code</InputLabel>
            <TextField
              label="Course Code"
              name="courseCode"
              value={course.courseCode}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />

            <InputLabel id="department-label">Course Department</InputLabel>
            <FormControl fullWidth required>
              <Select
                labelId="department-label"
                name="courseDepartment"
                value={course.courseDepartment}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem value="">
                  <em>Select Department</em>
                </MenuItem>
                <MenuItem value="CSE">CSE</MenuItem>
                <MenuItem value="EEE">EEE</MenuItem>
                <MenuItem value="ECE">ECE</MenuItem>
                <MenuItem value="BT">BT</MenuItem>
                <MenuItem value="MECH">MECH</MenuItem>
              </Select>
            </FormControl>

            <InputLabel id="Semester-label">Course Semester</InputLabel>
            <FormControl fullWidth required>
              <Select
                labelId="Semester-label"
                name="courseSemester"
                value={course.courseSemester}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem value="">
                  <em>Select Semester</em>
                </MenuItem>
                <MenuItem value="ODD-SEM">ODD SEM</MenuItem>
                <MenuItem value="EVEN-SEM">EVEN SEM</MenuItem>
                <MenuItem value="SUMMER-TERM">SUMMER TERM</MenuItem>
              </Select>
            </FormControl>


            <InputLabel id="academicyear-label">Academic Year</InputLabel>
            <FormControl fullWidth required>
              <Select
                labelId="academicyear-label"
                name="academicyear"
                value={course.academicyear}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem value="">
                  <em>Select Academic Year</em>
                </MenuItem>
                <MenuItem value="2025-2026">2025-2026</MenuItem>
                <MenuItem value="2024-2025">2024-2025</MenuItem>
              </Select>
            </FormControl>

            <InputLabel id="instructorid-label">Instructor ID</InputLabel>
            <FormControl fullWidth required>
              <Select
                labelId="instructorid-label"
                name="courseInstructorID"
                value={course.courseInstructorID}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem value="">
                  <em>Select Course Instructor ID</em>
                </MenuItem>
                {facultyData.map((faculty,index) => (
                  <MenuItem key={index}  value={faculty.fid}>
                    {faculty.fid} - {faculty.fname}
                  </MenuItem>
                ))}
                
              </Select>
            </FormControl>
            <div align="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                // disabled={}
              >
                ADD COURSE
              </Button>
              &nbsp;&nbsp;
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
