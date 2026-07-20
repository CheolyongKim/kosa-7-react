import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore.js";
import useFeedbackStore from "../store/feedbackStore.js";

const links = [
  { to: "/", label: "대시보드" },
  { to: "/boards", label: "토론" },
  { to: "/boards/write", label: "새 글" },
];

export default function Layout() {
  const { user, logout } = useUserStore();
  const toast = useFeedbackStore((state) => state.showToast);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
    toast("로그아웃되었습니다.");
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <NavLink to="/" className="brand"><span className="brand-mark">◢</span> ARCHIVE <i>//</i> BOARD</NavLink>
          <nav className="top-nav" aria-label="주 메뉴">
            {links.map((link) => <NavLink end={link.to === "/"} key={link.to} to={link.to}>{link.label}</NavLink>)}
          </nav>
          <div className="user-actions">
            <span className="bell" aria-hidden="true">♧</span>
            {user ? <><span className="user-name">{user.name}</span><button className="text-button" onClick={handleLogout}>로그아웃</button></> : <NavLink className="login-link" to="/login">로그인</NavLink>}
          </div>
        </div>
      </header>
      <main className="app-main"><Outlet /></main>
      <footer className="site-footer"><span>ARCHIVE BOARD · React community</span><span>© 2026 Archive Inc.</span></footer>
    </div>
  );
}
