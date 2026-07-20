import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import * as boardService from "../services/boardService.js";

// queryKey를 한 곳에서 관리하면 목록과 상세 캐시가 서로 충돌하지 않는다.
export const boardKeys = {
  all: ["boards"],
  list: (params) => ["boards", params],
  detail: (id) => ["boards", "detail", id],
};

export const useBoards = (params) =>
  useQuery({
    queryKey: boardKeys.list(params),
    queryFn: () => boardService.getBoards(params),
    placeholderData: keepPreviousData,
  });

export const useBoard = (id) =>
  useQuery({
    queryKey: boardKeys.detail(id),
    queryFn: () => boardService.getBoard(id),
    enabled: Boolean(id),
  });

const invalidateBoards = (queryClient, id) => {
  queryClient.invalidateQueries({ queryKey: boardKeys.all });

  if (id) {
    queryClient.invalidateQueries({
      queryKey: boardKeys.detail(id),
    });
  }
};

export function useCreateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: boardService.createBoard,
    onSuccess: () => invalidateBoards(queryClient),
  });
}

export function useUpdateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: boardService.updateBoard,
    onSuccess: (_, variables) => invalidateBoards(queryClient, variables.id),
  });
}

export function useDeleteBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: boardService.deleteBoard,
    onSuccess: () => invalidateBoards(queryClient),
  });
}
