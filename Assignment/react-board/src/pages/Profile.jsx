import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore.js";
import * as authService from "../services/authService.js";

export default function Profile() {
  const user = useUserStore((s) => s.user); const logout = useUserStore((s) => s.logout); const [info, setInfo] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(Boolean(user)); const navigate = useNavigate();
  useEffect(() => { if (!user) return; authService.getUserInfo().then(setInfo).catch((requestError) => setError(requestError.response?.status === 401 || requestError.response?.status === 403 ? "인증이 만료되었거나 이 계정은 내 정보 조회 권한이 없습니다." : "내 정보를 불러오지 못했습니다.")).finally(() => setLoading(false)); }, [user]);
  if (!user) return <section className="login-card"><p className="kicker">MY ACCOUNT</p><h1>로그인이 필요해요.</h1><p>내 정보를 보려면 먼저 로그인해 주세요.</p><Link className="button button-primary full-width" to="/login">로그인하기</Link></section>;
  return <section className="profile-card"><p className="kicker">MY ACCOUNT</p><h1>{user.name}님의 정보</h1><p>현재 JWT 세션으로 보호된 <code>/user/info</code> 응답입니다.</p><div className="profile-summary"><span>아이디</span><strong>{user.username}</strong><span>권한</span><strong>{user.roles?.join(", ") || "ROLE_USER"}</strong></div>{loading && <p className="profile-state">내 정보를 확인하는 중…</p>}{error && <p className="form-error">{error}</p>}{info && <pre className="token-info">{info}</pre>}<button className="button button-ghost" onClick={() => { logout(); navigate("/"); }}>로그아웃</button></section>;
}
