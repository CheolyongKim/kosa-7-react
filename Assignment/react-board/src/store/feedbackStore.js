import { create } from "zustand";

const useFeedbackStore = create((set) => ({
  toast: null,
  dialog: null,
  showToast: (message, tone = "success") => {
    const id = Date.now();
    set({ toast: { id, message, tone } });
    window.setTimeout(() => {
      set((state) => (state.toast?.id === id ? { toast: null } : state));
    }, 3200);
  },
  closeToast: () => set({ toast: null }),
  confirm: (options) => set({ dialog: options }),
  closeDialog: () => set({ dialog: null }),
}));

export default useFeedbackStore;
