import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import BackendURLS from "../config";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewStudentProfile() {
  const { sid } = useParams();
  const [student, setStudent] = useState({});
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [profileModal, setProfileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // State to track uploaded file


  const fetchStudent = async () => {
    try {
      const response = await axios.get(
        `${BackendURLS.Admin}/fetchstudent/${sid}`
        
      );
      // console.log(response.data)
      setStudent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

 



  return (
     <div>
      <style>
        {`
          :root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --background-color: #ecf0f1;
    --card-background: #ffffff;
    --text-color: #34495e;
    --label-color: #7f8c8d;
  }

  body {
    background-color: var(--background-color);
    font-family: 'Arial', sans-serif;
    color: var(--text-color);
    line-height: 1.6;
    animation: fadeIn 1s ease-in-out;
  }


  .profile-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    transform: scale(0.9);
    animation: slideUp 0.8s ease forwards;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .profile-page__card {
    background-color: var(--card-background);
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 100%;
    max-width: 500px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .profile-page__card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }

  .profile-page__header {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 40px 20px;
    text-align: center;
  }

  .profile-page__image-container {
    width: 150px;
    height: 150px;
    margin: 0 auto 20px;
    border-radius: 50%;
    overflow: hidden;
    border: 5px solid rgba(255, 255, 255, 0.3);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }

  .profile-page__image-container:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  .profile-page__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-page__info {
    padding: 30px;
  }

  .profile-page__field {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 10px;
  }

  .profile-page__label {
    font-weight: bold;
    color: var(--label-color);
  }

  .profile-page__value {
    text-align: right;
  }

  .profile-page__button-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }

  .profile-page__button-container button:hover {
    transform: scale(1.05);
  }

  .profile-page__loading,
  .profile-page__error,
  .profile-page__no-data {
    text-align: center;
    font-size: 18px;
    margin-top: 50px;
    color: var(--text-color);
  }
          `}
      </style>
      <div className="profile-page">
        <div className="profile-page__card">
          <div className="profile-page__header">
            <div className="profile-page__image-container">
              <img
                src={`data:image/jpeg;base64,${student.sprofile}`}
                alt={`${student.sname}'s profile`}
                className="profile-page__image"
              />
            </div>
            <h1 className="profile-page__name">{student.sname}</h1>
            <p className="profile-page__department">{student.sdepartment}</p>
          </div>
          <div className="profile-page__info">
            <div className="profile-page__field">
              <span className="profile-page__label">Student ID:</span>
              <span className="profile-page__value">{student.sid}</span>
            </div>
            <div className="profile-page__field">
              <span className="profile-page__label">Email:</span>
              <span className="profile-page__value">{student.semail}</span>
            </div>
            <div className="profile-page__field">
              <span className="profile-page__label">Contact:</span>
              <span className="profile-page__value">{student.scontact}</span>
            </div>
            <div className="profile-page__field">
              <span className="profile-page__label">Date of Birth:</span>
              <span className="profile-page__value">{student.dob}</span>
            </div>
            <div className="profile-page__field">
              <span className="profile-page__label">Age:</span>
              <span className="profile-page__value">{student.age}</span>
            </div>
            <div className="flex justify-center space-x-2">
              <Button
                color="danger"
                variant="shadow"
                onClick={() => navigate(`/admin/updatestudent/${student.sid}`)}
              >
                Update Student
              </Button>
              <Button
                color="danger"
                variant="shadow"
                onClick={() => navigate(`/admin/viewstudentcourses/${student.sid}`)}
              >
                View Student Courses
              </Button>
              <Button color="secondary" variant="shadow" onClick={()=>window.history.back()}>
              Go back
            </Button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
