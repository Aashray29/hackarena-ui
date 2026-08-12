import type { Role } from "@/types";

export const ROLE_LABELS: Record<Role, string> = {
  participant: "Participant",
  admin: "Administrator",
  judge: "Judge",
};

export const DASHBOARD_BY_ROLE: Record<Role, string> = {
  participant: "/participant",
  admin: "/admin",
  judge: "/judge",
};

/** Demo accounts from database seed — role is stored on the user record in MySQL. */
export const DEMO_ACCOUNTS: Array<{
  role: Role;
  label: string;
  email: string;
  password: string;
  description: string;
}> = [
  {
    role: "participant",
    label: "Participant",
    email: "aashray@example.com",
    password: "password123",
    description: "Register for hackathons, create/join teams, submit projects",
  },
  {
    role: "admin",
    label: "Admin",
    email: "admin@hackarena.com",
    password: "admin123",
    description: "Manage hackathons, teams, judges and results",
  },
  {
    role: "judge",
    label: "Judge",
    email: "judge1@hackarena.com",
    password: "judge123",
    description: "Evaluate assigned project submissions",
  },
];

export function getDashboardForRole(role: Role): string {
  return DASHBOARD_BY_ROLE[role];
}
