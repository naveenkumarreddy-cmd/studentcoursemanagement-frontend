import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/admin.css";

function ViewAdmins() {
  const [admins, setAdmins] = useState([]);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const adminsPerPage = 10;

  useEffect(() => {
    API.get("/api/admin/admins")
      .then(res => setAdmins(res.data))
      .catch(console.error);
  }, []);

  // pagination calculations
  const totalPages = Math.ceil(admins.length / adminsPerPage);
  const startIndex = (currentPage - 1) * adminsPerPage;
  const endIndex = startIndex + adminsPerPage;
  const paginatedAdmins = admins.slice(startIndex, endIndex);

  return (
    <div className="admin-page admin-table-page">

      {/* NAVBAR */}
      <div className="admin-navbar admin-navbar--table">
        <div className="admin-navbar-title">All Admins</div>
      </div>

      {/* TABLE */}
      <div className="admin-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {paginatedAdmins.map(a => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="admin-pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Prev
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

export default ViewAdmins;
