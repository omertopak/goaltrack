import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: '',
  setToken: (newToken) => set({ token: newToken }),
}));

export default useAuthStore;
