import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Data_analysis@2x-1.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-between px-10">
      {/* Left Section: Text & Buttons */}
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-4">Welcome to Financial Tracker</h1>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/signup" className="bg-blue-500 text-white py-3 rounded-xl text-center">
            Sign Up
          </Link>
          <Link to="/income" className="bg-green-500 text-white py-3 rounded-xl text-center">
            Income
          </Link>
          <Link to="/expense" className="bg-red-500 text-white py-3 rounded-xl text-center">
            Expenses
          </Link>
          <Link to="/savings" className="bg-yellow-500 text-white py-3 rounded-xl text-center">
            Yearly Savings
          </Link>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="w-1/2 flex justify-end">
        <img
          src={logo}
          alt="Financial Tracker"
          className="w-120 h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Home;
