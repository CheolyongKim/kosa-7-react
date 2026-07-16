import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BoardContext } from '../context/BoardContext';
import { Form, Button } from 'react-bootstrap';

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, dispatch } = useContext(BoardContext);

  const isEditMode = !!id;
  const postId = Number(id);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  // 에디트 모드일 때 기존 데이터 로드 (useEffect)
  useEffect(() => {
    if (isEditMode) {
      const existingPost = posts.find((p) => p.id === postId);
      if (existingPost) {
        setTitle(existingPost.title);
        setAuthor(existingPost.author);
        setContent(existingPost.content);
      } else {
        alert('존재하지 않는 게시글입니다.');
        navigate('/');
      }
    }
  }, [isEditMode, postId, posts, navigate]);

  // 글 저장 핸들러 (useCallback 활용)
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !content.trim()) {
      alert('모든 필드를 입력해 주세요.');
      return;
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    if (isEditMode) {
      dispatch({
        type: 'UPDATE_POST',
        payload: {
          id: postId,
          title,
          author,
          content,
          // 수정일은 생성일과 분리하여 관리할 수도 있으나, 여기서는 그냥 업데이트 항목만 반영
        },
      });
      navigate(`/post/${postId}`);
    } else {
      const newPost = {
        id: Date.now(),
        title,
        author,
        content,
        views: 0,
        createdAt: formattedDate,
        comments: [],
      };
      dispatch({ type: 'CREATE_POST', payload: newPost });
      navigate('/');
    }
  }, [isEditMode, postId, title, author, content, dispatch, navigate]);

  return (
    <div className="glass-card p-4 rounded-4 shadow-lg mb-5 animate-fade-in">
      <h2 className="fw-extrabold text-gradient-indigo-cyan mb-4">
        {isEditMode ? '게시글 수정' : '새 게시글 작성'}
      </h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="postAuthor">
          <Form.Label className="text-light fw-semibold">작성자</Form.Label>
          <Form.Control
            type="text"
            placeholder="작성자 이름을 입력하세요"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled={isEditMode} // 수정 시 작성자명 변경 금지
            className="bg-dark-subtle border-secondary text-light rounded-3 py-2 custom-placeholder"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="postTitle">
          <Form.Label className="text-light fw-semibold">제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-dark-subtle border-secondary text-light rounded-3 py-2 custom-placeholder"
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="postContent">
          <Form.Label className="text-light fw-semibold">내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="내용을 입력하세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-dark-subtle border-secondary text-light rounded-3 py-2 custom-placeholder"
            style={{ resize: 'vertical' }}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="outline-light"
            onClick={() => navigate(-1)}
            className="rounded-pill px-4"
          >
            취소
          </Button>
          <Button
            type="submit"
            className="btn-gradient border-0 px-4 fw-bold rounded-pill"
          >
            {isEditMode ? '수정 완료' : '등록'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PostForm;
