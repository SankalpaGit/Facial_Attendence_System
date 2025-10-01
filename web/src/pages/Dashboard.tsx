import React, { useState } from "react";
import { FaUsers, FaCheckCircle, FaTimesCircle, FaClock, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "Total Employees",
      value: 3,
      icon: <FaUsers className="text-blue-500 text-3xl" />,
      border: "border-l-4 border-blue-500",
    },
    {
      title: "Present Today",
      value: 0,
      icon: <FaCheckCircle className="text-green-500 text-3xl" />,
      border: "border-l-4 border-green-500",
    },
    {
      title: "Late Today",
      value: 0,
      icon: <FaClock className="text-yellow-500 text-3xl" />,
      border: "border-l-4 border-yellow-500",
    },
    {
      title: "Absent Today",
      value: 3,
      icon: <FaTimesCircle className="text-red-500 text-3xl" />,
      border: "border-l-4 border-red-500",
    },
  ];

  // Dummy employee data
  const employees = [
    { name: "John Doe", dept: "IT", checkIn: "09:05 AM", checkOut: "05:30 PM" },
    { name: "Jane Smith", dept: "HR", checkIn: "09:15 AM", checkOut: "05:20 PM" },
    { name: "Michael Brown", dept: "Finance", checkIn: "09:00 AM", checkOut: "05:15 PM" },
    { name: "Emily Davis", dept: "Marketing", checkIn: "09:30 AM", checkOut: "05:40 PM" },
    { name: "Robert Wilson", dept: "Operations", checkIn: "09:10 AM", checkOut: "05:25 PM" },
    { name: "Sophia Lee", dept: "Design", checkIn: "09:25 AM", checkOut: "05:35 PM" },
    { name: "David Miller", dept: "Engineering", checkIn: "09:20 AM", checkOut: "05:10 PM" },
  ];

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(employees.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = employees.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex items-center justify-between bg-white p-4 rounded-xl shadow-md ${stat.border}`}
          >
            <div>
              <p className="text-gray-600">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
            {stat.icon}
          </div>
        ))}
      </div>

      {/* Employee Table */}
      <div className="rounded-xl overflow-hidden">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-amber-400 text-gray-600 uppercase text-left">
            <tr>
              <th className="px-6 py-3">Employee Name</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Check-In</th>
              <th className="px-6 py-3">Check-Out</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((emp, index) => (
              <tr
                key={index}
                className="odd:bg-gray-50 even:bg-gray-100 border-b border-gray-200 hover:bg-gray-200 transition"
              >
                <td className="px-6 py-3 font-medium">{emp.name}</td>
                <td className="px-6 py-3">{emp.dept}</td>
                <td className="px-6 py-3">{emp.checkIn}</td>
                <td className="px-6 py-3">{emp.checkOut}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center p-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 rounded disabled:opacity-50 flex items-center justify-center"
          >
            <FaChevronLeft />
          </button>

          {/* Page Numbers */}
          <div className="flex gap-2 mx-3">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-amber-400 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1  rounded disabled:opacity-50 flex items-center justify-center"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
