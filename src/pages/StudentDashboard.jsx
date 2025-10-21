import React from "react";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <div className="space-x-4">
        <Link to="/results" className="bg-green-500 text-white px-4 py-2 rounded">View Results</Link>
        <Link to="/payment" className="bg-blue-500 text-white px-4 py-2 rounded">Pay Fees</Link>
      </div>
    </div>
  );
}