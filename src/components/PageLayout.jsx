import { useNavigate } from "react-router-dom";

function PageLayout({ title, children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="page-wrapper">
      {/* NAVBAR */}
      <div className="navbar">
        <div className="navbar-left">{title}</div>

        <div className="navbar-right">
          <span className="navbar-user">
            Welcome, <b>{user?.name}</b>
          </span>
          <button className="navbar-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="page-content">
        {children}
      </div>
    </div>
  );
}

export default PageLayout;
