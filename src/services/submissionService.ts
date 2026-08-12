import type { Submission } from "@/types";
import {
  mapSubmission,
  type BackendSubmission,
} from "@/lib/mappers";
import { apiClient } from "./apiClient";

export interface SubmissionPayload {
  team_id: number;
  project_name: string;
  description: string;
  github_url: string;
  demo_url?: string;
  technologies: string;
}

export interface SubmissionDraft {
  projectName: string;
  description: string;
  technologies: string;
  githubUrl: string;
  demoUrl: string;
  teamName: string;
}

export const submissionService = {
  async getMySubmission(hackathonId?: string): Promise<Submission | null> {
    try {
      const endpoint = hackathonId
        ? `/submissions/my?hackathon_id=${hackathonId}`
        : "/submissions/my";

      const data = await apiClient.get<{
        success: boolean;
        data: BackendSubmission;
      }>(endpoint);

      return mapSubmission(data.data);
    } catch {
      return null;
    }
  },

  async list(): Promise<Submission[]> {
    const data = await apiClient.get<{
      success: boolean;
      data: BackendSubmission[];
    }>("/submissions");

    return data.data.map(mapSubmission);
  },

  async getById(id: string) {
    const data = await apiClient.get<{
      success: boolean;
      data: BackendSubmission;
    }>(`/submissions/${id}`);

    return mapSubmission(data.data);
  },

  async create(payload: SubmissionPayload) {
    return apiClient.post("/submissions", payload);
  },

  async submit(form: SubmissionDraft, teamId: number) {
    return this.create({
      team_id: teamId,
      project_name: form.projectName,
      description: form.description,
      github_url: form.githubUrl,
      demo_url: form.demoUrl,
      technologies: form.technologies,
    });
  },

  async update(id: string, payload: Partial<SubmissionPayload>) {
    return apiClient.put(`/submissions/${id}`, payload);
  },
};
