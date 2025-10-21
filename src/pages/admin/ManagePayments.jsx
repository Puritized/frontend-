import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../api";

export default function ManagePayments() {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const res = await api.get("/payments/all");
      setPayments(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchPayments(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/payments/${id}`, { status });
      setPayments(payments.map(p => p._id === id ? { ...p, status } : p));
    } catch (err) { console.error(err); alert("Update failed"); }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Manage Payments</h1>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Ref</th>
              <th className="p-3">Parent</th>
              <th className="p-3">Student</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr className="border-t" key={p._id}>
                <td className="p-3">{p.reference}</td>
                <td className="p-3">{p.parentId?.name || p.parentId}</td>
                <td className="p-3">{p.studentId?.name || p.studentId}</td>
                <td className="p-3">₦{((p.amount||0)/100).toFixed(2)}</td>
                <td className="p-3">{p.status}</td>
                <td className="p-3">
                  {p.status !== "success" && <button onClick={()=>updateStatus(p._id,"success")} className="text-green-600 mr-2">Mark Success</button>}
                  {p.status !== "failed" && <button onClick={()=>updateStatus(p._id,"failed")} className="text-red-600">Mark Failed</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}