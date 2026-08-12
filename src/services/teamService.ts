import type { Team } from "@/types";
import { mapTeam, type BackendTeam } from "@/lib/mappers";
import { apiClient } from "./apiClient";

export const teamService = {
  async getMyTeam(hackathonId?: string): Promise<Team | null> {
    try {
      const endpoint = hackathonId
        ? `/teams/my?hackathon_id=${hackathonId}`
        : "/teams/my";

      const data = await apiClient.get<{
        success: boolean;
        data: BackendTeam;
      }>(endpoint);

      return mapTeam(data.data);
    } catch {
      return null;
    }
  },

  async list(hackathonId?: string): Promise<Team[]> {
    const endpoint = hackathonId
      ? `/teams?hackathon_id=${hackathonId}`
      : "/teams";

    const data = await apiClient.get<{
      success: boolean;
      data: BackendTeam[];
    }>(endpoint);

    return data.data.map((team) => mapTeam(team));
  },

  async getById(teamId: string) {
    const data = await apiClient.get<{
      success: boolean;
      data: BackendTeam;
    }>(`/teams/${teamId}`);

    return mapTeam(data.data);
  },

  async create(payload: {
    team_name: string;
    hackathon_id: number;
  }) {
    return apiClient.post("/teams", payload);
  },

  async join(teamId: string) {
    return apiClient.post(`/teams/${teamId}/join`);
  },

  async leave(teamId: string) {
    return apiClient.delete(`/teams/${teamId}/leave`);
  },

  async invite(teamId: string, email: string) {
    return apiClient.post(`/teams/${teamId}/invite`, { email });
  },

  async remove(teamId: string) {
    return apiClient.delete(`/teams/${teamId}`);
  },

  async requestToJoin(teamId: string) {
    return apiClient.post(`/teams/${teamId}/join`);
  },
};
