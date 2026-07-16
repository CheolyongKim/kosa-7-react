const API_URL = 'https://jsonplaceholder.typicode.com';

// JSONPlaceholder 응답은 title/body/userId 중심이라서,
// 게시판 화면에서 쓰기 좋은 필드명으로 한 번 정규화한다.
const normalizePost = (post) => ({
  id: post.id,
  title: post.title,
  content: post.body,
  author: `사용자 ${post.userId}`,
  userId: post.userId,
  views: Math.floor(((post.id * 17) % 83) + 12),
  createdAt: new Date(2026, 6, Math.max(1, 28 - post.id)).toISOString(),
  comments: [],
  isLocal: false,
});

// 게시글 목록 조회: 앱 최초 진입 시 Context에서 호출된다.
export async function fetchPosts() {
  const response = await fetch(`${API_URL}/posts?_limit=30`);
  if (!response.ok) throw new Error('게시글을 불러오지 못했습니다.');

  return (await response.json()).map(normalizePost);
}

// JSONPlaceholder는 실제 저장소가 아니라 테스트용 API이므로,
// 응답값을 받은 뒤 화면 상태는 프론트엔드에서 직접 갱신한다.
export async function createRemotePost(post) {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ title: post.title, body: post.content, userId: 1 }),
  });

  if (!response.ok) throw new Error('게시글을 등록하지 못했습니다.');
  return response.json();
}

export async function updateRemotePost(post) {
  const response = await fetch(`${API_URL}/posts/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      id: post.id,
      title: post.title,
      body: post.content,
      userId: post.userId ?? 1,
    }),
  });

  if (!response.ok) throw new Error('게시글을 수정하지 못했습니다.');
  return response.json();
}

export async function deleteRemotePost(id) {
  const response = await fetch(`${API_URL}/posts/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('게시글을 삭제하지 못했습니다.');
}
