import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

interface EmployeeData {
  name: string;
  dept: string;
  contact: string;
  email: string;
}

const Employee: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeData[]>([
    { name: "John Doe", dept: "IT", contact: "123-456-7890", email: "john@example.com" },
    { name: "Jane Smith", dept: "HR", contact: "987-654-3210", email: "jane@example.com" },
    { name: "Michael Brown", dept: "Finance", contact: "555-666-7777", email: "michael@example.com" },
    { name: "Emily Davis", dept: "Marketing", contact: "111-222-3333", email: "emily@example.com" },
    { name: "Robert Wilson", dept: "Operations", contact: "444-555-6666", email: "robert@example.com" },
    { name: "Sophia Lee", dept: "Design", contact: "777-888-9999", email: "sophia@example.com" },
    { name: "David Miller", dept: "Engineering", contact: "000-111-2222", email: "david@example.com" },
  ]);

  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(employees.length / rowsPerPage);

  // Filtering
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.dept.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortOption === "name-asc") return a.name.localeCompare(b.name);
    if (sortOption === "name-desc") return b.name.localeCompare(a.name);
    if (sortOption === "dept-asc") return a.dept.localeCompare(b.dept);
    if (sortOption === "dept-desc") return b.dept.localeCompare(a.dept);
    return 0;
  });

  // Pagination
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = sortedEmployees.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  // Avatar initials
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">List of Employees</h2>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-1/3"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="name-asc">Name (A - Z)</option>
          <option value="name-desc">Name (Z - A)</option>
          <option value="dept-asc">Department (A - Z)</option>
          <option value="dept-desc">Department (Z - A)</option>
        </select>
      </div>

      {/* Employee Table */}
      <div className="rounded-xl overflow-hidden">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-amber-400 text-gray-600 uppercase text-left">
            <tr>
              <th className="px-6 py-3">Avatar</th>
              <th className="px-6 py-3">Employee Name</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Gmail</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((emp, index) => (
              <tr
                key={index}
                className="odd:bg-gray-50 even:bg-gray-100 border-b border-gray-200 hover:bg-gray-200 transition"
              >
                <td className="px-6 py-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-500 text-white font-bold">
                    {getInitials(emp.name)}
                  </div>
                </td>
                <td className="px-6 py-3 font-medium">{emp.name}</td>
                <td className="px-6 py-3">{emp.dept}</td>
                <td className="px-6 py-3">{emp.contact}</td>
                <td className="px-6 py-3">{emp.email}</td>
                <td className="px-6 py-3 flex gap-3">
                  <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() =>
                      setEmployees(employees.filter((_, i) => i !== index))
                    }
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center items-center p-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 flex items-center justify-center"
          >
            <FaChevronLeft />
          </button>

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
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 flex items-center justify-center"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Employee;
