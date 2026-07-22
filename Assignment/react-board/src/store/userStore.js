import { create } from "zustand";

// UI 전역 상태만 Zustand에 둔다. 게시글처럼 서버가 진실의 원천인 데이터는 React Query가 담당한다.
const useUserStore = create((set) => ({
  user: (() => {
    try {
      return JSON.parse(localStorage.getItem("authUser") ?? "null");
    } catch {
      return null;
    }
  })(),

  login: ({ user, token }) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authUser");
    set({ user: null });
  },
}));

export default useUserStore;
