import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBoard } from '../hooks/useBoard';
import PostRow from './PostRow';

export default function PostList() {
  const { posts, status, error, loadPosts } = useBoard();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('latest');

  // 입력 핸들러는 자식 컴포넌트나 의존성 배열에 전달될 수 있으므로 useCallback으로 고정한다.
  const onQueryChange = useCallback((event) => setQuery(event.target.value), []);

  // 검색어/정렬 기준/게시글 목록이 바뀔 때만 필터링과 정렬을 다시 계산한다.
  const visiblePosts = useMemo(
    () =>
      posts
        .filter((post) =>
          `${post.title} ${post.content} ${post.author}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .sort((a, b) =>
          sort === 'views'
            ? b.views - a.views
            : new Date(b.createdAt) - new Date(a.createdAt),
        ),
    [posts, query, sort],
  );

  if (status === 'loading') {
    return <section className="panel status">게시글을 불러오는 중입니다.</section>;
  }

  if (status === 'error') {
    return (
      <section className="panel status">
        <p>{error}</p>
        <button onClick={loadPosts}>다시 시도</button>
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="page-heading">
        <div>
          <p className="eyebrow">COMMUNITY</p>
          <h1>게시글</h1>
          <p>관심 있는 이야기를 편하게 둘러보세요.</p>
        </div>
        <Link className="button" to="/write">새 글 작성</Link>
      </div>

      <div className="toolbar">
        <input
          value={query}
          onChange={onQueryChange}
          placeholder="제목, 내용, 작성자 검색"
          aria-label="게시글 검색"
        />
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          aria-label="정렬"
        >
          <option value="latest">최신순</option>
          <option value="views">조회순</option>
        </select>
      </div>

      {visiblePosts.length ? (
        <div className="post-list">
          {visiblePosts.map((post) => <PostRow key={post.id} post={post} />)}
        </div>
      ) : (
        <div className="empty">검색 결과가 없습니다.</div>
      )}
    </section>
  );
}
