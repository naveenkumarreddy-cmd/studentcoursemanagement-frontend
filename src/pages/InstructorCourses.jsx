import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function InstructorCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/api/courses/my")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Failed to load courses", err));
  }, []);

  return (
    <div className="page courses-page">

      {/* NAVBAR */}
      <div className="page-navbar">
        <h2 className="page-title">My Courses</h2>
      </div>

      {/* CONTENT */}
      <div className="page-content">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No courses found
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                  <td>
                    <button
                      className="btn-success"
                      onClick={() =>
                        navigate(`/instructor/courses/${course.id}/students`)
                      }
                    >
                      View Students
                    </button>

                    <button
                      className="btn-primary"
                      style={{ marginLeft: "8px" }}
                      onClick={() =>
                        navigate(`/instructor/courses/${course.id}/edit`)
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InstructorCourses;
