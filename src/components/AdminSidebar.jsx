import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("phia_user");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block py-2 px-3 rounded ${isActive ? "bg-blue-600 text-white" : "hover:bg-blue-50"}`;

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <div className="mb-6 text-lg font-bold text-blue-600">PHIA Admin</div>
      <nav className="space-y-2">
        <NavLink to="/admin" className={linkClass} end>Dashboard</NavLink>
        <NavLink to="/admin/users" className={linkClass}>Manage Users</NavLink>
        <NavLink to="/admin/results" className={linkClass}>Manage Results</NavLink>
        <NavLink to="/admin/payments" className={linkClass}>Manage Payments</NavLink>
      </nav>
      <div className="mt-8">
        <button onClick={handleLogout} className="bg-red-600 text-white w-full py-2 rounded">Logout</button>
      </div>
    </aside>
  );
}