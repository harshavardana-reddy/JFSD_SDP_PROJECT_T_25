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
import { Link, useNavigate } from "react-router-dom";
import BackendURLS from "../config";

export default function ViewPendingAssignments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [assignmentData, setAssignmentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredAssignments = assignmentData.filter((assignment) => {
    return (
      assignment.assignmentId
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      assignment.assignmentName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      assignment.courseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssignments = filteredAssignments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const fetch = async () => {
    const student = JSON.parse(sessionStorage.getItem("student"));
    try {
      const response = await axios.get(
        `${BackendURLS.Student}/mypendingassignments?id=${student.sid}`
      );
      setAssignmentData(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <style>
        {`
                .hover-3d {
  transition: transform 0.3s, box-shadow 0.3s;
}

.hover-3d:hover {
  transform: translateY(-5px) rotateX(5deg) rotateY(5deg) scale(1.05);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}
  .hover-row {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-row:hover {
  transform: scale(1.02); /* Slightly scale up the row */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* Add shadow for 3D effect */
  cursor: pointer;
}


                `}
      </style>
      <h1 className="text-3xl font-bold text-center mt-3">
        All Pending Assignments
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
            <TableColumn className="text-black">Assignment ID</TableColumn>
            <TableColumn className="text-black">Assignment Name</TableColumn>
            <TableColumn className="text-black">Course Name</TableColumn>
            <TableColumn className="text-black">Course Code</TableColumn>
            <TableColumn className="text-black">Actions</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No Pending Assignments Found...!"}>
            {currentAssignments.map((assignment, index) => (
              <TableRow key={index} className="hover-row">
                <TableCell className="hover-3d">
                  {assignment.assignmentId}
                </TableCell>
                <TableCell className="hover-3d">
                  {assignment.assignmentName}
                </TableCell>
                <TableCell className="hover-3d">
                  {assignment.courseId}
                </TableCell>
                <TableCell className="hover-3d">
                  {assignment.courseName}
                </TableCell>
                <TableCell>
                  <Button color="success" variant="shadow" className="hover-3d" as={Link} to={`/student/submitassignment/${assignment.assignmentId}`}>
                    Submit Assignment
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
          total={Math.ceil(filteredAssignments.length / itemsPerPage)}
          initialPage={currentPage}
          onChange={paginate}
        />
      </div>
    </div>
  );
}
