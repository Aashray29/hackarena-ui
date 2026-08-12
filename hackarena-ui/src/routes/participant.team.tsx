import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Crown, LogOut, Plus, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { Avatar } from "@/components/Avatar";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { teamService } from "@/services/teamService";
import { hackathonService } from "@/services/hackathonService";

export const Route = createFileRoute("/participant/team")({
  head: () => ({
    meta: [
      { title: "My Team — HackArena" },
      { name: "description", content: "Manage your hackathon team, members and invitations." },
      { property: "og:title", content: "My Team — HackArena" },
      { property: "og:description", content: "Team roster, roles and invitations." },
    ],
  }),
  component: MyTeam,
});

function MyTeam() {
  const team = teamService.getMyTeam();
  const hackathons = hackathonService.list();
  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [hackathonId, setHackathonId] = useState(hackathons[0]?.id ?? "");
  const [joinCode, setJoinCode] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");

  return (
    <>
      <PageHeader
        title="My Team"
        description="Your roster for the current hackathon."
        actions={
          <>
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <Plus className="mr-1.5 h-4 w-4" /> Create Team
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a team</DialogTitle>
                  <DialogDescription>
                    Pick a name and the hackathon you're competing in.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="team-name">Team name</Label>
                    <Input
                      id="team-name"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="Byte Rangers"
                    />
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
                </div>
                <DialogFooter>
                  <Button
                    onClick={async () => {
                      await teamService.create({ name: teamName, hackathonId, maxMembers: 4 });
                      setCreateOpen(false);
                      toast.success("Team created (demo)");
                    }}
                  >
                    Create Team
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={joinOpen} onOpenChange={setJoinOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">Join Team</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Join a team</DialogTitle>
                  <DialogDescription>Enter the invite code shared by the leader.</DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  <Label htmlFor="code">Invite code</Label>
                  <Input
                    id="code"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="HA-4821-XZ"
                  />
                </div>
                <DialogFooter>
                  <Button
                    onClick={async () => {
                      await teamService.join(joinCode);
                      setJoinOpen(false);
                      toast.success("Join request sent (demo)");
                    }}
                  >
                    Join Team
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-1.5 h-4 w-4" /> Invite Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite a member</DialogTitle>
                  <DialogDescription>We'll email them an invitation link.</DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  <Label htmlFor="invite">Email address</Label>
                  <Input
                    id="invite"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="teammate@college.edu"
                  />
                </div>
                <DialogFooter>
                  <Button
                    onClick={async () => {
                      await teamService.invite(inviteEmail);
                      setInviteOpen(false);
                      toast.success("Invitation sent (demo)");
                    }}
                  >
                    Send Invite
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        }
      />

      <section className="surface-card rounded-2xl p-6">
        <div className="grid gap-4 sm:flex sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="truncate font-display text-2xl font-bold">{team.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{team.hackathonName}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <StatusBadge status={team.submissionStatus} />
              <span className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-muted-foreground">
                <Crown className="mr-1 inline h-3 w-3 text-gold" />
                Leader: {team.leader}
              </span>
              <span className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-muted-foreground">
                {team.members.length} / {team.maxMembers} members
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={async () => {
              await teamService.leave(team.id);
              toast.info("You left the team (demo)");
            }}
          >
            <LogOut className="mr-1.5 h-4 w-4" /> Leave Team
          </Button>
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold">Team Members</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {team.members.map((m) => (
            <div key={m.userId} className="surface-card hover-lift rounded-2xl p-5">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar name={m.name} />
                <div className="min-w-0">
                  <p className="truncate font-medium">{m.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{m.college}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <StatusBadge
                  status={m.role}
                  tone={m.role === "Team Leader" ? "warning" : "muted"}
                />
                {m.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {Array.from({ length: team.maxMembers - team.members.length }).map((_, i) => (
            <button
              key={i}
              onClick={() => setInviteOpen(true)}
              className="flex min-h-[9rem] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <UserPlus className="h-5 w-5" />
              <span className="text-sm">Open slot — invite a member</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
