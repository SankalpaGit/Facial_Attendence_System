import React, { useState } from "react";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="flex justify-end items-center bg-gray-50 shadow p-4">
      <div className="flex items-center gap-6 mr-6">
        {/* Search */}
        <div className="relative">
          {showSearch ? (
            <input
              type="text"
              placeholder="Search..."
              className="border border-yellow-500 rounded-md px-3 py-1 pr-8 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              autoFocus
              onBlur={() => setShowSearch(false)} // hides when losing focus
            />
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 hover:bg-yellow-100 rounded-full"
            >
              <FaSearch className="h-6 w-6 text-yellow-600" />
            </button>
          )}
        </div>

        {/* Notification */}
        <button className="p-2 hover:bg-yellow-100 rounded-full">
          <FaBell className="h-6 w-6 text-yellow-600" />
        </button>

        {/* Profile */}
        <button className="p-2 hover:bg-yellow-100 rounded-full">
          <FaUserCircle className="h-8 w-8 text-yellow-600" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
