import { useEffect, useState } from "react";
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
import {
  submissionService,
  type SubmissionDraft,
} from "@/services/submissionService";
import { teamService } from "@/services/teamService";
import type { Submission, Team } from "@/types";

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

function SubmissionPage() {
  const [team, setTeam] = useState<Team | null>(null);
  const [existing, setExisting] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<SubmissionDraft>({
    projectName: "",
    description: "",
    technologies: "",
    githubUrl: "",
    demoUrl: "",
    teamName: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const myTeam = await teamService.getMyTeam();
        setTeam(myTeam);

        if (myTeam) {
          setForm((s) => ({ ...s, teamName: myTeam.name }));

          const submission = await submissionService.getMySubmission();
          setExisting(submission);

          if (submission) {
            setForm({
              projectName: submission.projectName,
              description: submission.description,
              technologies: submission.technologies.join(", "),
              githubUrl: submission.githubUrl,
              demoUrl: submission.demoUrl,
              teamName: submission.teamName,
            });
          }
        }
      } catch (error) {
        console.error("Failed to load submission page:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const set = (key: keyof SubmissionDraft) => (value: string) =>
    setForm((s) => ({ ...s, [key]: value }));

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading...</div>;
  }

  if (!team) {
    return (
      <>
        <PageHeader title="Project Submission" description="Join or create a team first." />
        <div className="surface-card rounded-2xl p-12 text-center text-muted-foreground">
          You need to be on a team before submitting a project.
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Project Submission"
        description="One submission per team. Only the team leader can submit."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <form
          className="surface-card space-y-5 rounded-2xl p-6"
          onSubmit={async (e) => {
            e.preventDefault();

            try {
              await submissionService.submit(form, Number(team.id));
              const submission = await submissionService.getMySubmission();
              setExisting(submission);
              toast.success("Project submitted");
            } catch (error) {
              toast.error(error instanceof Error ? error.message : "Submission failed");
            }
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
              placeholder="What does your project do?"
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
              <Input id="teamName" value={form.teamName} readOnly required />
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
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            {existing ? "Update Submission" : "Submit Project"}
          </Button>
        </form>

        <aside className="space-y-5">
          {existing ? (
            <div className="surface-card rounded-2xl p-6">
              <div className="flex items-center gap-2 text-success">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <StatusBadge status="Submitted" />
              </div>
              <h2 className="mt-4 truncate font-display text-lg font-semibold">
                {existing.projectName}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Submitted on {formatDateTime(existing.submittedAt)}
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="min-w-0">
                  <dt className="text-xs text-muted-foreground">Team</dt>
                  <dd className="truncate">{existing.teamName}</dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-xs text-muted-foreground">Technologies</dt>
                  <dd className="break-words">{existing.technologies.join(", ")}</dd>
                </div>
              </dl>
              <div className="mt-5 grid gap-2">
                {existing.githubUrl && (
                  <Button asChild variant="secondary" size="sm">
                    <a href={existing.githubUrl} target="_blank" rel="noreferrer">
                      <Github className="mr-1.5 h-4 w-4" /> GitHub
                    </a>
                  </Button>
                )}
                {existing.demoUrl && (
                  <Button asChild variant="secondary" size="sm">
                    <a href={existing.demoUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-1.5 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                )}
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
        </aside>
      </div>
    </>
  );
}
