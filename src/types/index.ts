export type Role = "participant" | "admin" | "judge";

export type HackathonStatus = "Registration Open" | "Upcoming" | "Ongoing" | "Completed";

export interface Hackathon {
  id: string;
  name: string;
  tagline: string;
  description: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  minTeamSize: number;
  maxTeamSize: number;
  status: HackathonStatus;
  participants: number;
  teams: number;
  prizePool: string;
  prizes: { place: string; reward: string }[];
  rules: string[];
  themes: string[];
  technologies: string[];
  timeline: { date: string; title: string; description: string }[];
  location: string;
  mode: "Online" | "Offline" | "Hybrid";
}

export interface User {
  id: string;
  name: string;
  email: string;
  college: string;
  phone: string;
  role: Role;
  skills: string[];
  avatarColor: string;
  status: "Active" | "Inactive";
  registeredHackathons: string[];
  teamId?: string;
}

export interface TeamMember {
  userId: string;
  name: string;
  college: string;
  role: "Team Leader" | "Member";
  skills: string[];
}

export interface Team {
  id: string;
  name: string;
  hackathonId: string;
  hackathonName: string;
  leader: string;
  members: TeamMember[];
  memberCount?: number;
  maxMembers: number;
  requiredSkills: string[];
  lookingForMembers: boolean;
  submissionStatus: "Submitted" | "Not Submitted" | "Draft";
}

export interface Submission {
  id: string;
  projectName: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
  teamId: string;
  teamName: string;
  hackathonId: string;
  hackathonName: string;
  submittedAt: string;
  evaluationStatus: "Pending" | "In Review" | "Evaluated";
  score: number | null;
}

export interface Judge {
  id: string;
  name: string;
  email: string;
  organization: string;
  expertise: string[];
  assigned: number;
  evaluated: number;
}

export interface Evaluation {
  id: string;
  submissionId: string;
  projectName: string;
  teamName: string;
  hackathonName: string;
  judgeId: string;
  judgeName: string;
  innovation: number;
  technical: number;
  presentation: number;
  impact: number;
  total: number;
  rank: number;
  feedback: string;
}

export interface LeaderboardEntry {
  rank: number;
  teamName: string;
  projectName: string;
  hackathonId: string;
  hackathonName: string;
  score: number;
  college: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "registration" | "team" | "submission" | "result";
}
