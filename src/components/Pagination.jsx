function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination-container">

      {currentPage > 1 && (
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>
      )}

      <span className="pagination-info">
        Page {currentPage} / {totalPages}
      </span>

      {currentPage < totalPages && (
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      )}

    </div>
  );
}

export default Pagination;
