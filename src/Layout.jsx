import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Layout({ isLoggedIn, user, onLogout }) {
  return (
    <div className="app-container min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="text-2xl font-bold">Quiz App</Link>
          
          {isLoggedIn && (
            <div className="user-info flex items-center space-x-4">
              <span className="hidden sm:inline-block">Welcome, <span className="font-semibold">{user.username}</span>!</span>
              <button 
                onClick={onLogout} 
                className="logout-btn bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
      
      <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 text-sm">

        </div>
      </footer>
    </div>
  );
}

export default Layout;