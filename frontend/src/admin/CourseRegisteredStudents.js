import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { Pagination, Spinner, Button } from '@nextui-org/react';
import { toast } from 'react-toastify';
import BackendURLS from '../config';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import exportFromJSON from 'export-from-json';

export default function CourseRegisteredStudents() {
    const [studentData, setStudentData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const { cid } = useParams()
    const location = useLocation();
    const { courseName } = location.state||{};
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${BackendURLS.Admin}/courseregisteredstudents?id=${cid}`);
          const activeStudents = response.data
            .filter((student) => student.sstatus === "ACTIVE")
            .map(({ sprofile, ...rest }) => rest);
          setStudentData(activeStudents);
          console.log(response)
          setIsLoading(false);
        } catch (error) {
          console.error(error.message);
        //   console.log(error.response.data);
        }
      };
  
      fetchData();
      
    }, []);
  
   
  
    const spinnerContainerStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    };
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
    const filteredstudents = studentData.filter((student) => {
      const studentCid = student.sid ? student.sid.toString().toLowerCase() : "";
      const studentName = student.sname ? student.sname.toLowerCase() : "";
      const studentDepartment = student.sdepartment
        ? student.sdepartment.toLowerCase()
        : "";
      const query = searchQuery.toLowerCase();
      return (
        studentCid.includes(query) ||
        studentName.includes(query) ||
        studentDepartment.includes(query)
      );
    });
  
    const currentstudents = filteredstudents.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const downloadStudentList = () => {
        const filename = `students_${courseName}_${Date.now()}`;
        const exportType = exportFromJSON.types.csv;
      
        
        const dataToExport = studentData.map(({ sid, sname, sdepartment }) => ({
          sid,            
          sname,          
          sdepartment,    
          coursename: courseName,
        }));
      
        exportFromJSON({ data: dataToExport, fileName: filename, exportType });
      };
  
    
  
    if (isLoading) {
      return (
        <div style={spinnerContainerStyle}>
          <Spinner label="Loading..." color="warning" size="lg" />
        </div>
      );
    }
    return (
      <div>
        <h1 className="text-3xl font-bold text-center mt-3">
          Students Registered for {courseName}
        </h1>
        <div>
          <div className="m-5" align="center">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 mb-4 rounded border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className='flex justify-center' >
            <Button radius='full' onClick={()=>downloadStudentList()} color='success' variant='shadow'>Download Students</Button>
          </div>
          <div className="overflow-x-auto rounded-2xl bg-white mt-4 mx-5">
            <table className="table table-auto">
              <thead>
                <tr>
                  <th align="center" className="text-black">
                    STUDENT ID
                  </th>
                  <th align="center" className="text-black">
                    STUDENT NAME
                  </th>
                  <th align="center" className="text-black">
                    STUDENT DEPARTMENT
                  </th>
                 
                </tr>
              </thead>
              <tbody>
                {currentstudents.length > 0 ? (
                  currentstudents.map((student) => (
                    <tr key={student.sid}>
                      <td align="center">{student.sid}</td>
                      <td align="center">{student.sname}</td>
                      <td align="center">{student.sdepartment}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} align="center">
                      No Student records found!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-3" align="center">
            <Pagination
              loop
              showControls
              color="success"
              total={Math.ceil(filteredstudents.length / itemsPerPage)}
              initialPage={currentPage}
              onChange={paginate} />
            <br/>
            <Button variant='shadow' color='secondary' onClick={()=>window.history.back()} >Go Back</Button>
          </div>
        </div>
        
        <ToastContainer/>
      </div>
    );
}
