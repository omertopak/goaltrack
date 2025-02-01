import { create } from 'zustand';
import useAuthStore from './authStore';  

const BASE_URL = 'http://127.0.0.1:8000';
const { token } = useAuthStore.getState();

const useChainStore = create((set,get) => ({
  chains: [],
  isLoading: false,
  getChain: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/chain`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log("data", data);
      set({ chains: data.result, isLoading: false });
    } catch (error) {
      console.error('Error fetching chains:', error);
      set({ isLoading: false });
    }
  },

  createChain: async (newChain) => {
    set({ isLoading: true });
    try {
      await fetch(`${BASE_URL}/chain/chain`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newChain),
      });
      get().getChain();
    } catch (error) {
      console.error('Error creating chain:', error);
      set({ isLoading: false });
    }
  },

  deleteChain: async (chainId) => {
    set({ isLoading: true });
    try {
      await fetch(`${BASE_URL}/chain/${chainId}`, {
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

  updateChain: async (chainId) => {
    set({ isLoading: true });
    try {
      await fetch(`${BASE_URL}/chain/${chainId}`, {
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
