import { NextUIProvider } from '@nextui-org/react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminNavBar from './admin/AdminNavBar';
import FacultyNavbar from './faculty/FacultyNavbar';
import StudentNavBar from './student/StudentNavBar';
import MainNavBar from './components/MainNavBar';

function App() {
  const [isAdminLoggedIn,setIsAdminLoggedIn] = useState(false);
  const [isFacultyLoggedIn,setIsFacultyLoggedIn] = useState(false);
  const [isStudentLoggedIn,setIsStudentLoggedIn] = useState(false);

  useEffect(() => {
    const adminLoggedIn = sessionStorage.getItem("isAdminLoggedIn") === "true";
    const facultyLoggedIn = sessionStorage.getItem("isFacultyLoggedIn") === "true";
    const studentLoggedIn = sessionStorage.getItem("isStudentLoggedIn") === "true";

    setIsAdminLoggedIn(adminLoggedIn);
    setIsFacultyLoggedIn(facultyLoggedIn);
    setIsStudentLoggedIn(studentLoggedIn);
  }, [])

  const onAdminLogin = ()=>{
    sessionStorage.setItem("isAdminLoggedIn", "true");
    setIsAdminLoggedIn(true);
  }

  const onFacultyLogin = ()=>{
    sessionStorage.setItem("isFacultyLoggedIn", "true");
    setIsFacultyLoggedIn(true);
  }

  const onStudentLogin = ()=>{
    sessionStorage.setItem("isStudentLoggedIn", "true");
    setIsStudentLoggedIn(true);
  }
  

  return (
    <NextUIProvider>
      <div className="App">
        <BrowserRouter>
          {isAdminLoggedIn?(
            <AdminNavBar/>
          ):isFacultyLoggedIn?(
            <FacultyNavbar/>
          ):isStudentLoggedIn?(
            <StudentNavBar/>
          ):(
            <MainNavBar
              onAdminLogin={onAdminLogin}
              onFacultyLogin={onFacultyLogin}
              onStudentLogin={onStudentLogin}
            />
          )}
        </BrowserRouter>
      </div>
    </NextUIProvider>
  );
}

export default App;
