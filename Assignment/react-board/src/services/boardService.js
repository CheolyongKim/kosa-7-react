import client from "../api/client.js";

const normalizeBoard = (board) => ({ ...board, viewCount: board.hit ?? 0 });

export async function getBoards({ page = 1, size = 8, keyword = "" } = {}) {
  const response = await client.get("/boards", {
    params: { page, size, ...(keyword ? { keyword } : {}) },
  });
  const data = response.data;
  return { ...data, content: (data.content ?? []).map(normalizeBoard) };
}
export async function getBoard(id) {
  const response = await client.get(`/boards/${id}`);
  return normalizeBoard(response.data);
}
export async function createBoard({ title, content, writer }) {
  const response = await client.post("/boards", { title, content, writer });
  return normalizeBoard(response.data);
}
export async function updateBoard({ id, boardData }) {
  const response = await client.put(`/boards/${id}`, {
    title: boardData.title,
    content: boardData.content,
    writer: boardData.writer,
  });
  return normalizeBoard(response.data);
}
export async function deleteBoard(id) {
  await client.delete(`/boards/${id}`);
}
