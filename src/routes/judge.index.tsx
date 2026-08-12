import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList, CheckCircle2, Hourglass, Star } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { evaluationService } from "@/services/evaluationService";
import type { Submission } from "@/types";

type AssignedSubmission = Submission & { assignmentId: string };

export const Route = createFileRoute("/judge/")({
  component: JudgeDashboard,
});

function JudgeDashboard() {
  const [submissions, setSubmissions] = useState<AssignedSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await evaluationService.getMyAssignments();
        setSubmissions(data);
      } catch (error) {
        console.error("Failed to load assignments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const pending = useMemo(
    () => submissions.filter((s) => s.evaluationStatus !== "Evaluated"),
    [submissions],
  );

  const evaluated = submissions.length - pending.length;
  const averageScore =
    submissions.reduce((sum, s) => sum + (s.score ?? 0), 0) /
    (submissions.filter((s) => s.score).length || 1);

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading dashboard...</div>;
  }

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
        <StatCard label="Evaluated" value={evaluated} icon={CheckCircle2} />
        <StatCard label="Pending" value={pending.length} icon={Hourglass} />
        <StatCard
          label="Average Score Given"
          value={Math.round(averageScore) || 0}
          icon={Star}
          hint="out of 100"
        />
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
          {pending.length === 0 && (
            <li className="text-sm text-muted-foreground">No pending evaluations.</li>
          )}
        </ul>
      </section>
    </>
  );
}
