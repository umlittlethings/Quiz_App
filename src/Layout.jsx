import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar'; // Pastikan path ini sesuai

function Layout({ isLoggedIn, user, onLogout }) {
  return (
    <div className="min-h-screen flex flex-col font-poppins ">
      {/* Header */}
      {isLoggedIn && (
        <header className='sticky top-0 z-50 bg-white'>
          <Navbar username={user ? user.username : null} />
        </header>
      )}

      {/* Body: Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar hanya ditampilkan jika login */}
        {isLoggedIn && (
          <aside className="w-64 sticky top-20 h-fit bg-white">
            <Sidebar onLogout={onLogout} />
          </aside>

        )}

        {/* Konten Utama */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

    
    </div>
  );
}

export default Layout;
