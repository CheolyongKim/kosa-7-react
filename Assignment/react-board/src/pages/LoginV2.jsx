import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore.js";
import useFeedbackStore from "../store/feedbackStore.js";
import * as authService from "../services/authService.js";

export default function LoginV2() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const saveLogin = useUserStore((state) => state.login);
  const toast = useFeedbackStore((state) => state.showToast);
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    if (!username.trim() || !password) return setError("아이디와 비밀번호를 입력해 주세요.");
    setError(""); setIsSubmitting(true);
    try {
      const session = await authService.login({ username: username.trim(), password });
      saveLogin(session); toast("로그인되었습니다."); navigate("/");
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        setPassword("");
        toast("아이디 또는 비밀번호가 올바르지 않습니다.", "error");
      } else {
        setError(requestError.response?.data?.message || "로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } finally { setIsSubmitting(false); }
  };

  return <section className="login-card"><p className="kicker">WELCOME BACK</p><h1>이야기를 계속해 볼까요?</h1><p>등록한 아이디와 비밀번호로 로그인하면 안전하게 연결됩니다.</p><form onSubmit={submit}><label>아이디<input autoFocus value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" /></label><label>비밀번호<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /></label>{error && <p className="form-error">{error}</p>}<button disabled={isSubmitting} className="button button-primary full-width">{isSubmitting ? "로그인 중…" : "로그인하기"}</button></form><p className="auth-switch">아직 회원이 아니신가요? <Link to="/register">회원가입</Link></p></section>;
}
