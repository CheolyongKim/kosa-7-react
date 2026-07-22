import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore.js";
import useFeedbackStore from "../store/feedbackStore.js";
import * as authService from "../services/authService.js";

export default function Login() {
  const [username, setUsername] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [isSubmitting, setIsSubmitting] = useState(false);
  const saveLogin = useUserStore((s) => s.login); const navigate = useNavigate(); const toast = useFeedbackStore((s) => s.showToast);
  const submit = async (event) => { event.preventDefault(); if (!username.trim() || !password) return setError("아이디와 비밀번호를 입력해 주세요."); setIsSubmitting(true); setError(""); try { const session = await authService.login({ username: username.trim(), password }); saveLogin(session); toast(`${session.user.name}님, 다시 만나 반가워요.`); navigate("/"); } catch (requestError) { setError(requestError.response?.data || "로그인에 실패했습니다. 정보를 다시 확인해 주세요."); } finally { setIsSubmitting(false); } };
  return <section className="login-card"><p className="kicker">WELCOME BACK</p><h1>이야기를 계속해 볼까요?</h1><p>등록한 아이디와 비밀번호로 로그인하면 JWT 인증으로 안전하게 연결됩니다.</p><form onSubmit={submit}><label>아이디<input autoFocus value={username} onChange={(e) => setUsername(e.target.value)} placeholder="아이디를 입력해 주세요" autoComplete="username" /></label><label>비밀번호<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력해 주세요" autoComplete="current-password" /></label>{error && <p className="form-error">{error}</p>}<button disabled={isSubmitting} className="button button-primary full-width">{isSubmitting ? "로그인 중…" : "로그인하기"}</button></form><p className="auth-switch">아직 회원이 아니신가요? <Link to="/register">회원가입</Link></p></section>;
}
