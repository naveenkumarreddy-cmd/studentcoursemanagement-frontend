import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar({ title, showUserActions = false }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="page-navbar">
      <h2 className="page-title">{title}</h2>

      {showUserActions && (
        <div className="dashboard-user">
          <span>
            Welcome, <b>{user?.name}</b>
          </span>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
