import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    API.get(`/api/courses/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
      })
      .catch(() => alert("Failed to load course"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/api/courses/${id}`, {
        title,
        description
      });

      navigate("/instructor/courses");
    } catch (err) {
      alert("Failed to update course");
    }
  };

  return (
    <div className="page edit-course-page">
      <div className="form-wrapper">
        <h2>Edit Course</h2>

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

          <button type="submit">Update Course</button>
        </form>
      </div>
    </div>
  );
}

export default EditCourse;
