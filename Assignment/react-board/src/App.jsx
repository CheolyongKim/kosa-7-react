import AppRouter from './routes/AppRouter.jsx'

// App은 라우팅 진입점만 담당한다. 화면 조합 책임은 routes로 분리해 테스트와 확장을 쉽게 한다.
export default function App() {
  return <AppRouter />
}
