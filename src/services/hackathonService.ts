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

interface HackathonListResponse {
  success: boolean;
  count: number;
  data: BackendHackathon[];
}

interface HackathonResponse {
  success: boolean;
  data: BackendHackathon;
}

const mapStatus = (
  status: string,
): HackathonStatus => {
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

const mapHackathon = (
  hackathon: BackendHackathon,
): Hackathon => {
  return {
    id: String(hackathon.hackathon_id),

    name: hackathon.name,

    tagline: hackathon.description,

    description: hackathon.description || "",

    startDate: hackathon.start_date,

    endDate: hackathon.end_date,

    registrationDeadline:
      hackathon.registration_deadline,

    minTeamSize: hackathon.team_size_min,

    maxTeamSize: hackathon.team_size_max,

    status: mapStatus(hackathon.status),

    // Your current backend response doesn't provide these.
    participants: 0,
    teams: 0,

    prizePool: "",

    prizes: [],

    rules: [],

    themes: [],

    technologies: [],

    timeline: [],

    location: "Online",

    mode: "Online",
  };
};

export const hackathonService = {
  async list(): Promise<Hackathon[]> {
    const response =
      await apiClient.get<HackathonListResponse>(
        "/hackathons",
        false,
      );

    return response.data.map(mapHackathon);
  },

  async getById(
    id: string,
  ): Promise<Hackathon> {
    const response =
      await apiClient.get<HackathonResponse>(
        `/hackathons/${id}`,
        false,
      );

    return mapHackathon(response.data);
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
    return apiClient.post(
      "/hackathons",
      payload,
    );
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
    return apiClient.put(
      `/hackathons/${id}`,
      payload,
    );
  },

  async remove(id: string) {
    return apiClient.delete(
      `/hackathons/${id}`,
    );
  },
};