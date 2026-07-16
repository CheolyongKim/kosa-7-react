import { memo } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';

// memo를 사용해 post prop이 바뀌지 않은 행은 다시 렌더링하지 않게 한다.
const PostRow = memo(function PostRow({ post }) {
  return (
    <article className="post-row">
      <div>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
        <p>{post.content}</p>
      </div>
      <div className="post-meta">
        <span>{post.author}</span>
        <span>{formatDate(post.createdAt)}</span>
        <span>조회 {post.views}</span>
      </div>
    </article>
  );
});

export default PostRow;
