import { Button, InputLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackendURLS from "../config";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockqoute"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: -1 }, { indent: +1 }],
    ["link", "video", "image"],
  ],
};

export default function UploadAssignment() {
  const { cid } = useParams();
  const [assignment, setAssignment] = useState({
    assignmentName: "",
    assignmentQuestion: "",
    assignmentQuestionPDF: null, // Store file blob here
    courseId: cid,
    marks: "",
    startdate: "",
    deadlinedate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAssignment((prev) => ({
        ...prev,
        assignmentQuestionPDF: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("assignmentName", assignment.assignmentName);
    formData.append("assignmentQuestion", assignment.assignmentQuestion);
    formData.append("assignmentQuestionPDF", assignment.assignmentQuestionPDF); // Blob
    formData.append("courseId", assignment.courseId);
    formData.append("marks", assignment.marks);
    formData.append("startdate", assignment.startdate);
    formData.append("deadlinedate", assignment.deadlinedate);

    try {
      const response = await axios.post(`${BackendURLS.Admin}/uploadassignment`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    console.log(assignment);
    console.log(response.data)
      alert("Assignment uploaded successfully!");
    } catch (error) {
      console.error("Error uploading assignment:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-3 mb-2">Upload Assignment for Course {cid}</h1>
      <div className="p-4 bg-gray-200 shadow-lg rounded-md" id="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputLabel>Assignment Name</InputLabel>
            <TextField
              name="assignmentName"
              label="Assignment Name"
              variant="outlined"
              required
              fullWidth
              onChange={handleInputChange}
            />

            <InputLabel>Assignment Question</InputLabel>
            <ReactQuill
              theme="snow"
              value={assignment.assignmentQuestion}
              onChange={(value) =>
                setAssignment((prev) => ({ ...prev, assignmentQuestion: value }))
              }
              modules={modules}
            />

            <InputLabel>Assignment Question PDF
            <p style={{color:'red'}} >Note : Upload Only in PDF Format.</p>
            </InputLabel>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
            />

            <InputLabel>COURSE ID</InputLabel>
            <TextField
              value={cid}
              variant="outlined"
              required
              fullWidth
              disabled
            />

            <InputLabel>Assignment Max Marks</InputLabel>
            <TextField
              name="marks"
              type="number"
              variant="outlined"
              required
              fullWidth
              onChange={handleInputChange}
            />

            <InputLabel>Start Date And Time</InputLabel>
            <TextField
              name="startdate"
              type="datetime-local"
              variant="outlined"
              required
              fullWidth
              onChange={handleInputChange}
            />

            <InputLabel>End Date And Time</InputLabel>
            <TextField
              name="deadlinedate"
              type="datetime-local"
              variant="outlined"
              required
              fullWidth
              onChange={handleInputChange}
            />

            <div align="center">
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={
                  !assignment.assignmentName ||
                  !assignment.assignmentQuestion ||
                  !assignment.marks ||
                  !assignment.startdate ||
                  !assignment.deadlinedate
                }
              >
                Upload
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
