import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useBoard, useCreateBoard, useUpdateBoard } from "../hooks/useBoard.js";
import useFeedbackStore from "../store/feedbackStore.js";
import useUserStore from "../store/userStore.js";

export default function BoardForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { data: board, isLoading } = useBoard(id);
  const create = useCreateBoard();
  const update = useUpdateBoard();

  if (editing && isLoading) {
    return (
      <div className="state-card page-state">게시글을 불러오는 중입니다.</div>
    );
  }

  // key를 사용해 상세 API 응답이 도착한 시점에만 폼의 초깃값을 설정한다.
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
  const showToast = useFeedbackStore((state) => state.showToast);
  const pending = create.isPending || update.isPending;

  const changeField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submit = (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.content.trim() || !form.writer.trim()) {
      setError("제목, 작성자, 내용을 모두 입력해 주세요.");
      return;
    }

    const mutationOptions = {
      onSuccess: () => {
        showToast(editing ? "토픽을 수정했습니다." : "새 토픽을 등록했습니다.");
        navigate(editing ? `/boards/${id}` : "/boards");
      },
      onError: (requestError) => {
        const message = requestError.response?.data?.message;
        showToast(message ?? "요청을 처리하지 못했습니다.", "error");
      },
    };

    if (editing) {
      update.mutate({ id, boardData: form }, mutationOptions);
    } else {
      create.mutate(form, mutationOptions);
    }
  };

  return (
    <section className="editor-card">
      <p className="kicker">
        {editing ? "EDIT DISCUSSION" : "START A DISCUSSION"}
      </p>
      <h1>{editing ? "토픽 수정" : "새 토픽 작성"}</h1>
      <p className="editor-intro">
        생각을 명확하게 기록하고 커뮤니티와 대화를 시작해 보세요.
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
          />
        </label>
        <label>
          작성자
          {/* API 명세상 수정 시 작성자는 변경할 수 없다. */}
          <input
            required
            name="writer"
            maxLength="100"
            value={form.writer}
            onChange={changeField}
            disabled={editing}
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
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button className="button button-primary" disabled={pending}>
            {pending ? "저장 중…" : editing ? "수정 완료" : "토픽 등록"}
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
