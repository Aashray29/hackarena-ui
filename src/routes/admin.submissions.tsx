import { createFileRoute } from "@tanstack/react-router";
import { Eye, Github, ExternalLink, ClipboardList } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/format";
import { submissionService } from "@/services/submissionService";

export const Route = createFileRoute("/admin/submissions")({
  head: () => ({
    meta: [
      { title: "Submissions — HackArena Admin" },
      { name: "description", content: "Review project submissions, repositories, demos and scores." },
      { property: "og:title", content: "Submissions — HackArena Admin" },
      { property: "og:description", content: "Submission tracking for organisers." },
    ],
  }),
  component: AdminSubmissions,
});

function AdminSubmissions() {
  const submissions = submissionService.list();

  return (
    <>
      <PageHeader title="Submissions" description="Every project submitted across hackathons." />

      <div className="surface-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Hackathon</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Evaluation</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.teamName}</TableCell>
                  <TableCell className="text-muted-foreground">{s.projectName}</TableCell>
                  <TableCell className="text-muted-foreground">{s.hackathonName}</TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatDate(s.submittedAt)}
                  </TableCell>
                  <TableCell><StatusBadge status={s.evaluationStatus} /></TableCell>
                  <TableCell className="font-display font-semibold text-primary">
                    {s.score ?? "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label="View submission"
                        onClick={() => toast.info(`Opening ${s.projectName} (demo)`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button asChild size="icon" variant="ghost" aria-label="View GitHub">
                        <a href={s.githubUrl} target="_blank" rel="noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button asChild size="icon" variant="ghost" aria-label="View demo">
                        <a href={s.demoUrl} target="_blank" rel="noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label="View evaluation"
                        onClick={() => toast.info(`Evaluation for ${s.projectName} (demo)`)}
                      >
                        <ClipboardList className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
