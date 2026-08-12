import type { Role } from "@/types";

const API_URL = "http://localhost:5000/api";

export interface UserProfile {
  user_id: number;
  name: string;
  email: string;
  role: Role;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: UserProfile;
}

export const authService = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data: LoginResponse = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Invalid email or password");
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken() {
    return localStorage.getItem("token");
  },

  getUser(): UserProfile | null {
    const user = localStorage.getItem("user");

    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  },

  isLoggedIn() {
    return !!localStorage.getItem("token");
  },
};