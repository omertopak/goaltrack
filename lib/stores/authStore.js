import { create } from "zustand";
const BASE_URL = "http://127.0.0.1:8000";


const useAuthStore = create((set,get) => ({
  token: "",
  isAuthenticated: false, // Kullanıcı doğrulama durumu
  setToken: (newToken) => set({ token: newToken, isAuthenticated: true }),
  clearToken: () => set({ token: "", isAuthenticated: false }),

  login: async (email,password) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
        //   {
        //   email: "omer@gmail.com",
        //   password: "omeromer",
        // }
      ),
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.bearer.accessToken;
        console.log("data", accessToken);
        set({ token: accessToken ,isAuthenticated:true});
        console.log("Login successful!");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }finally {
        set({ isLoading: false });
      }
  },

  register: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          // {
          // email: "omer4@gmail.com",
          // password: "omeromer",
          // userName: "omer4",
        // }
      ),
      });

      if (response.ok) {
        console.log("Register successful!");
      } else {
        console.error("Register failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }finally {
      set({ isLoading: false });
    }
  },
  logout:async () => {
    set({ isLoading: true });
    set({ token: "" ,isAuthenticated:false});
    
  }
}));

export default useAuthStore;
