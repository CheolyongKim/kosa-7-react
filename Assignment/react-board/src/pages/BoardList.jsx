import { useDeferredValue, useState } from "react";
import { Link } from "react-router-dom";
import { useBoards } from "../hooks/useBoard.js";
import Pagination from "../components/Pagination.jsx";
import Sidebar from "../components/Sidebar.jsx";

export default function BoardList() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const deferredKeyword = useDeferredValue(keyword);
  const { data, isLoading, isFetching, isError } = useBoards({ page, size: 8, keyword: deferredKeyword });
  return <div className="board-layout"><section className="discussion-panel"><div className="board-heading"><div><p className="kicker">COMMUNITY DISCUSSIONS</p><h1>Latest discussions</h1></div><Link className="button button-primary" to="/boards/write">Start a discussion</Link></div><label className="search-box"><span>⌕</span><input value={keyword} onChange={(e) => { setKeyword(e.target.value); setPage(0); }} placeholder="Search discussions" aria-label="Search discussions" />{isFetching && <em>Searching...</em>}</label>{isError ? <div className="state-card error">Unable to load discussions. Please try again.</div> : <div className="post-list">{isLoading ? <div className="state-card">Loading discussions...</div> : data.content.length ? data.content.map((board) => <Link className="post-card" key={board.id} to={`/boards/${board.id}`}><div><h2>{board.title}</h2><p>by <b>{board.writer}</b><span>·</span>{board.createdAt?.slice(0, 10)}<span>·</span><strong>Discussion</strong><span>·</span>{board.viewCount} views</p></div><span className="post-arrow">→</span></Link>) : <div className="state-card">No discussions found.</div>}</div>}<Pagination page={page} totalPages={data?.totalPages ?? 1} onChange={setPage} /></section><Sidebar /></div>;
}
