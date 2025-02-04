import { create } from "zustand";
import { persist } from "zustand/middleware";

const BASE_URL = "http://127.0.0.1:8000";

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: "",
      isAuthenticated: false, 
      setToken: (newToken) => set({ token: newToken, isAuthenticated: true }),
      clearToken: () => set({ token: "", isAuthenticated: false }),

      login: async (email, password) => {
        set({ isLoading: true });
        // console.log(email, password);
        try {
          const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const accessToken = data.bearer.accessToken;
            // console.log("data", accessToken);
            set({ token: accessToken, isAuthenticated: true });
            // console.log("Login successful!");
          } else {
            // console.error("Login failed");
          }
        } catch (error) {
          // console.error("Error during login:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (data) => {
        set({ isLoading: true });
        try {
          const response = await fetch(`${BASE_URL}/user/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
              password: data.password,
              userName: data.userName,
            }),
          });

          if (response.ok) {
            // console.log("Register successful!");
            get().login(data.email, data.password);
          } else {
            console.error("Register failed");
          }
        } catch (error) {
          console.error("Error during login:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        set({ token: "", isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage", // localStorage'da ne isimle saklanacağı
      getStorage: () => localStorage, // Veriyi hangi storage'da saklayacağı
    }
  )
);

export default useAuthStore;
