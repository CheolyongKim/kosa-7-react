import { NavLink, useNavigate } from "react-router-dom";
import useFeedbackStore from "../store/feedbackStore.js";
import useUserStore from "../store/userStore.js";

const links = [{ to: "/", label: "Home" }, { to: "/boards", label: "Discussions" }, { to: "/boards/write", label: "Write" }];

export default function Header() {
  const { user, logout } = useUserStore();
  const toast = useFeedbackStore((state) => state.showToast);
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate("/"); toast("로그아웃되었습니다."); };
  return <header className="site-header"><div className="site-header-inner">
    <NavLink to="/" className="brand"><span className="brand-mark">◉</span> ARCHIVE <i>/</i> BOARD</NavLink>
    <nav className="top-nav" aria-label="Main navigation">{links.map((link) => <NavLink end={link.to === "/"} key={link.to} to={link.to}>{link.label}</NavLink>)}</nav>
    <div className="user-actions">{user ? <><NavLink className="user-name profile-link" to="/profile">{user.name}</NavLink><button className="text-button" onClick={handleLogout}>Log out</button></> : <NavLink className="login-link" to="/login">Log in</NavLink>}</div>
  </div></header>;
}
