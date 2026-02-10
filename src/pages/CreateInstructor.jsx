import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/forms.css";

function CreateInstructor() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/admin/create-instructor", {
        name,
        email,
        password,
      });
      alert("Instructor created successfully");
      navigate("/admin");
    } catch {
      alert("Failed to create instructor");
    }
  };

  return (
    <div className="page">
      <div className="form-wrapper">
        <h2>Create Instructor</h2>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            className="create-instructor-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            className="create-instructor-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            className="create-instructor-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="create-instructor-submit-btn" type="submit">
            Create Instructor
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateInstructor;
