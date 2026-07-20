import { useDeferredValue, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useBoards } from "../hooks/useBoard.js";

const pageSize = 8;

export default function BoardList() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const deferredKeyword = useDeferredValue(keyword);
  const { data: boards = [], isLoading, isFetching, isError } = useBoards();

  // API 명세에는 검색·페이지 파라미터가 없으므로 받은 배열에서 UI 검색과 페이지를 적용한다.
  const { posts, totalPages } = useMemo(() => {
    const normalizedKeyword = deferredKeyword.trim().toLowerCase();
    const filtered = boards.filter((board) =>
      board.title.toLowerCase().includes(normalizedKeyword),
    );

    return {
      posts: filtered.slice(page * pageSize, (page + 1) * pageSize),
      totalPages: Math.max(1, Math.ceil(filtered.length / pageSize)),
    };
  }, [boards, deferredKeyword, page]);

  const handleSearch = (event) => {
    setKeyword(event.target.value);
    setPage(0);
  };

  return (
    <div className="board-layout">
      <section className="discussion-panel">
        <div className="board-heading">
          <div>
            <p className="kicker">COMMUNITY DISCUSSIONS</p>
            <h1>Latest discussions</h1>
          </div>
          <Link className="button button-primary" to="/boards/write">
            Start a discussion
          </Link>
        </div>

        <label className="search-box">
          <span>⌕</span>
          <input
            value={keyword}
            onChange={handleSearch}
            placeholder="Search discussions"
            aria-label="Search discussions"
          />
          {isFetching && <em>Searching...</em>}
        </label>

        {isError ? (
          <div className="state-card error">
            Unable to load discussions. Please try again.
          </div>
        ) : (
          <div className="post-list">
            {isLoading ? (
              <div className="state-card">Loading discussions...</div>
            ) : posts.length ? (
              posts.map((board) => (
                <Link
                  className="post-card"
                  key={board.id}
                  to={`/boards/${board.id}`}
                >
                  <div>
                    <h2>{board.title}</h2>
                    <p>
                      by <b>{board.writer}</b>
                      <span>·</span>
                      {board.createdAt?.slice(0, 10)}
                      <span>·</span>
                      <strong>Discussion</strong>
                      <span>·</span>
                      {board.viewCount} views
                    </p>
                  </div>
                  <span className="post-arrow">→</span>
                </Link>
              ))
            ) : (
              <div className="state-card">No discussions found.</div>
            )}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </section>

      <Sidebar />
    </div>
  );
}
