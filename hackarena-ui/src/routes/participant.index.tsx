import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, Flame, Users, UploadCloud, Clock, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { mockActivity } from "@/data/mockEvaluations";
import { currentParticipant } from "@/data/mockUsers";
import { hackathonService } from "@/services/hackathonService";

export const Route = createFileRoute("/participant/")({
  head: () => ({
    meta: [
      { title: "Participant Dashboard — HackArena" },
      {
        name: "description",
        content: "Track your hackathon registrations, team status, submissions and deadlines.",
      },
      { property: "og:title", content: "Participant Dashboard — HackArena" },
      { property: "og:description", content: "Your hackathon workspace at a glance." },
    ],
  }),
  component: ParticipantDashboard,
});

function ParticipantDashboard() {
  const hackathons = hackathonService.list();
  const upcoming = hackathons.filter((h) => h.status !== "Completed").slice(0, 3);

  return (
    <>
      <PageHeader
        title={`Welcome back, ${currentParticipant.name.split(" ")[0]}`}
        description="Here's what's happening across your hackathons."
        actions={
          <Button asChild>
            <Link to="/hackathons">Explore hackathons</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Registered Hackathons" value={3} icon={CalendarCheck} hint="Across 2 seasons" />
        <StatCard label="Active Hackathons" value={2} icon={Flame} hint="CodeStorm, SmartCity" />
        <StatCard label="Team Members" value={2} icon={Users} hint="Byte Rangers" />
        <StatCard label="Submissions" value={1} icon={UploadCloud} hint="1 evaluated" />
        <StatCard label="Upcoming Deadline" value="05 Sep" icon={Clock} hint="CodeStorm registration" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="surface-card rounded-2xl p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <h2 className="truncate font-display text-lg font-semibold">Upcoming Hackathons</h2>
            <Link
              to="/hackathons"
              className="shrink-0 text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <ul className="mt-5 space-y-3">
            {upcoming.map((h) => (
              <li
                key={h.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-background/40 p-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{h.name}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {formatDate(h.startDate)} · closes {formatDate(h.registrationDeadline)}
                  </p>
                  <div className="mt-2">
                    <StatusBadge status={h.status} />
                  </div>
                </div>
                <Button asChild size="sm" variant="secondary">
                  <Link to="/hackathons/$hackathonId" params={{ hackathonId: h.id }}>
                    Open <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </section>

        <section className="surface-card rounded-2xl p-6">
          <h2 className="font-display text-lg font-semibold">Recent Activity</h2>
          <ol className="mt-5 space-y-5 border-l border-border pl-5">
            {mockActivity.map((a) => (
              <li key={a.id} className="relative min-w-0">
                <span className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
                <p className="text-sm font-medium">{a.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{a.description}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                  {a.time}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
