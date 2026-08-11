import { mockSubmissions } from "@/data/mockSubmissions";
import type { Submission } from "@/types";
import { delay } from "./apiClient";

export interface SubmissionDraft {
  projectName: string;
  description: string;
  technologies: string;
  githubUrl: string;
  demoUrl: string;
  teamName: string;
}

export const submissionService = {
  list(): Submission[] {
    return mockSubmissions;
  },
  getById(id: string) {
    return mockSubmissions.find((s) => s.id === id);
  },
  listByJudge(_judgeId: string): Submission[] {
    return mockSubmissions;
  },
  submit(payload: SubmissionDraft) {
    return delay({ ok: true, payload });
  },
};
