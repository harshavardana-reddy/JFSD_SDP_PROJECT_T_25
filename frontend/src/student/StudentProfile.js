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

export default function StudentProfile() {
  const [student, setStudent] = useState({});
  const [modal, setModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // State to track uploaded file
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [IP,setIP] = useState("");

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    console.log(res.data);
    setIP(res.data.ip);
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);


  const fetchStudent = async () => {
    try {
      const object = JSON.parse(sessionStorage.getItem("student"));
      setStudent(object);
    } catch (error) {
      console.error("Error fetching student from session:", error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const getUpdatedStudent = async () => {
    try {
      const response = await axios.get(
        `${BackendURLS.Student}/viewstudent?id=${student.sid}`
      );
      setStudent(response.data);
      sessionStorage.setItem("student", JSON.stringify(response.data)); // Update with response data
    } catch (error) {
      console.error("Error fetching updated student:", error);
      toast.error("Error fetching updated student data.");
    }
  };

  const changePassword = async()=>{
    if(oldpassword === newpassword){
      toast.warn("Old Password and New Password Are same.")
      return;
    }
    if(newpassword!==confirmPassword){
      toast.warn("New Password and Confirm Password Are not same.")
      return;
    }


    const data = {
      sid:student.sid,
      oldpassword:oldpassword,
      newpassword:newpassword,
      ip:IP
    }
    const loadingToast = toast.loading("Changing Password",{closeButton:true});
    try {
      const response = await axios.put(`${BackendURLS.Student}/changepassword`,data);
      if(response.status === 200){
        toast.update(loadingToast,{
          render:response.data,
          type:"success",
          isLoading:false,
          theme:'colored',
          autoClose: 3000,
        })
        setProfileModal(false)
      }
    } catch (error) {
      console.log(error);
      if(error.response){
        toast.update(loadingToast,{
          render:error.response.data,
          type:"error",
          isLoading:false,
          theme:'colored',
          autoClose: 3000,
        })
      }
    }
  }

  const updateProfilePicture = async () => {
    if (!selectedFile) {
      toast.error("Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("profileData", selectedFile);
    formData.append("id", student.sid);

    // Display loading toast
    const loadingToast = toast.loading("Updating profile picture...");

    try {
      // eslint-disable-next-line
      const response = await axios.put(
        `${BackendURLS.Student}/updatestudentprofile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.update(loadingToast, {
        render: "Profile Picture Updated Successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      getUpdatedStudent();
      setModal(false); // Close the modal after success
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.update(loadingToast, {
        render: "Failed to update profile picture.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

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
            <div className="flex justify-center ">
              <Button
                color="success"
                variant="shadow"
                className="mr-2"
                onClick={() => setModal(true)}
              >
                Update Profile Picture
              </Button>
              <Button
                color="danger"
                variant="shadow"
                onClick={() => setProfileModal(true)}
              >
                Update Password
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modal} backdrop="blur" onClose={() => setModal(false)}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Update Profile Picture</ModalHeader>
              <ModalBody>
                <div>
                  <label
                    htmlFor="profile-picture"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Upload a new profile picture
                  </label>
                  <input
                    type="file"
                    id="profile-picture"
                    accept="image/*"
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={() => updateProfilePicture()}>
                  Save
                </Button>
                <Button color="error" onClick={() => setModal(false)}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={profileModal} onClose={() => setProfileModal(false)}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Change Password</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="current-password"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Current Password
                    </label>
                    <Input
                      type="password"
                      id="current-password"
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring focus:ring-primary-300 focus:outline-none"
                      placeholder="Enter current password"
                      onChange={(e) =>
                        setOldPassword(e.target.value)
                      } // Update state here
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="new-password"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>
                    <Input
                      type="password"
                      id="new-password"
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring focus:ring-primary-300 focus:outline-none"
                      placeholder="Enter new password"
                      onChange={(e) =>
                        setNewPassword(e.target.value)
                      } // Update state here
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Confirm New Password
                    </label>
                    <Input
                      type="password"
                      id="confirm-password"
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring focus:ring-primary-300 focus:outline-none"
                      placeholder="Confirm new password"
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      } 
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="success"
                  onClick={() => changePassword()}
                >
                  Save
                </Button>
                <Button color="error" onClick={() => setProfileModal(false)}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <ToastContainer />
    </div>
  );
}
