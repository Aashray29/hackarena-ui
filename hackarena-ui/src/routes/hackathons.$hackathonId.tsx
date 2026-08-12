import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalendarDays, Clock, Users, Trophy, MapPin, ArrowLeft } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatDate } from "@/lib/format";
import { hackathonService } from "@/services/hackathonService";
import type { Hackathon } from "@/types";

export const Route = createFileRoute("/hackathons/$hackathonId")({
  loader: ({ params }): { hackathon: Hackathon } => {
    const hackathon = hackathonService.getById(params.hackathonId);
    if (!hackathon) throw notFound();
    return { hackathon };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Hackathon not found — HackArena" }, { name: "robots", content: "noindex" }],
      };
    }
    const { hackathon } = loaderData;
    return {
      meta: [
        { title: `${hackathon.name} — HackArena` },
        { name: "description", content: hackathon.tagline },
        { property: "og:title", content: `${hackathon.name} — HackArena` },
        { property: "og:description", content: hackathon.tagline },
      ],
    };
  },
  component: HackathonDetails,
});

function HackathonDetails() {
  const { hackathon } = Route.useLoaderData() as { hackathon: Hackathon };

  const facts = [
    { icon: CalendarDays, label: "Start date", value: formatDate(hackathon.startDate) },
    { icon: CalendarDays, label: "End date", value: formatDate(hackathon.endDate) },
    { icon: Clock, label: "Registration deadline", value: formatDate(hackathon.registrationDeadline) },
    { icon: Users, label: "Team size", value: `${hackathon.minTeamSize} – ${hackathon.maxTeamSize} members` },
    { icon: Trophy, label: "Prize pool", value: hackathon.prizePool },
    { icon: MapPin, label: "Venue", value: hackathon.location },
  ];

  return (
    <PublicLayout>
      {/* Banner */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-glow absolute inset-0" />
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
          <Link
            to="/hackathons"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> All hackathons
          </Link>
          <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="min-w-0">
              <StatusBadge status={hackathon.status} />
              <h1 className="mt-3 font-display text-3xl font-bold sm:text-5xl">{hackathon.name}</h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">{hackathon.tagline}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {hackathon.themes.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <Button
              size="lg"
              onClick={() => toast.success(`Registration request sent for ${hackathon.name}`)}
            >
              Register for Hackathon
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-8">
          <section className="surface-card rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">About this hackathon</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {hackathon.description}
            </p>
          </section>

          <section className="surface-card rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">Rules</h2>
            <ul className="mt-4 space-y-3">
              {hackathon.rules.map((r) => (
                <li key={r} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="surface-card rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">Technologies & themes</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {[...hackathon.technologies, ...hackathon.themes].map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          <section className="surface-card rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">Timeline</h2>
            <ol className="mt-5 space-y-6 border-l border-border pl-6">
              {hackathon.timeline.map((t) => (
                <li key={t.title} className="relative">
                  <span className="absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                  <p className="font-mono text-xs text-primary">{t.date}</p>
                  <h3 className="mt-1 font-display text-base font-semibold">{t.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="surface-card rounded-2xl p-6">
            <h2 className="font-display text-base font-semibold">Key details</h2>
            <dl className="mt-4 space-y-4">
              {facts.map((f) => (
                <div key={f.label} className="flex min-w-0 items-start gap-3">
                  <f.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <dt className="text-xs text-muted-foreground">{f.label}</dt>
                    <dd className="text-sm font-medium">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="surface-card rounded-2xl p-6">
            <h2 className="font-display text-base font-semibold">Prizes</h2>
            <ul className="mt-4 space-y-3">
              {hackathon.prizes.map((p) => (
                <li key={p.place} className="rounded-xl border border-border bg-background/40 p-3">
                  <p className="text-sm font-semibold">{p.place}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{p.reward}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-card rounded-2xl p-6 text-center">
            <p className="font-display text-3xl font-bold">{hackathon.participants}</p>
            <p className="text-xs text-muted-foreground">registered participants</p>
            <Button
              className="mt-4 w-full"
              onClick={() => toast.success(`Registration request sent for ${hackathon.name}`)}
            >
              Register for Hackathon
            </Button>
          </div>
        </aside>
      </div>
    </PublicLayout>
  );
}
