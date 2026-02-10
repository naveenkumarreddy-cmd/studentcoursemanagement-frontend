import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import MyCourses from "./pages/MyCourses";

import InstructorDashboard from "./pages/InstructorDashboard";
import InstructorCourses from "./pages/InstructorCourses";
import InstructorStudents from "./pages/InstructorStudents";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";

import AdminDashboard from "./pages/AdminDashboard";
import AdminStudents from "./pages/AdminStudents";
import AdminCourses from "./pages/AdminCourses";
import AdminInstructors from "./pages/AdminInstructors";
import CreateInstructor from "./pages/CreateInstructor";
import CreateAdmin from "./pages/CreateAdmin";
import ViewAdmins from "./pages/ViewAdmins";

import PrivateRoute from "./components/PrivateRoute";

import "./styles/common.css";
import "./styles/auth.css";
import "./styles/dashboard.css";
import "./styles/tables.css";
import "./styles/forms.css";
import "./styles/pagination.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* STUDENT */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <PrivateRoute>
              <Courses />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-courses"
          element={
            <PrivateRoute>
              <MyCourses />
            </PrivateRoute>
          }
        />

        {/* INSTRUCTOR */}
        <Route
          path="/instructor"
          element={
            <PrivateRoute role="INSTRUCTOR">
              <InstructorDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/instructor/courses"
          element={
            <PrivateRoute role="INSTRUCTOR">
              <InstructorCourses />
            </PrivateRoute>
          }
        />

        <Route
          path="/instructor/courses/:courseId/students"
          element={
            <PrivateRoute role="INSTRUCTOR">
              <InstructorStudents />
            </PrivateRoute>
          }
        />

        <Route
          path="/instructor/add-course"
          element={
            <PrivateRoute role="INSTRUCTOR">
              <AddCourse />
            </PrivateRoute>
          }
        />

        <Route
          path="/instructor/courses/:id/edit"
          element={
            <PrivateRoute role="INSTRUCTOR">
              <EditCourse />
            </PrivateRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="ADMIN">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/admins"
          element={
            <PrivateRoute role="ADMIN">
              <ViewAdmins />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <PrivateRoute role="ADMIN">
              <AdminStudents />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/instructors"
          element={
            <PrivateRoute role="ADMIN">
              <AdminInstructors />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <PrivateRoute role="ADMIN">
              <AdminCourses />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/create-instructor"
          element={
            <PrivateRoute role="ADMIN">
              <CreateInstructor />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/create-admin"
          element={
            <PrivateRoute role="ADMIN">
              <CreateAdmin />
            </PrivateRoute>
          }
        />

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
