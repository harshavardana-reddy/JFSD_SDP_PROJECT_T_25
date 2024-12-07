import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
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
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import BackendURLS from "../config";

export default function CourseAssignments() {
  const { cid } = useParams();
  const [course, SetCourse] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [assignmentData, setAssignmentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // eslint-disable-line
  const [faculty, setFaculty] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

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

  const fetchFaculty = () => {
    setFaculty(JSON.parse(sessionStorage.getItem("faculty")));
  };

  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        `${BackendURLS.Faculty}/getcourse?id=${cid}`
      );
      SetCourse(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetch = async () => {
    try {
      const response = await axios.get(
        `${BackendURLS.Faculty}/courseassignments?id=${cid}`
      );
      setAssignmentData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${BackendURLS.Faculty}/deleteassignment?aid=${selectedAssignment}&fid=${faculty.fid}`
      );
      if (response.status === 200) {
        toast.success(response.data);
        setAssignmentData(
          assignmentData.filter(
            (assignment) => assignment.assignmentId !== selectedAssignment
          )
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowModal(false);
    }
  };

  const handleModalOpen = (assignmentId) => {
    // console.log(assignmentId)
    setSelectedAssignment(assignmentId);
    console.log(selectedAssignment);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAssignment(null);
  };

  useEffect(() => {
    fetch();
    fetchCourse();
    fetchFaculty();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-3">
        Assignments of Course : {course.courseName}
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
        <Table aria-label="table">
          <TableHeader>
            <TableColumn className="text-black">Assignment ID</TableColumn>
            <TableColumn className="text-black">Assignment Name</TableColumn>
            <TableColumn className="text-black">Course Code</TableColumn>
            <TableColumn className="text-black">Course Name</TableColumn>
            <TableColumn className="text-black">Actions</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No Assignments Found...!"}>
            {currentAssignments.map((assignment, index) => (
              <TableRow key={index} className="hover-row">
                <TableCell className="hover-3d">
                  {assignment.assignmentId}
                </TableCell>
                <TableCell className="hover-3d">
                  {assignment.assignmentName}
                </TableCell>
                <TableCell className="hover-3d">
                  {assignment.courseCode}
                </TableCell>
                <TableCell className="hover-3d">
                  {assignment.courseName}
                </TableCell>

                <TableCell>
                  <Button
                    color="success"
                    variant="shadow"
                    className="hover-3d"
                    as={Link}
                    to={`/faculty/viewsubmissions/${assignment.assignmentId}`}
                  >
                    View Submissions
                  </Button>
                  <Button
                    color="danger"
                    variant="shadow"
                    className="hover-3d"
                    onClick={() => handleModalOpen(assignment.assignmentId)}
                  >
                    Delete Assignment
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
      <ToastContainer />

      {/* Confirmation Modal */}
      <Modal isOpen={showModal} backdrop="blur" onClose={handleModalClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirm Delete</ModalHeader>
              <ModalBody>
                Are you sure you want to delete this assignment?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={handleDelete}>
                  Delete
                </Button>
                <Button color="secondary" onClick={onClose}>
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
