import { mockEvaluations, mockLeaderboard } from "@/data/mockEvaluations";
import type { Evaluation, LeaderboardEntry } from "@/types";
import { delay } from "./apiClient";

export interface EvaluationDraft {
  submissionId: string;
  innovation: number;
  technical: number;
  presentation: number;
  impact: number;
  feedback: string;
}

export const evaluationService = {
  list(): Evaluation[] {
    return mockEvaluations;
  },
  getBySubmission(submissionId: string) {
    return mockEvaluations.find((e) => e.submissionId === submissionId);
  },
  leaderboard(): LeaderboardEntry[] {
    return mockLeaderboard;
  },
  submit(payload: EvaluationDraft) {
    return delay({ ok: true, payload });
  },
  assign(payload: { judgeId: string; hackathonId: string; submissionId: string }) {
    return delay({ ok: true, payload });
  },
};
