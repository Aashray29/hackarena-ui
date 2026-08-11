import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { hackathonStatuses } from "@/data/mockHackathons";

export const Route = createFileRoute("/admin/hackathons")({
  head: () => ({
    meta: [
      { title: "Manage Hackathons — HackArena Admin" },
      { name: "description", content: "Create, edit and remove hackathons from the organiser console." },
      { property: "og:title", content: "Manage Hackathons — HackArena Admin" },
      { property: "og:description", content: "Organiser hackathon management." },
    ],
  }),
  component: AdminHackathons,
});

function AdminHackathons() {
  const hackathons = hackathonService.list();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string>("Registration Open");

  return (
    <>
      <PageHeader
        title="Hackathons"
        description="All events on the platform."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-1.5 h-4 w-4" /> Create Hackathon
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create hackathon</DialogTitle>
                <DialogDescription>
                  Details can be edited any time before registrations open.
                </DialogDescription>
              </DialogHeader>
              <form
                id="create-hackathon"
                className="grid gap-4 sm:grid-cols-2"
                onSubmit={async (e) => {
                  e.preventDefault();
                  await hackathonService.create({});
                  setOpen(false);
                  toast.success("Hackathon created (demo)");
                }}
              >
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="h-name">Hackathon name</Label>
                  <Input id="h-name" placeholder="CodeStorm 2026" required />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="h-desc">Description</Label>
                  <Textarea id="h-desc" rows={4} placeholder="What is this hackathon about?" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="h-start">Start date</Label>
                  <Input id="h-start" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="h-end">End date</Label>
                  <Input id="h-end" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="h-deadline">Registration deadline</Label>
                  <Input id="h-deadline" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {hackathonStatuses.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="h-min">Minimum team size</Label>
                  <Input id="h-min" type="number" min={1} max={10} defaultValue={2} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="h-max">Maximum team size</Label>
                  <Input id="h-max" type="number" min={1} max={10} defaultValue={4} required />
                </div>
              </form>
              <DialogFooter>
                <Button type="submit" form="create-hackathon">Create Hackathon</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="surface-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hackathon</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Teams</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hackathons.map((h) => (
                <TableRow key={h.id}>
                  <TableCell>
                    <p className="font-medium">{h.name}</p>
                    <p className="text-xs text-muted-foreground">{h.mode}</p>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatDate(h.startDate)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{h.participants}</TableCell>
                  <TableCell className="text-muted-foreground">{h.teams}</TableCell>
                  <TableCell><StatusBadge status={h.status} /></TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button asChild size="icon" variant="ghost" aria-label="View">
                        <Link to="/hackathons/$hackathonId" params={{ hackathonId: h.id }}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label="Edit"
                        onClick={() => toast.info(`Edit ${h.name} (demo)`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label="Delete"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => toast.error(`${h.name} deleted (demo)`)}
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
    </>
  );
}
