import React, { useContext, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BoardContext } from '../context/BoardContext';
import PostRow from './PostRow';
import { Table, Form, InputGroup, Button } from 'react-bootstrap';

const PostList = () => {
  const { posts } = useContext(BoardContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('latest'); // latest, views

  // 검색어 입력 변경 핸들러 (useCallback 활용)
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // 정렬 키 변경 핸들러 (useCallback 활용)
  const handleSortChange = useCallback((e) => {
    setSortKey(e.target.value);
  }, []);

  // posts가 변경되거나 검색어, 정렬 기준이 바뀔 때만 필터링/정렬 연산 실행 (useMemo 활용)
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];

    // 1. 검색 필터링
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.content.toLowerCase().includes(term) ||
          post.author.toLowerCase().includes(term)
      );
    }

    // 2. 정렬
    if (sortKey === 'latest') {
      result.sort((a, b) => b.id - a.id); // 최신 등록순 (id가 클수록 최신)
    } else if (sortKey === 'views') {
      result.sort((a, b) => b.views - a.views); // 조회수 순
    }

    return result;
  }, [posts, searchTerm, sortKey]);

  return (
    <div className="glass-card p-4 rounded-4 shadow-lg mb-5 animate-fade-in">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-extrabold text-gradient mb-1">자유 게시판</h2>
          <p className="text-secondary mb-0">React, Context, Reducer로 구현된 게시판입니다.</p>
        </div>
        <Link to="/write">
          <Button className="btn-gradient px-4 py-2 rounded-pill border-0 fw-bold shadow-sm hover-up">
            새 글 쓰기
          </Button>
        </Link>
      </div>

      {/* 검색 및 정렬 바 */}
      <div className="row g-3 mb-4">
        <div className="col-md-6 col-lg-8">
          <InputGroup className="custom-input-group rounded-pill overflow-hidden shadow-sm">
            <InputGroup.Text className="bg-dark-subtle border-0 text-secondary">
              🔍
            </InputGroup.Text>
            <Form.Control
              placeholder="제목, 내용, 작성자로 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-dark-subtle border-0 text-light py-2 custom-placeholder"
            />
          </InputGroup>
        </div>
        <div className="col-md-6 col-lg-4 d-flex gap-2">
          <Form.Select
            value={sortKey}
            onChange={handleSortChange}
            className="bg-dark-subtle border-0 text-light rounded-pill px-3 shadow-sm custom-select"
          >
            <option value="latest">최신순</option>
            <option value="views">조회수순</option>
          </Form.Select>
          {searchTerm && (
            <Button 
              variant="outline-secondary" 
              onClick={() => setSearchTerm('')}
              className="rounded-pill px-3 text-nowrap"
            >
              초기화
            </Button>
          )}
        </div>
      </div>

      {/* 게시글 테이블 */}
      <div className="table-responsive rounded-3 overflow-hidden">
        {filteredAndSortedPosts.length > 0 ? (
          <Table hover variant="dark" className="mb-0 custom-table">
            <thead>
              <tr className="text-center text-secondary border-bottom border-secondary-subtle py-3">
                <th style={{ width: '80px' }}>번호</th>
                <th>제목</th>
                <th style={{ width: '120px' }}>작성자</th>
                <th style={{ width: '100px' }}>조회수</th>
                <th style={{ width: '160px' }}>작성일</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedPosts.map((post, idx) => (
                <PostRow 
                  key={post.id} 
                  post={post} 
                  index={filteredAndSortedPosts.length - idx} 
                />
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="text-center py-5 text-secondary glass-empty-state rounded-3">
            <div className="fs-1 mb-3">📭</div>
            <h5>검색 결과 또는 게시글이 존재하지 않습니다.</h5>
            <p className="text-muted small">새로운 흥미로운 글을 남겨보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;
