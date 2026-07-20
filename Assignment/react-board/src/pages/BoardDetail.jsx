import { Link, useNavigate, useParams } from "react-router-dom";
import { useBoard, useDeleteBoard } from "../hooks/useBoard.js";
import useFeedbackStore from "../store/feedbackStore.js";

export default function BoardDetail() {
  const { id } = useParams(); const navigate = useNavigate(); const { data: board, isLoading, isError } = useBoard(id); const remove = useDeleteBoard(); const { confirm, showToast } = useFeedbackStore();
  if (isLoading) return <div className="state-card page-state">이야기를 불러오는 중입니다.</div>;
  if (isError) return <div className="state-card error page-state">게시글을 찾을 수 없습니다. <Link to="/boards">목록으로 돌아가기</Link></div>;
  const deleteBoard = () => confirm({ title: "이 글을 삭제할까요?", description: "삭제한 글은 다시 되돌릴 수 없습니다.", confirmLabel: "삭제하기", onConfirm: () => remove.mutate(id, { onSuccess: () => { showToast("글이 삭제되었습니다."); navigate("/boards"); }, onError: (e) => showToast(e.response?.data?.message ?? "삭제하지 못했습니다.", "error") }) });
  return <article className="article-card"><Link to="/boards" className="back-link">← 모든 토론</Link><p className="kicker">DISCUSSION · {board.id}</p><h1>{board.title}</h1><div className="article-meta"><span>작성자 <b>{board.writer}</b></span><span>{board.createdAt?.slice(0, 10)}</span><span>조회 {board.viewCount}</span></div><div className="content-body">{board.content}</div><div className="article-actions"><Link className="button button-ghost" to={`/boards/${id}/edit`}>수정하기</Link><button className="button button-danger-outline" disabled={remove.isPending} onClick={deleteBoard}>{remove.isPending ? "삭제 중" : "삭제"}</button></div></article>;
}
