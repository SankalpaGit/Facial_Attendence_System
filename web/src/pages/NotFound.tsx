import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="flex  justify-center  ">
      <div className="text-center text-gray-600 mt-10 ">
        <h1 className="text-[8rem] font-extrabold text-yellow-600 drop-shadow-md">
          404
        </h1>
        <p className="text-2xl font-semibold text-gray-700 mt-2">
          Oops! Page Not Found
        </p>
        <p className="text-gray-500 mt-4 mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <a
          href="/dashboard"
          className="bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-transform duration-300 hover:bg-yellow-500 hover:scale-105"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
