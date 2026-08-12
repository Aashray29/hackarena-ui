import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Crown, Medal, Award } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { evaluationService } from "@/services/evaluationService";
import { hackathonService } from "@/services/hackathonService";
import { cn } from "@/lib/utils";
import type { Hackathon, LeaderboardEntry } from "@/types";

export const Route = createFileRoute("/leaderboard")({
  component: LeaderboardPage,
});

const podiumStyles = [
  { ring: "ring-gold/50", text: "text-gold", label: "1st Place", medal: "🥇", order: "sm:order-2 sm:scale-105" },
  { ring: "ring-silver/50", text: "text-silver", label: "2nd Place", medal: "🥈", order: "sm:order-1" },
  { ring: "ring-bronze/50", text: "text-bronze", label: "3rd Place", medal: "🥉", order: "sm:order-3" },
];

function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [hackathon, setHackathon] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [leaderboard, hackathonList] = await Promise.all([
          evaluationService.leaderboard(),
          hackathonService.list(),
        ]);
        setEntries(leaderboard);
        setHackathons(hackathonList);
      } catch (error) {
        console.error("Failed to load leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadFiltered = async () => {
      try {
        const data = await evaluationService.leaderboard(
          hackathon === "all" ? undefined : hackathon,
        );
        setEntries(data);
      } catch (error) {
        console.error("Failed to filter leaderboard:", error);
      }
    };

    if (!loading) {
      loadFiltered();
    }
  }, [hackathon, loading]);

  const filtered = useMemo(
    () =>
      entries.filter(
        (e) =>
          e.teamName.toLowerCase().includes(query.toLowerCase()) ||
          e.projectName.toLowerCase().includes(query.toLowerCase()),
      ),
    [entries, query],
  );

  const top3 = entries.slice(0, 3);

  if (loading) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-7xl px-4 py-12 text-muted-foreground">Loading leaderboard...</div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-12 sm:px-6">
        <PageHeader
          title="Leaderboard"
          description="Ranked by total judge score across innovation, technical implementation, presentation and impact."
        />

        <div className="grid gap-5 sm:grid-cols-3">
          {top3.map((entry, i) => {
            const style = podiumStyles[i]!;
            return (
              <div
                key={entry.teamName}
                className={cn(
                  "surface-card hover-lift rounded-2xl p-6 text-center ring-1",
                  style.ring,
                  style.order,
                )}
              >
                <div className="text-3xl">{style.medal}</div>
                <p className={cn("mt-2 font-display text-sm font-semibold", style.text)}>
                  {style.label}
                </p>
                <h3 className="mt-3 truncate font-display text-xl font-bold">{entry.teamName}</h3>
                <p className="mt-1 truncate text-sm text-muted-foreground">{entry.projectName}</p>
                <p className="mt-4 font-display text-4xl font-bold text-gradient">{entry.score}</p>
                <p className="text-xs text-muted-foreground">total score</p>
                <p className="mt-3 truncate text-xs text-muted-foreground">{entry.hackathonName}</p>
              </div>
            );
          })}
        </div>

        <div className="surface-card grid gap-3 rounded-2xl p-4 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search team or project..."
              className="pl-9"
            />
          </div>
          <Select value={hackathon} onValueChange={setHackathon}>
            <SelectTrigger className="md:w-64"><SelectValue placeholder="Hackathon" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All hackathons</SelectItem>
              {hackathons.map((h) => (
                <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="surface-card overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Rank</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead className="hidden md:table-cell">Hackathon</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((e) => (
                  <TableRow key={`${e.teamName}-${e.rank}`}>
                    <TableCell className="font-display font-bold">#{e.rank}</TableCell>
                    <TableCell>
                      <p className="font-medium">{e.teamName}</p>
                      <p className="text-xs text-muted-foreground">{e.college}</p>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{e.projectName}</TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {e.hackathonName}
                    </TableCell>
                    <TableCell className="text-right font-display font-bold text-primary">
                      {e.score}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filtered.length === 0 && (
            <p className="p-10 text-center text-sm text-muted-foreground">No results found.</p>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
