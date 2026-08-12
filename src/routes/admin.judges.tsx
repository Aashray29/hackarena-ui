import { useEffect, useState } from "react";
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
import { hackathonService } from "@/services/hackathonService";
import { submissionService } from "@/services/submissionService";
import { evaluationService } from "@/services/evaluationService";
import type { Hackathon, Submission } from "@/types";

interface JudgeRow {
  user_id: number;
  name: string;
  email: string;
  college: string | null;
  assigned: number;
  evaluated: number;
}

export const Route = createFileRoute("/admin/judges")({
  component: AdminJudges,
});

function AdminJudges() {
  const [judges, setJudges] = useState<JudgeRow[]>([]);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [judgeId, setJudgeId] = useState("");
  const [submissionId, setSubmissionId] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [judgeList, hackathonList, submissionList] = await Promise.all([
          evaluationService.getJudges(),
          hackathonService.list(),
          submissionService.list(),
        ]);

        setJudges(judgeList);
        setHackathons(hackathonList);
        setSubmissions(submissionList);

        if (judgeList[0]) setJudgeId(String(judgeList[0].user_id));
        if (submissionList[0]) setSubmissionId(submissionList[0].id);
      } catch (error) {
        console.error("Failed to load judges:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading judges...</div>;
  }

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
                <DialogDescription>
                  Register judges through the admin account or database seed.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="j-name">Full name</Label>
                  <Input id="j-name" placeholder="Dr. Vikram Suresh" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="j-email">Email</Label>
                  <Input id="j-email" type="email" placeholder="judge@company.com" disabled />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setAddOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {judges.map((j) => (
          <article key={j.user_id} className="surface-card hover-lift rounded-2xl p-5">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar name={j.name} />
              <div className="min-w-0">
                <p className="truncate font-medium">{j.name}</p>
                <p className="truncate text-xs text-muted-foreground">{j.college ?? "Judge"}</p>
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
            <Progress
              value={j.assigned ? (j.evaluated / j.assigned) * 100 : 0}
              className="mt-4 h-2"
            />
          </article>
        ))}
      </div>

      <section className="surface-card rounded-2xl p-6">
        <h2 className="font-display text-lg font-semibold">Assign a submission</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a judge and the submission they should evaluate.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <div className="space-y-2">
            <Label>Judge</Label>
            <Select value={judgeId} onValueChange={setJudgeId}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {judges.map((j) => (
                  <SelectItem key={j.user_id} value={String(j.user_id)}>
                    {j.name}
                  </SelectItem>
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
                try {
                  await evaluationService.assign({ judgeId, submissionId });
                  toast.success("Submission assigned");
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Assign failed");
                }
              }}
            >
              Assign
            </Button>
          </div>
        </div>
        {hackathons.length > 0 && (
          <p className="mt-3 text-xs text-muted-foreground">
            {hackathons.length} hackathons on the platform
          </p>
        )}
      </section>
    </>
  );
}
