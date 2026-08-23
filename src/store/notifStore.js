import { create } from 'zustand';

const useNotifStore = create((set) => ({
  unreadCount: 0,
  setUnreadCount: (n) => set({ unreadCount: n }),
  increment: () => set((s) => ({ unreadCount: s.unreadCount + 1 })),
  decrement: () => set((s) => ({ unreadCount: Math.max(0, s.unreadCount - 1) })),
}));

export default useNotifStore;
