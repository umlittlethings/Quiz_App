import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Layout({ isLoggedIn, user, onLogout }) {
  return (
    <div className="">
      <header className="">
        <div className="">
          
          {isLoggedIn && (
            <div className="">
              <span className="">Welcome, <span className="">{user.username}</span>!</span>
              <button 
                onClick={onLogout} 
                className=""
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      
      <main className="">
        <Outlet />
      </main>
      
      <footer className="">
        <div className="">

        </div>
      </footer>
    </div>
  );
}

export default Layout;