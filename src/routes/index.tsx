import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  Users,
  Upload,
  Trophy,
  ArrowRight,
  UserPlus,
  Hammer,
  Send,
  ClipboardCheck,
  Award,
  Sparkles,
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HackathonCard } from "@/components/HackathonCard";
import { Button } from "@/components/ui/button";
import { hackathonService } from "@/services/hackathonService";
import type { Hackathon } from "@/types";
import heroImage from "@/assets/hero-hackarena.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HackArena — Build. Innovate. Hack." },
      {
        name: "description",
        content:
          "HackArena is a hackathon management platform to discover events, build teams, submit projects and compete on the leaderboard.",
      },
      { property: "og:title", content: "HackArena — Build. Innovate. Hack." },
      {
        property: "og:description",
        content:
          "Join exciting hackathons, build amazing projects, collaborate with talented developers, and compete for the top spot.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: Search,
    title: "Find Hackathons",
    text: "Browse curated college and national hackathons with deadlines, tracks and prizes in one place.",
  },
  {
    icon: Users,
    title: "Build Teams",
    text: "Create a team or discover teams looking for your exact skill set before registration closes.",
  },
  {
    icon: Upload,
    title: "Submit Projects",
    text: "Submit your repository, demo link and tech stack through a single guided submission flow.",
  },
  {
    icon: Trophy,
    title: "Compete & Win",
    text: "Get scored by expert judges on innovation, engineering, presentation and impact.",
  },
];

const steps = [
  { icon: UserPlus, title: "Register", text: "Create your HackArena profile." },
  { icon: Users, title: "Join / Create Team", text: "Team up with the right people." },
  { icon: Hammer, title: "Build Your Project", text: "Ship during the hack window." },
  { icon: Send, title: "Submit", text: "Push repo and demo links." },
  { icon: ClipboardCheck, title: "Get Evaluated", text: "Judges score your work." },
  { icon: Award, title: "Win", text: "Climb the leaderboard." },
];

function Landing() {
  const [featured, setFeatured] = useState<Hackathon[]>([]);

  useEffect(() => {
    hackathonService.list().then((data) => setFeatured(data.slice(0, 3))).catch(console.error);
  }, []);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-glow absolute inset-0" />
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              5 hackathons live this season
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] sm:text-6xl">
              Build. <span className="text-gradient">Innovate.</span> Hack.
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Join exciting hackathons, build amazing projects, collaborate with talented
              developers, and compete for the top spot.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/hackathons">
                  Explore Hackathons <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/register">Register Now</Link>
              </Button>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {[
                { k: "1,480+", v: "Participants" },
                { k: "373", v: "Teams formed" },
                { k: "₹9L+", v: "Prizes awarded" },
              ].map((s) => (
                <div key={s.v} className="min-w-0">
                  <dt className="font-display text-2xl font-bold text-foreground">{s.k}</dt>
                  <dd className="truncate text-xs text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Abstract visualisation of code panels and network nodes representing a hackathon platform"
              width={1600}
              height={1104}
              className="w-full rounded-3xl border border-border object-cover shadow-[var(--shadow-elegant)]"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold">Everything a hackathon needs</h2>
          <p className="mt-3 text-muted-foreground">
            From discovery to evaluation, HackArena handles the full lifecycle for participants,
            organisers and judges.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="surface-card hover-lift rounded-2xl p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/12 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="font-display text-3xl font-bold">How it works</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Six steps from sign-up to the winners' stage.
          </p>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="surface-card hover-lift rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/25 font-display font-bold text-primary">
                    {i + 1}
                  </span>
                  <s.icon className="h-5 w-5 shrink-0 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Featured hackathons */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-4 sm:flex sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h2 className="font-display text-3xl font-bold">Featured hackathons</h2>
            <p className="mt-2 text-muted-foreground">Registrations closing soon.</p>
          </div>
          <Button asChild variant="secondary">
            <Link to="/hackathons">View all</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((h) => (
            <HackathonCard key={h.id} hackathon={h} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
        <div className="surface-card hero-glow relative overflow-hidden rounded-3xl px-6 py-14 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Ready to ship something great?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Create your account and register for your first hackathon in under two minutes.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/register">Register Now</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
