import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import BackendURLS from "./../config";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminHome() {
  const [counts, setCounts] = useState({
    studentCount: 0,
    facultyCount: 0,
    courseCount: 0,
  });

  const getCounts = async () => {
    try {
      const response = await axios.get(`${BackendURLS.Admin}/getcounts`);
      const [studentCount, facultyCount, courseCount] = response.data;
      setCounts({
        studentCount,
        facultyCount,
        courseCount,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCounts();
  }, []);

  // Bar chart data
  const data = {
    labels: ["Students", "Faculty", "Courses"],
    datasets: [
      {
        label: "Counts",
        data: [counts.studentCount, counts.facultyCount, counts.courseCount],
        backgroundColor: ["#3B82F6", "#10B981", "#A855F7"],
        borderColor: ["#2563EB", "#059669", "#9333EA"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Admin Dashboard Statistics" },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Admin Dashboard
        </h1>

        {/* Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {/* Student Count Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform hover:scale-105 hover:shadow-2xl">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Total Students
            </h2>
            <p className="text-4xl font-bold text-blue-500">
              {counts.studentCount}
            </p>
          </div>

          {/* Faculty Count Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform hover:scale-105 hover:shadow-2xl">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Total Faculty
            </h2>
            <p className="text-4xl font-bold text-green-500">
              {counts.facultyCount}
            </p>
          </div>

          {/* Course Count Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform hover:scale-105 hover:shadow-2xl">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Total Courses
            </h2>
            <p className="text-4xl font-bold text-purple-500">
              {counts.courseCount}
            </p>
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
