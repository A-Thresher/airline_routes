import React, { useState } from 'react';

const Table = ({ className, columns, rows, format, perPage = 25, type }) => {
  const [ page, setPage ] = useState(0);
  let currentRows = rows.slice(page, page + perPage);

  const pageFWD = () => setPage(page + perPage);
  const pageBCK = () => setPage(page - perPage);

  return (
    <>
      <table className={className}>
        <thead>
          <tr>
            {columns.map(c => <th key={c.property}>{c.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((r, i) => {
            return (
              <tr key={i}>
                {columns.map((c, i) => <td key={i}>{format(c.property, r)}</td>)}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <p>Showing {page + 1}-{(page + perPage) > rows.length ? rows.length : page + perPage} of {rows.length} {type}.</p>
        <p>
          <button onClick={pageBCK} disabled={page === 0}>
            Previous Page
          </button>
          <button onClick={pageFWD} disabled={page === (rows.length - perPage)}>
            Next Page
          </button>
        </p>
      </div>
    </>
  )
};

export default Table;
