import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Crown, LogOut, Plus, UserPlus, AlertCircle } from "lucide-react";
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
import { registrationService } from "@/services/registrationService";
import type { Hackathon, Team } from "@/types";

export const Route = createFileRoute("/participant/team")({
  component: MyTeam,
});

function MyTeam() {
  const [team, setTeam] = useState<Team | null>(null);
  const [registeredHackathons, setRegisteredHackathons] = useState<Hackathon[]>([]);
  const [availableTeams, setAvailableTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [selectedHackathonId, setSelectedHackathonId] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    try {
      const [allHackathons, registrationsResponse, myTeam] = await Promise.all([
        hackathonService.list(),
        registrationService.getMyRegistrations(),
        teamService.getMyTeam(),
      ]);

      const registrationIds = new Set(
        (registrationsResponse.data ?? []).map((item) => item.hackathon_id),
      );

      const registered = allHackathons.filter((hackathon) =>
        registrationIds.has(Number(hackathon.id)),
      );

      setRegisteredHackathons(registered);
      setTeam(myTeam);

      const defaultHackathonId = registered[0]?.id ?? "";
      setSelectedHackathonId((current) => current || defaultHackathonId);

      if (defaultHackathonId) {
        const teams = await teamService.list(defaultHackathonId);
        setAvailableTeams(teams);
      } else {
        setAvailableTeams([]);
      }
    } catch (error) {
      console.error("Failed to load team:", error);
      toast.error("Could not load team data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!selectedHackathonId) {
      setAvailableTeams([]);
      setSelectedTeamId("");
      return;
    }

    teamService
      .list(selectedHackathonId)
      .then((teams) => {
        setAvailableTeams(teams);
        setSelectedTeamId((current) =>
          current && teams.some((team) => team.id === current)
            ? current
            : (teams[0]?.id ?? ""),
        );
      })
      .catch(console.error);
  }, [selectedHackathonId]);

  const joinableTeams = useMemo(
    () =>
      availableTeams.filter(
        (item) => (item.memberCount ?? item.members.length) < item.maxMembers,
      ),
    [availableTeams],
  );

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      toast.error("Enter a team name");
      return;
    }

    if (!selectedHackathonId) {
      toast.error("Select a hackathon");
      return;
    }

    setSaving(true);

    try {
      await teamService.create({
        team_name: teamName.trim(),
        hackathon_id: Number(selectedHackathonId),
      });
      setCreateOpen(false);
      setTeamName("");
      toast.success("Team created");
      await loadData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Create failed");
    } finally {
      setSaving(false);
    }
  };

  const handleJoinTeam = async () => {
    if (!selectedTeamId) {
      toast.error("Select a team to join");
      return;
    }

    setSaving(true);

    try {
      await teamService.join(selectedTeamId);
      setJoinOpen(false);
      toast.success("Joined team");
      await loadData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Join failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading team...</div>;
  }

  if (registeredHackathons.length === 0) {
    return (
      <>
        <PageHeader title="My Team" description="Teams are created per hackathon." />
        <div className="surface-card rounded-2xl p-10 text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-warning" />
          <p className="mt-4 text-muted-foreground">
            Register for a hackathon first, then come back to create or join a team.
          </p>
          <Button asChild className="mt-6">
            <Link to="/hackathons">Browse hackathons</Link>
          </Button>
        </div>
      </>
    );
  }

  if (!team) {
    return (
      <>
        <PageHeader
          title="My Team"
          description="Step 1: register for a hackathon. Step 2: create or join a team here."
        />

        <div className="surface-card rounded-2xl p-8">
          <p className="text-sm text-muted-foreground">
            You are registered for{" "}
            <strong>{registeredHackathons.length}</strong> hackathon
            {registeredHackathons.length === 1 ? "" : "s"}. Pick one below to create or join a team.
          </p>

          <div className="mt-4 max-w-md space-y-2">
            <Label>Hackathon</Label>
            <Select value={selectedHackathonId} onValueChange={setSelectedHackathonId}>
              <SelectTrigger>
                <SelectValue placeholder="Select hackathon" />
              </SelectTrigger>
              <SelectContent>
                {registeredHackathons.map((hackathon) => (
                  <SelectItem key={hackathon.id} value={hackathon.id}>
                    {hackathon.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-1.5 h-4 w-4" /> Create Team
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a team</DialogTitle>
                  <DialogDescription>
                    You become the team leader. Team name must be unique within the hackathon.
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
                    <Select value={selectedHackathonId} onValueChange={setSelectedHackathonId}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {registeredHackathons.map((hackathon) => (
                          <SelectItem key={hackathon.id} value={hackathon.id}>
                            {hackathon.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateTeam} disabled={saving}>
                    {saving ? "Creating..." : "Create Team"}
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
                  <DialogDescription>
                    Choose an open team for your registered hackathon.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Hackathon</Label>
                    <Select value={selectedHackathonId} onValueChange={setSelectedHackathonId}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {registeredHackathons.map((hackathon) => (
                          <SelectItem key={hackathon.id} value={hackathon.id}>
                            {hackathon.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Team</Label>
                    <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
                      <SelectTrigger><SelectValue placeholder="Select team" /></SelectTrigger>
                      <SelectContent>
                        {joinableTeams.length === 0 ? (
                          <SelectItem value="none" disabled>
                            No open teams — create one instead
                          </SelectItem>
                        ) : (
                          joinableTeams.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name} ({item.memberCount ?? item.members.length}/
                              {item.maxMembers}) · led by {item.leader}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={handleJoinTeam}
                    disabled={saving || !selectedTeamId || joinableTeams.length === 0}
                  >
                    {saving ? "Joining..." : "Join Team"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button asChild variant="ghost">
              <Link to="/participant/find-teams">Browse all teams</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="My Team"
        description="Your roster for the current hackathon."
        actions={
          <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-1.5 h-4 w-4" /> Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite a member</DialogTitle>
                <DialogDescription>
                  The teammate must already have a HackArena account (same email they registered with).
                </DialogDescription>
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
                    try {
                      await teamService.invite(team.id, inviteEmail);
                      setInviteOpen(false);
                      setInviteEmail("");
                      toast.success("Member added to team");
                      await loadData();
                    } catch (error) {
                      toast.error(error instanceof Error ? error.message : "Invite failed");
                    }
                  }}
                >
                  Send Invite
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <section className="surface-card rounded-2xl p-6">
        <div className="grid gap-4 sm:flex sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="truncate font-display text-2xl font-bold">{team.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{team.hackathonName}</p>
            <p className="mt-1 text-xs text-muted-foreground">Team ID: {team.id}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <StatusBadge status={team.submissionStatus} />
              <span className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-muted-foreground">
                <Crown className="mr-1 inline h-3 w-3 text-gold" />
                Leader: {team.leader}
              </span>
              <span className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-muted-foreground">
                {team.memberCount ?? team.members.length} / {team.maxMembers} members
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={async () => {
              try {
                await teamService.leave(team.id);
                toast.info("You left the team");
                setTeam(null);
                await loadData();
              } catch (error) {
                toast.error(error instanceof Error ? error.message : "Leave failed");
              }
            }}
          >
            <LogOut className="mr-1.5 h-4 w-4" /> Leave Team
          </Button>
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold">Team Members</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {team.members.map((member) => (
            <div key={member.userId} className="surface-card hover-lift rounded-2xl p-5">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar name={member.name} />
                <div className="min-w-0">
                  <p className="truncate font-medium">{member.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{member.college}</p>
                </div>
              </div>
              <div className="mt-4">
                <StatusBadge
                  status={member.role}
                  tone={member.role === "Team Leader" ? "warning" : "muted"}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
