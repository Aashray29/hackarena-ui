import type { Team } from "@/types";
import { apiClient } from "./apiClient";

export const teamService = {
  async getMyTeam(): Promise<Team | null> {
    const data = await apiClient.get<{
      success: boolean;
      data: Team | null;
    }>("/teams/my");

    return data.data;
  },

  async list(hackathonId?: string): Promise<Team[]> {
    const endpoint = hackathonId
      ? `/teams?hackathon_id=${hackathonId}`
      : "/teams";

    const data = await apiClient.get<{
      success: boolean;
      data: Team[];
    }>(endpoint);

    return data.data;
  },

  async getById(teamId: string) {
    const data = await apiClient.get(`/teams/${teamId}`);

    return data.data;
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

  async invite(teamId: string, userId: number) {
    return apiClient.post(`/teams/${teamId}/invite`, {
      user_id: userId,
    });
  },

  async removeMember(teamId: string, userId: number) {
    return apiClient.delete(
      `/teams/${teamId}/members/${userId}`,
    );
  },

  async requestToJoin(teamId: string) {
    return apiClient.post(`/teams/${teamId}/requests`);
  },
};