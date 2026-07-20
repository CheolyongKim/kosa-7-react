import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useBoard, useCreateBoard, useUpdateBoard } from "../hooks/useBoard.js";
import useUserStore from "../store/userStore.js";
import useFeedbackStore from "../store/feedbackStore.js";

export default function BoardForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const { data: board, isLoading } = useBoard(id);
  const create = useCreateBoard();
  const update = useUpdateBoard();

  if (editing && isLoading) return <div className="state-card page-state">게시글을 불러오는 중입니다…</div>;
  return <Editor key={id ?? "new"} initialForm={board ?? { title: "", writer: user?.name ?? "", content: "" }} {...{ editing, id, create, update, navigate }} />;
}

function Editor({ initialForm, editing, id, create, update, navigate }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const toast = useFeedbackStore((s) => s.showToast);
  const pending = create.isPending || update.isPending;

  const submit = (e) => {
    e.preventDefault();
    const requiredFields = [form.title, form.writer, form.content];
    if (requiredFields.some((value) => typeof value !== "string" || !value.trim())) {
      return setError("제목, 작성자, 내용을 모두 입력해 주세요.");
    }
    const options = {
      onSuccess: () => { toast(editing ? "토픽을 수정했습니다." : "새 토픽을 등록했습니다."); navigate(editing ? `/boards/${id}` : "/boards"); },
      onError: () => toast(editing ? "수정하지 못했습니다." : "등록하지 못했습니다.", "error"),
    };
    editing ? update.mutate({ id, boardData: form }, options) : create.mutate(form, options);
  };

  return <section className="editor-card"><p className="kicker">{editing ? "EDIT DISCUSSION" : "START A DISCUSSION"}</p><h1>{editing ? "토픽 수정" : "새 토픽 작성"}</h1><p className="editor-intro">생각을 명확하게 기록하고 커뮤니티와 대화를 시작해 보세요.</p><form onSubmit={submit}><label>제목<input required name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label><label>작성자<input required name="writer" value={form.writer} onChange={(e) => setForm({ ...form, writer: e.target.value })} /></label><label>내용<textarea required name="content" rows="10" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} /></label>{error && <p className="form-error">{error}</p>}<div className="form-actions"><button className="button button-primary" disabled={pending}>{pending ? "저장 중…" : editing ? "수정 완료" : "토픽 등록"}</button><Link className="button button-ghost" to={editing ? `/boards/${id}` : "/boards"}>취소</Link></div></form></section>;
}
