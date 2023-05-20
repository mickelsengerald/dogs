import React, { useState, useEffect } from 'react';
import './stylePaginator.css'

const Paginator = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  useEffect(() => {
    handlePageChange(1);
  }, [totalItems]);

  return (
    <div className='paginator-container'>
      <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>First</button>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          disabled={pageNumber === currentPage}
        >
          {pageNumber}
        </button>
      ))}
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>Last</button>
    </div>
  );
};

export default Paginator;


