export default function Pagination({ page, totalPages = 1, onChange }) {
  return (
    <div className="pager">
      <button
        className="button button-ghost"
        disabled={page === 0}
        onClick={() => onChange(page - 1)}
      >
        Previous
      </button>
      <span>
        {page + 1} / {totalPages}
      </span>
      <button
        className="button button-ghost"
        disabled={page + 1 >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
