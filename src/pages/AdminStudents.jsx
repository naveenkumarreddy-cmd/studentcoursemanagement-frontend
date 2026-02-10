import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/admin.css";

function AdminStudents() {
  const [students, setStudents] = useState([]);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  useEffect(() => {
    API.get("/api/admin/students")
      .then((res) => setStudents(res.data))
      .catch(console.error);
  }, []);

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await API.delete(`/api/admin/students/${id}`);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert("Failed to delete student");
    }
  };

  // pagination calculations
  const totalPages = Math.ceil(students.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const paginatedStudents = students.slice(startIndex, endIndex);

  return (
    <div className="admin-page admin-table-page">

      {/* ===== NAVBAR (TITLE ONLY) ===== */}
      <div className="admin-navbar admin-navbar--table">
        <div className="admin-navbar-title">All Students</div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="admin-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedStudents.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    className="admin-delete-btn"
                    onClick={() => deleteStudent(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ===== PAGINATION ===== */}
        {totalPages > 1 && (
          <div className="admin-pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminStudents;
