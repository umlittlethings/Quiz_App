import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ username }) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
  e.preventDefault();
  if (search.trim()) {
    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    setSearch('');
  }
};

  return (
    <nav className="p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to={username ? "/dashboard" : "/"} className="hover:opacity-75">
          <img src="/image/Logos/main-logo-two.svg" alt="App Logo" className="h-10" />
        </Link>
      </div>
      {username && (
        <form
          onSubmit={handleSearch}
          className="flex-grow flex justify-center px-2 sm:px-4"
        >
          <div className="flex w-270 items-center space-x-2">
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search quizzes..."
              className="flex-grow py-2 px-4 rounded-xl shadow-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="py-2 px-4 bg-main text-white rounded-2xl shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all"
              aria-label="Search"
            >
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </form>
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