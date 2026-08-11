import { Link } from "@tanstack/react-router";
import { CalendarDays, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate } from "@/lib/format";
import type { Hackathon } from "@/types";

export function HackathonCard({ hackathon }: { hackathon: Hackathon }) {
  return (
    <article className="surface-card hover-lift flex flex-col rounded-2xl p-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-semibold">{hackathon.name}</h3>
          <p className="mt-1 text-xs uppercase tracking-wide text-primary">{hackathon.mode}</p>
        </div>
        <StatusBadge status={hackathon.status} />
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{hackathon.tagline} — {hackathon.description}</p>

      <dl className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
        <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
          <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate">{formatDate(hackathon.startDate)}</span>
        </div>
        <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate">Closes {formatDate(hackathon.registrationDeadline)}</span>
        </div>
        <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
          <Users className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate">
            Team of {hackathon.minTeamSize}–{hackathon.maxTeamSize}
          </span>
        </div>
        <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
          <Users className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate">{hackathon.participants} participants</span>
        </div>
      </dl>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
        <span className="truncate font-display text-sm font-semibold text-foreground">
          {hackathon.prizePool} prize pool
        </span>
        <Button asChild size="sm" variant="secondary">
          <Link to="/hackathons/$hackathonId" params={{ hackathonId: hackathon.id }}>
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
