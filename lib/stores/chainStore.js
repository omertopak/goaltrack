import { create } from 'zustand';
import useAuthStore from './authStore';  

const BASE_URL = 'http://127.0.0.1:8000';
const { token } = useAuthStore.getState();

const useChainStore = create((set) => ({
  chains: [],
  isLoading: false,
  getChain: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/chains`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log("data", data);
      set({ chains: data, isLoading: false });
    } catch (error) {
      console.error('Error fetching chains:', error);
      set({ isLoading: false });
    }
  },

  createNote: async (newNote) => {
    set({ isLoading: true });
    try {
      await fetch(`${BASE_URL}/chains/chain`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });
      get().getChain();
    } catch (error) {
      console.error('Error creating chain:', error);
      set({ isLoading: false });
    }
  },

  deleteNote: async (chainId) => {
    set({ isLoading: true });
    try {
      await fetch(`${BASE_URL}/chains/${chainId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
      get().getChain();
    } catch (error) {
      console.error('Error deleting chain:', error);
      set({ isLoading: false });
    }
  },

  updateNote: async (chainId) => {
    set({ isLoading: true });
    try {
      await fetch(`${BASE_URL}/chains/${chainId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
      get().getChain();
    } catch (error) {
      console.error('Error updating chain:', error);
      set({ isLoading: false });
    }
  },
}));

export default useChainStore;
