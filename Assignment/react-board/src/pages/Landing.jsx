import { Link } from "react-router-dom";
import useUserStore from "../store/userStore.js";

export default function Landing() {
  const user = useUserStore((s) => s.user);
  return <section className="home"><p className="kicker">ARCHIVE COMMUNITY</p><h1>생각이 모여<br /><em>다음이 됩니다.</em></h1><p className="home-copy">아이디어와 경험, 그리고 좋은 질문을 나누는 기록의 공간입니다. 로그인 후 게시글과 댓글로 대화에 참여해 보세요.</p><div className="home-actions"><Link className="button button-primary" to={user ? "/boards" : "/login"}>{user ? "토론 보러가기" : "로그인하기"}</Link><Link className="button button-ghost" to={user ? "/boards/write" : "/register"}>{user ? "글 작성하기" : "회원가입하기"}</Link></div><div className="home-stats"><div><strong>JWT</strong><span>SECURE SESSION</span></div><div><strong>24/7</strong><span>OPEN DISCUSSION</span></div><div><strong>∞</strong><span>IDEAS TO SHARE</span></div></div></section>;
}
