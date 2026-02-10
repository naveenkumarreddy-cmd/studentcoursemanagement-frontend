import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="admin-page admin-dashboard-page">

      {/* ===== NAVBAR ===== */}
      <div className="admin-navbar admin-navbar--dashboard">
        <div className="admin-navbar-title">Admin Dashboard</div>

        <div className="admin-navbar-right">
          <span>Welcome, <b>{user?.name}</b></span>
          <button className="admin-logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* ===== CENTER BUTTONS ===== */}
      <div className="admin-dashboard-buttons">
        <button onClick={() => navigate("/admin/students")}>View Students</button>
        <button onClick={() => navigate("/admin/instructors")}>View Instructors</button>
        <button onClick={() => navigate("/admin/courses")}>View Courses</button>
        <button onClick={() => navigate("/admin/create-instructor")}>Create Instructor</button>
        <button onClick={() => navigate("/admin/create-admin")}>Create Admin</button>
        <button onClick={() => navigate("/admin/admins")}>View Admins</button>
      </div>

    </div>
  );
}

export default AdminDashboard;
