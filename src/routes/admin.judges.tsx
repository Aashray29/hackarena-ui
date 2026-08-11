import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Mail } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockJudges } from "@/data/mockUsers";
import { hackathonService } from "@/services/hackathonService";
import { submissionService } from "@/services/submissionService";
import { evaluationService } from "@/services/evaluationService";

export const Route = createFileRoute("/admin/judges")({
  head: () => ({
    meta: [
      { title: "Judges — HackArena Admin" },
      { name: "description", content: "Manage judges and assign submissions for evaluation." },
      { property: "og:title", content: "Judges — HackArena Admin" },
      { property: "og:description", content: "Judge roster and assignment console." },
    ],
  }),
  component: AdminJudges,
});

function AdminJudges() {
  const hackathons = hackathonService.list();
  const submissions = submissionService.list();
  const [addOpen, setAddOpen] = useState(false);
  const [judgeId, setJudgeId] = useState(mockJudges[0]?.id ?? "");
  const [hackathonId, setHackathonId] = useState(hackathons[0]?.id ?? "");
  const [submissionId, setSubmissionId] = useState(submissions[0]?.id ?? "");

  return (
    <>
      <PageHeader
        title="Judges"
        description="Panel members and their evaluation workload."
        actions={
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-1.5 h-4 w-4" /> Add Judge
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a judge</DialogTitle>
                <DialogDescription>They'll receive an invitation email.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="j-name">Full name</Label>
                  <Input id="j-name" placeholder="Dr. Vikram Suresh" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="j-email">Email</Label>
                  <Input id="j-email" type="email" placeholder="judge@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="j-org">Organisation</Label>
                  <Input id="j-org" placeholder="Zoho Corporation" />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    setAddOpen(false);
                    toast.success("Judge invited (demo)");
                  }}
                >
                  Add Judge
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {mockJudges.map((j) => (
          <article key={j.id} className="surface-card hover-lift rounded-2xl p-5">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar name={j.name} />
              <div className="min-w-0">
                <p className="truncate font-medium">{j.name}</p>
                <p className="truncate text-xs text-muted-foreground">{j.organization}</p>
              </div>
            </div>
            <p className="mt-3 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{j.email}</span>
            </p>

            <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <dt className="text-[11px] text-muted-foreground">Assigned</dt>
                <dd className="font-display text-lg font-bold">{j.assigned}</dd>
              </div>
              <div>
                <dt className="text-[11px] text-muted-foreground">Done</dt>
                <dd className="font-display text-lg font-bold text-success">{j.evaluated}</dd>
              </div>
              <div>
                <dt className="text-[11px] text-muted-foreground">Pending</dt>
                <dd className="font-display text-lg font-bold text-warning">
                  {j.assigned - j.evaluated}
                </dd>
              </div>
            </dl>
            <Progress value={(j.evaluated / j.assigned) * 100} className="mt-4 h-2" />
          </article>
        ))}
      </div>

      <section className="surface-card rounded-2xl p-6">
        <h2 className="font-display text-lg font-semibold">Assign a submission</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a judge, a hackathon and the submission they should evaluate.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-4">
          <div className="space-y-2">
            <Label>Judge</Label>
            <Select value={judgeId} onValueChange={setJudgeId}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {mockJudges.map((j) => (
                  <SelectItem key={j.id} value={j.id}>{j.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Hackathon</Label>
            <Select value={hackathonId} onValueChange={setHackathonId}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {hackathons.map((h) => (
                  <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Submission</Label>
            <Select value={submissionId} onValueChange={setSubmissionId}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {submissions.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.projectName} — {s.teamName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button
              className="w-full"
              onClick={async () => {
                await evaluationService.assign({ judgeId, hackathonId, submissionId });
                toast.success("Submission assigned (demo)");
              }}
            >
              Assign
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
