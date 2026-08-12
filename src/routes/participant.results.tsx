import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Quote } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/ui/progress";
import { evaluationService } from "@/services/evaluationService";
import type { Evaluation } from "@/types";

export const Route = createFileRoute("/participant/results")({
  component: ResultsPage,
});

function ResultsPage() {
  const [results, setResults] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      try {
        const data = await evaluationService.getMyResults();
        setResults(data);
      } catch (error) {
        console.error("Failed to load results:", error);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, []);

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading results...</div>;
  }

  if (results.length === 0) {
    return (
      <>
        <PageHeader title="Results" description="Your evaluated submissions will appear here." />
        <div className="surface-card rounded-2xl p-12 text-center text-muted-foreground">
          No evaluation results yet.
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Results"
        description="Score breakdown and judge feedback for your evaluated submissions."
      />

      <div className="space-y-6">
        {results.map((r) => {
          const criteria = [
            { label: "Innovation", value: r.innovation },
            { label: "Technical", value: r.technical },
            { label: "Presentation", value: r.presentation },
            { label: "Impact", value: r.impact },
          ];

          return (
            <article key={r.id} className="surface-card rounded-2xl p-6">
              <div className="grid gap-4 sm:flex sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h2 className="truncate font-display text-xl font-bold">{r.projectName}</h2>
                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {r.hackathonName} · {r.teamName}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-5">
                  <div className="text-center">
                    <p className="font-display text-3xl font-bold text-gradient">{r.total}</p>
                    <p className="text-xs text-muted-foreground">/ 100 total</p>
                  </div>
                  {r.rank > 0 && (
                    <div className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-2 text-center">
                      <Trophy className="mx-auto h-4 w-4 text-gold" />
                      <p className="mt-1 font-display text-lg font-bold text-gold">#{r.rank}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {criteria.map((c) => (
                  <div key={c.label} className="min-w-0">
                    <div className="flex items-center justify-between gap-2 text-sm">
                      <span className="truncate text-muted-foreground">{c.label}</span>
                      <span className="shrink-0 font-medium">{c.value} / 25</span>
                    </div>
                    <Progress value={(c.value / 25) * 100} className="mt-2 h-2" />
                  </div>
                ))}
              </div>

              {r.feedback && (
                <div className="mt-6 rounded-xl border border-border bg-background/40 p-5">
                  <div className="flex items-center gap-2">
                    <Quote className="h-4 w-4 shrink-0 text-primary" />
                    <p className="truncate text-sm font-medium">Feedback from {r.judgeName}</p>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{r.feedback}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}
