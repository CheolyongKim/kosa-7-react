import { Link, useNavigate, useParams } from 'react-router-dom'
import { useBoard, useDeleteBoard } from '../hooks/useBoard.js'

export default function BoardDetail() {
  const { id } = useParams(); const navigate = useNavigate(); const { data: board, isLoading, isError } = useBoard(id); const remove = useDeleteBoard()
  if (isLoading) return <div className="alert alert-info">게시글을 불러오는 중입니다…</div>
  if (isError) return <div className="alert alert-danger">게시글을 찾을 수 없습니다. <Link to="/boards">목록으로</Link></div>
  const deleteBoard = () => { if (!window.confirm('이 게시글을 삭제할까요?')) return; remove.mutate(id, { onSuccess: () => navigate('/boards') }) }
  return <article className="surface p-4 p-md-5"><Link to="/boards" className="small text-secondary">← 게시글 목록</Link><h1 className="page-title mt-3 mb-3">{board.title}</h1><div className="d-flex flex-wrap gap-3 border-top border-bottom py-3 mb-4 small text-secondary"><span>작성자 <b className="text-dark">{board.writer}</b></span><span>조회 {board.viewCount}</span><span>{board.createdAt?.slice(0, 10)}</span></div><div className="content-body">{board.content}</div><div className="d-flex gap-2 pt-3"><Link className="btn btn-outline-primary" to={`/boards/${id}/edit`}>수정</Link><button className="btn btn-outline-danger" disabled={remove.isPending} onClick={deleteBoard}>{remove.isPending ? '삭제 중…' : '삭제'}</button></div></article>
}
