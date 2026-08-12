import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Github, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submissionService } from "@/services/submissionService";

export const Route = createFileRoute("/judge/assigned")({
  head: () => ({
    meta: [
      { title: "Assigned Projects — HackArena Judge" },
      { name: "description", content: "Browse and evaluate the projects assigned to you." },
      { property: "og:title", content: "Assigned Projects — HackArena Judge" },
      { property: "og:description", content: "Judge evaluation queue." },
    ],
  }),
  component: JudgeAssigned,
});

function JudgeAssigned() {
  const submissions = submissionService.list();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const rows = useMemo(
    () =>
      submissions.filter(
        (s) =>
          (status === "all" || s.evaluationStatus === status) &&
          (s.projectName.toLowerCase().includes(query.toLowerCase()) ||
            s.teamName.toLowerCase().includes(query.toLowerCase())),
      ),
    [submissions, query, status],
  );

  return (
    <>
      <PageHeader title="Assigned Projects" description="Your evaluation queue." />

      <div className="surface-card grid gap-3 rounded-2xl p-4 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="relative min-w-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects or teams..."
            className="pl-9"
          />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="md:w-52"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Review">In Review</SelectItem>
            <SelectItem value="Evaluated">Evaluated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {rows.map((s) => (
          <article key={s.id} className="surface-card hover-lift flex flex-col rounded-2xl p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <h3 className="truncate font-display text-lg font-semibold">{s.projectName}</h3>
                <p className="truncate text-sm text-muted-foreground">
                  {s.teamName} · {s.hackathonName}
                </p>
              </div>
              <StatusBadge status={s.evaluationStatus} />
            </div>

            <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{s.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {s.technologies.map((t: string) => (
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
                <a href={s.githubUrl} target="_blank" rel="noreferrer">
                  <Github className="mr-1.5 h-4 w-4" /> Repo
                </a>
              </Button>
              <Button asChild size="sm" variant="secondary">
                <a href={s.demoUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-1.5 h-4 w-4" /> Demo
                </a>
              </Button>
              <Button asChild size="sm" className="ml-auto">
                <Link to="/judge/evaluation/$submissionId" params={{ submissionId: s.id }}>
                  {s.evaluationStatus === "Evaluated" ? "View evaluation" : "Evaluate"}
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>

      {rows.length === 0 && (
        <p className="surface-card rounded-2xl p-10 text-center text-sm text-muted-foreground">
          No projects match your filters.
        </p>
      )}
    </>
  );
}
