import { useCallback, useEffect, useMemo, useReducer } from 'react';
import {
  createRemotePost,
  deleteRemotePost,
  fetchPosts,
  updateRemotePost,
} from '../api/posts';
import { BoardContext } from './BoardContextValue';

const initialState = { posts: [], status: 'loading', error: null };

// 게시판의 모든 상태 변경을 reducer에 모아두면
// 추가/수정/삭제/댓글/조회수 로직이 컴포넌트 밖에서 일관되게 관리된다.
function boardReducer(state, action) {
  switch (action.type) {
    case 'LOAD_SUCCESS':
      return { ...state, posts: action.posts, status: 'success', error: null };
    case 'LOAD_ERROR':
      return { ...state, status: 'error', error: action.error };
    case 'ADD':
      return { ...state, posts: [action.post, ...state.posts] };
    case 'UPDATE':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.post.id ? { ...post, ...action.post } : post,
        ),
      };
    case 'REMOVE':
      return { ...state, posts: state.posts.filter((post) => post.id !== action.id) };
    case 'VIEW':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.id ? { ...post, views: post.views + 1 } : post,
        ),
      };
    case 'COMMENT_ADD':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.id
            ? { ...post, comments: [...post.comments, action.comment] }
            : post,
        ),
      };
    default:
      return state;
  }
}

export function BoardProvider({ children }) {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  // useCallback으로 함수를 고정해 useEffect/useMemo의 의존성 변경을 줄인다.
  const loadPosts = useCallback(async () => {
    try {
      dispatch({ type: 'LOAD_SUCCESS', posts: await fetchPosts() });
    } catch (error) {
      dispatch({ type: 'LOAD_ERROR', error: error.message });
    }
  }, []);

  // 앱이 처음 렌더링될 때 JSONPlaceholder에서 게시글을 불러온다.
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const createPost = useCallback(async ({ title, author, content }) => {
    const remote = await createRemotePost({ title, content });
    const post = {
      id: remote.id ?? Date.now(),
      title,
      author,
      content,
      userId: remote.userId ?? 1,
      views: 0,
      createdAt: new Date().toISOString(),
      comments: [],
      isLocal: true,
    };

    dispatch({ type: 'ADD', post });
    return post;
  }, []);

  const updatePost = useCallback(async (post) => {
    // 사용자가 새로 작성한 글은 JSONPlaceholder에 실제로 존재하지 않으므로
    // 원격 PUT 요청 없이 로컬 상태만 수정한다.
    if (!post.isLocal) await updateRemotePost(post);
    dispatch({ type: 'UPDATE', post });
  }, []);

  const removePost = useCallback(
    async (id) => {
      const target = state.posts.find((post) => post.id === id);
      if (target && !target.isLocal) await deleteRemotePost(id);
      dispatch({ type: 'REMOVE', id });
    },
    [state.posts],
  );

  const increaseViews = useCallback((id) => dispatch({ type: 'VIEW', id }), []);

  const addComment = useCallback((id, author, text) => {
    dispatch({
      type: 'COMMENT_ADD',
      id,
      comment: { id: Date.now(), author, text, createdAt: new Date().toISOString() },
    });
  }, []);

  // Provider value를 useMemo로 감싸면 Context 소비 컴포넌트의 불필요한 렌더를 줄일 수 있다.
  const value = useMemo(
    () => ({
      ...state,
      loadPosts,
      createPost,
      updatePost,
      removePost,
      increaseViews,
      addComment,
    }),
    [state, loadPosts, createPost, updatePost, removePost, increaseViews, addComment],
  );

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}
