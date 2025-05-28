import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; // Pastikan path ini benar

function Layout({ isLoggedIn, user, onLogout }) {
  return (
    <div className="">
      {/* Header hanya akan dirender jika pengguna sudah login */}
      {isLoggedIn && (
        <header className="">
          <div className=""> {/* Anda mungkin ingin class di sini untuk styling header/navbar container */}
            {/* Navbar hanya akan dirender dan mendapatkan username jika pengguna sudah login */}
            <Navbar username={user ? user.username : null} />
            
            {/* Tombol Logout juga hanya relevan jika pengguna sudah login, jadi bisa tetap di sini */}
            <div className=""> {/* Kelas untuk styling container tombol logout jika perlu */}
              <button
                onClick={onLogout}
                className="" // Tambahkan kelas styling untuk tombol logout Anda
              >
                Logout
              </button>
            </div>
          </div>
        </header>
      )}

      <main className="">
        <Outlet /> {/* Konten halaman (Login, Register, Dashboard, dll.) akan dirender di sini */}
      </main>

      <footer className="">
        <div className="">
          {/* Konten footer Anda */}
        </div>
      </footer>
    </div>
  );
}

export default Layout;