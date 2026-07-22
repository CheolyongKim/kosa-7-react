import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore.js";

export default function Account() {
  const user = useUserStore((s) => s.user); const logout = useUserStore((s) => s.logout); const navigate = useNavigate();
  if (!user) return <section className="login-card"><p className="kicker">MY ACCOUNT</p><h1>로그인이 필요해요.</h1><p>내 정보를 보려면 먼저 로그인해 주세요.</p><Link className="button button-primary full-width" to="/login">로그인하기</Link></section>;
  return <section className="profile-card"><p className="kicker">MY ACCOUNT</p><h1>{user.name}님의 정보</h1><p>로그인 API가 발급한 JWT 세션 정보입니다.</p><div className="profile-summary"><span>아이디</span><strong>{user.username}</strong><span>권한</span><strong>{user.roles?.join(", ") || "USER"}</strong></div><p className="profile-state">게시글과 댓글은 이 계정의 권한으로 작성됩니다.</p><button className="button button-ghost" onClick={() => { logout(); navigate("/"); }}>로그아웃</button></section>;
}
