import { useEffect, useMemo, useState } from "react";
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
import type { Hackathon, Team } from "@/types";

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
  const [teams, setTeams] = useState<Team[]>([]);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [hackathon, setHackathon] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [teamList, hackathonList] = await Promise.all([
          teamService.list(),
          hackathonService.list(),
        ]);
        setTeams(teamList);
        setHackathons(hackathonList);
      } catch (error) {
        console.error("Failed to load teams:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const results = useMemo(
    () =>
      teams.filter(
        (t) =>
          (hackathon === "all" || t.hackathonId === hackathon) &&
          t.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [teams, query, hackathon],
  );

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading teams...</div>;
  }

  return (
    <>
      <PageHeader
        title="Find Teams"
        description="Browse teams and request to join one that fits your hackathon."
      />

      <div className="surface-card grid gap-3 rounded-2xl p-4 lg:grid-cols-[minmax(0,1fr)_auto]">
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
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {results.map((t) => {
          const memberCount = t.memberCount ?? t.members.length;
          const isFull = memberCount >= t.maxMembers;

          return (
            <article key={t.id} className="surface-card hover-lift flex flex-col rounded-2xl p-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <h3 className="truncate font-display text-lg font-semibold">{t.name}</h3>
                <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs text-primary">
                  {memberCount}/{t.maxMembers}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-muted-foreground">{t.hackathonName}</p>

              <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Crown className="h-4 w-4 shrink-0 text-gold" />
                <span className="truncate">{t.leader}</span>
              </p>

            <Button
              className="mt-5 w-full"
              disabled={isFull}
              onClick={async () => {
                try {
                  await teamService.requestToJoin(t.id);
                  toast.success(`Joined ${t.name}! Check My Team.`);
                } catch (error) {
                  toast.error(
                    error instanceof Error
                      ? error.message
                      : "Join failed — register for the hackathon first",
                  );
                }
              }}
            >
                {isFull ? "Team is full" : "Request to Join"}
              </Button>
            </article>
          );
        })}
      </div>

      {results.length === 0 && (
        <div className="surface-card rounded-2xl p-12 text-center text-muted-foreground">
          No teams match your filters.
        </div>
      )}
    </>
  );
}
