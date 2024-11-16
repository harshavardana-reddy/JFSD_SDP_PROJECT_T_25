import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackendURLS from '../config';
import { InputLabel } from '@mui/material';
import { Button, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter } from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';

export default function SubmitAssignment() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState({});
  const [pdfData, setPdfData] = useState(null);
  const [modal, setModal] = useState(false);
  const [student, setStudent] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for submission status

  const base64ToBlob = (base64, mimeType) => {
    const byteChars = atob(base64);
    const byteNumbers = Array.from(byteChars).map(char => char.charCodeAt(0));
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
      const response = await axios.get(`${BackendURLS.Student}/viewassignment?id=${id}`);
      setAssignment(response.data);
      if (response.data.assignmentQuestionPDF) {
        const pdfBlob = base64ToBlob(response.data.assignmentQuestionPDF, 'application/pdf');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfData(pdfUrl);
      }
    } catch (error) {
      console.log(error.response);
      toast.error("Failed to load assignment details");
    }
  };

  const checkSubmission = async () => {
    try {
      const response = await axios.get(`${BackendURLS.Student}/isassignmentsubmitted?sid=${student.sid}&aid=${id}`);
      // console.log(response)
      if (response.data === "SUBMITTED") {
        setIsSubmitted(true); 
      }
      // console.log(isSubmitted)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitAssignment = async () => {
    if (!submittedData) {
      toast.error("Please upload a file before submitting.");
      return;
    }

    const currentDate = new Date();
    const submissionDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;

    const formData = new FormData();
    formData.append("assignmentId", id);
    formData.append("studentId", student.sid);
    formData.append("courseId", assignment.courseId);
    formData.append("file", submittedData);
    formData.append("submissionDate", submissionDate);

    try {
      const response = await axios.post(`${BackendURLS.Student}/submitassignment`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Assignment submitted successfully!");
      setIsSubmitted(true); // Update status after submission
      setModal(false);
    } catch (error) {
      console.log(error.response);
      toast.error("Failed to submit assignment");
    }
  };

  useEffect(() => {
    fetchStudent();
    fetchAssignment();
    checkSubmission(); // Check submission status on load
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const yy = String(date.getFullYear()).slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${dd}-${mm}-${yy} Time:${hh}:${min}`;
  };

  const renderElement = () => {
    if (assignment.assignmentQuestionPDF) {
      return (
        <div className="flex gap-4">
          <Button
            as={Link}
            href={pdfData}
            showAnchorIcon
            color="warning"
            target="_blank"
            variant="shadow"
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
      return <p className="text-red-600 font-semibold">No Question PDF is Uploaded!</p>;
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 p-4">
        <div className="w-full bg-gray-50 shadow-lg rounded-lg p-8 space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Assignment Details
          </h1>
          <div className="space-y-4">
            <div>
              <InputLabel className="text-gray-600 font-semibold">Assignment ID</InputLabel>
              <div className="text-gray-700 text-lg">{assignment.assignmentId}</div>
            </div>

            <div>
              <InputLabel className="text-gray-600 font-semibold">Assignment Name</InputLabel>
              <div className="text-gray-700 text-lg">{assignment.assignmentName}</div>
            </div>

            <div>
              <InputLabel className="text-gray-600 font-semibold">Assignment Question</InputLabel>
              <div
                className="text-gray-700 text-lg border border-gray-300 p-4 rounded-md bg-white shadow-sm"
                dangerouslySetInnerHTML={{ __html: assignment.assignmentQuestion }}
              ></div>
            </div>

            <div>
              <InputLabel className="text-gray-600 font-semibold">Assignment Question PDF</InputLabel>
              <div>{renderElement()}</div>
            </div>

            <div>
              <InputLabel className="text-gray-600 font-semibold">Course ID</InputLabel>
              <div className="text-gray-700 text-lg">{assignment.courseId}</div>
            </div>

            <div>
              <InputLabel className="text-gray-600 font-semibold">Assignment Max Marks</InputLabel>
              <div className="text-gray-700 text-lg">{assignment.marks}</div>
            </div>

            <div>
              <InputLabel className="text-gray-600 font-semibold">Start Date and Time</InputLabel>
              <div className="text-gray-700 text-lg">{formatDate(assignment.startdate)}</div>
            </div>

            <div>
              <InputLabel className="text-gray-600 font-semibold">End Date and Time</InputLabel>
              <div className="text-gray-700 text-lg">{formatDate(assignment.deadlinedate)}</div>
            </div>

            <div className="flex justify-center mt-6">
              <Button color="primary" variant="shadow" radius="full" onClick={() => window.history.back()}>
                Go Back
              </Button>
              &nbsp;
              {isSubmitted ? (
                <Button color="success" variant="shadow" radius="full" disabled>
                  Submitted
                </Button>
              ) : (
                <Button color="success" variant="shadow" radius="full" onClick={() => setModal(true)}>
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
          {onClose => (
            <>
              <ModalHeader>Upload Your Submission</ModalHeader>
              <ModalBody>
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
    </div>
  );
}
