import { useParams } from 'react-router-dom'
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

export default function ViewCourseAssignments() {
    const { cid } = useParams();
    const [course,SetCourse] = useState({});
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
  
    const fetchCourse = async()=>{
      try {
        const response = await axios.get(`${BackendURLS.Admin}/getcourse?id=${cid}`);
        SetCourse(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
  
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${BackendURLS.Admin}/courseassignments?id=${cid}`
        );
        setAssignmentData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetch();
      fetchCourse();
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
          <Table aria-label='table'>
            <TableHeader >
              <TableColumn className="text-black" style={{textAlign:'center'}}>Assignment ID</TableColumn>
              <TableColumn className="text-black" style={{textAlign:'center'}}>Assignment Name</TableColumn>
              <TableColumn className="text-black" style={{textAlign:'center'}}>Course Code</TableColumn>
              <TableColumn className="text-black" style={{textAlign:'center'}}>Course Name</TableColumn>
              <TableColumn className="text-black" style={{textAlign:'center'}}>ACCEPTING OR NOT</TableColumn>

              <TableColumn className="text-black" style={{textAlign:'center'}}>Actions</TableColumn>
              
            
  
            </TableHeader>
            <TableBody emptyContent={"No Assignments Found...!"}>
              {currentAssignments.map((assignment, index) => (
                <TableRow  key={index} className="hover-row">
                  <TableCell style={{textAlign:'center'}} className="hover-3d">
                    {assignment.assignmentId}
                  </TableCell>
                  <TableCell style={{textAlign:'center'}}  className="hover-3d">
                    {assignment.assignmentName}
                  </TableCell>
                  <TableCell style={{textAlign:'center'}} className="hover-3d">
                    {assignment.courseCode}
                  </TableCell>
                  <TableCell style={{textAlign:'center'}} className="hover-3d">
                    {assignment.courseName}
                  </TableCell>
                  <TableCell style={{textAlign:'center'}} className="hover-3d">
                    {assignment.accept_submission}
                  </TableCell>
                  <TableCell style={{textAlign:'center'}} >
                    <Button color="success" variant="shadow" className="hover-3d" as={Link} to={`/admin/viewassignment/${assignment.assignmentId}`}>
                      View Assignment
                    </Button>
                    <br/>
                    <br/>
                    <Button color="success" variant="shadow" className="hover-3d" as={Link} to={`/admin/viewsubmissions/${assignment.assignmentId}`}>
                      View Submissions
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
          <br/>
          <Button variant='shadow' color='secondary' onClick={()=>window.history.back()} >Go Back</Button>
        </div>
      </div>
    )
}
