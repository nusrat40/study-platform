import React from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const DashboardOverview = () => {
  const userActivity = [
    { name: "Jan", users: 200 },
    { name: "Feb", users: 450 },
    { name: "Mar", users: 600 },
    { name: "Apr", users: 800 },
    { name: "May", users: 1200 },
  ];

  const courseEnrollments = [
    { name: "Course A", count: 300 },
    { name: "Course B", count: 450 },
    { name: "Course C", count: 600 },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold">550+</h2>
          <p>Students Enrolled</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold">100+</h2>
          <p>Satisfaction Rate</p>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold">300+</h2>
          <p>Academic Programs</p>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold">40+</h2>
          <p>Online Instructors</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">User Activity Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userActivity}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Course Enrollments</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseEnrollments}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
