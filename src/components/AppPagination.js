import React from "react";

export default function AppPagination({ pageNumber, setPage }) {
  const array = Array.from(Array(pageNumber).keys());

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          {array?.map((page) => (
            <div key={page} className="page-item">
              <button
                onClick={(e) => setPage(e.target.textContent)}
                className="page-link"
              >
                {++page}
              </button>
            </div>
          ))}
        </ul>
      </nav>
    </div>
  );
}
