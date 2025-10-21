import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../api";

export default function ManageResults() {
  const [results, setResults] = useState([]);
  const [form, setForm] = useState({ studentId: "", term: "", session: "", subject: "", firstCA: 0, secondCA: 0, exam: 0 });

  const fetchAll = async () => {
    try {
      const res = await api.get("/results/all");
      setResults(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    // API expects teacher to call POST /results/add with required fields
    try {
      await api.post("/results/add", {
        studentId: form.studentId,
        subject: form.subject,
        term: form.term,
        session: form.session,
        firstCA: form.firstCA,
        secondCA: form.secondCA,
        exam: form.exam
      });
      setForm({ studentId: "", term: "", session: "", subject: "", firstCA: 0, secondCA: 0, exam: 0 });
      fetchAll();
    } catch (err) { console.error(err); alert("Add failed"); }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`/results/approve/${id}`);
      setResults(results.map(r => r._id === id ? { ...r, approved: true } : r));
    } catch (err) { console.error(err); alert("Approve failed"); }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Manage Results</h1>

      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-7 gap-2 mb-6 bg-white p-3 rounded">
        <input required placeholder="Student ID" value={form.studentId} onChange={(e)=>setForm({...form,studentId:e.target.value})} className="p-2 border rounded"/>
        <input required placeholder="Term" value={form.term} onChange={(e)=>setForm({...form,term:e.target.value})} className="p-2 border rounded"/>
        <input required placeholder="Session" value={form.session} onChange={(e)=>setForm({...form,session:e.target.value})} className="p-2 border rounded"/>
        <input required placeholder="Subject" value={form.subject} onChange={(e)=>setForm({...form,subject:e.target.value})} className="p-2 border rounded"/>
        <input type="number" placeholder="1st CA" value={form.firstCA} onChange={(e)=>setForm({...form,firstCA:e.target.value})} className="p-2 border rounded"/>
        <input type="number" placeholder="2nd CA" value={form.secondCA} onChange={(e)=>setForm({...form,secondCA:e.target.value})} className="p-2 border rounded"/>
        <div className="flex">
          <input type="number" placeholder="Exam" value={form.exam} onChange={(e)=>setForm({...form,exam:e.target.value})} className="p-2 border rounded flex-1 mr-2"/>
          <button className="bg-blue-600 text-white px-4 rounded">Add</button>
        </div>
      </form>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Student</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Total</th>
              <th className="p-3">Grade</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map(r => (
              <tr key={r._id} className="border-t">
                <td className="p-3">{r.studentId?.name || r.studentId}</td>
                <td className="p-3">{r.subject}</td>
                <td className="p-3">{r.total}</td>
                <td className="p-3">{r.grade}</td>
                <td className="p-3">{r.approved ? "Approved" : "Pending"}</td>
                <td className="p-3">
                  {!r.approved && <button onClick={()=>handleApprove(r._id)} className="text-green-600">Approve</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}