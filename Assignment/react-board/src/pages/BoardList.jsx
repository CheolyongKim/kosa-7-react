import { useDeferredValue, useState } from "react";
import { Link } from "react-router-dom";
import { useBoards } from "../hooks/useBoard.js";

const tags = ["UX", "Code", "Launch", "Strategy"];
export default function BoardList() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const deferredKeyword = useDeferredValue(keyword);
  const { data, isLoading, isFetching, isError } = useBoards({ page, size: 8, keyword: deferredKeyword });
  return <div className="board-layout">
    <section className="discussion-panel">
      <div className="board-heading"><div><p className="kicker">COMMUNITY DISCUSSIONS</p><h1>최신 토론</h1></div><Link className="button button-primary" to="/boards/write">새 토픽 작성</Link></div>
      <label className="search-box"><span>⌕</span><input value={keyword} onChange={(e) => { setKeyword(e.target.value); setPage(0); }} placeholder="토픽 제목으로 검색" aria-label="게시글 검색" />{isFetching && <em>검색 중</em>}</label>
      {isError ? <div className="state-card error">목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</div> :
        <div className="post-list">{isLoading ? <div className="state-card">토론을 불러오는 중입니다…</div> : data.content.length ? data.content.map((board) => <Link className="post-card" key={board.id} to={`/boards/${board.id}`}><div><h2>{board.title}</h2><p>by <b>{board.writer}</b><span>·</span>{board.createdAt?.slice(0, 10)}<span>·</span><strong>토론</strong><span>·</span>{board.viewCount} views</p></div><span className="post-arrow">→</span></Link>) : <div className="state-card">검색 결과가 없습니다.</div>}</div>}
      <div className="pager"><button className="button button-ghost" disabled={page === 0} onClick={() => setPage((v) => v - 1)}>이전</button><span>{page + 1} / {data?.totalPages ?? 1}</span><button className="button button-ghost" disabled={!data || page + 1 >= data.totalPages} onClick={() => setPage((v) => v + 1)}>다음</button></div>
    </section>
    <aside className="topic-sidebar"><p className="sidebar-label">POPULAR CATEGORIES</p>{["일반", "제품", "개발", "마케팅", "피드백"].map((category, i) => <div className="category" key={category}><span>{["♧", "●", "◢", "✦", "□"][i]}</span>{category}</div>)}<p className="sidebar-label tag-label">TRENDING TAGS</p><div className="tag-list">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div><Link className="button button-primary sidebar-button" to="/boards/write">새 토픽 작성</Link></aside>
  </div>;
}
