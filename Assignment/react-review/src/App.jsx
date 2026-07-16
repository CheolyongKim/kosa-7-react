import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { BoardProvider } from './context/BoardContext';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import './App.css';

export default function App() {
  return (
    <BoardProvider>
      <BrowserRouter>
        <div className="app-shell">
          <header className="site-header">
            <Link to="/" className="brand">일상 게시판</Link>
            <nav>
              <Link to="/">게시글</Link>
              <Link to="/write" className="write-link">글쓰기</Link>
            </nav>
          </header>

          {/* React Router로 목록/상세/작성/수정 화면을 한 앱 안에서 전환한다. */}
          <main>
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/write" element={<PostForm />} />
              <Route path="/edit/:id" element={<PostForm />} />
            </Routes>
          </main>

          <footer>JSONPlaceholder API · React 게시판</footer>
        </div>
      </BrowserRouter>
    </BoardProvider>
  );
}
