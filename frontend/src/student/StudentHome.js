import React, { useEffect, useState } from 'react';
import BackendURLS from './../config';
import axios from 'axios';

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StudentHome() {
  const [student, setStudent] = useState({
    sid: '',
    sname: '',
    semail: '',
    sdepartment: '',
    gender: '',
    scontact: '',
    dob: '',
    age: '',
    sstatus: '',
  });
  const [counts, setCounts] = useState({});

  const getCounts = async () => {
    try {
      const response = await axios.get(`${BackendURLS.Student}/getcounts?id=${student.sid}`);
      const [pendingAssignmentCount, courseRegisteredCount, assignmentOverdueCount] = response.data;
      setCounts({
        pendingAssignmentCount,
        courseRegisteredCount,
        assignmentOverdueCount,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (student.sid) {
      getCounts();
    }
  }, [student.sid]);

  const fetchStudent = () => {
    const student = JSON.parse(sessionStorage.getItem('student'));
    setStudent(student);
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BackendURLS.Student}/getdailysubmission?id=${student.sid}`);
        const data = response.data;

        // Prepare chart data
        const labels = Object.keys(data).sort(); // Dates sorted
        const values = labels.map((date) => data[date]);

        setChartData({
          labels,
          datasets: [
            {
              label: "Daily Submissions - Line",
              data: values,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              fill: false, // No fill for the line chart
              tension: 0.4, // Smooth curves for the line graph
            },
            {
              label: "Daily Submissions - Scatter",
              data: labels.map((date, index) => ({
                x: date,
                y: values[index],
              })),
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.6)",
              pointRadius: 5, // Scatter dot size
              showLine: false, // No line for the scatter plot
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    if (student.sid) {
      fetchData();
    }
  }, [student.sid]);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-center mb-4">Welcome, {student.sname}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg p-6 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
    <h3 className="text-xl font-bold">Pending Assignments</h3>
    <p className="text-3xl font-semibold">{counts.pendingAssignmentCount || 0}</p>
  </div>
  <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-lg shadow-lg p-6 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
    <h3 className="text-xl font-bold">Registered Courses</h3>
    <p className="text-3xl font-semibold">{counts.courseRegisteredCount || 0}</p>
  </div>
  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-lg p-6 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
    <h3 className="text-xl font-bold">Overdue Assignments</h3>
    <p className="text-3xl font-semibold">{counts.assignmentOverdueCount || 0}</p>
  </div>
</div>

      <div className='bg-white rounded-lg shadow-lg'>
        <h2 className="text-xl font-bold text-center mb-4">Daily Submissions Chart</h2>
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Line and Scatter Graph of Daily Submissions",
              },
            },
            layout: {
              padding: 20, // Padding for the chart area
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Date",
                },
                type: "category",
              },
              y: {
                title: {
                  display: true,
                  text: "Number of Submissions",
                },
              },
            },
            elements: {
              point: {
                radius: 5, 
              },
            },
            backgroundColor: 'white', 
          }}
        />
      </div>
    </div>
  );
}
