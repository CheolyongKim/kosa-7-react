import client from "../api/axios.js";

const seed = [
  {
    id: 1,
    title: "React 게시판을 시작하며",
    writer: "김코덱스",
    viewCount: 124,
    createdAt: "2026-07-20",
    content:
      "컴포넌트의 역할을 작게 나누고, 서버 상태는 TanStack Query로 관리합니다.",
  },
  {
    id: 2,
    title: "TanStack Query 캐싱 전략",
    writer: "이지민",
    viewCount: 87,
    createdAt: "2026-07-19",
    content:
      "staleTime은 데이터가 삭제되는 시간이 아니라, 최신이라고 판단하는 시간입니다.",
  },
  {
    id: 3,
    title: "Spring Boot API 연결 준비",
    writer: "박서준",
    viewCount: 56,
    createdAt: "2026-07-18",
    content: "VITE_API_BASE_URL 환경 변수로 API 주소를 분리했습니다.",
  },
];

const storageKey = "react-board-demo-data";

// 페이지 이동을 바로 확인할 수 있도록 fallback 모드에서 넉넉한 목록을 제공한다.
const paginationFixtures = Array.from({ length: 37 }, (_, index) => ({
  id: index + 4,
  title: `테스트 게시글 ${index + 4} - 아무 말 대잔치 ${["React", "CSS", "API", "팀워크"][index % 4]}`,
  writer: ["김더미", "이테스트", "박샘플", "최페이지"][index % 4],
  viewCount: 10 + ((index * 17) % 240),
  createdAt: `2026-07-${String(17 - (index % 17)).padStart(2, "0")}`,
  content: "페이지네이션 동작을 확인하기 위한 더미 게시글입니다. 특별한 내용은 없고, 목록이 여러 페이지로 나뉘는지 확인하는 용도로만 사용합니다.",
}));

const getLocalBoards = () => {
  const stored = localStorage.getItem(storageKey);
  if (!stored) return [...seed, ...paginationFixtures];
  const boards = JSON.parse(stored);
  return boards.length < 10 ? [...boards, ...paginationFixtures] : boards;
};

const saveLocalBoards = (boards) =>
  localStorage.setItem(storageKey, JSON.stringify(boards));

const isNetworkError = (error) => !error.response;

// 개발용 백엔드가 없거나 아직 수정 endpoint가 준비되지 않은 경우에는
// 등록/삭제와 동일하게 로컬 데이터를 사용할 수 있도록 한다. 인증 오류나
// 서버 내부 오류까지 숨기면 실제 문제를 찾기 어려우므로 404/405만 허용한다.
const canUseLocalFallback = (error) =>
  isNetworkError(error) || [404, 405].includes(error.response?.status);

// 백엔드가 준비되지 않은 학습 환경에서도 화면 흐름을 확인할 수 있도록 네트워크 오류에만 폴백한다.
export async function getBoards({ page = 0, size = 10, keyword = "" }) {
  try {
    const response = await client.get("/boards", {
      params: { page, size, keyword },
    });

    return response.data;
  } catch (error) {
    if (!canUseLocalFallback(error)) throw error;

    const filtered = getLocalBoards().filter((board) =>
      board.title.toLowerCase().includes(keyword.toLowerCase()),
    );

    return {
      content: filtered.slice(page * size, page * size + size),
      number: page,
      totalPages: Math.max(1, Math.ceil(filtered.length / size)),
      totalElements: filtered.length,
    };
  }
}

export async function getBoard(id) {
  try {
    const response = await client.get(`/boards/${id}`);
    return response.data;
  } catch (error) {
    if (!isNetworkError(error)) throw error;

    const board = getLocalBoards().find((item) => item.id === Number(id));

    if (!board) {
      throw new Error("게시글을 찾을 수 없습니다.", {
        cause: error,
      });
    }

    return board;
  }
}

export async function createBoard(payload) {
  try {
    const response = await client.post("/boards", payload);
    return response.data;
  } catch (error) {
    if (!isNetworkError(error)) throw error;

    const board = {
      ...payload,
      id: Date.now(),
      viewCount: 0,
      createdAt: new Date().toISOString(),
    };

    saveLocalBoards([board, ...getLocalBoards()]);
    return board;
  }
}

export async function updateBoard({ id, boardData }) {
  try {
    const response = await client.put(`/boards/${id}`, boardData);
    return response.data;
  } catch (error) {
    if (!canUseLocalFallback(error)) throw error;

    const boards = getLocalBoards().map((board) =>
      board.id === Number(id) ? { ...board, ...boardData } : board,
    );

    const updatedBoard = boards.find((board) => board.id === Number(id));

    if (!updatedBoard) {
      throw new Error("게시글을 찾을 수 없습니다.", { cause: error });
    }

    saveLocalBoards(boards);
    return updatedBoard;
  }
}

export async function deleteBoard(id) {
  try {
    const response = await client.delete(`/boards/${id}`);
    return response.data;
  } catch (error) {
    if (!isNetworkError(error)) throw error;

    saveLocalBoards(
      getLocalBoards().filter((board) => board.id !== Number(id)),
    );
    return null;
  }
}
