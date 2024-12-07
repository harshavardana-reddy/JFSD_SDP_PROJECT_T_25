import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import BackendURLS from "./../config";
import { useParams } from "react-router-dom";

export default function EditStudent() {
  const { sid } = useParams();

  const [student, setStudent] = useState({
    sid: "",
    sname: "",
    semail: "",
    sdepartment: "",
    gender: "",
    scontact: "",
    dob: "",
    age: "",
  });

  const [originalStudent, setOriginalStudent] = useState(null);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(
        `${BackendURLS.Admin}/fetchstudent/${sid}`
      );
      setStudent(response.data);
      setOriginalStudent(response.data); // Store the original data for comparison
    } catch (error) {
      console.error(error);
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value: originalValue } = e.target;
    let value = originalValue;

    if (name === "sname") {
      value = originalValue.toUpperCase();
    } else if (name === "dob") {
      const age = calculateAge(value);
      setStudent({ ...student, dob: value, age: age >= 17 ? age : "" });
      return;
    }
    setStudent({ ...student, [name]: value });
  };

  const hasChanges = () => {
    return JSON.stringify(originalStudent) !== JSON.stringify(student);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (student.age < 17) {
      toast.error("Minimum age should be 17.");
      return;
    }

    if (!hasChanges()) {
      toast.warning("No changes detected to update.");
      return;
    }

    const toastId = toast.loading("Processing your request...");
    // console.log(student)
    try {
      const response = await axios.put(
        `${BackendURLS.Admin}/updatestudent`,
        student
      );
      if (response.status === 200) {
        toast.update(toastId, {
          render: response.data,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setOriginalStudent(student); // Update originalStudent to the new state
      }
    } catch (error) {
      toast.update(toastId, {
        render: error.response?.data.includes("Duplicate entry")
          ? "Duplicate entry found: The contact or email already exists."
          : "An error occurred while updating the student.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [sid]);

  return (
    <div>
      <div className="p-4 bg-gray-200 shadow-lg rounded-md" id="wrapper">
        <h2 className="text-2xl text-center font-bold mb-4">Edit Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputLabel id="id-label">Student ID</InputLabel>
            <TextField
              label="Student ID"
              name="sid"
              value={student.sid}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              disabled
            />
            <InputLabel id="name-label">Student Name</InputLabel>
            <TextField
              label="Student Name"
              name="sname"
              value={student.sname}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <InputLabel id="dob-label">Date of Birth (dd/mm/yyyy)</InputLabel>
            <TextField
              name="dob"
              id="dob"
              type="date"
              value={student.dob}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <InputLabel id="gender-label">Student Gender</InputLabel>
            <FormControl fullWidth required>
              <Select
                labelId="gender-label"
                name="gender"
                value={student.gender}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem value="MALE">MALE</MenuItem>
                <MenuItem value="FEMALE">FEMALE</MenuItem>
                <MenuItem value="OTHERS">OTHERS</MenuItem>
              </Select>
            </FormControl>
            <InputLabel id="age-label">Age</InputLabel>
            <TextField
              name="age"
              value={student.age}
              variant="outlined"
              type="number"
              fullWidth
              disabled
            />
            <InputLabel id="email-label">Student Email</InputLabel>
            <TextField
              label="Email ID"
              name="semail"
              value={student.semail}
              onChange={handleChange}
              variant="outlined"
              type="email"
              fullWidth
              required
            />
            <InputLabel id="contact-label">Student Contact</InputLabel>
            <TextField
              label="Contact"
              name="scontact"
              value={student.scontact}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              inputProps={{
                pattern: "[6789][0-9]{9}",
                title: "Please enter a valid 10-digit mobile number",
              }}
            />
            <InputLabel id="department-label">Department</InputLabel>
            <FormControl fullWidth required>
              <Select
                labelId="department-label"
                name="sdepartment"
                value={student.sdepartment}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem value="">
                  <em>Select Department</em>
                </MenuItem>
                <MenuItem value="CSE(Honors)">CSE(Honors)</MenuItem>
                <MenuItem value="CSE(Regulars)">CSE(Regulars)</MenuItem>
                <MenuItem value="ECE">ECE</MenuItem>
                <MenuItem value="BT">BT</MenuItem>
                <MenuItem value="MECH">MECH</MenuItem>
              </Select>
            </FormControl>
            <div align="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={
                  !student.sname ||
                  !student.dob ||
                  !student.sdepartment ||
                  !student.gender ||
                  !student.semail ||
                  !student.scontact
                }
              >
                Update Student
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
