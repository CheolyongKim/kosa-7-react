import client from '../api/client.js'

const seed = [
  { id: 1, title: 'React 게시판을 시작하며', writer: '김코덱스', viewCount: 124, createdAt: '2026-07-20', content: '컴포넌트의 역할을 작게 나누고, 서버 상태는 TanStack Query로 관리합니다.' },
  { id: 2, title: 'TanStack Query 캐싱 전략', writer: '이지민', viewCount: 87, createdAt: '2026-07-19', content: 'staleTime은 데이터가 삭제되는 시간이 아니라, 최신이라고 판단하는 시간입니다.' },
  { id: 3, title: 'Spring Boot API 연결 준비', writer: '박서준', viewCount: 56, createdAt: '2026-07-18', content: 'VITE_API_BASE_URL 환경 변수로 API 주소를 분리했습니다.' },
]
const key = 'react-board-demo-data'
const localBoards = () => JSON.parse(localStorage.getItem(key) || JSON.stringify(seed))
const save = (boards) => localStorage.setItem(key, JSON.stringify(boards))
const isNetworkError = (error) => !error.response

// 백엔드가 준비되지 않은 학습 환경에서도 모든 화면 흐름을 확인할 수 있게 네트워크 오류 때만 로컬 데이터로 대체한다.
export async function getBoards({ page = 0, size = 10, keyword = '' }) {
  try { return (await client.get('/boards', { params: { page, size, keyword } })).data }
  catch (error) {
    if (!isNetworkError(error)) throw error
    const filtered = localBoards().filter((board) => board.title.toLowerCase().includes(keyword.toLowerCase()))
    return { content: filtered.slice(page * size, page * size + size), number: page, totalPages: Math.max(1, Math.ceil(filtered.length / size)), totalElements: filtered.length }
  }
}
export async function getBoard(id) {
  try { return (await client.get(`/boards/${id}`)).data }
  catch (error) { if (!isNetworkError(error)) throw error; const board = localBoards().find((item) => item.id === Number(id)); if (!board) throw new Error('게시글을 찾을 수 없습니다.', { cause: error }); return board }
}
export async function createBoard(payload) {
  try { return (await client.post('/boards', payload)).data }
  catch (error) { if (!isNetworkError(error)) throw error; const boards = localBoards(); const board = { ...payload, id: Date.now(), viewCount: 0, createdAt: new Date().toISOString() }; save([board, ...boards]); return board }
}
export async function updateBoard({ id, boardData }) {
  try { return (await client.put(`/boards/${id}`, boardData)).data }
  catch (error) { if (!isNetworkError(error)) throw error; const boards = localBoards().map((board) => board.id === Number(id) ? { ...board, ...boardData } : board); save(boards); return boards.find((board) => board.id === Number(id)) }
}
export async function deleteBoard(id) {
  try { return (await client.delete(`/boards/${id}`)).data }
  catch (error) { if (!isNetworkError(error)) throw error; save(localBoards().filter((board) => board.id !== Number(id))); return null }
}
