import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { teamService } from "@/services/teamService";
import type { Team } from "@/types";

export const Route = createFileRoute("/admin/teams")({
  head: () => ({
    meta: [
      { title: "Teams — HackArena Admin" },
      { name: "description", content: "Review every team, its leader, members and submission status." },
      { property: "og:title", content: "Teams — HackArena Admin" },
      { property: "og:description", content: "Team management for organisers." },
    ],
  }),
  component: AdminTeams,
});

function AdminTeams() {
  const teams = teamService.list();
  const [selected, setSelected] = useState<Team | null>(null);

  return (
    <>
      <PageHeader title="Teams" description="All teams across every hackathon." />

      <div className="surface-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team name</TableHead>
                <TableHead>Hackathon</TableHead>
                <TableHead>Leader</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Submission</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell className="text-muted-foreground">{t.hackathonName}</TableCell>
                  <TableCell className="text-muted-foreground">{t.leader}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {t.members.length}/{t.maxMembers}
                  </TableCell>
                  <TableCell><StatusBadge status={t.submissionStatus} /></TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button size="sm" variant="ghost" onClick={() => setSelected(t)}>
                        <Eye className="mr-1.5 h-4 w-4" /> View
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setSelected(t)}>
                        <Users className="mr-1.5 h-4 w-4" /> Members
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label="Remove team"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={async () => {
                          await teamService.remove(t.id);
                          toast.error(`${t.name} removed (demo)`);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={Boolean(selected)} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.name}</DialogTitle>
            <DialogDescription>
              {selected?.hackathonName} · led by {selected?.leader}
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-3">
            {selected?.members.map((m) => (
              <li
                key={m.userId}
                className="flex min-w-0 items-center gap-3 rounded-xl border border-border p-3"
              >
                <Avatar name={m.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{m.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{m.college}</p>
                </div>
                <StatusBadge
                  status={m.role}
                  tone={m.role === "Team Leader" ? "warning" : "muted"}
                />
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
