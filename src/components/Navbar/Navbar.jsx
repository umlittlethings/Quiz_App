import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ username }) {
  return (
    <nav className="p-4 flex justify-between items-center">

      <div className="text-xl font-bold">
        <Link to={username ? "/dashboard" : "/"} className="hover:opacity-75">
          <img src="/image/Logos/main-logo-two.svg" alt="App Logo" className="h-10" />
        </Link>
      </div>
      {username && (
        <div className="flex-grow flex justify-center px-2 sm:px-4"> 
          <div className="flex w-270 items-center space-x-2"> 
            <input
              type="search"
              placeholder="Search quizzes..."
              className="flex-grow py-2 px-4 rounded-xl shadow-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              type="submit" 
              className="py-2 px-4 bg-main text-white rounded-2xl shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all"
              aria-label="Search"
            >
                <span className="hidden sm:inline">Start Quiz</span>
            </button>
          </div>
        </div>
      )}


      <div className="flex items-center">
        {username && (
          <span className="mr-2 sm:mr-4 text-gray-700 font-medium text-sm sm:text-base">
            Hi, {username}!
          </span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;