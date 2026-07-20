import client from "../api/client.js";

// 화면에서는 기존 명칭인 viewCount를 사용한다. 서버의 hit 필드 변화는 이 계층에서만 처리한다.
const normalizeBoard = (board) => ({
  ...board,
  viewCount: board.hit,
});

export async function getBoards() {
  const response = await client.get("/boards");

  // 명세의 목록 응답은 페이지 객체가 아닌 BoardSummaryResponse 배열이다.
  return response.data.map(normalizeBoard);
}

export async function getBoard(id) {
  const response = await client.get(`/boards/${id}`);
  return normalizeBoard(response.data);
}

export async function createBoard({ title, content, writer }) {
  const response = await client.post("/boards", {
    title,
    content,
    writer,
  });

  return normalizeBoard(response.data);
}

export async function updateBoard({ id, boardData }) {
  // BoardUpdateRequest에는 writer가 없으므로 의도적으로 제외한다.
  const response = await client.put(`/boards/${id}`, {
    title: boardData.title,
    content: boardData.content,
  });

  return normalizeBoard(response.data);
}

export async function deleteBoard(id) {
  // 204 No Content이 정상 응답이므로 response.data가 비어 있어도 성공으로 처리된다.
  await client.delete(`/boards/${id}`);
}
