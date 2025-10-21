import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout"; // reuse layout to keep UI consistent

export default function TeacherDashboard() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
      <div className="space-x-4">
        <Link to="/teacher/results/upload" className="bg-green-500 text-white px-4 py-2 rounded">Upload Results</Link>
        <Link to="/teacher/results/view" className="bg-blue-500 text-white px-4 py-2 rounded">View Results</Link>
      </div>
    </AdminLayout>
  );
}