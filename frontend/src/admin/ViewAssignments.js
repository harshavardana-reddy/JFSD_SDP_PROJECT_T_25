import axios from 'axios'
import React,{useState,useEffect} from 'react'
import BackendURLS from './../config';
import { Table,TableColumn,TableHeader,TableRow,TableCell,TableBody } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export default function ViewAssignments() {
    const navigate = useNavigate();
    const [assignmentData,setAssignmentData] = useState([])
    const fetchAssignments = async()=>{
        try {
            const response = await axios.get(`${BackendURLS.Admin}/viewallassignments`);
            setAssignmentData(response.data);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        
        fetchAssignments();
    });

  return (
    <div>
       <Table aria-label="Courses Mapped To Student">
          <TableHeader>
            <TableColumn>ASSIGNMENT ID</TableColumn>
            <TableColumn>ASSIGNMENT NAME</TableColumn>
            <TableColumn>COURSE ID</TableColumn>
            <TableColumn>COURSE NAME</TableColumn>
            <TableColumn>COURSE CODE</TableColumn>
            <TableColumn>ACCEPTING SUBMISSONS OR NOT</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No Courses Are Mapped to This Student."}>
            {assignmentData.map((assignment, index) => (
              <TableRow key={index}>
                <TableCell>{assignment.assignmentId}</TableCell>
                <TableCell>{assignment.assignmentName}</TableCell>
                <TableCell>{assignment.courseId}</TableCell>
                <TableCell>{assignment.courseName}</TableCell>
                <TableCell>{assignment.courseCode}</TableCell>
                <TableCell>{assignment.accept_submission}</TableCell>
                <TableCell onClick={()=>navigate(`/admin/viewassignment/${assignment.assignmentId}`)} >View Assignment</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  )
}
