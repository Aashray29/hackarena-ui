import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Github, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDateTime } from "@/lib/format";
import { submissionService, type SubmissionDraft } from "@/services/submissionService";
import { currentTeam } from "@/data/mockTeams";

export const Route = createFileRoute("/participant/submission")({
  head: () => ({
    meta: [
      { title: "Project Submission — HackArena" },
      { name: "description", content: "Submit your hackathon project repository, demo and tech stack." },
      { property: "og:title", content: "Project Submission — HackArena" },
      { property: "og:description", content: "Submit and track your hackathon project." },
    ],
  }),
  component: SubmissionPage,
});

const empty: SubmissionDraft = {
  projectName: "",
  description: "",
  technologies: "",
  githubUrl: "",
  demoUrl: "",
  teamName: currentTeam.name,
};

function SubmissionPage() {
  const [form, setForm] = useState<SubmissionDraft>(empty);
  const [submitted, setSubmitted] = useState<(SubmissionDraft & { at: string }) | null>(null);

  const set = (key: keyof SubmissionDraft) => (value: string) =>
    setForm((s) => ({ ...s, [key]: value }));

  return (
    <>
      <PageHeader
        title="Project Submission"
        description="One submission per team. You can resubmit until the deadline."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <form
          className="surface-card space-y-5 rounded-2xl p-6"
          onSubmit={async (e) => {
            e.preventDefault();
            await submissionService.submit(form);
            setSubmitted({ ...form, at: new Date().toISOString() });
            toast.success("Project submitted (demo)");
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              value={form.projectName}
              onChange={(e) => set("projectName")(e.target.value)}
              placeholder="CampusPulse"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              rows={5}
              value={form.description}
              onChange={(e) => set("description")(e.target.value)}
              placeholder="What does your project do, who is it for, and what did you build during the hackathon?"
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies Used</Label>
              <Input
                id="technologies"
                value={form.technologies}
                onChange={(e) => set("technologies")(e.target.value)}
                placeholder="React, Node.js, MySQL"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                value={form.teamName}
                onChange={(e) => set("teamName")(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub Repository URL</Label>
              <Input
                id="githubUrl"
                type="url"
                value={form.githubUrl}
                onChange={(e) => set("githubUrl")(e.target.value)}
                placeholder="https://github.com/team/project"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demoUrl">Demo URL</Label>
              <Input
                id="demoUrl"
                type="url"
                value={form.demoUrl}
                onChange={(e) => set("demoUrl")(e.target.value)}
                placeholder="https://project.demo.dev"
                required
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Submit Project
          </Button>
        </form>

        <aside className="space-y-5">
          {submitted ? (
            <div className="surface-card rounded-2xl p-6">
              <div className="flex items-center gap-2 text-success">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <StatusBadge status="Submitted" />
              </div>
              <h2 className="mt-4 truncate font-display text-lg font-semibold">
                {submitted.projectName}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Submitted on {formatDateTime(submitted.at)}
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="min-w-0">
                  <dt className="text-xs text-muted-foreground">Team</dt>
                  <dd className="truncate">{submitted.teamName}</dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-xs text-muted-foreground">Technologies</dt>
                  <dd className="break-words">{submitted.technologies}</dd>
                </div>
              </dl>
              <div className="mt-5 grid gap-2">
                <Button asChild variant="secondary" size="sm">
                  <a href={submitted.githubUrl} target="_blank" rel="noreferrer">
                    <Github className="mr-1.5 h-4 w-4" /> GitHub
                  </a>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <a href={submitted.demoUrl} target="_blank" rel="noreferrer">
                    <ExternalLink className="mr-1.5 h-4 w-4" /> Live Demo
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="surface-card rounded-2xl p-6">
              <StatusBadge status="Not Submitted" />
              <p className="mt-4 text-sm text-muted-foreground">
                Your submission status will appear here once you submit the form.
              </p>
            </div>
          )}

          <div className="surface-card rounded-2xl p-6">
            <h2 className="font-display text-base font-semibold">Submission checklist</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {[
                "Public GitHub repository with a README",
                "Working demo link (hosted or video)",
                "All team members listed as contributors",
                "Tech stack documented",
              ].map((c) => (
                <li key={c} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
