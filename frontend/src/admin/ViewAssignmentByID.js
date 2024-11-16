import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackendURLS from '../config';
import { InputLabel } from '@mui/material';
import { Button, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter } from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';

export default function ViewAssignmentByID() {
    const { id } = useParams();
    const [assignment, setAssignment] = useState({});
    const [pdfData, setPdfData] = useState(null);
    const [modal,setModal] = useState(false);
    const [status,setStatus] = useState("");
    const fetchAssignment = async () => {
        try {
            const response = await axios.get(`${BackendURLS.Admin}/fetchassignment?id=${id}`);
            setAssignment(response.data);
            if(assignment.accept_submission === "YES"){
                setStatus("Dont't Accept");
            }
            else{
                setStatus("Accept")
            }
            if (response.data.assignmentQuestionPDF) {
                const pdfBytes = response.data.assignmentQuestionPDF;
                const pdfBlob = base64ToBlob(pdfBytes, 'application/pdf');
                const pdfUrl = URL.createObjectURL(pdfBlob);
                setPdfData(pdfUrl);
            }
        } catch (error) {
            console.log(error.response ? error.response.data : error.message);
        }
    };

    const handleChangeAssignmentStatus = async () => {
        try {
            const response = await axios.put(`${BackendURLS.Admin}/changeassignmentstatus?id=${id}`);
            toast.success(response.data);
            setModal(false); // Close the modal after a successful status change
            fetchAssignment(); // Refresh assignment details to reflect the new status
        } catch (error) {
            toast.error(error.response.data);
            console.log(error.response.data);
        }
    };

    // Helper function to convert base64 to Blob
    const base64ToBlob = (base64, mimeType) => {
        const byteChars = atob(base64);
        const byteNumbers = Array.from(byteChars).map(char => char.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    };

    // Format the date as "YY-MM-DD Time:HH:mm"
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const yy = String(date.getFullYear()).slice(-2);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        return `${dd}-${mm}-${yy} Time:${hh}:${min}`;
    };

    const renderElement = () => {
        if (pdfData) {
            return (
                <div className="flex gap-4">
                    <Button
                        as={Link}
                        href={pdfData}
                        showAnchorIcon
                        color="warning"
                        target="_blank"
                        variant='shadow'
                    >
                        View PDF
                    </Button>
                    <Button
                        as={Link}
                        href={pdfData}
                        title="Download Assignment"
                        color="success"
                        download={`${assignment.assignmentName}.pdf`}
                        variant='shadow'
                    >
                        Download
                    </Button>
                </div>
            );
        } else {
            return <p className="text-red-600 font-semibold">No PDF Question is Uploaded!</p>;
        }
    };

    const renderButton = () => {
        if (assignment.accept_submission === "YES") {
            return <Button variant='shadow' color='danger' radius='full' onClick={()=>{setModal(true)}} >Don't Accept Submissions</Button>;
        }
        return <Button variant='shadow' color='success' radius='full' onClick={()=>{setModal(true)}} >Accept Submissions</Button>;
    };

    useEffect(() => {
        fetchAssignment();
    }, [id]);

    return (
        <div>
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 p-4">
            <div className="w-full bg-gray-50 shadow-lg rounded-lg p-8 space-y-6">
                <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                    Assignment Details
                </h1>
                <div className="space-y-4">
                    <div>
                        <InputLabel className="text-gray-600 font-semibold">Assignment ID</InputLabel>
                        <div className="text-gray-700 text-lg">{assignment.assignmentId}</div>
                    </div>

                    <div>
                        <InputLabel className="text-gray-600 font-semibold">Assignment Name</InputLabel>
                        <div className="text-gray-700 text-lg">{assignment.assignmentName}</div>
                    </div>

                    <div>
                        <InputLabel className="text-gray-600 font-semibold">Assignment Question</InputLabel>
                        <div className="text-gray-700 text-lg border border-gray-300 p-4 rounded-md bg-white shadow-sm"  dangerouslySetInnerHTML={{ __html: assignment.assignmentQuestion }} ></div>
                    </div>

                    <div>
                        <InputLabel className="text-gray-600 font-semibold">Assignment Question PDF</InputLabel>
                        <div>{renderElement()}</div>
                    </div>

                    <div>
                        <InputLabel className="text-gray-600 font-semibold">Course ID</InputLabel>
                        <div className="text-gray-700 text-lg">{assignment.courseId}</div>
                    </div>

                    <div>
                        <InputLabel className="text-gray-600 font-semibold">Assignment Max Marks</InputLabel>
                        <div className="text-gray-700 text-lg">{assignment.marks}</div>
                    </div>

                    <div>
                        <InputLabel className="text-gray-600 font-semibold">Start Date and Time</InputLabel>
                        <div className="text-gray-700 text-lg">{formatDate(assignment.startdate)}</div>
                    </div>

                    <div>
                        <InputLabel className="text-gray-600 font-semibold">End Date and Time</InputLabel>
                        <div className="text-gray-700 text-lg">{formatDate(assignment.deadlinedate)}</div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <Button color="primary" variant="shadow" radius='full' onClick={() => window.history.back()}>
                            Go Back
                        </Button>
                        &nbsp;
                        <Button color="warning" variant='shadow' radius='full' onClick={() => window.history.back()}>
                            View Submissions
                        </Button>
                        &nbsp;
                        {renderButton()}
                    </div>
                </div>
            </div>
        </div>
        <Modal backdrop='blur' isOpen={modal} onClose={()=>setModal(false)} >
            <ModalContent>
                {(onClose)=>(
                    <>
                        <ModalHeader className="flex flex-col text-center gap-1" >Change Status</ModalHeader>
                        <ModalBody>
                            <p>Are You Sure you want to {status} the submissions for Assignment ID : {id}?</p>
                        </ModalBody>
                        <ModalFooter className='justify-center' >
                            <Button color="danger" variant="shadow" onPress={onClose}>
                            Cancel
                            </Button>
                            <Button color="primary" variant='shadow' onPress={()=>handleChangeAssignmentStatus()}>
                            Confirm
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
        <ToastContainer/>
        </div>
    );
}
