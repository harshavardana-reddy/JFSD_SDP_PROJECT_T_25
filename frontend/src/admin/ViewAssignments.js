import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BackendURLS from './../config';
import { Table, TableColumn, TableHeader, TableRow, TableCell, TableBody, Button, Input, Pagination } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export default function ViewAssignments() {
    const navigate = useNavigate();
    const [assignmentData, setAssignmentData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page

    const fetchAssignments = async () => {
        try {
            const response = await axios.get(`${BackendURLS.Admin}/viewallassignments`);
            setAssignmentData(response.data);
            setFilteredData(response.data); 
        } catch (error) {
            console.error('Error fetching assignments:', error);
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, []);

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchTerm(searchValue);
        const filtered = assignmentData.filter(
            (assignment) =>
                assignment.assignmentName.toLowerCase().includes(searchValue) ||
                assignment.courseName.toLowerCase().includes(searchValue) ||
                assignment.courseCode.toLowerCase().includes(searchValue)
        );
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to first page on search
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-3">View All Assignments</h1>

            {/* Search Bar */}
            <div className="flex justify-center my-4">
                <Input
                    clearable
                    underlined
                    placeholder="Search by Assignment Name, Course Name, or Course Code"
                    value={searchTerm}
                    onChange={handleSearch}
                    css={{ width: '50%' }}
                />
            </div>

            {/* Assignments Table */}
            <Table aria-label="Courses Mapped To Student" className="mt-2">
                <TableHeader>
                    <TableColumn className='text-center'>ASSIGNMENT ID</TableColumn>
                    <TableColumn className='text-center'>ASSIGNMENT NAME</TableColumn>
                    <TableColumn className='text-center'>COURSE ID</TableColumn>
                    <TableColumn className='text-center'>COURSE NAME</TableColumn>
                    <TableColumn className='text-center'>COURSE CODE</TableColumn>
                    <TableColumn className='text-center'>ACCEPTING SUBMISSONS OR NOT</TableColumn>
                    <TableColumn className='text-center'>Actions</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No Assignments are Uploaded till Now."}>
                    {currentData.map((assignment, index) => (
                        <TableRow key={index} >
                            <TableCell className='text-center'>{assignment.assignmentId}</TableCell>
                            <TableCell className='text-center'>{assignment.assignmentName}</TableCell>
                            <TableCell className='text-center'>{assignment.courseId}</TableCell>
                            <TableCell className='text-center'>{assignment.courseName}</TableCell>
                            <TableCell className='text-center'>{assignment.courseCode}</TableCell>
                            <TableCell className='text-center' style={{color:assignment.accept_submission === "YES"?'green':'red'}}>{assignment.accept_submission === "YES" ? "Yes" : "No"}</TableCell>
                            <TableCell>
                                <Button
                                    color="success"
                                    variant="shadow"
                                    onClick={() => navigate(`/admin/viewassignment/${assignment.assignmentId}`)}
                                >
                                    View Assignment
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination */}
            {filteredData.length > itemsPerPage && (
                <div className="flex justify-center my-4">
                    <Pagination
                        total={Math.ceil(filteredData.length / itemsPerPage)}
                        initialPage={currentPage}
                        onChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
}
