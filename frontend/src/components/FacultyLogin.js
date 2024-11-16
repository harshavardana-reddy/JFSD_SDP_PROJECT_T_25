import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import BackendURLS from "../config";
import Loginimg from "./images/Faculty.png";
import { useNavigate } from "react-router-dom";

export default function FacultyLogin({onFacultyLogin}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const faculty = { username, password };

    try {
      const response = await axios.post(
        `${BackendURLS.Faculty}/checkfacultylogin`,
        faculty
      );
      if (response.status === 200 || response.status === 201) {
        onFacultyLogin();
        toast.success("Successfully logged in",{theme:'colored'});
        sessionStorage.setItem("faculty",JSON.stringify(response.data));
        setTimeout(()=>{
          navigate("/faculty/facultyhome");
        },1000)
      }
    } catch (error) {
      toast.error("Error in Login: " + (error.response?.data || error.message));
    }

    //console.log("Username:", username, "Password:", password);
  };

  return (
    <div>
      <div>
        <style>
          {`
          .float-animation {
            animation: float 3s ease-in-out infinite;
          }

          @keyframes float {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
        </style>
        <div className="max-w-[1300px] w-full h-[800px] mx-auto text-center flex flex-col justify-center border shadow-xl px-20 bg-[#E6ECF0] rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-6xl font-bold">FACULTY LOGIN</h1>
              <br />
              <form className="flex flex-col space-y-1" onSubmit={handleSubmit}>
                <label
                  htmlFor="username"
                  className="text-3xl font-bold text-left"
                >
                  Username
                </label>
                <input
                  className="border p-2"
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p style={{ color: "red" }}>
                  Note : Username is your Faculty ID.
                </p>
                <label
                  htmlFor="password"
                  className="text-3xl font-bold text-left"
                >
                  Password
                </label>
                <input
                  className="border p-2"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />

                <button className="bg-blue-500 text-white p-2 rounded">
                  Sign In
                </button>
              </form>
            </div>
            <img
              className="w-[450px] mx-auto my-4 adminimg float-animation"
              src={Loginimg}
              alt="Admin login"
            />
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
