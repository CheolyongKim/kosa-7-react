import Router from "./routes/Router.jsx";
import FeedbackLayer from "./components/FeedbackLayer.jsx";

// App은 라우팅 진입점만 담당한다. 화면 조합 책임은 routes로 분리해 테스트와 확장을 쉽게 한다.
// 애플리케이션의 최상위 컴포넌트는 라우터 진입만 담당한다.
// 화면 조합은 AppRouter와 Layout에 위임해 역할을 작게 유지한다.
export default function App() {
  return (
    <>
      <Router />
      <FeedbackLayer />
    </>
  );
}
