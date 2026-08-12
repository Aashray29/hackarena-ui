import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { HackathonCard } from "@/components/HackathonCard";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { hackathonService } from "@/services/hackathonService";
import type { Hackathon, HackathonStatus } from "@/types";

export const Route = createFileRoute("/hackathons/")({
  head: () => ({
    meta: [
      { title: "Hackathons — HackArena" },
      {
        name: "description",
        content:
          "Browse open, upcoming, ongoing and completed hackathons on HackArena.",
      },
      {
        property: "og:title",
        content: "Hackathons — HackArena",
      },
      {
        property: "og:description",
        content: "Discover hackathons on HackArena.",
      },
    ],
  }),

  component: HackathonsPage,
});

function HackathonsPage() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("date");

  useEffect(() => {
    const loadHackathons = async () => {
      try {
        const data = await hackathonService.list();
        setHackathons(data);
      } catch (error) {
        console.error("Failed to load hackathons:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHackathons();
  }, []);

  const results = useMemo(() => {
    let list = hackathons.filter((h) => {
      const matchesStatus =
        status === "all" || h.status === (status as HackathonStatus);

      const search = query.toLowerCase();

      const matchesSearch =
        h.name.toLowerCase().includes(search) ||
        h.description.toLowerCase().includes(search) ||
        h.themes.some((theme) =>
          theme.toLowerCase().includes(search),
        );

      return matchesStatus && matchesSearch;
    });

    list = [...list].sort((a, b) => {
      if (sort === "participants") {
        return b.participants - a.participants;
      }

      if (sort === "deadline") {
        return (
          new Date(a.registrationDeadline).getTime() -
          new Date(b.registrationDeadline).getTime()
        );
      }

      return (
        new Date(a.startDate).getTime() -
        new Date(b.startDate).getTime()
      );
    });

    return list;
  }, [hackathons, query, status, sort]);

  return (
    <PublicLayout>
      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-12 sm:px-6">
        <PageHeader
          title="Hackathons"
          description="Find the right event, check the deadline and register with your team."
        />

        <div className="surface-card grid gap-3 rounded-2xl p-4 md:grid-cols-[minmax(0,1fr)_auto_auto]">
          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search hackathons or themes..."
              className="pl-9"
            />
          </div>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="md:w-52">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Registration Open">
                Registration Open
              </SelectItem>
              <SelectItem value="Upcoming">
                Upcoming
              </SelectItem>
              <SelectItem value="Ongoing">
                Ongoing
              </SelectItem>
              <SelectItem value="Completed">
                Completed
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="md:w-52">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="date">
                Sort: Start date
              </SelectItem>

              <SelectItem value="deadline">
                Sort: Deadline
              </SelectItem>

              <SelectItem value="participants">
                Sort: Participants
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="surface-card rounded-2xl p-12 text-center text-muted-foreground">
            Loading hackathons...
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              {results.length} hackathons found
            </p>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {results.map((hackathon) => (
                <HackathonCard
                  key={hackathon.id}
                  hackathon={hackathon}
                />
              ))}
            </div>

            {results.length === 0 && (
              <div className="surface-card rounded-2xl p-12 text-center text-muted-foreground">
                No hackathons match your filters.
              </div>
            )}
          </>
        )}
      </div>
    </PublicLayout>
  );
}