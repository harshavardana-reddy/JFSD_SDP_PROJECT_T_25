import {
    Button,
    Input,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Spinner
  } from "@nextui-org/react";
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import { Link, useParams } from "react-router-dom";
  import BackendURLS from "../config";
  
  export default function FacultySubmissions() {
    const { aid } = useParams();
    const [submissionData, setSubmissionData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [faculty, setFaculty] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(5);
  
    // Paginate based on the current page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    // Filter submissions based on search query
    const filteredSubmissions = submissionData.filter((submission) => {
      return (
        submission.assignmentId
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        submission.assignmentName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        submission.courseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.studentName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  
    // Pagination: current page items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSubmissions = filteredSubmissions.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
  
    // Fetch faculty data and submissions
    const fetchData = async () => {
      if (!faculty) return; // Prevent API call if faculty data is not set
  
      try {
        const response = await axios.get(
          `${BackendURLS.Faculty}/getfacultysubmissions?id=${aid}&fid=${faculty.fid}`
        );
        setSubmissionData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching submissions:", error);
        setIsLoading(false);
      }
    };
  
    // Retrieve faculty data from sessionStorage on component mount
    useEffect(() => {
      const facultyObject = JSON.parse(sessionStorage.getItem("faculty"));
      setFaculty(facultyObject);
    }, []);
  
    // Call fetchData when aid or faculty is available
    useEffect(() => {
      if (faculty && aid) {
        fetchData();
      }
    }, [faculty, aid]); // Dependencies: re-run fetch when faculty or aid changes
  
    // Spinner style
    const spinnerContainerStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    };
  
    if (isLoading) {
      return (
        <div style={spinnerContainerStyle}>
          <Spinner label="Loading..." color="warning" size="lg" />
        </div>
      );
    }
  
    // Render review status cell
    const renderStatusCell = (status) => {
      const statusStyles = {
        GRADED: "text-white bg-green-500 rounded-full px-3 py-1 font-semibold",
        "NOT GRADED": "text-white bg-red-500 rounded-full px-3 py-1 font-semibold",
      };
  
      return (
        <TableCell className="text-center">
          <span
            className={
              statusStyles[status] ||
              "bg-gray-300 text-black px-3 py-1 rounded-full"
            }
          >
            {status}
          </span>
        </TableCell>
      );
    };
  
    return (
      <div>
        <h1 className="text-3xl font-bold text-center mt-3">Assignment Submissions</h1>
        <div className="justify-center flex mt-3">
          <Input
            placeholder="Search...."
            className="p-2 mb-4 rounded border-gray-300 focus:outline-none focus:border-indigo-500 w-1/3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
  
        <div className="table-container mt-3">
          <Table aria-label="tablex">
            <TableHeader>
              <TableColumn className="text-black text-center">
                SUBMISSION ID
              </TableColumn>
              <TableColumn className="text-black text-center">
                STUDENT NAME
              </TableColumn>
              <TableColumn className="text-black text-center">
                STUDENT ID
              </TableColumn>
              <TableColumn className="text-black text-center">STATUS</TableColumn>
              <TableColumn className="text-black text-center">Actions</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No Submissions Found...!"}>
              {currentSubmissions.map((assignment, index) => (
                <TableRow key={index} className="hover-row">
                  <TableCell className="hover-3d text-center">
                    {assignment.submissionId}
                  </TableCell>
                  <TableCell className="hover-3d text-center">
                    {assignment.studentName}
                  </TableCell>
                  <TableCell className="hover-3d text-center">
                    {assignment.studentId}
                  </TableCell>
                  {renderStatusCell(assignment.reviewStatus)}
                  <TableCell className="text-center">
                    <Button
                      color="success"
                      variant="shadow"
                      className="hover-3d"
                      as={Link}
                      to={`/faculty/facultyreviewassignment/${assignment.submissionId}`}
                    >
                      Evaluate Submission
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
  
        <div className="mt-3" align="center">
          <Pagination
            loop
            color="danger"
            showControls
            total={Math.ceil(filteredSubmissions.length / itemsPerPage)}
            initialPage={currentPage}
            onChange={paginate}
          />
          <br />
          <Button color="secondary" variant="shadow" onClick={() => window.history.back()}>
            Go back
          </Button>
        </div>
      </div>
    );
  }
  