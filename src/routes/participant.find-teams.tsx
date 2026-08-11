import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Crown } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { teamService } from "@/services/teamService";
import { hackathonService } from "@/services/hackathonService";
import { allSkills } from "@/data/mockTeams";

export const Route = createFileRoute("/participant/find-teams")({
  head: () => ({
    meta: [
      { title: "Find Teams — HackArena" },
      { name: "description", content: "Discover hackathon teams looking for members with your skills." },
      { property: "og:title", content: "Find Teams — HackArena" },
      { property: "og:description", content: "Browse open teams and request to join." },
    ],
  }),
  component: FindTeams,
});

function FindTeams() {
  const teams = teamService.list();
  const hackathons = hackathonService.list();
  const [query, setQuery] = useState("");
  const [hackathon, setHackathon] = useState("all");
  const [skill, setSkill] = useState("all");

  const results = useMemo(
    () =>
      teams.filter(
        (t) =>
          (hackathon === "all" || t.hackathonId === hackathon) &&
          (skill === "all" || t.requiredSkills.includes(skill)) &&
          t.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [teams, query, hackathon, skill],
  );

  return (
    <>
      <PageHeader
        title="Find Teams"
        description="Teams currently looking for members. Send a request and the leader will review it."
      />

      <div className="surface-card grid gap-3 rounded-2xl p-4 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
        <div className="relative min-w-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search teams..."
            className="pl-9"
          />
        </div>
        <Select value={hackathon} onValueChange={setHackathon}>
          <SelectTrigger className="lg:w-56"><SelectValue placeholder="Hackathon" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All hackathons</SelectItem>
            {hackathons.map((h) => (
              <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={skill} onValueChange={setSkill}>
          <SelectTrigger className="lg:w-48"><SelectValue placeholder="Skill" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All skills</SelectItem>
            {allSkills.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {results.map((t) => (
          <article key={t.id} className="surface-card hover-lift flex flex-col rounded-2xl p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <h3 className="truncate font-display text-lg font-semibold">{t.name}</h3>
              <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs text-primary">
                {t.members.length}/{t.maxMembers}
              </span>
            </div>
            <p className="mt-1 truncate text-sm text-muted-foreground">{t.hackathonName}</p>

            <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Crown className="h-4 w-4 shrink-0 text-gold" />
              <span className="truncate">{t.leader}</span>
            </p>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Looking for
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {t.requiredSkills.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg border border-border bg-background/40 px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <Button
              className="mt-5 w-full"
              disabled={!t.lookingForMembers || t.members.length >= t.maxMembers}
              onClick={async () => {
                await teamService.requestToJoin(t.id);
                toast.success(`Join request sent to ${t.name}`);
              }}
            >
              {t.lookingForMembers ? "Request to Join" : "Team is full"}
            </Button>
          </article>
        ))}
      </div>

      {results.length === 0 && (
        <div className="surface-card rounded-2xl p-12 text-center text-muted-foreground">
          No teams match your filters.
        </div>
      )}
    </>
  );
}
