import { currentAdmin, currentJudge, currentParticipant } from "@/data/mockUsers";
import type { Role } from "@/types";
import { delay } from "./apiClient";

export interface DemoProfile {
  id: string;
  name: string;
  email: string;
  college: string;
  phone: string;
  role: Role;
}

/** No real authentication — these helpers only return mock profiles. */
export const authService = {
  getDemoProfile(role: Role): DemoProfile {
    if (role === "admin") return currentAdmin;
    if (role === "judge") {
      return {
        id: currentJudge.id,
        name: currentJudge.name,
        email: currentJudge.email,
        college: currentJudge.organization,
        phone: "+91 98400 55512",
        role: "judge",
      };
    }
    return {
      id: currentParticipant.id,
      name: currentParticipant.name,
      email: currentParticipant.email,
      college: currentParticipant.college,
      phone: currentParticipant.phone,
      role: "participant",
    };
  },
  login(email: string, _password: string) {
    return delay({ ok: true, email });
  },
  register(payload: Record<string, string>) {
    return delay({ ok: true, payload });
  },
  updateProfile(payload: Partial<DemoProfile>) {
    return delay({ ok: true, payload });
  },
};
