import { NavLink, Outlet } from 'react-router-dom'
import useUserStore from '../store/userStore.js'

const links = [{ to: '/', label: '대시보드', icon: '⌂' }, { to: '/boards', label: '게시글', icon: '▤' }, { to: '/boards/write', label: '글 작성', icon: '＋' }]
export default function Layout() {
  const { user, logout } = useUserStore()
  return <div className="app-shell">
    <header className="navbar navbar-expand-md sticky-top"><div className="container py-2"><NavLink to="/" className="d-flex align-items-center gap-2 fw-bold"><span className="brand-mark">B</span> Boardly</NavLink><div className="ms-auto d-flex align-items-center gap-3">{user ? <><span className="small text-secondary d-none d-sm-inline">{user.name}님</span><button className="btn btn-light btn-sm" onClick={logout}>로그아웃</button></> : <NavLink className="btn btn-primary btn-sm" to="/login">로그인</NavLink>}</div></div></header>
    <main className="app-main"><div className="container"><div className="row g-4"><aside className="col-lg-3"><div className="side-card p-2 position-sticky" style={{ top: '82px' }}><p className="px-2 pt-2 mb-2 small fw-bold text-uppercase text-secondary">Workspace</p>{links.map((link) => <NavLink end={link.to === '/'} key={link.to} to={link.to} className="side-link"><span>{link.icon}</span>{link.label}</NavLink>)}</div></aside><section className="col-lg-9"><Outlet /></section></div></div></main>
    <footer className="border-top py-4 text-center small text-secondary">Boardly · React learning project</footer>
  </div>
}
