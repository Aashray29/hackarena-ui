import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Eye } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { authService } from "@/services/authService";

interface ParticipantRow {
  user_id: number;
  name: string;
  email: string;
  college: string | null;
  registered_hackathons: number;
  team_name: string | null;
}

export const Route = createFileRoute("/admin/participants")({
  component: AdminParticipants,
});

function AdminParticipants() {
  const [participants, setParticipants] = useState<ParticipantRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const loadParticipants = async () => {
      try {
        const data = await authService.getParticipants();
        setParticipants(data);
      } catch (error) {
        console.error("Failed to load participants:", error);
      } finally {
        setLoading(false);
      }
    };

    loadParticipants();
  }, []);

  const rows = useMemo(
    () =>
      participants.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.email.toLowerCase().includes(query.toLowerCase()) ||
          (u.college ?? "").toLowerCase().includes(query.toLowerCase()),
      ),
    [participants, query],
  );

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading participants...</div>;
  }

  return (
    <>
      <PageHeader title="Participants" description="Everyone registered on the platform." />

      <div className="surface-card grid gap-3 rounded-2xl p-4 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="relative min-w-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email or college..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="surface-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Hackathons</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((u) => (
                <TableRow key={u.user_id}>
                  <TableCell>
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar name={u.name} size="sm" />
                      <span className="truncate font-medium">{u.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell className="text-muted-foreground">{u.college ?? "—"}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {u.registered_hackathons}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {u.team_name ?? "—"}
                  </TableCell>
                  <TableCell><StatusBadge status="Active" /></TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toast.info(`Viewing ${u.name}`)}
                    >
                      <Eye className="mr-1.5 h-4 w-4" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {rows.length === 0 && (
          <p className="p-10 text-center text-sm text-muted-foreground">No participants found.</p>
        )}
      </div>
    </>
  );
}
