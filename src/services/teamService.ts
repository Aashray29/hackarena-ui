import { currentTeam, mockTeams } from "@/data/mockTeams";
import type { Team } from "@/types";
import { delay } from "./apiClient";

export const teamService = {
  list(): Team[] {
    return mockTeams;
  },
  getMyTeam(): Team {
    return currentTeam;
  },
  getById(id: string) {
    return mockTeams.find((t) => t.id === id);
  },
  create(payload: { name: string; hackathonId: string; maxMembers: number }) {
    return delay({ ok: true, payload });
  },
  join(code: string) {
    return delay({ ok: true, code });
  },
  invite(email: string) {
    return delay({ ok: true, email });
  },
  leave(teamId: string) {
    return delay({ ok: true, teamId });
  },
  requestToJoin(teamId: string) {
    return delay({ ok: true, teamId });
  },
  remove(teamId: string) {
    return delay({ ok: true, teamId });
  },
};
