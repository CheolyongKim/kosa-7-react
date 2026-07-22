import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFeedbackStore from "../store/feedbackStore.js";
import * as authService from "../services/authService.js";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const toast = useFeedbackStore((s) => s.showToast);
  const submit = async (event) => {
    event.preventDefault();
    if (!username.trim() || !password)
      return setError("아이디와 비밀번호를 입력해 주세요.");
    if (password !== confirmPassword)
      return setError("비밀번호 확인이 일치하지 않습니다.");
    setIsSubmitting(true);
    setError("");
    try {
      await authService.register({ username: username.trim(), password });
      toast("회원가입이 완료되었습니다. 로그인해 주세요.");
      navigate("/login");
    } catch (requestError) {
      setError(
        requestError.response?.data ||
          "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="login-card">
      <p className="kicker">JOIN ARCHIVE</p>
      <h1>
        새로운 이야기를
        <br />
        시작해 볼까요?
      </h1>
      <p>간단한 정보만으로 ARCHIVE의 대화에 참여할 수 있어요.</p>
      <form onSubmit={submit}>
        <label>
          아이디
          <input
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="사용할 아이디"
            autoComplete="username"
          />
        </label>
        <label>
          비밀번호
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            autoComplete="new-password"
          />
        </label>
        <label>
          비밀번호 확인
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 한 번 더 입력해 주세요"
            autoComplete="new-password"
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button
          disabled={isSubmitting}
          className="button button-primary full-width"
        >
          {isSubmitting ? "가입 처리 중…" : "회원가입하기"}
        </button>
      </form>
      <p className="auth-switch">
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </section>
  );
}
