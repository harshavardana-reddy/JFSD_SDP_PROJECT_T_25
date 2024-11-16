import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BackendURLS from '../config';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

export default function ViewAssignmentSubmission() {
  const [submissions,setSubmissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate()
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const fetchSubmissions = async()=>{
    const student = JSON.parse(sessionStorage.getItem("student"));
    try {
      const response = await axios.get(`${BackendURLS.Student}/mysubmissions?id=${student.sid}`);
      setSubmissions(response.data);
      // console.log("Data is fetched")
    } catch (error) {
      console.log(error);
    }
  } 

  useEffect(()=>{
    fetchSubmissions();
  },[])

  const filteredSubmissions = submissions.filter((submission)=>{
    return(
      submission.submissionId.includes(searchQuery.toLowerCase())||
      submission.assignmentId.includes(searchQuery.toLowerCase())||
      submission.assignmentName.includes(searchQuery.toLowerCase())||
      submission.courseName.includes(searchQuery.toLowerCase())||
      submission.reviewStatus.includes(searchQuery.toLowerCase())||
      submission.marks.includes(searchQuery.toLowerCase())||
      submission.submissionDate.includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div>
      <h3 className='text-3xl font-bold mt-3 text-center' >My Submissions</h3>
      <div className="justify-center flex mt-3">
        <Input
          placeholder="Search...."
          className="p-2 mb-4 rounded border-gray-300 focus:outline-none focus:border-indigo-500 w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="table-container mt-4">
        <Table aria-label='submissions table'>
          <TableHeader>
            <TableColumn>STUDENT ID</TableColumn>
            <TableColumn>ASSIGNMENT ID</TableColumn>
            <TableColumn>SUBMISSION ID</TableColumn>
            <TableColumn>COURSE NAME</TableColumn>
            <TableColumn>REVIEW STATUS</TableColumn>
            <TableColumn>MARKS</TableColumn>
            <TableColumn>SUBMISSION DATE</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No Submissions Found!!"} >
          {filteredSubmissions.map((submission,index)=>(
            <TableRow key={index}>
              <TableCell>{submission.studentId}</TableCell>
              <TableCell>{submission.assignmentId}</TableCell>
              <TableCell>{submission.submissionId}</TableCell>
              <TableCell>{submission.courseName}</TableCell>
              <TableCell>{submission.reviewStatus}</TableCell>
              <TableCell>{submission.marks}</TableCell>
              <TableCell>{submission.submissionDate}</TableCell>
              <TableCell>
                <Button color='success' variant='shadow' onClick={()=>navigate(`/student/submission`)} >View</Button>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </div>

    </div>
  )
}
