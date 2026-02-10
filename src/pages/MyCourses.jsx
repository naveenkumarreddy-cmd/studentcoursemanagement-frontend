import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import "../styles/courses.css";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    API.get("/api/enrollments/my")
      .then(res => setCourses(res.data))
      .catch(console.error);
  }, []);

  const totalPages = Math.ceil(courses.length / rowsPerPage);
  const start = (currentPage - 1) * rowsPerPage;
  const currentCourses = courses.slice(start, start + rowsPerPage);

  return (
    <div className="student-page">

      <Navbar title="My Courses" />

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Trainer</th>
              <th>Enrolled Date</th>
            </tr>
          </thead>

          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  You are not enrolled in any courses
                </td>
              </tr>
            ) : (
              currentCourses.map(c => (
                <tr key={c.courseId}>
                  <td>{c.courseId}</td>
                  <td>{c.courseTitle}</td>
                  <td>{c.instructorName}</td>
                  <td>{c.enrolledDate}</td>
                </tr>
              ))
            )}
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

export default MyCourses;
