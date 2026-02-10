import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/admin.css";

function AdminInstructors() {
  const [instructors, setInstructors] = useState([]);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const instructorsPerPage = 10;

  useEffect(() => {
    API.get("/api/admin/instructors")
      .then(res => setInstructors(res.data))
      .catch(console.error);
  }, []);

  const deleteInstructor = async (id) => {
    if (!window.confirm("Delete this instructor?")) return;

    try {
      await API.delete(`/api/admin/instructors/${id}`);
      setInstructors(prev => prev.filter(i => i.id !== id));
    } catch {
      alert("Failed to delete instructor");
    }
  };

  // pagination calculations
  const totalPages = Math.ceil(instructors.length / instructorsPerPage);
  const startIndex = (currentPage - 1) * instructorsPerPage;
  const endIndex = startIndex + instructorsPerPage;
  const paginatedInstructors = instructors.slice(startIndex, endIndex);

  return (
    <div className="admin-page admin-table-page">

      {/* NAVBAR */}
      <div className="admin-navbar admin-navbar--table">
        <div className="admin-navbar-title">All Instructors</div>
      </div>

      {/* TABLE */}
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
            {paginatedInstructors.map(i => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.name}</td>
                <td>{i.email}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    className="admin-delete-btn"
                    onClick={() => deleteInstructor(i.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="admin-pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Prev
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

export default AdminInstructors;
