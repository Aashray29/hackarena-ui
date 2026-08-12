import type {
  Hackathon,
  HackathonStatus,
} from "@/types";
import { apiClient } from "./apiClient";

interface BackendHackathon {
  hackathon_id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  registration_deadline: string;
  team_size_min: number;
  team_size_max: number;
  status: string;
  created_at: string;
}

const mapStatus = (status: string): HackathonStatus => {
  switch (status) {
    case "registration_open":
      return "Registration Open";

    case "upcoming":
      return "Upcoming";

    case "ongoing":
      return "Ongoing";

    case "completed":
      return "Completed";

    default:
      return "Upcoming";
  }
};

const mapHackathon = (h: BackendHackathon): Hackathon => ({
  id: String(h.hackathon_id),
  name: h.name,
  tagline: "",
  description: h.description || "",

  startDate: h.start_date,
  endDate: h.end_date,
  registrationDeadline: h.registration_deadline,

  minTeamSize: h.team_size_min,
  maxTeamSize: h.team_size_max,

  status: mapStatus(h.status),

  participants: 0,
  teams: 0,

  prizePool: "",
  prizes: [],

  rules: [],
  themes: [],
  technologies: [],
  timeline: [],

  location: "",
  mode: "Online",
});

export const hackathonService = {
  async list(): Promise<Hackathon[]> {
    const data = await apiClient.get<{
      success: boolean;
      count: number;
      data: BackendHackathon[];
    }>("/hackathons", false);

    return data.data.map(mapHackathon);
  },

  async getById(id: string): Promise<Hackathon> {
    const data = await apiClient.get<{
      success: boolean;
      data: BackendHackathon;
    }>(`/hackathons/${id}`, false);

    return mapHackathon(data.data);
  },

  async create(payload: {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    registration_deadline: string;
    team_size_min: number;
    team_size_max: number;
    status: string;
  }) {
    return apiClient.post("/hackathons", payload);
  },

  async update(
    id: string,
    payload: Partial<{
      name: string;
      description: string;
      start_date: string;
      end_date: string;
      registration_deadline: string;
      team_size_min: number;
      team_size_max: number;
      status: string;
    }>,
  ) {
    return apiClient.put(`/hackathons/${id}`, payload);
  },

  async remove(id: string) {
    return apiClient.delete(`/hackathons/${id}`);
  },
};