import { useEffect, useState } from "react";
import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

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

import { hackathonService } from "@/services/hackathonService";
import { registrationService } from "@/services/registrationService";
import { teamService } from "@/services/teamService";
import { submissionService } from "@/services/submissionService";

import type { Hackathon } from "@/types";

interface Registration {
  registration_id: number;
  user_id: number;
  hackathon_id: number;
  registration_date: string;
}

interface RegistrationResponse {
  success: boolean;
  data: Registration[];
}

export const Route = createFileRoute(
  "/participant/hackathons",
)({
  component: MyHackathons,
});

interface Row {
  hackathon: Hackathon;
  teamName: string;
  submissionStatus: "Submitted" | "Not Submitted";
}

function MyHackathons() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          hackathons,
          registrationsResponse,
        ] = await Promise.all([
          hackathonService.list(),

          registrationService.getMyRegistrations() as Promise<RegistrationResponse>,
        ]);

        const registrations =
          registrationsResponse.data ?? [];

        const result: Row[] = [];

        for (const registration of registrations) {
          const hackathon = hackathons.find(
            (item) =>
              Number(item.id) ===
              registration.hackathon_id,
          );

          if (!hackathon) {
            continue;
          }

          let teamName = "—";

          try {
            const team = await teamService.getMyTeam(
              String(registration.hackathon_id),
            );

            if (
              team &&
              Number(team.hackathonId) ===
                registration.hackathon_id
            ) {
              teamName = team.name;
            }
          } catch {
            // No team for this hackathon.
          }

          let submissionStatus:
            | "Submitted"
            | "Not Submitted" = "Not Submitted";

          try {
            const submission = await submissionService.getMySubmission(
              String(registration.hackathon_id),
            );

            if (
              submission &&
              Number(submission.hackathonId) ===
                registration.hackathon_id
            ) {
              submissionStatus = "Submitted";
            }
          } catch {
            // No submission.
          }

          result.push({
            hackathon,
            teamName,
            submissionStatus,
          });
        }

        setRows(result);
      } catch (error) {
        console.error(
          "Failed to load my hackathons:",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        Loading your hackathons...
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="My Hackathons"
        description="Everything you're registered for, with team and submission status."
        actions={
          <Button asChild variant="secondary">
            <Link to="/hackathons">
              Find more
            </Link>
          </Button>
        }
      />

      {rows.length === 0 ? (
        <div className="surface-card rounded-2xl p-12 text-center text-muted-foreground">
          You are not registered for any hackathons yet.
        </div>
      ) : (
        <>
          <div className="grid gap-4 lg:hidden">
            {rows.map((row) => (
              <div
                key={row.hackathon.id}
                className="surface-card rounded-2xl p-5"
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <h3 className="truncate font-display text-base font-semibold">
                    {row.hackathon.name}
                  </h3>

                  <StatusBadge
                    status={row.hackathon.status}
                  />
                </div>

                <dl className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  <div>
                    Date:{" "}
                    {formatDate(
                      row.hackathon.startDate,
                    )}
                  </div>

                  <div>
                    Team: {row.teamName}
                  </div>

                  <div>
                    Submission:{" "}
                    {row.submissionStatus}
                  </div>
                </dl>

                <Button
                  asChild
                  size="sm"
                  variant="secondary"
                  className="mt-4 w-full"
                >
                  <Link
                    to="/hackathons/$hackathonId"
                    params={{
                      hackathonId:
                        row.hackathon.id,
                    }}
                  >
                    View
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="surface-card hidden overflow-hidden rounded-2xl lg:block">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      Hackathon
                    </TableHead>

                    <TableHead>
                      Date
                    </TableHead>

                    <TableHead>
                      Team
                    </TableHead>

                    <TableHead>
                      Status
                    </TableHead>

                    <TableHead>
                      Submission
                    </TableHead>

                    <TableHead className="text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.hackathon.id}
                    >
                      <TableCell className="font-medium">
                        {row.hackathon.name}
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {formatDate(
                          row.hackathon.startDate,
                        )}
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {row.teamName}
                      </TableCell>

                      <TableCell>
                        <StatusBadge
                          status={
                            row.hackathon.status
                          }
                        />
                      </TableCell>

                      <TableCell>
                        <StatusBadge
                          status={
                            row.submissionStatus
                          }
                        />
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          asChild
                          size="sm"
                          variant="secondary"
                        >
                          <Link
                            to="/hackathons/$hackathonId"
                            params={{
                              hackathonId:
                                row.hackathon.id,
                            }}
                          >
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
      )}
    </>
  );
}