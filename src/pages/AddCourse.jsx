import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddCourse() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/courses/create", {
        title,
        description
      });

      navigate("/instructor/courses");
    } catch (err) {
      alert("Failed to create course");
    }
  };

  return (
    <div className="page add-course-page">
      <div className="form-wrapper">
        <h2>Add Course</h2>

        <form onSubmit={handleSubmit}>
          <label>Course Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <button type="submit">Create Course</button>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
