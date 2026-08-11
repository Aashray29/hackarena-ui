import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList, CheckCircle2, Hourglass, Star } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { evaluationService } from "@/services/evaluationService";
import { submissionService } from "@/services/submissionService";

export const Route = createFileRoute("/judge/")({
  head: () => ({
    meta: [
      { title: "Judge Dashboard — HackArena" },
      { name: "description", content: "Your evaluation workload, pending reviews and scoring history." },
      { property: "og:title", content: "Judge Dashboard — HackArena" },
      { property: "og:description", content: "Evaluate hackathon projects on HackArena." },
    ],
  }),
  component: JudgeDashboard,
});

function JudgeDashboard() {
  const submissions = submissionService.list();
  const evaluations = evaluationService.list();
  const pending = submissions.filter((s) => s.evaluationStatus !== "Evaluated");

  return (
    <>
      <PageHeader
        title="Judge Dashboard"
        description="Projects assigned to you for evaluation."
        actions={
          <Button asChild>
            <Link to="/judge/assigned">Start evaluating</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Assigned Projects" value={submissions.length} icon={ClipboardList} />
        <StatCard label="Evaluated" value={evaluations.length} icon={CheckCircle2} />
        <StatCard label="Pending" value={pending.length} icon={Hourglass} />
        <StatCard label="Average Score Given" value={86} icon={Star} hint="out of 100" />
      </div>

      <section className="surface-card rounded-2xl p-6">
        <h2 className="font-display text-lg font-semibold">Pending evaluations</h2>
        <ul className="mt-4 space-y-3">
          {pending.map((s) => (
            <li
              key={s.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-border bg-background/40 p-4"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{s.projectName}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {s.teamName} · {s.hackathonName}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <StatusBadge status={s.evaluationStatus} />
                <Button asChild size="sm">
                  <Link to="/judge/evaluation/$submissionId" params={{ submissionId: s.id }}>
                    Evaluate
                  </Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
