import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BoardContext } from '../context/BoardContext';
import { Button, Card, Form, ListGroup } from 'react-bootstrap';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, dispatch } = useContext(BoardContext);

  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  const postId = Number(id);
  const post = posts.find((p) => p.id === postId);

  // 조회수 증가 useEffect
  useEffect(() => {
    if (post) {
      dispatch({ type: 'INCREMENT_VIEW', payload: postId });
    }
  }, [postId, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  // 게시글 삭제 핸들러 (useCallback 활용)
  const handleDeletePost = useCallback(() => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      dispatch({ type: 'DELETE_POST', payload: postId });
      navigate('/');
    }
  }, [postId, dispatch, navigate]);

  // 댓글 등록 핸들러 (useCallback 활용)
  const handleCommentSubmit = useCallback((e) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentText.trim()) {
      alert('작성자와 댓글 내용을 입력해주세요.');
      return;
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newComment = {
      id: Date.now(),
      author: commentAuthor,
      text: commentText,
      createdAt: formattedDate,
    };

    dispatch({
      type: 'ADD_COMMENT',
      payload: { postId, comment: newComment },
    });

    setCommentAuthor('');
    setCommentText('');
  }, [postId, commentAuthor, commentText, dispatch]);

  // 댓글 삭제 핸들러 (useCallback 활용)
  const handleCommentDelete = useCallback((commentId) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      dispatch({
        type: 'DELETE_COMMENT',
        payload: { postId, commentId },
      });
    }
  }, [postId, dispatch]);

  if (!post) {
    return (
      <div className="text-center py-5 text-secondary glass-card animate-fade-in">
        <h4 className="mb-3">존재하지 않거나 삭제된 게시글입니다.</h4>
        <Link to="/">
          <Button className="btn-gradient border-0 px-4 py-2 rounded-pill fw-bold">
            목록으로 돌아가기
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 rounded-4 shadow-lg mb-5 animate-fade-in">
      {/* 상단 액션 바 */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary-subtle">
        <Button 
          variant="outline-light" 
          onClick={() => navigate('/')} 
          className="rounded-pill px-3 py-1.5 fs-7 d-flex align-items-center gap-1"
        >
          ⬅ 목록으로
        </Button>
        <div className="d-flex gap-2">
          <Link to={`/edit/${post.id}`}>
            <Button variant="outline-info" className="rounded-pill px-3 py-1.5 fs-7 fw-semibold">
              수정
            </Button>
          </Link>
          <Button 
            variant="outline-danger" 
            onClick={handleDeletePost}
            className="rounded-pill px-3 py-1.5 fs-7 fw-semibold"
          >
            삭제
          </Button>
        </div>
      </div>

      {/* 본문 영역 */}
      <Card className="bg-transparent border-0 text-light mb-5">
        <Card.Body className="p-0">
          <div className="mb-4">
            <h1 className="fw-extrabold text-gradient-indigo-cyan mb-3">{post.title}</h1>
            <div className="d-flex flex-wrap align-items-center gap-3 text-secondary fs-7 bg-dark-subtle p-3 rounded-3">
              <div>
                <span className="fw-bold text-light-emphasis">작성자:</span> {post.author}
              </div>
              <div className="vr bg-secondary d-none d-sm-block"></div>
              <div>
                <span className="fw-bold text-light-emphasis">등록일:</span> {post.createdAt}
              </div>
              <div className="vr bg-secondary d-none d-sm-block"></div>
              <div>
                <span className="fw-bold text-light-emphasis">조회수:</span> {post.views}
              </div>
            </div>
          </div>

          <div 
            className="post-content-area p-4 rounded-4 bg-dark-subtle text-light fs-5 mb-4 border border-secondary-subtle"
            style={{ minHeight: '200px', whiteSpace: 'pre-wrap', lineHeight: '1.7' }}
          >
            {post.content}
          </div>
        </Card.Body>
      </Card>

      {/* 댓글 섹션 */}
      <div className="comments-section border-top border-secondary-subtle pt-4">
        <h4 className="fw-bold text-light mb-4 d-flex align-items-center gap-2">
          💬 댓글 <span className="text-info">{(post.comments || []).length}</span>
        </h4>

        {/* 댓글 리스트 */}
        <ListGroup className="mb-4 bg-transparent border-0 gap-2">
          {(post.comments || []).length > 0 ? (
            (post.comments || []).map((comment) => (
              <ListGroup.Item 
                key={comment.id} 
                className="bg-dark-subtle text-light border border-secondary-subtle rounded-3 p-3 d-flex justify-content-between align-items-start comment-item-animate"
              >
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="fw-bold text-info">{comment.author}</span>
                    <small className="text-muted fs-8">{comment.createdAt}</small>
                  </div>
                  <p className="mb-0 text-light-emphasis fs-6">{comment.text}</p>
                </div>
                <Button 
                  variant="link" 
                  onClick={() => handleCommentDelete(comment.id)} 
                  className="text-danger p-0 border-0 text-decoration-none"
                  style={{ fontSize: '0.85rem' }}
                >
                  삭제
                </Button>
              </ListGroup.Item>
            ))
          ) : (
            <div className="text-center py-4 text-secondary bg-dark-subtle rounded-3 border border-secondary-subtle">
              등록된 댓글이 없습니다. 첫 댓글을 남겨보세요!
            </div>
          )}
        </ListGroup>

        {/* 댓글 입력 폼 */}
        <Form onSubmit={handleCommentSubmit} className="bg-dark-subtle p-3 rounded-4 border border-secondary-subtle">
          <div className="row g-2 mb-3">
            <div className="col-sm-4">
              <Form.Control
                type="text"
                placeholder="작성자 이름"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="bg-black-subtle border-secondary text-light rounded-3"
                required
              />
            </div>
          </div>
          <div className="d-flex gap-2">
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="따뜻한 댓글을 남겨주세요..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="bg-black-subtle border-secondary text-light rounded-3"
              style={{ resize: 'none' }}
              required
            />
            <Button 
              type="submit" 
              className="btn-gradient border-0 px-4 fw-bold rounded-3 text-nowrap d-flex align-items-center justify-content-center"
            >
              등록
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PostDetail;
