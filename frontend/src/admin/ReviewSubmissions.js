import { Button, Card, Spinner } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackendURLS from "../config";
import ReviewIMG from "./images/reviewed.png";
import UnderReviewIMG from "./images/underreview.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ReviewSubmissions() {
  const { subid } = useParams();
  const [submission, setSubmission] = useState({});
  const [assignment, setAssignment] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  const fetchSubmission = async () => {
    try {
      const response = await axios.get(
        `${BackendURLS.Admin}/getsubmission?id=${subid}`
      );
      setSubmission(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAssignment = async () => {
    try {
      if (submission.assignmentId) {
        const response = await axios.get(
          `${BackendURLS.Admin}/getassignment?id=${submission.assignmentId}`
        );
        setAssignment(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSubmission();
  }, [subid]);

  useEffect(() => {
    fetchAssignment();
  }, [submission.assignmentId]);

  const renderImageCell = (status) => {
    if (status === "GRADED") {
      return (
        <img src={ReviewIMG} alt="Reviewed" className="w-32 h-32 mx-auto" />
      );
    }
    return (
      <img
        src={UnderReviewIMG}
        alt="Under Review"
        className="w-32 h-32 mx-auto"
      />
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const yy = String(date.getFullYear()).slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${dd}-${mm}-${yy} Time: ${hh}:${min}`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Spinner size="xl" />
      </div>
    );
  }

  const handleViewPDF = () => {
    navigate("/admin/view-assignment-pdf", {
      state: { pdfData: assignment.assignmentQuestionPDF }, 
    });
  };

  const handleSubmissionView = ()=>{
    navigate("/admin/view-submission-pdf",{
      state:{ pdfData:submission.submittedData }
    })
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: -1 }, { indent: +1 }],
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-bp-8">
      <Card shadow width="full" className="p-8 bg-white  rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          {renderImageCell(submission.reviewStatus)}
        </div>
        <h2 className="text-center mb-6 font-extrabold text-blue-700 text-3xl">
          {assignment.assignmentName || "Assignment Details"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 border rounded-lg shadow-md bg-white">
            <h3 className="mb-4 font-semibold text-lg text-gray-700">Assignment Info</h3>
            <p className="mb-2">
              <strong className="text-gray-600">Course:</strong> {assignment.courseName}
            </p>
            <p className="mb-2">
              <strong className="text-gray-600">Course Code:</strong> {assignment.courseCode}
            </p>
            <p className="mb-2">
              <strong className="text-gray-600">Course:</strong> {assignment.courseName}
            </p>
            <p className="mb-4">
              <strong className="text-gray-600">Question:</strong>
              <div
                dangerouslySetInnerHTML={{ __html: assignment.assignmentQuestion }}
                className="text-gray-700 text-base border border-gray-300 p-4 rounded-md bg-gray-50"
              ></div>
            </p>
            <p className="mb-2">
              <strong className="text-gray-600">Question File:</strong> <Button color="warning" variant="shadow" onClick={()=>handleViewPDF()}>View</Button>
            </p>
            <p className="mb-2">
              <strong className="text-gray-600">Deadline:</strong> {formatDate(assignment.deadlinedate)}
            </p>
            <p className="mb-2">
              <strong className="text-gray-600">Marks:</strong> {assignment.marks}
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-md bg-white">
            <h3 className="mb-4 font-semibold text-lg text-gray-700">Submission Info</h3>
            <p className="mb-2">
              <strong className="text-gray-600">Student:</strong> {submission.studentName}
            </p>
            <p className="mb-2">
              <strong className="text-gray-600">Student ID:</strong> {submission.studentId}
            </p>
            <p className="mb-2">
              <strong className="text-gray-600">Submission:</strong> <Button color="warning" variant="shadow" onClick={()=>handleSubmissionView()} >View</Button> <Button color="success" variant="shadow" >Download</Button>
            </p>
            <p className="mb-2">
              <strong className="text-gray-600">Submission Date:</strong> {formatDate(submission.submissionDate)}
            </p>
            <p className="mb-4">
              <strong className="text-gray-600">Status:</strong> <strong style={{color:submission.reviewStatus==="GRADED"?'green':'red'}} >{submission.reviewStatus}</strong>
            </p>
            <div>
              <label htmlFor="marks" className="block text-gray-600 mb-2">Marks:</label>
              <input
                id="marks"
                type="number"
                placeholder="Grade the submission"
                value={submission.marks}
                step={0.01}
                max={assignment.marks}
                className="border-gray-300 border p-2 rounded w-full"
                readOnly
              />
              <label htmlFor="feedback" className="block text-gray-600 mt-4 mb-2">Feedback:</label>
              <ReactQuill id="feedback" value={submission.feedback} readOnly modules={modules} />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          {/* <Button color="success" auto>
            Submit Feedback
          </Button> */}
          <Button color="warning" variant="shadow" auto onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </Card>
    </div>
  );
}
