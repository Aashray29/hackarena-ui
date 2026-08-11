import { createFileRoute, Link } from "@tanstack/react-router";
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
import { currentParticipant } from "@/data/mockUsers";
import { hackathonService } from "@/services/hackathonService";
import { mockTeams } from "@/data/mockTeams";
import { mockSubmissions } from "@/data/mockSubmissions";

export const Route = createFileRoute("/participant/hackathons")({
  head: () => ({
    meta: [
      { title: "My Hackathons — HackArena" },
      { name: "description", content: "All hackathons you have registered for and their status." },
      { property: "og:title", content: "My Hackathons — HackArena" },
      { property: "og:description", content: "Registrations, teams and submission status." },
    ],
  }),
  component: MyHackathons,
});

function MyHackathons() {
  const rows = currentParticipant.registeredHackathons
    .map((id) => hackathonService.getById(id))
    .filter((h): h is NonNullable<typeof h> => Boolean(h))
    .map((h) => {
      const team = mockTeams.find((t) => t.hackathonId === h.id);
      const submission = mockSubmissions.find((s) => s.hackathonId === h.id);
      return {
        hackathon: h,
        team: team?.name ?? "—",
        submission: submission ? "Submitted" : "Not Submitted",
      };
    });

  return (
    <>
      <PageHeader
        title="My Hackathons"
        description="Everything you're registered for, with team and submission status."
        actions={
          <Button asChild variant="secondary">
            <Link to="/hackathons">Find more</Link>
          </Button>
        }
      />

      {/* Mobile cards */}
      <div className="grid gap-4 lg:hidden">
        {rows.map((r) => (
          <div key={r.hackathon.id} className="surface-card rounded-2xl p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <h3 className="truncate font-display text-base font-semibold">{r.hackathon.name}</h3>
              <StatusBadge status={r.hackathon.status} />
            </div>
            <dl className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <div>Date: {formatDate(r.hackathon.startDate)}</div>
              <div>Team: {r.team}</div>
              <div>Submission: {r.submission}</div>
            </dl>
            <Button asChild size="sm" variant="secondary" className="mt-4 w-full">
              <Link to="/hackathons/$hackathonId" params={{ hackathonId: r.hackathon.id }}>
                View
              </Link>
            </Button>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="surface-card hidden overflow-hidden rounded-2xl lg:block">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hackathon</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submission</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.hackathon.id}>
                  <TableCell className="font-medium">{r.hackathon.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(r.hackathon.startDate)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{r.team}</TableCell>
                  <TableCell><StatusBadge status={r.hackathon.status} /></TableCell>
                  <TableCell><StatusBadge status={r.submission} /></TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="secondary">
                      <Link to="/hackathons/$hackathonId" params={{ hackathonId: r.hackathon.id }}>
                        View
                      </Link>
                    </Button>
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
