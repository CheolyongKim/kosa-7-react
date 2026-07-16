import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBoard } from '../hooks/useBoard';

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, status, createPost, updatePost } = useBoard();
  const existing = posts.find((post) => post.id === Number(id));
  const [form, setForm] = useState({ title: '', author: '', content: '' });
  const [saving, setSaving] = useState(false);

  // 수정 화면에서는 URL 파라미터의 id로 기존 게시글을 찾아 폼 초기값을 채운다.
  useEffect(() => {
    if (id && existing) {
      setForm({
        title: existing.title,
        author: existing.author,
        content: existing.content,
      });
    }
  }, [id, existing]);

  // name 속성을 활용해 title/author/content 입력값을 하나의 핸들러로 갱신한다.
  const changeField = useCallback((event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }, []);

  const submit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!form.title.trim() || !form.author.trim() || !form.content.trim()) return;

      setSaving(true);
      try {
        if (existing) {
          await updatePost({ ...existing, ...form });
          navigate(`/post/${existing.id}`);
        } else {
          const post = await createPost(form);
          navigate(`/post/${post.id}`);
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setSaving(false);
      }
    },
    [form, existing, createPost, updatePost, navigate],
  );

  if (id && status === 'loading') {
    return <section className="panel status">게시글을 확인하는 중입니다.</section>;
  }

  if (id && !existing) {
    return <section className="panel status">게시글을 찾을 수 없습니다.</section>;
  }

  return (
    <section className="panel form-panel">
      <p className="eyebrow">{id ? 'EDIT POST' : 'NEW POST'}</p>
      <h1>{id ? '게시글 수정' : '새 글 작성'}</h1>

      <form onSubmit={submit}>
        <label>
          작성자
          <input
            name="author"
            value={form.author}
            onChange={changeField}
            placeholder="이름을 입력하세요"
          />
        </label>
        <label>
          제목
          <input
            name="title"
            value={form.title}
            onChange={changeField}
            placeholder="제목을 입력하세요"
          />
        </label>
        <label>
          내용
          <textarea
            name="content"
            value={form.content}
            onChange={changeField}
            placeholder="내용을 입력하세요"
            rows="10"
          />
        </label>

        <div className="form-actions">
          <button type="button" className="secondary" onClick={() => navigate(-1)}>
            취소
          </button>
          <button disabled={saving}>{saving ? '저장 중...' : '저장하기'}</button>
        </div>
      </form>
    </section>
  );
}
