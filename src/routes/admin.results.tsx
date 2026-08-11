import { createFileRoute, Link } from "@tanstack/react-router";
import { Crown, Medal, Award } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { evaluationService } from "@/services/evaluationService";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/results")({
  head: () => ({
    meta: [
      { title: "Results — HackArena Admin" },
      { name: "description", content: "Published results and rankings across all hackathons." },
      { property: "og:title", content: "Results — HackArena Admin" },
      { property: "og:description", content: "Final rankings and scores." },
    ],
  }),
  component: AdminResults,
});

const icons = [Crown, Medal, Award];
const tones = ["text-gold", "text-silver", "text-bronze"];

function AdminResults() {
  const entries = evaluationService.leaderboard();
  const evaluations = evaluationService.list();

  return (
    <>
      <PageHeader
        title="Results"
        description="Final rankings computed from judge evaluations."
        actions={
          <Button asChild variant="secondary">
            <Link to="/leaderboard">Public leaderboard</Link>
          </Button>
        }
      />

      <div className="grid gap-5 sm:grid-cols-3">
        {entries.slice(0, 3).map((e, i) => {
          const Icon = icons[i]!;
          return (
            <div key={e.teamName} className="surface-card rounded-2xl p-5">
              <Icon className={cn("h-6 w-6", tones[i])} />
              <h3 className="mt-3 truncate font-display text-lg font-bold">{e.teamName}</h3>
              <p className="truncate text-sm text-muted-foreground">{e.projectName}</p>
              <p className="mt-3 font-display text-3xl font-bold text-gradient">{e.score}</p>
            </div>
          );
        })}
      </div>

      <div className="surface-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Hackathon</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((e) => (
                <TableRow key={`${e.rank}-${e.teamName}`}>
                  <TableCell className="font-display font-bold">#{e.rank}</TableCell>
                  <TableCell className="font-medium">{e.teamName}</TableCell>
                  <TableCell className="text-muted-foreground">{e.projectName}</TableCell>
                  <TableCell className="text-muted-foreground">{e.hackathonName}</TableCell>
                  <TableCell className="text-right font-display font-bold text-primary">
                    {e.score}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <section className="surface-card rounded-2xl p-6">
        <h2 className="font-display text-lg font-semibold">Judge feedback log</h2>
        <ul className="mt-4 space-y-4">
          {evaluations.map((e) => (
            <li key={e.id} className="rounded-xl border border-border bg-background/40 p-4">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <p className="truncate text-sm font-medium">
                  {e.projectName} · {e.teamName}
                </p>
                <span className="shrink-0 font-display font-bold text-primary">{e.total}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{e.feedback}</p>
              <p className="mt-2 text-xs text-muted-foreground">— {e.judgeName}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
