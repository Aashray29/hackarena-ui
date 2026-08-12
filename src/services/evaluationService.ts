import type { Evaluation, LeaderboardEntry, Submission } from "@/types";
import {
  mapEvaluation,
  mapLeaderboardEntry,
  mapSubmission,
  type BackendEvaluation,
  type BackendSubmission,
} from "@/lib/mappers";
import { apiClient } from "./apiClient";

export interface EvaluationPayload {
  assignment_id: number;
  innovation_score: number;
  technical_score: number;
  presentation_score: number;
  impact_score: number;
  feedback?: string;
}

export const evaluationService = {
  async getMyAssignments(): Promise<
    Array<Submission & { assignmentId: string }>
  > {
    const data = await apiClient.get<{
      success: boolean;
      data: BackendSubmission[];
    }>("/judge-assignments/my");

    return data.data.map((item) => ({
      ...mapSubmission(item),
      assignmentId: String(item.assignment_id ?? ""),
    }));
  },

  async list(): Promise<Evaluation[]> {
    const data = await apiClient.get<{
      success: boolean;
      data: BackendEvaluation[];
    }>("/evaluations");

    return data.data.map((item, index) => mapEvaluation(item, index + 1));
  },

  async getMyResults(): Promise<Evaluation[]> {
    const data = await apiClient.get<{
      success: boolean;
      data: BackendEvaluation[];
    }>("/evaluations/my");

    return data.data.map((item, index) => mapEvaluation(item, index + 1));
  },

  async leaderboard(hackathonId?: string): Promise<LeaderboardEntry[]> {
    const endpoint = hackathonId
      ? `/evaluations/leaderboard?hackathon_id=${hackathonId}`
      : "/evaluations/leaderboard";

    const data = await apiClient.get<{
      success: boolean;
      data: Array<{
        rank: number;
        team_name: string;
        project_name: string;
        hackathon_id: number;
        hackathon_name: string;
        average_score: number;
        college?: string | null;
      }>;
    }>(endpoint, false);

    return data.data.map(mapLeaderboardEntry);
  },

  async create(payload: EvaluationPayload) {
    return apiClient.post("/evaluations", payload);
  },

  async submit(payload: {
    assignmentId: string;
    innovation: number;
    technical: number;
    presentation: number;
    impact: number;
    feedback?: string;
  }) {
    const body: EvaluationPayload = {
      assignment_id: Number(payload.assignmentId),
      innovation_score: payload.innovation,
      technical_score: payload.technical,
      presentation_score: payload.presentation,
      impact_score: payload.impact,
    };

    if (payload.feedback) {
      body.feedback = payload.feedback;
    }

    return this.create(body);
  },

  async assign(payload: {
    judgeId: string;
    submissionId: string;
  }) {
    return apiClient.post("/judge-assignments", {
      judge_id: Number(payload.judgeId),
      submission_id: Number(payload.submissionId),
    });
  },

  async getJudges() {
    const data = await apiClient.get<{
      success: boolean;
      data: Array<{
        user_id: number;
        name: string;
        email: string;
        college: string | null;
        assigned: number;
        evaluated: number;
      }>;
    }>("/judge-assignments/judges");

    return data.data;
  },

  async getBySubmission(submissionId: string) {
    const data = await apiClient.get<{ success: boolean; data: unknown }>(
      `/evaluations/submission/${submissionId}`,
    );
    return data.data;
  },

  async getMyEvaluations() {
    return this.getMyResults();
  },
};
