import type { Role } from "@/types";
import { apiClient } from "./apiClient";

export interface UserProfile {
  user_id: number;
  name: string;
  email: string;
  role: Role;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: UserProfile;
}

interface MeResponse {
  success: boolean;
  user: UserProfile;
}

export const authService = {
  async login(email: string, password: string) {
    const data = await apiClient.post<LoginResponse>(
      "/auth/login",
      {
        email,
        password,
      },
      false,
    );

    if (typeof window !== "undefined") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  },

  async getMe() {
    const data = await apiClient.get<MeResponse>("/auth/me");

    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data.user;
  },

  logout() {
    if (typeof window === "undefined") return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken() {
    if (typeof window === "undefined") return null;

    return localStorage.getItem("token");
  },

  getUser(): UserProfile | null {
    if (typeof window === "undefined") return null;

    const user = localStorage.getItem("user");

    if (!user) return null;

    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  },

  isLoggedIn() {
    if (typeof window === "undefined") return false;

    return !!localStorage.getItem("token");
  },
};