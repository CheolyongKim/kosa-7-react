import { Link } from 'react-router-dom'
import { useBoards } from '../hooks/useBoard.js'

export default function Home() {
  const { data } = useBoards({ page: 0, size: 100, keyword: '' })
  return <><div className="surface hero mb-4"><p className="eyebrow text-white-50">Modern React board</p><h1>생각을 기록하고,<br />팀과 연결하세요.</h1><p className="text-white-50 mb-4">React Router, TanStack Query, Zustand를 실제 역할에 맞춰 분리한 게시판입니다.</p><Link className="btn btn-light" to="/boards">게시글 둘러보기 →</Link></div><div className="row g-3">{[['전체 게시글', data?.totalElements ?? '—'], ['서버 상태', 'Query cache'], ['UI 상태', 'Zustand']].map(([label, value]) => <div className="col-md-4" key={label}><div className="stat-card"><span className="small text-secondary">{label}</span><strong>{value}</strong></div></div>)}</div></>
}
