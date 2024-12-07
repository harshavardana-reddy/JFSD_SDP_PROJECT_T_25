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
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackendURLS from "../config";

export default function AssignmentSubmissions() {
  const { aid } = useParams();
  const [submissionData, setSubmissionData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [itemsPerPage, setItemsPerPage] = useState(5);
  //eslint-disable-next-line
  const navigate = useNavigate();
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubmissions = filteredSubmissions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const fetch = async () => {
    try {
      const response = await axios.get(
        `${BackendURLS.Faculty}/getsubmissions?id=${aid}`
      );
      setSubmissionData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line
  }, []);

  const renderStatusCell = (status) => {
    const statusStyles = {
      GRADED: "text-white bg-green-500 rounded-full px-3 py-1 font-semibold",
      "NOT GRADED": "text-white bg-red-500 rounded-full px-3 py-1 font-semibold",
    };
  
    return (
      <TableCell className="text-center">
        <span className={statusStyles[status] || "bg-gray-300 text-black px-3 py-1 rounded-full"}>
          {status}
        </span>
      </TableCell>
    );
  };
  

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-3">
        Assignment Submissions
      </h1>
      <div className="justify-center flex mt-3">
        <Input
          placeholder="Search...."
          className="p-2 mb-4 rounded border-gray-300 focus:outline-none focus:border-indigo-500 w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="table-container mt-3">
        <Table>
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

            <TableColumn className="text-black text-center">
              Actions
            </TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No Pending Assignments Found...!"}>
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
                <TableCell className=" text-center">
                  <Button
                    color="success"
                    variant="shadow"
                    className="hover-3d"
                    as={Link}
                    to={`/faculty/reviewassignment/${assignment.submissionId}`}
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
        <br/>
        <Button color="secondary" variant="shadow" onClick={()=>window.history.back()}  >Go back</Button>
      </div>
      
    </div>
  );
}
