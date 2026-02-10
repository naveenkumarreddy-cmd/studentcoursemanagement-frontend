import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import   "../styles/courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get("/api/courses")
      .then(res => setCourses(res.data))
      .catch(console.error);

    if (user?.role === "STUDENT") {
      API.get("/api/enrollments/my")
        .then(res => setEnrolledIds(res.data.map(e => e.courseId)))
        .catch(() => {});
    }
  }, [user?.role]);

  const totalPages = Math.ceil(courses.length / rowsPerPage);
  const start = (currentPage - 1) * rowsPerPage;
  const currentCourses = courses.slice(start, start + rowsPerPage);

  const enroll = async (id) => {
    await API.post(`/api/enrollments/course/${id}`);
    setEnrolledIds(prev => [...prev, id]);
  };

  return (
    <div className="student-page">

      {/* Navbar ONLY title */}
      <Navbar title="Courses" />

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Trainer</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentCourses.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.title}</td>
                <td>{c.description}</td>
                <td>{c.instructorName}</td>
                <td>
                  {enrolledIds.includes(c.id) ? (
                    <button className="btn-disabled" disabled>Enrolled</button>
                  ) : (
                    <button className="btn-primary" onClick={() => enroll(c.id)}>
                      Enroll
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

export default Courses;
