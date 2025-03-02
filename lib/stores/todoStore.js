import { create } from 'zustand';
import useAuthStore from './authStore';  

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const { token } = useAuthStore.getState();

const useTodoStore = create((set,get) => ({
  todos: [],
  isLoading: false,
  getTodos: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/todo`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      // console.log("data", data.result);
      set({ todos: data.result, isLoading: false });
    } catch (error) {
      console.error('Error fetching todos:', error);
      set({ isLoading: false });
    }
  },

  createTodo: async (newTodo) => {
    set({ isLoading: true });
    try {
      await fetch(`${BASE_URL}/todo/todo`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      get().getTodos();
    } catch (error) {
      console.error('Error creating todo:', error);
      set({ isLoading: false });
    }
  },

  deleteTodo: async (todoId) => {
    set({ isLoading: true });
    try {
      await fetch(`${BASE_URL}/todo/${todoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
      get().getTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
      set({ isLoading: false });
    }
  },

  updateTodo: async (todoId) => {
    set({ isLoading: true });
    try {
      await fetch(`${BASE_URL}/todo/${todoId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
      get().getTodos();
        } catch (error) {
      console.error('Error updating todo:', error);
      set({ isLoading: false });
    }
  },

  priorityTodo: async (todoId) => {
    set({ isLoading: true });
    try {
      await fetch(`${BASE_URL}/todo/${todoId}/priority`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
      get().getTodos();
    } catch (error) {
      console.error('Error updating priority of todo:', error);
      set({ isLoading: false });
    }
  },
}));

export default useTodoStore;
