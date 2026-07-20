import { create } from "zustand";

// UI 전역 상태만 Zustand에 둔다. 게시글처럼 서버가 진실의 원천인 데이터는 React Query가 담당한다.
const useUserStore = create((set) => ({
  user: null,

  login: (user) => set({ user }),

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ user: null });
  },
}));

export default useUserStore;
