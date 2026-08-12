import { useEffect, useState } from "react";
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
  component: AdminTeams,
});

function AdminTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selected, setSelected] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  const loadTeams = async () => {
    try {
      const data = await teamService.list();
      setTeams(data);
    } catch (error) {
      console.error("Failed to load teams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading teams...</div>;
  }

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
                    {t.memberCount ?? t.members.length}/{t.maxMembers}
                  </TableCell>
                  <TableCell><StatusBadge status={t.submissionStatus} /></TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button size="sm" variant="ghost" onClick={() => setSelected(t)}>
                        <Eye className="mr-1.5 h-4 w-4" /> View
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label="Remove team"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={async () => {
                          try {
                            await teamService.remove(t.id);
                            toast.success(`${t.name} removed`);
                            await loadTeams();
                          } catch (error) {
                            toast.error(error instanceof Error ? error.message : "Remove failed");
                          }
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
            {selected?.members.length === 0 && (
              <li className="text-sm text-muted-foreground">No member details loaded.</li>
            )}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
