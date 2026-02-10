import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔒 Disable login page if already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    if (user.role === "ADMIN") navigate("/admin");
    else navigate("/dashboard");
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/api/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;

      if (role === "ADMIN") navigate("/admin", { replace: true });
      else if (role === "INSTRUCTOR")
        navigate("/instructor", { replace: true });
      else navigate("/dashboard", { replace: true });

    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* 🔹 PROJECT HEADING */}
        <h1 className="login-project-title">
          Student Course Management
        </h1>
        <p className="login-subtitle">
          Learn • Manage • Grow
        </p>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* 🔹 BUTTON ROW */}
          <div className="login-actions">
            <button className="login-button" type="submit">
              Login
            </button>

            <button
              type="button"
              className="register-button"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </form>

        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
