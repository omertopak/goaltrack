import { create } from 'zustand';
import useAuthStore from './authStore';  

const BASE_URL = 'http://127.0.0.1:8000';
const { token } = useAuthStore.getState();

const useCalendarStore = create((set) => ({
  events: [],
  isLoading: false,
  getEvents: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/events`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log("data", data);
      set({ events: data, isLoading: false });
    } catch (error) {
      console.error('Error fetching events:', error);
      set({ isLoading: false });
    }
  },

  createEvent: async (newNote) => {
    set({ isLoading: true });
    try {
      await fetch(`${BASE_URL}/events/event`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });
      get().getEvents();
    } catch (error) {
      console.error('Error creating event:', error);
      set({ isLoading: false });
    }
  },

  deleteNote: async (eventId) => {
    set({ isLoading: true });
    try {
      await fetch(`${BASE_URL}/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
      get().getEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      set({ isLoading: false });
    }
  },

  updateNote: async (eventId) => {
    set({ isLoading: true });
    try {
      await fetch(`${BASE_URL}/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
      get().getEvents();
    } catch (error) {
      console.error('Error updating event:', error);
      set({ isLoading: false });
    }
  },
}));

export default useCalendarStore;
