import { apiClient } from "./apiClient";

export interface EvaluationPayload {
  submission_id: number;
  innovation_score: number;
  technical_score: number;
  presentation_score: number;
  impact_score: number;
  feedback?: string;
}

export const evaluationService = {
  async getMyAssignments() {
    const data = await apiClient.get(
      "/judge/assignments",
    );

    return data.data;
  },

  async getAssignment(submissionId: string) {
    const data = await apiClient.get(
      `/judge/assignments/${submissionId}`,
    );

    return data.data;
  },

  async create(payload: EvaluationPayload) {
    return apiClient.post("/evaluations", payload);
  },

  async getBySubmission(submissionId: string) {
    const data = await apiClient.get(
      `/evaluations/submission/${submissionId}`,
    );

    return data.data;
  },

  async getMyEvaluations() {
    const data = await apiClient.get(
      "/evaluations/my",
    );

    return data.data;
  },
};