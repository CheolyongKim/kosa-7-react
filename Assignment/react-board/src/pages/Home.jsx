import { Link } from "react-router-dom";
import { useBoards } from "../hooks/useBoard.js";

export default function Home() {
  const { data } = useBoards({ page: 1, size: 1 });
  return (
    <section className="home">
      <p className="kicker">ARCHIVE COMMUNITY</p>
      <h1>
        생각이 모여<br />
        <em>다음이 됩니다</em>
      </h1>
      <p className="home-copy">
        아이디어와 경험, 그리고 좋은 질문을 나누는 따뜻한 커뮤니티입니다.
      </p>
      <div className="home-actions">
        <Link className="button button-primary" to="/boards">토론 둘러보기</Link>
        <Link className="button button-ghost" to="/boards/write">첫 글 작성하기</Link>
      </div>
      <div className="home-stats">
        <div><strong>{data?.totalElements ?? 0}</strong><span>ARCHIVED TOPICS</span></div>
        <div><strong>24/7</strong><span>OPEN DISCUSSION</span></div>
        <div><strong>∞</strong><span>IDEAS TO SHARE</span></div>
      </div>
    </section>
  );
}
