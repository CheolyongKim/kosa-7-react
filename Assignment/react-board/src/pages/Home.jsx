import { Link } from "react-router-dom";
import { useBoards } from "../hooks/useBoard.js";

export default function Home() {
  const { data: boards = [] } = useBoards();

  return (
    <section className="home">
      <p className="kicker">ARCHIVE COMMUNITY</p>
      <h1>
        생각이 쌓여
        <br />
        <em>더 나은 제품</em>이 됩니다.
      </h1>
      <p className="home-copy">
        아이디어, 경험, 그리고 팀의 배움을 한곳에 아카이브하세요.
      </p>
      <div className="home-actions">
        <Link className="button button-primary" to="/boards">
          토론 둘러보기
        </Link>
        <Link className="button button-ghost" to="/boards/write">
          첫 토픽 작성
        </Link>
      </div>
      <div className="home-stats">
        <div>
          <strong>{boards.length}</strong>
          <span>ARCHIVED TOPICS</span>
        </div>
        <div>
          <strong>24/7</strong>
          <span>OPEN DISCUSSION</span>
        </div>
        <div>
          <strong>∞</strong>
          <span>IDEAS TO SHARE</span>
        </div>
      </div>
    </section>
  );
}
