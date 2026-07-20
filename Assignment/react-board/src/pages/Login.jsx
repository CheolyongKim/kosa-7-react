import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore.js";
import useFeedbackStore from "../store/feedbackStore.js";

export default function Login() {
  const [name, setName] = useState(""); const [error, setError] = useState("");
  const login = useUserStore((s) => s.login); const navigate = useNavigate(); const toast = useFeedbackStore((s) => s.showToast);
  const submit = (e) => { e.preventDefault(); if (!name.trim()) return setError("이름을 입력해 주세요."); login({ id: name, name: name.trim(), role: "USER" }); toast(`${name.trim()}님, 환영합니다.`); navigate("/"); };
  return <section className="login-card"><p className="kicker">WELCOME TO ARCHIVE</p><h1>이야기를 시작해 볼까요?</h1><p>이름만 입력하면 바로 커뮤니티에 참여할 수 있어요.</p><form onSubmit={submit}><label>이름<input autoFocus value={name} onChange={(e) => { setName(e.target.value); setError(""); }} placeholder="이름을 입력해 주세요" /></label>{error && <p className="form-error">{error}</p>}<button className="button button-primary full-width">계속하기</button></form></section>;
}
