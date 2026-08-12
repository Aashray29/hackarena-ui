import type {
  Evaluation,
  HackathonStatus,
  LeaderboardEntry,
  Submission,
  Team,
  TeamMember,
} from "@/types";

export function toHackathonStatus(status: string): HackathonStatus {
  switch (status) {
    case "registration_open":
      return "Registration Open";
    case "ongoing":
      return "Ongoing";
    case "completed":
      return "Completed";
    default:
      return "Upcoming";
  }
}

export function toBackendStatus(status: HackathonStatus): string {
  switch (status) {
    case "Registration Open":
      return "registration_open";
    case "Ongoing":
      return "ongoing";
    case "Completed":
      return "completed";
    default:
      return "upcoming";
  }
}

interface BackendTeamMember {
  user_id: number;
  name: string;
  email?: string;
  college: string | null;
  is_leader?: boolean | number;
  joined_at?: string;
}

interface BackendTeam {
  team_id: number;
  team_name: string;
  hackathon_id: number;
  hackathon_name: string;
  leader_id: number;
  leader_name?: string;
  team_size_max?: number;
  team_size_min?: number;
  member_count?: number;
  current_members?: number;
  submission_status?: string;
  members?: BackendTeamMember[];
}

export function mapTeam(team: BackendTeam): Team {
  const members: TeamMember[] = (team.members ?? []).map((member) => ({
    userId: String(member.user_id),
    name: member.name,
    college: member.college ?? "",
    role: member.is_leader ? "Team Leader" : "Member",
    skills: [],
  }));

  const leader =
    team.leader_name ??
    members.find((member) => member.role === "Team Leader")?.name ??
    "—";

  const maxMembers = team.team_size_max ?? 4;
  const memberCount = team.current_members ?? team.member_count ?? members.length;

  return {
    id: String(team.team_id),
    name: team.team_name,
    hackathonId: String(team.hackathon_id),
    hackathonName: team.hackathon_name,
    leader,
    members,
    memberCount,
    maxMembers,
    requiredSkills: [],
    lookingForMembers: memberCount < maxMembers,
    submissionStatus:
      team.submission_status === "Submitted" ? "Submitted" : "Not Submitted",
  };
}

interface BackendSubmission {
  submission_id: number;
  team_id: number;
  project_name: string;
  description: string | null;
  github_url: string | null;
  demo_url: string | null;
  technologies: string | null;
  submitted_at: string;
  team_name: string;
  hackathon_id: number;
  hackathon_name: string;
  evaluation_status?: string;
  average_score?: number | null;
  assignment_id?: number;
}

export function mapSubmission(submission: BackendSubmission): Submission {
  const technologies = submission.technologies
    ? submission.technologies.split(",").map((item) => item.trim())
    : [];

  let evaluationStatus: Submission["evaluationStatus"] = "Pending";

  if (submission.evaluation_status === "Evaluated") {
    evaluationStatus = "Evaluated";
  } else if (submission.evaluation_status === "In Review") {
    evaluationStatus = "In Review";
  }

  return {
    id: String(submission.submission_id),
    projectName: submission.project_name,
    description: submission.description ?? "",
    technologies,
    githubUrl: submission.github_url ?? "",
    demoUrl: submission.demo_url ?? "",
    teamId: String(submission.team_id),
    teamName: submission.team_name,
    hackathonId: String(submission.hackathon_id),
    hackathonName: submission.hackathon_name,
    submittedAt: submission.submitted_at,
    evaluationStatus,
    score: submission.average_score ?? null,
  };
}

interface BackendEvaluation {
  evaluation_id: number;
  assignment_id?: number;
  innovation_score: number;
  technical_score: number;
  presentation_score: number;
  impact_score: number;
  total_score: number;
  feedback: string | null;
  judge_name: string;
  judge_id?: number;
  project_name: string;
  team_name: string;
  hackathon_name: string;
  submission_id?: number;
  rank?: number;
}

export function mapEvaluation(
  evaluation: BackendEvaluation,
  rank = 0,
): Evaluation {
  return {
    id: String(evaluation.evaluation_id),
    submissionId: String(evaluation.submission_id ?? evaluation.assignment_id ?? ""),
    projectName: evaluation.project_name,
    teamName: evaluation.team_name,
    hackathonName: evaluation.hackathon_name,
    judgeId: String(evaluation.judge_id ?? ""),
    judgeName: evaluation.judge_name,
    innovation: evaluation.innovation_score,
    technical: evaluation.technical_score,
    presentation: evaluation.presentation_score,
    impact: evaluation.impact_score,
    total: evaluation.total_score,
    rank: evaluation.rank ?? rank,
    feedback: evaluation.feedback ?? "",
  };
}

interface BackendLeaderboardEntry {
  rank: number;
  team_name: string;
  project_name: string;
  hackathon_id: number;
  hackathon_name: string;
  average_score: number;
  college?: string | null;
}

export function mapLeaderboardEntry(
  entry: BackendLeaderboardEntry,
): LeaderboardEntry {
  return {
    rank: entry.rank,
    teamName: entry.team_name,
    projectName: entry.project_name,
    hackathonId: String(entry.hackathon_id),
    hackathonName: entry.hackathon_name,
    score: Number(entry.average_score),
    college: entry.college ?? "",
  };
}

export type { BackendSubmission, BackendTeam, BackendEvaluation };
