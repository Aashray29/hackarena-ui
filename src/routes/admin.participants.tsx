import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Eye } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockUsers } from "@/data/mockUsers";
import { mockTeams } from "@/data/mockTeams";

export const Route = createFileRoute("/admin/participants")({
  head: () => ({
    meta: [
      { title: "Participants — HackArena Admin" },
      { name: "description", content: "Search and manage every registered participant." },
      { property: "og:title", content: "Participants — HackArena Admin" },
      { property: "og:description", content: "Participant directory and registrations." },
    ],
  }),
  component: AdminParticipants,
});

function AdminParticipants() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const rows = useMemo(
    () =>
      mockUsers.filter(
        (u) =>
          (status === "all" || u.status === status) &&
          (u.name.toLowerCase().includes(query.toLowerCase()) ||
            u.email.toLowerCase().includes(query.toLowerCase()) ||
            u.college.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, status],
  );

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
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="md:w-48"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
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
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar name={u.name} size="sm" />
                      <span className="truncate font-medium">{u.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell className="text-muted-foreground">{u.college}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {u.registeredHackathons.length}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {mockTeams.find((t) => t.id === u.teamId)?.name ?? "—"}
                  </TableCell>
                  <TableCell><StatusBadge status={u.status} /></TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toast.info(`Viewing ${u.name} (demo)`)}
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
