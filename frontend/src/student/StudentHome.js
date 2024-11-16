import React, { useEffect, useState } from 'react'

export default function StudentHome() {

  const [student,setStudent] = useState({
    sid:"",
    sname: "",
    semail: "",
    sdepartment: "",
    gender: "",
    scontact: "",
    dob: "",
    age: "",
    sstatus:""
  })


  const fetch = ()=>{
    const student = JSON.parse(sessionStorage.getItem("student"));
    setStudent(student);
  }
  
  useEffect(()=>{
    fetch();
  },[])

  return (
    <div>
        <h3 style={{textAlign:'center'}} >Hi, {student.sname}</h3>
    </div>
  )
}
