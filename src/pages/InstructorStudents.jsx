import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function InstructorStudents() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    API.get(`/api/instructor/courses/${courseId}/students`)
      .then((res) => {
        setStudents(res.data || []);
      })
      .catch((err) => console.error("Failed to load students", err));
  }, [courseId]);

  return (
    <div className="page courses-page">

      {/* NAVBAR */}
      <div className="page-navbar">
        <h2 className="page-title">Students</h2>
      </div>

      {/* CONTENT */}
      <div className="page-content">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No students enrolled
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s.id}>
                  <td>{s.student?.id}</td>
                  <td>{s.student?.name}</td>
                  <td>{s.student?.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <button
          className="secondary-btn"
          style={{ marginTop: "20px" }}
          onClick={() => navigate("/instructor/courses")}
        >
          ← Back to My Courses
        </button>
      </div>
    </div>
  );
}

export default InstructorStudents;
