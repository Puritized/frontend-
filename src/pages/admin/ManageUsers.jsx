import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../api";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/users", form);
      setUsers((s) => [res.data, ...s]);
      setForm({ name: "", email: "", password: "", role: "student" });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Create failed");
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <input className="p-2 border rounded" placeholder="Full name" required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input className="p-2 border rounded" placeholder="Email" type="email" required value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input className="p-2 border rounded" placeholder="Password" type="password" required value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <div className="flex gap-2">
          <select value={form.role} onChange={(e)=>setForm({...form,role:e.target.value})} className="p-2 border rounded flex-1">
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
            <option value="admin">Admin</option>
          </select>
          <button className="bg-blue-600 text-white px-4 rounded" disabled={loading}>{loading ? "Creating..." : "Create"}</button>
        </div>
      </form>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-t">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">
                  <button className="text-red-600" onClick={()=>handleDelete(u._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}