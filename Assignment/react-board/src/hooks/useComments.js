import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as commentService from "../services/commentService.js";

const key = (boardId) => ["boards", boardId, "comments"];
const refresh = (queryClient, boardId) => queryClient.invalidateQueries({ queryKey: key(boardId) });
export const useComments = (boardId) => useQuery({ queryKey: key(boardId), queryFn: () => commentService.getComments(boardId), enabled: Boolean(boardId) });
export function useCreateComment() { const queryClient = useQueryClient(); return useMutation({ mutationFn: commentService.createComment, onSuccess: (_, values) => refresh(queryClient, values.boardId) }); }
export function useUpdateComment() { const queryClient = useQueryClient(); return useMutation({ mutationFn: commentService.updateComment, onSuccess: (_, values) => refresh(queryClient, values.boardId) }); }
export function useDeleteComment() { const queryClient = useQueryClient(); return useMutation({ mutationFn: commentService.deleteComment, onSuccess: (_, values) => refresh(queryClient, values.boardId) }); }
