import {
  createFileRoute,
  Link,
  notFound,
} from "@tanstack/react-router";

import {
  CalendarDays,
  Clock,
  Users,
  Trophy,
  MapPin,
  ArrowLeft,
} from "lucide-react";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatDate } from "@/lib/format";

import { hackathonService } from "@/services/hackathonService";
import { registrationService } from "@/services/registrationService";

import type { Hackathon } from "@/types";

export const Route = createFileRoute(
  "/hackathons/$hackathonId",
)({
  loader: async ({ params }) => {
    try {
      const hackathon = await hackathonService.getById(
        params.hackathonId,
      );

      return {
        hackathon,
      };
    } catch (error) {
      console.error(
        "Failed to load hackathon:",
        error,
      );

      throw notFound();
    }
  },

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          {
            title: "Hackathon not found — HackArena",
          },
          {
            name: "robots",
            content: "noindex",
          },
        ],
      };
    }

    const { hackathon } = loaderData;

    return {
      meta: [
        {
          title: `${hackathon.name} — HackArena`,
        },
        {
          name: "description",
          content: hackathon.description,
        },
        {
          property: "og:title",
          content: `${hackathon.name} — HackArena`,
        },
        {
          property: "og:description",
          content: hackathon.description,
        },
      ],
    };
  },

  component: HackathonDetails,
});

function HackathonDetails() {
  const { hackathon } = Route.useLoaderData() as {
    hackathon: Hackathon;
  };

  const handleRegister = async () => {
    try {
      await registrationService.register(
        Number(hackathon.id),
      );

      toast.success(
        `Successfully registered for ${hackathon.name}`,
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed",
      );
    }
  };

  const facts = [
    {
      icon: CalendarDays,
      label: "Start date",
      value: formatDate(hackathon.startDate),
    },
    {
      icon: CalendarDays,
      label: "End date",
      value: formatDate(hackathon.endDate),
    },
    {
      icon: Clock,
      label: "Registration deadline",
      value: formatDate(
        hackathon.registrationDeadline,
      ),
    },
    {
      icon: Users,
      label: "Team size",
      value: `${hackathon.minTeamSize} – ${hackathon.maxTeamSize} members`,
    },
    {
      icon: Trophy,
      label: "Prize pool",
      value: hackathon.prizePool || "Not specified",
    },
    {
      icon: MapPin,
      label: "Venue",
      value: hackathon.location || "Online",
    },
  ];

  return (
    <PublicLayout>
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-glow absolute inset-0" />
        <div className="bg-grid absolute inset-0 opacity-50" />

        <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
          <Link
            to="/hackathons"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All hackathons
          </Link>

          <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="min-w-0">
              <StatusBadge status={hackathon.status} />

              <h1 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
                {hackathon.name}
              </h1>

              <p className="mt-3 max-w-2xl text-muted-foreground">
                {hackathon.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {hackathon.themes.map((theme) => (
                  <span
                    key={theme}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {hackathon.status === "Registration Open" && (
              <Button
                size="lg"
                onClick={handleRegister}
              >
                Register for Hackathon
              </Button>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-8">
          <section className="surface-card rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">
              About this hackathon
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {hackathon.description}
            </p>
          </section>

          <section className="surface-card rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">
              Rules
            </h2>

            {hackathon.rules.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Rules will be announced soon.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {hackathon.rules.map((rule) => (
                  <li
                    key={rule}
                    className="flex gap-3 text-sm text-muted-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="surface-card rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">
              Technologies & themes
            </h2>

            {hackathon.technologies.length === 0 &&
            hackathon.themes.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                No technologies specified yet.
              </p>
            ) : (
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  ...hackathon.technologies,
                  ...hackathon.themes,
                ].map((technology) => (
                  <span
                    key={technology}
                    className="rounded-lg border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs text-primary"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            )}
          </section>

          <section className="surface-card rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">
              Timeline
            </h2>

            {hackathon.timeline.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Timeline will be announced soon.
              </p>
            ) : (
              <ol className="mt-5 space-y-6 border-l border-border pl-6">
                {hackathon.timeline.map((item) => (
                  <li
                    key={`${item.date}-${item.title}`}
                    className="relative"
                  >
                    <span className="absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" />

                    <p className="font-mono text-xs text-primary">
                      {item.date}
                    </p>

                    <h3 className="mt-1 font-display text-base font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="surface-card rounded-2xl p-6">
            <h2 className="font-display text-base font-semibold">
              Key details
            </h2>

            <dl className="mt-4 space-y-4">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex min-w-0 items-start gap-3"
                >
                  <fact.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                  <div className="min-w-0">
                    <dt className="text-xs text-muted-foreground">
                      {fact.label}
                    </dt>

                    <dd className="text-sm font-medium">
                      {fact.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="surface-card rounded-2xl p-6">
            <h2 className="font-display text-base font-semibold">
              Prizes
            </h2>

            {hackathon.prizes.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Prize details will be announced soon.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {hackathon.prizes.map((prize) => (
                  <li
                    key={prize.place}
                    className="rounded-xl border border-border bg-background/40 p-3"
                  >
                    <p className="text-sm font-semibold">
                      {prize.place}
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {prize.reward}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="surface-card rounded-2xl p-6 text-center">
            <p className="font-display text-3xl font-bold">
              {hackathon.participants}
            </p>

            <p className="text-xs text-muted-foreground">
              registered participants
            </p>

            {hackathon.status === "Registration Open" && (
              <Button
                className="mt-4 w-full"
                onClick={handleRegister}
              >
                Register for Hackathon
              </Button>
            )}
          </div>
        </aside>
      </div>
    </PublicLayout>
  );
}