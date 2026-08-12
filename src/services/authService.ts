import type { Role } from "@/types";
import { apiClient } from "./apiClient";

export interface UserProfile {
  user_id: number;
  name: string;
  email: string;
  college?: string | null;
  phone?: string | null;
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

interface RegisterResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

function persistUser(user: UserProfile) {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const data = await apiClient.post<LoginResponse>(
      "/auth/login",
      { email, password },
      false,
    );

    if (!data.success || !data.token || !data.user) {
      throw new Error(data.message || "Login failed");
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("token", data.token);
      persistUser(data.user);
    }

    return data;
  },

  async register(form: Record<string, string>): Promise<RegisterResponse> {
    const data = await apiClient.post<RegisterResponse>(
      "/auth/register",
      {
        name: form["fullName"],
        email: form["email"],
        password: form["password"],
        college: form["college"],
        phone: form["phone"],
      },
      false,
    );

    if (!data.success) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  },

  async getMe(): Promise<UserProfile> {
    const data = await apiClient.get<MeResponse>("/auth/me");

    if (!data.user) {
      throw new Error("Unable to load current user");
    }

    persistUser(data.user);
    return data.user;
  },

  async updateProfile(profile: {
    name: string;
    college?: string;
    phone?: string;
  }): Promise<UserProfile> {
    const data = await apiClient.put<{ success: boolean; user: UserProfile }>(
      "/auth/profile",
      profile,
    );

    if (!data.user) {
      throw new Error("Unable to update profile");
    }

    persistUser(data.user);
    return data.user;
  },

  async getParticipants() {
    const data = await apiClient.get<{
      success: boolean;
      data: Array<{
        user_id: number;
        name: string;
        email: string;
        college: string | null;
        phone: string | null;
        registered_hackathons: number;
        team_name: string | null;
      }>;
    }>("/auth/participants");

    return data.data;
  },

  logout() {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken(): string | null {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem("token");
  },

  getUser(): UserProfile | null {
    if (typeof window === "undefined") {
      return null;
    }

    const user = localStorage.getItem("user");

    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user) as UserProfile;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  },

  isLoggedIn(): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    return Boolean(localStorage.getItem("token"));
  },
};
