import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import "../styles/student-dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role === "ADMIN") navigate("/admin");
    if (user.role === "INSTRUCTOR") navigate("/instructor");
  }, [user, navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user || user.role !== "STUDENT") return null;

  return (
    <div className="page dashboard-page student-dashboard">
      <div className="page-navbar">
        <h2 className="page-title">Dashboard</h2>

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
          <button onClick={() => navigate("/courses")}>
            View All Courses
          </button>
          <button onClick={() => navigate("/my-courses")}>
            My Courses
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
