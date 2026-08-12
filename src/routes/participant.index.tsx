import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  Flame,
  Users,
  UploadCloud,
  Clock,
  ArrowRight,
} from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";

import { hackathonService } from "@/services/hackathonService";
import { teamService } from "@/services/teamService";
import { submissionService } from "@/services/submissionService";
import { registrationService } from "@/services/registrationService";

import type { Hackathon } from "@/types";

export const Route = createFileRoute("/participant/")({
  component: ParticipantDashboard,
});

function ParticipantDashboard() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);

  const [registeredCount, setRegisteredCount] = useState(0);
  const [teamMemberCount, setTeamMemberCount] = useState(0);
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [hackathonsData, registrations] =
          await Promise.all([
            hackathonService.list(),
            registrationService.getMyRegistrations(),
          ]);

        setHackathons(hackathonsData);

        if (Array.isArray(registrations.data)) {
          setRegisteredCount(registrations.data.length);
        }

        try {
          const team = await teamService.getMyTeam();

          if (team?.members) {
            setTeamMemberCount(team.members.length);
          }
        } catch (error) {
          console.error("Team loading failed:", error);
        }

        try {
          const submission =
            await submissionService.getMySubmission();

          setSubmissionCount(submission ? 1 : 0);
        } catch (error) {
          console.error("Submission loading failed:", error);
        }
      } catch (error) {
        console.error("Dashboard loading failed:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const upcoming = hackathons
    .filter((h) => h.status !== "Completed")
    .slice(0, 3);

  const active = hackathons.filter(
    (h) =>
      h.status === "Registration Open" ||
      h.status === "Ongoing",
  );

  const upcomingDeadline = hackathons
    .filter((h) => h.registrationDeadline)
    .sort(
      (a, b) =>
        new Date(a.registrationDeadline).getTime() -
        new Date(b.registrationDeadline).getTime(),
    )[0];

  if (loading) {
    return (
      <div className="p-6">
        Loading dashboard...
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Participant Dashboard"
        description="Here's what's happening across your hackathons."
        actions={
          <Button asChild>
            <Link to="/hackathons">
              Explore hackathons
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Registered Hackathons"
          value={registeredCount}
          icon={CalendarCheck}
        />

        <StatCard
          label="Active Hackathons"
          value={active.length}
          icon={Flame}
        />

        <StatCard
          label="Team Members"
          value={teamMemberCount}
          icon={Users}
        />

        <StatCard
          label="Submissions"
          value={submissionCount}
          icon={UploadCloud}
        />

        <StatCard
          label="Upcoming Deadline"
          value={
            upcomingDeadline
              ? formatDate(
                  upcomingDeadline.registrationDeadline,
                )
              : "None"
          }
          icon={Clock}
        />
      </div>

      <section className="surface-card mt-6 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">
            Upcoming Hackathons
          </h2>

          <Link
            to="/hackathons"
            className="text-sm text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <p className="mt-5 text-sm text-muted-foreground">
            No upcoming hackathons.
          </p>
        ) : (
          <ul className="mt-5 space-y-3">
            {upcoming.map((h) => (
              <li
                key={h.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-background/40 p-4"
              >
                <div>
                  <p className="font-medium">
                    {h.name}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDate(h.startDate)}
                    {" · "}
                    closes{" "}
                    {formatDate(
                      h.registrationDeadline,
                    )}
                  </p>

                  <div className="mt-2">
                    <StatusBadge status={h.status} />
                  </div>
                </div>

                <Button
                  asChild
                  size="sm"
                  variant="secondary"
                >
                  <Link
                    to="/hackathons/$hackathonId"
                    params={{
                      hackathonId: h.id,
                    }}
                  >
                    Open
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}