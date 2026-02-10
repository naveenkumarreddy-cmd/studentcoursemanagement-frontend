import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔒 Disable register if logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/dashboard");
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("/api/auth/register", {
        name,
        email,
        password,
        role: "STUDENT",
      });

      navigate("/login");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        {/* 🔹 HEADING */}
        <h1 className="register-title">Student Registration</h1>
        <p className="register-subtitle">Create your account</p>

        <form className="register-form" onSubmit={handleRegister}>
          <input
            className="register-input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="register-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="register-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="register-submit-btn" type="submit">
            Register
          </button>
        </form>

        {error && <p className="register-error">{error}</p>}
      </div>
    </div>
  );
}

export default Register;
