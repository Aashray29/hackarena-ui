import type { Submission } from "@/types";
import { apiClient } from "./apiClient";

export interface SubmissionPayload {
  team_id: number;
  project_name: string;
  description: string;
  github_url: string;
  demo_url?: string;
  technologies: string;
}

export const submissionService = {
  async getMySubmission(): Promise<Submission | null> {
    const data = await apiClient.get<{
      success: boolean;
      data: Submission | null;
    }>("/submissions/my");

    return data.data;
  },

  async getById(id: string) {
    const data = await apiClient.get(`/submissions/${id}`);

    return data.data;
  },

  async create(payload: SubmissionPayload) {
    return apiClient.post("/submissions", payload);
  },

  async update(
    id: string,
    payload: Partial<SubmissionPayload>,
  ) {
    return apiClient.put(`/submissions/${id}`, payload);
  },
};