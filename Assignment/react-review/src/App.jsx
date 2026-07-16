import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { BoardProvider } from './context/BoardContext';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BoardProvider>
      <BrowserRouter>
        <div className="app-container">
          {/* GNB / Header */}
          <header className="sticky-top py-3 mb-5 shadow-sm">
            <Container className="d-flex justify-content-between align-items-center">
              <a href="/" className="text-decoration-none d-flex align-items-center gap-2">
                <span className="fs-3" style={{ cursor: 'pointer' }}>🚀</span>
                <span className="fs-4 fw-extrabold text-gradient-indigo-cyan mb-0">Antigravity Board</span>
              </a>
              <span className="badge bg-dark border border-secondary text-secondary-emphasis px-3 py-2 rounded-pill fs-8">
                React Review Assignment
              </span>
            </Container>
          </header>

          {/* Main Layout Container */}
          <main className="main-content">
            <Container>
              <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/write" element={<PostForm />} />
                <Route path="/edit/:id" element={<PostForm />} />
              </Routes>
            </Container>
          </main>

          {/* Footer */}
          <footer className="py-4 mt-auto text-center text-secondary border-top border-secondary-subtle">
            <Container>
              <p className="mb-1 small">© 2026 Antigravity Board. All rights reserved.</p>
              <p className="small text-muted">
                Powered by React, Bootstrap, React Router, useContext & useReducer.
              </p>
            </Container>
          </footer>
        </div>
      </BrowserRouter>
    </BoardProvider>
  );
}

export default App;
