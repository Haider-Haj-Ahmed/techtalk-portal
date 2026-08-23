import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        localStorage.setItem('token', token);
        set({ user, token, isAuthenticated: true });
      },

      setUser: (user) => set({ user }),

      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    { name: 'tt-auth', partialize: (s) => ({ user: s.user, token: s.token, isAuthenticated: s.isAuthenticated }) }
  )
);

export default useAuthStore;
