import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useBoard, useCreateBoard, useUpdateBoard } from "../hooks/useBoard.js";
import useFeedbackStore from "../store/feedbackStore.js";
import useUserStore from "../store/userStore.js";

export default function BoardForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const { data: board, isLoading } = useBoard(id);
  const create = useCreateBoard();
  const update = useUpdateBoard();
  if (editing && isLoading)
    return <div className="state-card page-state">글을 불러오는 중입니다.</div>;
  return (
    <Editor
      key={id ?? "new"}
      initialForm={
        board ?? { title: "", writer: user?.name ?? "", content: "" }
      }
      editing={editing}
      id={id}
      create={create}
      update={update}
      navigate={navigate}
    />
  );
}
function Editor({ initialForm, editing, id, create, update, navigate }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const showToast = useFeedbackStore((s) => s.showToast);
  const pending = create.isPending || update.isPending;
  const changeField = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim() || !form.writer.trim())
      return setError("제목, 작성자, 내용을 모두 입력해 주세요.");
    const opts = {
      onSuccess: () => {
        showToast(editing ? "글을 수정했습니다." : "새 글을 등록했습니다.");
        navigate(editing ? `/boards/${id}` : "/boards");
      },
      onError: (err) =>
        showToast(
          err.response?.data?.message ?? "요청을 처리하지 못했습니다.",
          "error",
        ),
    };
    editing
      ? update.mutate({ id, boardData: form }, opts)
      : create.mutate(form, opts);
  };
  return (
    <section className="editor-card">
      <p className="kicker">
        {editing ? "REFINE YOUR THOUGHT" : "START A DISCUSSION"}
      </p>
      <h1>{editing ? "생각을 다듬어 보세요" : "무슨 생각을 하고 있나요?"}</h1>
      <p className="editor-intro">
        좋은 질문과 경험은 다음 대화의 시작이 됩니다.
      </p>
      <form onSubmit={submit}>
        <label>
          제목
          <input
            required
            name="title"
            maxLength="200"
            value={form.title}
            onChange={changeField}
            placeholder="대화의 제목을 적어 주세요"
          />
        </label>
        <label>
          작성자
          <input
            required
            name="writer"
            maxLength="100"
            value={form.writer}
            onChange={changeField}
          />
        </label>
        <label>
          내용
          <textarea
            required
            name="content"
            rows="10"
            value={form.content}
            onChange={changeField}
            placeholder="자유롭게 이야기를 들려주세요"
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <div className="form-actions">
          <button className="button button-primary" disabled={pending}>
            {pending ? "저장 중" : editing ? "수정 완료" : "글 등록하기"}
          </button>
          <Link
            className="button button-ghost"
            to={editing ? `/boards/${id}` : "/boards"}
          >
            취소
          </Link>
        </div>
      </form>
    </section>
  );
}
