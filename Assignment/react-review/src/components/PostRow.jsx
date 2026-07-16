import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

// React.memo를 활용한 최적화: 게시글 리스트 항목 컴포넌트
const PostRow = React.memo(({ post, index }) => {
  return (
    <tr className="align-middle border-bottom border-secondary-subtle post-row-hover">
      <td className="text-center text-muted fw-semibold" style={{ width: '80px' }}>
        {index}
      </td>
      <td>
        <Link 
          to={`/post/${post.id}`} 
          className="text-decoration-none fw-bold text-light fs-5 post-title-link d-inline-flex align-items-center gap-2"
        >
          {post.title}
          {post.comments && post.comments.length > 0 && (
            <Badge pill bg="info" className="text-dark comment-badge">
              {post.comments.length}
            </Badge>
          )}
        </Link>
      </td>
      <td className="text-center text-secondary" style={{ width: '120px' }}>
        {post.author}
      </td>
      <td className="text-center text-secondary-emphasis" style={{ width: '100px' }}>
        {post.views}
      </td>
      <td className="text-center text-muted" style={{ width: '160px' }}>
        <small>{post.createdAt.substring(0, 10)}</small>
      </td>
    </tr>
  );
});

PostRow.displayName = 'PostRow';

export default PostRow;
