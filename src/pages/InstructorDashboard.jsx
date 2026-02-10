import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import "../styles/instructor-dashboard.css";

function InstructorDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role !== "INSTRUCTOR") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user || user.role !== "INSTRUCTOR") return null;

  return (
    <div className="page dashboard-page instructor-dashboard">
      <div className="page-navbar">
        <h2 className="page-title">Instructor Dashboard</h2>

        <div className="dashboard-user">
          <span>
            Welcome, <b>{user.name}</b>
          </span>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="page-content">
        <div className="dashboard-actions">
          <button onClick={() => navigate("/instructor/courses")}>
            My Courses
          </button>
          <button onClick={() => navigate("/instructor/add-course")}>
            Add Course
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstructorDashboard;
