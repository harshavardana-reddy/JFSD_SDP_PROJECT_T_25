import { Button, Card, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import BackendURLS from "../config";
import ReviewIMG from "./images/reviewed.png";
import UnderReviewIMG from "./images/underreview.png";


export default function FacultyReviewAssignment() {
    const { subid } = useParams();
    const [submission, setSubmission] = useState({});
    const [assignment, setAssignment] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [marks, setMarks] = useState("");
    const [feedback, setFeedback] = useState("");
    const [faculty, setFaculty] = useState("");
    const navigate = useNavigate();
    const [graded, setGraded] = useState(false);
    const [modal,setModal] = useState(false);
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const submissionResponse = await axios.get(
              `${BackendURLS.Faculty}/getsubmission?id=${subid}`
            );
            const submissionData = submissionResponse.data;
    
            if (submissionData.assignmentId) {
              const assignmentResponse = await axios.get(
                `${BackendURLS.Faculty}/getassignment?id=${submissionData.assignmentId}`
              );
              setAssignment(assignmentResponse.data);
            }
    
            setSubmission(submissionData);
            setMarks(submissionData.marks || "");
            setFeedback(submissionData.submissionFeedback || "");
            setGraded(submissionData.reviewStatus === "GRADED");
            setIsLoading(false);
          } catch (error) {
            console.error("Error fetching data:", error.response || error);
            setIsLoading(false);
          }
        };
    
        fetchData();
        const facultyData = JSON.parse(sessionStorage.getItem("faculty"));
        setFaculty(facultyData || {});
      }, [subid]);
  
    const evaluateSubmission = async () => {
      const data = {
        fid: faculty.fid,
        subid: subid,
        marks: marks,
        feedback: feedback,
      };
      console.log(data);
      try {
        const response = await axios.put(
          `${BackendURLS.Faculty}/evaluatesubmission`,
          data
        );
        if (response.status === 200) {
          toast.success(response.data);
          setModal(false)
        }
      } catch (error) {
        console.log(error);
        if (error.resposne) {
          console.log(error.reponse);
        }
      }
    };
  
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
      if (!dateString) return "";
      const date = new Date(dateString);
      const yy = String(date.getFullYear()).slice(-2);
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const hh = String(date.getHours()).padStart(2, "0");
      const min = String(date.getMinutes()).padStart(2, "0");
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
      navigate("/faculty/view-assignment-pdf", {
        state: { pdfData: assignment.assignmentQuestionPDF },
      });
    };
  
    const handleSubmissionView = () => {
      navigate("/faculty/view-submission-pdf", {
        state: { pdfData: submission.submittedData },
      });
    };
  
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
              <h3 className="mb-4 font-semibold text-lg text-gray-700">
                Assignment Info
              </h3>
              
              <p className="mb-2">
                <strong className="text-gray-600">Course Code:</strong>{" "}
                {assignment.courseCode}
              </p>
              <p className="mb-2">
                <strong className="text-gray-600">Course:</strong>{" "}
                {assignment.courseName}
              </p>
              <div className="mb-4">
                <strong className="text-gray-600">Question:</strong>
                <div
                  dangerouslySetInnerHTML={{
                    __html: assignment.assignmentQuestion,
                  }}
                  className="text-gray-700 text-base border border-gray-300 p-4 rounded-md bg-gray-50"
                ></div>
              </div>
              <p className="mb-2">
                <strong className="text-gray-600">Question File:</strong>{" "}
                <Button
                  color="warning"
                  variant="shadow"
                  onClick={() => handleViewPDF()}
                >
                  View
                </Button>
              </p>
              <p className="mb-2">
                <strong className="text-gray-600">StartDate:</strong>{" "}
                {formatDate(assignment.startdate)}
              </p>
              <p className="mb-2">
                <strong className="text-gray-600">Deadline:</strong>{" "}
                {formatDate(assignment.deadlinedate)}
              </p>
              <p className="mb-2">
                <strong className="text-gray-600">Marks:</strong>{" "}
                {assignment.marks}
              </p>
              <p className="mb-2">
                <strong className="text-gray-600"> REVIEWED BY : </strong>{" "}
                {submission.reviewedFacultyName}
              </p>
              <p className="mb-2">
                <strong className="text-gray-600">REVIEWER ID : </strong>{" "}
                {submission.reviewedFacultyId}
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-white">
              <h3 className="mb-4 font-semibold text-lg text-gray-700">
                Submission Info
              </h3>
              <p className="mb-2">
                <strong className="text-gray-600">Student:</strong>{" "}
                {submission.studentName}
              </p>
              <p className="mb-2">
                <strong className="text-gray-600">Student ID:</strong>{" "}
                {submission.studentId}
              </p>
              <p className="mb-2">
                <strong className="text-gray-600">Submission:</strong>{" "}
                <Button
                  color="warning"
                  variant="shadow"
                  onClick={() => handleSubmissionView()}
                >
                  View
                </Button>{" "}
                <Button color="success" variant="shadow">
                  Download
                </Button>
              </p>
              <p className="mb-2">
                <strong className="text-gray-600">Submission Date:</strong>{" "}
                {formatDate(submission.submissionDate)}
              </p>
              <p className="mb-4">
                <strong className="text-gray-600">Status:</strong>{" "}
                <strong
                  style={{
                    color: submission.reviewStatus === "GRADED" ? "green" : "red",
                  }}
                >
                  {submission.reviewStatus}
                </strong>
              </p>
              <div>
                <label htmlFor="marks" className="block text-gray-600 mb-2">
                  Marks:
                </label>
                <input
                  id="marks"
                  type="number"
                  placeholder="Grade the submission"
                  step={0.01}
                  max={assignment.marks}
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  readOnly={graded}
                  className="border-gray-300 border p-2 rounded w-full"
                />
                <label
                  htmlFor="feedback"
                  className="block text-gray-600 mt-4 mb-2"
                >
                  Feedback:
                </label>
                <ReactQuill
                  id="feedback"
                  value={feedback}
                  onChange={(value) => setFeedback(value)}
                  modules={modules}
                  readOnly={graded}
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center space-x-4">
            {graded ? (
              <Button color="success" variant="shadow" disabled="true">
                FeedBack Submitted
              </Button>
            ) : (
              <Button
                color="success"
                variant="shadow"
                onClick={() => setModal(true)}
                auto
              >
                Submit Feedback
              </Button>
            )}
            <Button color="warning" auto onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </Card>
        <Modal isOpen={modal} backdrop="blur" onClose={()=>setModal(false)} >
            <ModalContent>
            {(onClose)=>(
            <>
                <ModalHeader>
                    Confiramation on Submitting Feedback
                </ModalHeader>
                <ModalBody>
                   
                    
                     <label>Chackpoints</label>
                    <ol>
                        <li>1.Feedback Cannot be editted.</li>
                        <li>2.Throughly Checked the submission pdf.</li>
                    </ol>
                    
                   <ModalFooter>
                    <Button onClick={()=>evaluateSubmission()} >Submit Feedback</Button>
                    <Button onClick={onClose} >Cancel</Button>
                   </ModalFooter>
                </ModalBody>
                </>
                )}
            </ModalContent>
        </Modal>
        <ToastContainer />
      </div>
    );
}
