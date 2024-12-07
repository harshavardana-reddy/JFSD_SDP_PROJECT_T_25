import React, { useEffect, useState } from "react";
import axios from "axios";
import BackendURLS from "../config";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function FacultyDashboard() {
  const [faculty, setFaculty] = useState({
    fid: "",
    fname: "",
    femail: "",
    fdepartment: "",
    gender: "",
    fcontact: "",
    dob: "",
    age: "",
    sstatus: "",
  });

  const [counts, setCounts] = useState({
    registeredCourseCount: 0,
    instructorCourseCount: 0,
    pendingEvaluationCount: 0,
    completedEvaluationCount: 0,
  });

  const getCounts = async () => {
    if (!faculty.fid) {
      console.error("Faculty ID is missing");
      return;
    }

    try {
      const response = await axios.get(
        `${BackendURLS.Faculty}/getcounts?id=${faculty.fid}`
      );
      const [
        registeredCourseCount,
        instructorCourseCount,
        pendingEvaluationCount,
        completedEvaluationCount,
      ] = response.data;
      setCounts({
        registeredCourseCount,
        instructorCourseCount,
        pendingEvaluationCount,
        completedEvaluationCount,
      });
    } catch (error) {
      console.log("Error fetching counts:", error);
    }
  };

  useEffect(() => {
    const object = JSON.parse(sessionStorage.getItem("faculty"));
    setFaculty(object);
  }, []);

  useEffect(() => {
    if (faculty.fid) {
      getCounts();
    }
  }, [faculty.fid]);

  const chartData = {
    labels: [
      "Registered Courses",
      "Instructor Courses",
      "Pending Evaluations",
      "Completed Evaluations",
    ],
    datasets: [
      {
        label: "Counts",
        data: [
          counts.registeredCourseCount,
          counts.instructorCourseCount,
          counts.pendingEvaluationCount,
          counts.completedEvaluationCount,
        ],
        backgroundColor: ["#3498db", "#2ecc71", "#e74c3c", "#9b59b6"],
        borderColor: ["#2980b9", "#27ae60", "#c0392b", "#8e44ad"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 text-center">
        Faculty Dashboard
      </h1>
      <h2 className="text-2xl text-gray-600 text-center mt-4">
        Welcome, {faculty.fname}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {[
          { label: "Registered Courses", value: counts.registeredCourseCount },
          { label: "Instructor Courses", value: counts.instructorCourseCount },
          { label: "Pending Evaluations", value: counts.pendingEvaluationCount },
          {
            label: "Completed Evaluations",
            value: counts.completedEvaluationCount,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-center p-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-2 transition duration-300"
          >
            <h3 className="text-lg font-semibold">
              {item.label}
            </h3>
            <p className="text-3xl font-bold">
              {item.value}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Performance Overview
        </h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
}
