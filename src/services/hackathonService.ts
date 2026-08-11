import { mockHackathons } from "@/data/mockHackathons";
import type { Hackathon } from "@/types";
import { delay } from "./apiClient";

export const hackathonService = {
  list(): Hackathon[] {
    return mockHackathons;
  },
  getById(id: string): Hackathon | undefined {
    return mockHackathons.find((h) => h.id === id);
  },
  listAsync() {
    return delay(mockHackathons);
  },
  create(payload: Partial<Hackathon>) {
    return delay({ ok: true, payload });
  },
  update(id: string, payload: Partial<Hackathon>) {
    return delay({ ok: true, id, payload });
  },
  remove(id: string) {
    return delay({ ok: true, id });
  },
  register(id: string) {
    return delay({ ok: true, id });
  },
};
