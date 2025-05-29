import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Bell,
  BarChart2,
  Clock,
  LogOut
} from "lucide-react";

function Sidebar({ onLogout }) {
  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 cursor-pointer p-2 rounded-[5px] font-medium transition-colors duration-300 ease-in-out ${
      isActive ? "text-white bg-main" : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <div className="w-64 h-full flex flex-col justify-between">
      <div>
        <nav className="flex flex-col gap-4 px-4 mt-6">
          <NavLink to="/dashboard" className={navItemClass}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/notification" className={navItemClass}>
            <Bell size={20} />
            <span>Notification</span>
          </NavLink>
          <NavLink to="/achievements" className={navItemClass}>
            <BarChart2 size={20} />
            <span>Achievements</span>
          </NavLink>
          <NavLink to="/quiz-history" className={navItemClass}>
            <Clock size={20} />
            <span>Quiz History</span>
          </NavLink>
        </nav>

        <div className="mt-8 mx-4 bg-blue-600 text-white rounded-2xl p-4 flex flex-col items-center">
          <p className="text-sm font-semibold">Support 24/7</p>
          <p className="text-xs text-blue-100 mb-3">Contact us anytime</p>
          <button className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
            Start
          </button>
          <img
            src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
            alt="Support Illustration"
            className="w-24 mt-3"
          />
        </div>
      </div>

      <div className="p-4 pt-20">
        <button
          className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600 w-full"
          onClick={onLogout}
        >
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;