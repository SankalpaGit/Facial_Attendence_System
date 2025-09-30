import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserPlus,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt className="text-xl" /> },
    { to: "/enroll", label: "Enroll", icon: <FaUserPlus className="text-xl" /> },
    { to: "/employee", label: "Employee", icon: <FaUsers className="text-xl" /> },
  ];

  return (
    <aside className="w-1/6 lg:w-[20%] bg-yellow-700 text-white h-screen p-6 hidden md:flex flex-col justify-between shadow-lg">
      {/* Top Section */}
      <div>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">HR Portal</h1>
          <p className="text-sm text-gray-200">Attendance System</p>
        </div>

        {/* Divider */}
        <hr className="border-yellow-400 mb-6" />

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-6 px-5 py-3 rounded-md text-lg font-medium transition-colors duration-200
                ${
                  location.pathname === link.to
                    ? "bg-yellow-600 text-black font-semibold"
                    : "hover:bg-yellow-500 hover:text-black"
                }`}
            >
              {link.icon} <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-1">
        <Link
          to="/settings"
          className={`flex items-center gap-4 px-4 py-3 rounded-md text-lg font-medium transition-colors duration-200
            ${
              location.pathname === "/settings"
                ? "bg-yellow-500 text-black font-semibold"
                : "hover:bg-yellow-500 hover:text-black"
            }`}
        >
          <FaCog className="text-xl" /> <span>Settings</span>
        </Link>
        <Link
          to="/logout"
          className="flex items-center gap-4 px-4 py-3 rounded-md text-lg font-medium hover:bg-red-500 hover:text-white transition-colors duration-200"
        >
          <FaSignOutAlt className="text-xl" /> <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
