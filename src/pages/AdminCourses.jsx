import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/admin.css";

function AdminCourses() {
  const [courses, setCourses] = useState([]);

  /* ===== PAGINATION STATE ===== */
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10;

  useEffect(() => {
    API.get("/api/admin/courses")
      .then(res => setCourses(res.data))
      .catch(console.error);
  }, []);

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      await API.delete(`/api/admin/courses/${id}`);
      setCourses(prev => prev.filter(c => c.id !== id));
    } catch {
      alert("Failed to delete course");
    }
  };

  /* ===== PAGINATION LOGIC ===== */
  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const paginatedCourses = courses.slice(startIndex, endIndex);

  return (
    <div className="admin-page admin-table-page">

      {/* ===== NAVBAR ===== */}
      <div className="admin-navbar admin-navbar--table">
        <div className="admin-navbar-title">All Courses</div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="admin-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedCourses.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.title}</td>
                <td>{c.description}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    className="admin-delete-btn"
                    onClick={() => deleteCourse(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {paginatedCourses.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ===== PAGINATION ===== */}
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

export default AdminCourses;
