import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useBoard } from '../hooks/useBoard';
import { formatDate } from '../utils/formatDate';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, status, removePost, increaseViews, addComment } = useBoard();
  const post = posts.find((item) => item.id === Number(id));
  const [comment, setComment] = useState({ author: '', text: '' });
  const viewedId = useRef(null);

  // 상세 화면에 처음 들어왔을 때만 조회수를 올린다.
  // useRef는 값이 바뀌어도 렌더링을 다시 일으키지 않아 중복 증가 방지에 적합하다.
  useEffect(() => {
    if (post && viewedId.current !== post.id) {
      increaseViews(post.id);
      viewedId.current = post.id;
    }
  }, [post, increaseViews]);

  const submitComment = useCallback(
    (event) => {
      event.preventDefault();
      if (!comment.author.trim() || !comment.text.trim()) return;

      addComment(post.id, comment.author, comment.text);
      setComment({ author: '', text: '' });
    },
    [post?.id, comment, addComment],
  );

  const remove = useCallback(async () => {
    if (!window.confirm('이 게시글을 삭제할까요?')) return;

    try {
      await removePost(post.id);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  }, [post?.id, removePost, navigate]);

  if (status === 'loading') {
    return <section className="panel status">게시글을 확인하는 중입니다.</section>;
  }

  if (!post) {
    return (
      <section className="panel status">
        <p>게시글을 찾을 수 없습니다.</p>
        <Link to="/">목록으로</Link>
      </section>
    );
  }

  return (
    <article className="panel detail">
      <div className="detail-actions">
        <Link to="/">← 목록</Link>
        <span>
          <Link to={`/edit/${post.id}`}>수정</Link>
          <button className="text-button danger" onClick={remove}>삭제</button>
        </span>
      </div>

      <p className="eyebrow">POST</p>
      <h1>{post.title}</h1>
      <div className="post-meta">
        <span>{post.author}</span>
        <span>{formatDate(post.createdAt)}</span>
        <span>조회 {post.views}</span>
      </div>
      <div className="content">{post.content}</div>

      <section className="comments">
        <h2>댓글 {post.comments.length}</h2>

        {post.comments.length > 0 && (
          <ul>
            {post.comments.map((item) => (
              <li key={item.id}>
                <strong>{item.author}</strong>
                <span>{formatDate(item.createdAt)}</span>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={submitComment}>
          <input
            value={comment.author}
            onChange={(event) =>
              setComment((current) => ({ ...current, author: event.target.value }))
            }
            placeholder="이름"
          />
          <textarea
            value={comment.text}
            onChange={(event) =>
              setComment((current) => ({ ...current, text: event.target.value }))
            }
            placeholder="댓글을 남겨 주세요"
            rows="3"
          />
          <button>댓글 등록</button>
        </form>
      </section>
    </article>
  );
}
