import type { Hackathon } from "@/types";
import { authService } from "./authService";

const API_URL = "http://localhost:5000/api";

const mapHackathon = (h: any): Hackathon => ({
  id: String(h.hackathon_id),
  name: h.name,
  description: h.description,
  startDate: h.start_date,
  endDate: h.end_date,
  registrationDeadline: h.registration_deadline,
  teamSizeMin: h.team_size_min,
  teamSizeMax: h.team_size_max,
  status: h.status,
});

export const hackathonService = {
  async listAsync(): Promise<Hackathon[]> {
    const response = await fetch(`${API_URL}/hackathons`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch hackathons");
    }

    return data.data.map(mapHackathon);
  },

  async getById(id: string): Promise<Hackathon> {
    const response = await fetch(`${API_URL}/hackathons/${id}`, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch hackathon");
    }

    return mapHackathon(data.data);
  },

  async create(payload: Partial<Hackathon>) {
    const response = await fetch(`${API_URL}/hackathons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authService.getToken()}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to create hackathon");
    }

    return data;
  },

  async update(id: string, payload: Partial<Hackathon>) {
    const response = await fetch(`${API_URL}/hackathons/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authService.getToken()}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to update hackathon");
    }

    return data;
  },

  async remove(id: string) {
    const response = await fetch(`${API_URL}/hackathons/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to delete hackathon");
    }

    return data;
  },

  async register(id: string) {
    const response = await fetch(`${API_URL}/registrations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authService.getToken()}`,
      },
      body: JSON.stringify({
        hackathon_id: Number(id),
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to register");
    }

    return data;
  },
};