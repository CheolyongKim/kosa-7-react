import { useDeferredValue, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useBoards } from "../hooks/useBoard.js";

const pageSize = 8;
export default function BoardList() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const deferredKeyword = useDeferredValue(keyword);
  const { data, isLoading, isFetching, isError } = useBoards({
    page,
    size: pageSize,
    keyword: deferredKeyword,
  });
  const posts = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;
  return (
    <div className="board-layout">
      <section className="discussion-panel">
        <div className="board-heading">
          <div>
            <p className="kicker">COMMUNITY DISCUSSIONS</p>
            <h1>함께 나누는 이야기</h1>
          </div>
          <Link className="button button-primary" to="/boards/write">
            글쓰기
          </Link>
        </div>
        <label className="search-box">
          <span>⌕</span>
          <input
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setPage(1);
            }}
            placeholder="관심 있는 대화를 찾아보세요"
            aria-label="토론 검색"
          />
          {isFetching && <em>검색 중</em>}
        </label>
        {isError ? (
          <div className="state-card error">
            토론을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
          </div>
        ) : (
          <div className="post-list">
            {isLoading ? (
              <div className="state-card">토론을 불러오는 중입니다.</div>
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
              <div className="state-card">조건에 맞는 이야기가 없어요.</div>
            )}
          </div>
        )}
        <Pagination
          page={page - 1}
          totalPages={totalPages}
          onChange={(next) => setPage(next + 1)}
        />
      </section>
      <Sidebar />
    </div>
  );
}
