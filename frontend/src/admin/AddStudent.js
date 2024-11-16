import React, { useState } from "react";
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
import BackendURLS from './../config';

export default function AddStudent() {
  const [student, setStudent] = useState({
    sname: "",
    semail: "",
    sdepartment: "",
    gender: "",
    scontact: "",
    dob: "",
    age: "",
  });

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value: originalValue } = e.target;
    let value = originalValue;

    if (name === "sname") {
      // Convert the name to uppercase
      value = originalValue.toUpperCase();
    } else if (name === "dob") {
      const age = calculateAge(value);
      setStudent({ ...student, dob: value, age: age >= 17 ? age : "" });
      return;
    }
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (student.age < 17) {
      toast.error("Minimum age should be 17.");
      return;
    }
    try {
      const response = await axios.post(`${BackendURLS.Admin}/addstudent`,student);
      if(response.status === 200){
        toast.success(response.data);
      }
    } catch (error) {
        if (error.response?.data && error.response.data.includes("Duplicate entry")) {
          toast.error("Duplicate entry found: The contact or email already exists.");
        } else {
          toast.error("An error occurred while adding the student.");
        }
    }

  };

  return (
    <div>
      <div className="p-4 bg-gray-200 shadow-lg rounded-md" id="wrapper">
        <h2 className="text-2xl text-center font-bold mb-4">Add Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
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
                <MenuItem value="Male">MALE</MenuItem>
                <MenuItem value="Female">FEMALE</MenuItem>
                <MenuItem value="Others">OTHERS</MenuItem>
              </Select>
            </FormControl>
            <InputLabel id="age-label">Age</InputLabel>
            <TextField
              name="age"
              value={student.age}
              variant="outlined"
              type="number"
              fullWidth
              disabled // The age will be auto-calculated
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
                disabled={!student.sname||!student.dob||!student.sdepartment||!student.gender||!student.semail||!student.scontact}
              >
                Add Student
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
