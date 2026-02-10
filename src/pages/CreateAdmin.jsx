import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/forms.css";

function CreateAdmin() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/admin/create-admin", {
        name,
        email,
        password,
      });

      alert("Admin created successfully");
      navigate("/admin");
    } catch {
      alert("Failed to create admin");
    }
  };

  return (
    <div className="page">
      <div className="form-wrapper">
        <h2>Create Admin</h2>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            className="create-admin-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            className="create-admin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            className="create-admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="create-admin-submit-btn"
          >
            Create Admin
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAdmin;
