import { InputLabel } from "@mui/material";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import BackendURLS from "../config";

export default function SubmitAssignment() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState({});
  const [pdfData, setPdfData] = useState(null);
  const [modal, setModal] = useState(false);
  const [student, setStudent] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for submission status
  const navigate = useNavigate();
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);

  const base64ToBlob = (base64, mimeType) => {
    const byteChars = atob(base64);
    const byteNumbers = Array.from(byteChars).map((char) => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  const fetchStudent = () => {
    const object = JSON.parse(sessionStorage.getItem("student"));
    setStudent(object);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSubmittedData(file);
  };

  const fetchAssignment = async () => {
    try {
      const response = await axios.get(
        `${BackendURLS.Student}/viewassignment?id=${id}`
      );
      setAssignment(response.data);
      if (response.data.assignmentQuestionPDF) {
        const pdfBlob = base64ToBlob(
          response.data.assignmentQuestionPDF,
          "application/pdf"
        );
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfData(pdfUrl);
      }
      setIsLoading1(false);
    } catch (error) {
      console.log(error.response);
      toast.error("Failed to load assignment details");
    }
  };

  const checkSubmission = async () => {
    try {
      const response = await axios.get(
        `${BackendURLS.Student}/isassignmentsubmitted?sid=${student.sid}&aid=${id}`
      );
      // console.log(response)
      if (response.data === "SUBMITTED") {
        setIsSubmitted(true);
      }
      setIsLoading2(false);
      // console.log(isSubmitted)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitAssignment = async () => {
    // Check if the file is uploaded
    if (!submittedData) {
      toast.error("Please upload a file before submitting.");
      return;
    }
  
    // Validate deadline
    const currentDate = new Date();
    const deadlineDate = assignment?.deadlinedate
      ? new Date(assignment.deadlinedate)
      : null;
  
    if (!deadlineDate || currentDate > deadlineDate) {
      toast.error(
        "The deadline for this assignment has passed. Submission is not allowed."
      );
      return;
    }
  
    // Format submission date
    const submissionDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")} ${String(
      currentDate.getHours()
    ).padStart(2, "0")}:${String(currentDate.getMinutes()).padStart(2, "0")}:${String(
      currentDate.getSeconds()
    ).padStart(2, "0")}`;
  
    // Create form data for submission
    const formData = new FormData();
    formData.append("assignmentId", id);
    formData.append("studentId", student?.sid);
    formData.append("courseId", assignment?.courseId);
    formData.append("file", submittedData);
    formData.append("submissionDate", submissionDate);
  
    // Display a loading toast
    const loadingToast = toast.loading("Submitting Assignment");
  
    try {
      // Send the POST request
      const response = await axios.post(
        `${BackendURLS.Student}/submitassignment`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      // Update the toast to success
      toast.update(loadingToast, {
        render: response.data || "Assignment submitted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
  
      // Mark as submitted and close modal
      setIsSubmitted(true);
      setModal(false);
    } catch (error) {
      console.error("Error submitting assignment:", error);
  
      // Update the toast to error
      toast.update(loadingToast, {
        render:
          error.response?.data || "An error occurred while submitting the assignment.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  

  useEffect(() => {
    fetchStudent();
    fetchAssignment();
    checkSubmission();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const yy = String(date.getFullYear()).slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${dd}-${mm}-${yy} Time : ${hh}:${min}`;
  };

  const handlepdfView = () => {
    navigate("/student/view-assignment-pdf", {
      state: { pdfData: assignment.assignmentQuestionPDF },
    });
  };

  const renderElement = () => {
    if (assignment.assignmentQuestionPDF) {
      return (
        <div className="flex gap-4">
          <Button
            as={Link}
            showAnchorIcon
            color="warning"
            target="_blank"
            variant="shadow"
            onClick={() => handlepdfView()}
          >
            View PDF
          </Button>
          <Button
            as={Link}
            href={pdfData}
            title="Download Assignment"
            color="success"
            download={`${assignment.assignmentName}.pdf`}
            variant="shadow"
          >
            Download
          </Button>
        </div>
      );
    } else {
      return (
        <p className="text-red-600 font-semibold">
          No Question PDF is Uploaded!
        </p>
      );
    }
  };

  if (isLoading1 || isLoading2) {
    return (
      <div className="flex justify-center h-full">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-center items-center  p-4">
        <div className="w-full bg-gray-50 shadow-lg rounded-lg p-8 space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Assignment Details
          </h1>
          <div className="space-y-4">
            {/* <div>
              <InputLabel className="text-gray-600 font-semibold">Assignment ID</InputLabel>
              <div className="text-gray-700 text-lg">{assignment.assignmentId}</div>
            </div> */}

            <div>
              <InputLabel className="text-gray-600 font-semibold">
                Course Name
              </InputLabel>
              <div className="text-gray-700 text-lg">
                {assignment.courseName}
              </div>
            </div>

            <div>
              <InputLabel className="text-gray-600 font-semibold">
                Assignment Name
              </InputLabel>
              <div className="text-gray-700 text-lg">
                {assignment.assignmentName}
              </div>
            </div>

            <div>
              <InputLabel className="text-gray-600 font-semibold">
                Assignment Question
              </InputLabel>
              <div
                className="text-gray-700 text-lg border border-gray-300 p-4 rounded-md bg-white shadow-sm"
                dangerouslySetInnerHTML={{
                  __html: assignment.assignmentQuestion,
                }}
              ></div>
            </div>

            <div>
              <InputLabel className="text-gray-600 font-semibold">
                Assignment File
              </InputLabel>
              <div>{renderElement()}</div>
            </div>

            <div>
              <InputLabel className="text-gray-600 font-semibold">
                Assignment Max Marks
              </InputLabel>
              <div className="text-gray-700 text-lg">{assignment.marks}</div>
            </div>

            <div>
              <InputLabel className="text-gray-600 font-semibold">
                Start Date and Time
              </InputLabel>
              <div className="text-gray-700 text-lg">
                {formatDate(assignment.startdate)}
              </div>
            </div>

            <div>
              <InputLabel className="text-gray-600 font-semibold">
                End Date and Time
              </InputLabel>
              <div className="text-gray-700 text-lg">
                {formatDate(assignment.deadlinedate)}
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button
                color="primary"
                variant="shadow"
                radius="full"
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
              &nbsp;
              {isSubmitted ? (
                <Button color="success" variant="shadow" radius="full" disabled>
                  Submitted
                </Button>
              ) : (
                <Button
                  color="success"
                  variant="shadow"
                  radius="full"
                  onClick={() => setModal(true)}
                >
                  Submit Assignment
                </Button>
              )}
              &nbsp;
            </div>
          </div>
        </div>
      </div>
      <Modal backdrop="blur" isOpen={modal} onClose={() => setModal(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Upload Your Submission</ModalHeader>
              <ModalBody>
                <p style={{ color: "red", textDecoration: "underline", textUnderlineOffset:'4px' }}>
                  Important Checkpoints before Submitting.
                </p>
                <ol style={{ color: "red", listStyleType: "decimal" }}>
                  <li>
                    Make sure it's your own work. If we find plagiarized work,
                    you will be facing severe consequences.
                  </li>
                  <li>
                    Make sure you're uploading the correct submission PDF.
                  </li>
                </ol>
                <InputLabel>Submit your Assignment:</InputLabel>
                <input type="file" onChange={handleFileChange} />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleSubmitAssignment}>
                  Submit
                </Button>
                <Button color="error" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ToastContainer/>
    </div>
  );
}
