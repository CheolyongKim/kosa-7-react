import React, { createContext, useReducer, useEffect } from 'react';

// 초기 더미 데이터
const initialPosts = [
  {
    id: 1,
    title: '첫 번째 게시글입니다.',
    content: '안녕하세요. 첫 번째 게시글 내용입니다. React, Bootstrap, Router를 활용하여 제작되었습니다.',
    author: '홍길동',
    views: 12,
    createdAt: '2026-07-15 10:00',
    comments: [
      { id: 1, author: '이순신', text: '좋은 글이네요!', createdAt: '2026-07-15 10:15' }
    ]
  },
  {
    id: 2,
    title: 'React의 Memoization 기술 공유',
    content: 'React.memo, useMemo, useCallback을 활용하면 불필요한 렌더링을 줄여 성능을 극대화할 수 있습니다.',
    author: '김철수',
    views: 45,
    createdAt: '2026-07-15 11:30',
    comments: []
  },
  {
    id: 3,
    title: 'Vite와 Bootstrap을 사용한 UI 디자인',
    content: 'Bootstrap과 사용자 정의 CSS 변수를 조합하여 현대적이고 세련된 Glassmorphism 테마를 구현할 수 있습니다.',
    author: '박영희',
    views: 29,
    createdAt: '2026-07-15 12:45',
    comments: []
  }
];

const boardReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_POSTS':
      return action.payload;
    case 'CREATE_POST': {
      const newPosts = [action.payload, ...state];
      localStorage.setItem('board_posts', JSON.stringify(newPosts));
      return newPosts;
    }
    case 'UPDATE_POST': {
      const newPosts = state.map(post => 
        post.id === action.payload.id ? { ...post, ...action.payload } : post
      );
      localStorage.setItem('board_posts', JSON.stringify(newPosts));
      return newPosts;
    }
    case 'DELETE_POST': {
      const newPosts = state.filter(post => post.id !== action.payload);
      localStorage.setItem('board_posts', JSON.stringify(newPosts));
      return newPosts;
    }
    case 'INCREMENT_VIEW': {
      const newPosts = state.map(post => 
        post.id === action.payload ? { ...post, views: post.views + 1 } : post
      );
      localStorage.setItem('board_posts', JSON.stringify(newPosts));
      return newPosts;
    }
    case 'ADD_COMMENT': {
      const newPosts = state.map(post => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            comments: [...(post.comments || []), action.payload.comment]
          };
        }
        return post;
      });
      localStorage.setItem('board_posts', JSON.stringify(newPosts));
      return newPosts;
    }
    case 'DELETE_COMMENT': {
      const newPosts = state.map(post => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter(comment => comment.id !== action.payload.commentId)
          };
        }
        return post;
      });
      localStorage.setItem('board_posts', JSON.stringify(newPosts));
      return newPosts;
    }
    default:
      return state;
  }
};

export const BoardContext = createContext(null);

export const BoardProvider = ({ children }) => {
  const [posts, dispatch] = useReducer(boardReducer, []);

  // 초기화 시 로컬 스토리지 또는 더미 데이터 로드 (useEffect 활용)
  useEffect(() => {
    const saved = localStorage.getItem('board_posts');
    if (saved) {
      dispatch({ type: 'LOAD_POSTS', payload: JSON.parse(saved) });
    } else {
      dispatch({ type: 'LOAD_POSTS', payload: initialPosts });
      localStorage.setItem('board_posts', JSON.stringify(initialPosts));
    }
  }, []);

  return (
    <BoardContext.Provider value={{ posts, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};
