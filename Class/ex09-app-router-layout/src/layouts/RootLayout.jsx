import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 공통 상단 */}
      <Header />

      {/* 페이지별 콘텐츠 */}
      <main style={{ padding: '24px', maxWidth: 960, margin: '0 auto', width: '100%' }}>
        <Outlet />
      </main>

      {/* 하단(원하면 공통 푸터) */}
      <footer style={{ marginTop: 'auto', padding: '16px', textAlign: 'center', fontSize: 12, color: '#666' }}>
        © {new Date().getFullYear()} My App
      </footer>
    </div>
  )
}