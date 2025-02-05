import { create } from 'zustand';
import useAuthStore from './authStore';  

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;;
const { token } = useAuthStore.getState();

const useNotesStore = create((set,get) => ({
  notes: [],
  isLoading: false,
  getNotes: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      // console.log("data", data);
      set({ notes: data.result, isLoading: false });
    } catch (error) {
      console.error('Error fetching notes:', error);
      set({ isLoading: false });
    }
  },

  createNote: async (newNote) => {
    set({ isLoading: true });
    try {
      await fetch(`${BASE_URL}/notes/note`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });
      get().getNotes();
    } catch (error) {
      console.error('Error creating note:', error);
      set({ isLoading: false });
    }
  },

  deleteNote: async (noteId) => {
    set({ isLoading: true });
    try {
      await fetch(`${BASE_URL}/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
      get().getNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
      set({ isLoading: false });
    }
  },

  updateNote: async (noteId,note) => {
    set({ isLoading: true });
    try {
      await fetch(`${BASE_URL}/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
      get().getNotes();
    } catch (error) {
      console.error('Error updating note:', error);
      set({ isLoading: false });
    }
  },
}));

export default useNotesStore;
