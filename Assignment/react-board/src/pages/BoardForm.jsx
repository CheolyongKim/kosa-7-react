import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useBoard, useCreateBoard, useUpdateBoard } from '../hooks/useBoard.js'
import useUserStore from '../store/userStore.js'

export default function BoardForm() {
  const { id } = useParams(); const editing = Boolean(id); const navigate = useNavigate(); const user = useUserStore((state) => state.user)
  const { data: board, isLoading } = useBoard(id); const create = useCreateBoard(); const update = useUpdateBoard()
  if (editing && isLoading) return <div className="alert alert-info">게시글을 불러오는 중입니다…</div>
  // key로 편집기를 다시 생성해 비동기 응답을 폼의 초깃값으로 쓴다. effect로 상태를 동기화하지 않아 사용자 입력을 덮어쓰지 않는다.
  return <Editor key={id ?? 'new'} initialForm={board ?? { title: '', writer: user?.name ?? '', content: '' }} editing={editing} id={id} create={create} update={update} navigate={navigate} />
}

function Editor({ initialForm, editing, id, create, update, navigate }) {
  const [form, setForm] = useState(initialForm); const [error, setError] = useState('')
  const change = (event) => setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }))
  const submit = (event) => { event.preventDefault(); if (Object.values(form).some((value) => !value.trim())) return setError('제목, 작성자, 내용을 모두 입력해 주세요.'); const action = editing ? update.mutate({ id, boardData: form }, { onSuccess: () => navigate(`/boards/${id}`), onError: () => setError('수정하지 못했습니다.') }) : create.mutate(form, { onSuccess: () => navigate('/boards'), onError: () => setError('등록하지 못했습니다.') }); return action }
  const pending = create.isPending || update.isPending
  return <div className="surface p-4 p-md-5"><p className="eyebrow">{editing ? 'Edit post' : 'New post'}</p><h1 className="page-title mt-2 mb-4">{editing ? '게시글 수정' : '새 게시글 작성'}</h1><form onSubmit={submit}><label className="form-label fw-bold">제목</label><input required name="title" className="form-control mb-3" value={form.title} onChange={change} placeholder="글의 핵심을 담은 제목" /><label className="form-label fw-bold">작성자</label><input required name="writer" className="form-control mb-3" value={form.writer} onChange={change} placeholder="이름" /><label className="form-label fw-bold">내용</label><textarea required name="content" rows="10" className="form-control" value={form.content} onChange={change} placeholder="다른 사람이 이해할 수 있도록 맥락을 함께 적어 주세요." />{error && <p className="text-danger small mt-3 mb-0">{error}</p>}<div className="d-flex gap-2 mt-4"><button disabled={pending} className="btn btn-primary">{pending ? '저장 중…' : editing ? '수정 완료' : '게시글 등록'}</button><Link className="btn btn-light" to={editing ? `/boards/${id}` : '/boards'}>취소</Link></div></form></div>
}
