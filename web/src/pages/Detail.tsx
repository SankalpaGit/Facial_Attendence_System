import React, { useState } from "react";
import { FaUser, FaBriefcase, FaBuilding, FaPhone, FaEnvelope } from "react-icons/fa";

const Detail: React.FC = () => {
  const employee = {
    name: "John Doe",
    position: "Software Engineer",
    department: "IT Department",
    contact: "+1 234 567 890",
    email: "john.doe@example.com",
  };

  const attendanceData = [
    { date: "2025-09-30", status: "Present", checkIn: "09:00 AM", checkOut: "05:30 PM" },
    { date: "2025-09-29", status: "Absent", checkIn: "-", checkOut: "-" },
    { date: "2025-09-28", status: "Present", checkIn: "09:15 AM", checkOut: "05:20 PM" },
    { date: "2025-09-27", status: "Absent", checkIn: "-", checkOut: "-" },
  ];

  // State for filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter logic
  const filteredAttendance = attendanceData.filter((entry) => {
    const entryDate = new Date(entry.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const withinRange =
      (!from || entryDate >= from) && (!to || entryDate <= to);

    const matchesStatus =
      statusFilter === "All" || entry.status === statusFilter;

    return withinRange && matchesStatus;
  });

  return (
    <div className="min-h-screen text-gray-800 mt-3">
      {/* Employee Info */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Employee Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <FaUser />
            <span><strong>Name:</strong> {employee.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaBriefcase />
            <span><strong>Position:</strong> {employee.position}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaBuilding />
            <span><strong>Department:</strong> {employee.department}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaPhone />
            <span><strong>Contact:</strong> {employee.contact}</span>
          </div>
          <div className="flex items-center space-x-2 md:col-span-2">
            <FaEnvelope />
            <span><strong>Email:</strong> {employee.email}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From:
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To:
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="All">All</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-yellow-500 text-white">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Check In</th>
              <th className="p-3">Check Out</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.length > 0 ? (
              filteredAttendance.map((entry, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                >
                  <td className="p-3">{entry.date}</td>
                  <td
                    className={`p-3 font-semibold ${
                      entry.status === "Present"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {entry.status}
                  </td>
                  <td className="p-3">{entry.checkIn}</td>
                  <td className="p-3">{entry.checkOut}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No records found for selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Detail;
