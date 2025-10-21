import React, { useState, useEffect, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

export default function ResultPage() {
  const { user } = useContext(AuthContext);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (user) {
      api.get(`/results/${user.id}`).then((res) => setResults(res.data));
    }
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Results</h2>
      {results.map((r) => (
        <div key={r._id} className="border p-3 mb-3 rounded bg-white shadow">
          <h3 className="font-semibold">{r.term} - {r.session}</h3>
          <table className="w-full mt-2 border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th>Subject</th><th>CA</th><th>Exam</th><th>Total</th><th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {r.subjects.map((s, i) => (
                <tr key={i}>
                  <td>{s.name}</td>
                  <td>{s.ca}</td>
                  <td>{s.exam}</td>
                  <td>{s.total}</td>
                  <td>{s.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}