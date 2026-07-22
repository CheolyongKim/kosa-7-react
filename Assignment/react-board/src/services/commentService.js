import client from "../api/client.js";

export const getComments = async (boardId) => (await client.get(`/boards/${boardId}/comments`)).data;
export const createComment = async ({ boardId, content }) => (await client.post(`/boards/${boardId}/comments`, { content })).data;
export const updateComment = async ({ boardId, commentId, content }) => (await client.put(`/boards/${boardId}/comments/${commentId}`, { content })).data;
export const deleteComment = async ({ boardId, commentId }) => client.delete(`/boards/${boardId}/comments/${commentId}`);
