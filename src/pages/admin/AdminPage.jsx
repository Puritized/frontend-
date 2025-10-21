import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../api";

export default function AdminPage() {
  const [counts, setCounts] = useState({ users: 0, results: 0, payments: 0 });

  useEffect(() => {
    (async () => {
      try {
        const [uRes, rRes, pRes] = await Promise.all([
          api.get("/users"),
          api.get("/results/all"),
          api.get("/payments/all"),
        ]);
        setCounts({ users: uRes.data.length || 0, results: rRes.data.length || 0, payments: pRes.data.length || 0 });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Users</p>
          <p className="text-2xl font-semibold">{counts.users}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Results</p>
          <p className="text-2xl font-semibold">{counts.results}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Payments</p>
          <p className="text-2xl font-semibold">{counts.payments}</p>
        </div>
      </div>
    </AdminLayout>
  );
}