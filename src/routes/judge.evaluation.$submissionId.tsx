import { useState } from "react";
import { createFileRoute, useNavigate, Link, notFound } from "@tanstack/react-router";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { submissionService } from "@/services/submissionService";
import { evaluationService } from "@/services/evaluationService";

export const Route = createFileRoute("/judge/evaluation/$submissionId")({
  head: () => ({
    meta: [
      { title: "Evaluate Project — HackArena Judge" },
      { name: "description", content: "Score a hackathon project on innovation, technical depth, impact and presentation." },
      { property: "og:title", content: "Evaluate Project — HackArena Judge" },
      { property: "og:description", content: "Judge scoring form." },
    ],
  }),
  component: JudgeEvaluation,
});

const criteria = [
  { key: "innovation", label: "Innovation & Creativity", max: 25 },
  { key: "technical", label: "Technical Complexity", max: 25 },
  { key: "impact", label: "Impact & Usefulness", max: 25 },
  { key: "presentation", label: "Presentation & Demo", max: 25 },
] as const;

function JudgeEvaluation() {
  const { submissionId } = Route.useParams();
  const navigate = useNavigate();
  const submission = submissionService.list().find((s) => s.id === submissionId);
  const [scores, setScores] = useState<Record<string, number>>({
    innovation: 20,
    technical: 20,
    impact: 20,
    presentation: 20,
  });
  const [feedback, setFeedback] = useState("");

  if (!submission) throw notFound();

  const total = criteria.reduce((sum, c) => sum + (scores[c.key] ?? 0), 0);

  return (
    <>
      <Button asChild variant="ghost" size="sm" className="w-fit">
        <Link to="/judge/assigned">
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to assigned
        </Link>
      </Button>

      <PageHeader
        title={submission.projectName}
        description={`${submission.teamName} · ${submission.hackathonName}`}
        actions={<StatusBadge status={submission.evaluationStatus} />}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <form
          className="surface-card space-y-7 rounded-2xl p-6"
          onSubmit={async (e) => {
            e.preventDefault();
            await evaluationService.submit({ submissionId, scores, feedback, total });
            toast.success("Evaluation submitted");
            navigate({ to: "/judge/assigned" });
          }}
        >
          <h2 className="font-display text-lg font-semibold">Scoring</h2>

          {criteria.map((c) => (
            <div key={c.key} className="space-y-3">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <Label className="truncate">{c.label}</Label>
                <span className="shrink-0 font-display text-sm font-bold text-primary">
                  {scores[c.key]} / {c.max}
                </span>
              </div>
              <Slider
                value={[scores[c.key] ?? 0]}
                max={c.max}
                step={1}
                onValueChange={([v]) => setScores((p) => ({ ...p, [c.key]: v ?? 0 }))}
              />
            </div>
          ))}

          <div className="space-y-2">
            <Label htmlFor="feedback">Feedback for the team</Label>
            <Textarea
              id="feedback"
              rows={5}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Highlight strengths and what could be improved..."
              required
            />
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-border bg-background/40 p-4">
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Total score</p>
              <p className="font-display text-3xl font-bold text-gradient">{total}/100</p>
            </div>
            <Button type="submit" size="lg" className="shrink-0">
              Submit Evaluation
            </Button>
          </div>
        </form>

        <aside className="space-y-6">
          <section className="surface-card rounded-2xl p-6">
            <h2 className="font-display text-lg font-semibold">Project details</h2>
            <p className="mt-3 text-sm text-muted-foreground">{submission.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {submission.technologies.map((t: string) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild size="sm" variant="secondary">
                <a href={submission.githubUrl} target="_blank" rel="noreferrer">
                  <Github className="mr-1.5 h-4 w-4" /> Repository
                </a>
              </Button>
              <Button asChild size="sm" variant="secondary">
                <a href={submission.demoUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-1.5 h-4 w-4" /> Live demo
                </a>
              </Button>
            </div>
          </section>

          <section className="surface-card rounded-2xl p-6">
            <h2 className="font-display text-lg font-semibold">Scoring guide</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>21–25 — Outstanding, best in class</li>
              <li>16–20 — Strong, above expectations</li>
              <li>11–15 — Solid, meets expectations</li>
              <li>0–10 — Needs significant work</li>
            </ul>
          </section>
        </aside>
      </div>
    </>
  );
}
