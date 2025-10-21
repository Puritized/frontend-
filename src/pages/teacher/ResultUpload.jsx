import React, { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../api";

export default function ResultUpload() {
  const [form, setForm] = useState({ studentId: "", subject: "", term: "", session: "", firstCA: 0, secondCA: 0, exam: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/results/add", form);
      alert("Result added");
      setForm({ studentId: "", subject: "", term: "", session: "", firstCA: 0, secondCA: 0, exam: 0 });
    } catch (err) {
      console.error(err);
      alert("Add failed");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Upload Student Result</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white p-4 rounded">
        <input placeholder="Student ID" required value={form.studentId} onChange={(e)=>setForm({...form,studentId:e.target.value})} className="p-2 border rounded" />
        <input placeholder="Subject" required value={form.subject} onChange={(e)=>setForm({...form,subject:e.target.value})} className="p-2 border rounded" />
        <input placeholder="Term" required value={form.term} onChange={(e)=>setForm({...form,term:e.target.value})} className="p-2 border rounded" />
        <input placeholder="Session" required value={form.session} onChange={(e)=>setForm({...form,session:e.target.value})} className="p-2 border rounded" />
        <input type="number" placeholder="1st CA" required value={form.firstCA} onChange={(e)=>setForm({...form,firstCA:e.target.value})} className="p-2 border rounded" />
        <input type="number" placeholder="2nd CA" required value={form.secondCA} onChange={(e)=>setForm({...form,secondCA:e.target.value})} className="p-2 border rounded" />
        <input type="number" placeholder="Exam" required value={form.exam} onChange={(e)=>setForm({...form,exam:e.target.value})} className="p-2 border rounded" />
        <div className="md:col-span-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
        </div>
      </form>
    </AdminLayout>
  );
}