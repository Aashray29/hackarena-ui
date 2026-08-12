import { createFileRoute } from "@tanstack/react-router";
import { Target, Users, Trophy, Rocket } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About HackArena — Hackathon Management Platform" },
      {
        name: "description",
        content:
          "HackArena helps colleges run hackathons end to end: registrations, team formation, project submissions and judge evaluations.",
      },
      { property: "og:title", content: "About HackArena" },
      {
        property: "og:description",
        content: "One platform for organisers, participants and judges to run great hackathons.",
      },
    ],
  }),
  component: About,
});

const pillars = [
  { icon: Target, title: "Built for organisers", text: "Manage hackathons, teams, submissions and judge assignments from one admin workspace." },
  { icon: Users, title: "Built for participants", text: "Discover events, form teams, track deadlines and submit projects without spreadsheets." },
  { icon: Trophy, title: "Built for judges", text: "Structured evaluation across innovation, engineering, presentation and impact." },
  { icon: Rocket, title: "Built to scale", text: "A clean component architecture that plugs into any REST backend." },
];

function About() {
  return (
    <PublicLayout>
      <div className="mx-auto w-full max-w-5xl space-y-10 px-4 py-14 sm:px-6">
        <PageHeader
          title="About HackArena"
          description="HackArena started as a college project to replace the mess of forms, spreadsheets and group chats that most hackathons run on."
        />

        <section className="surface-card rounded-2xl p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold">Our mission</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            We believe great ideas shouldn't be lost to bad logistics. HackArena gives every role in
            a hackathon — participant, organiser and judge — a purpose-built workspace, so the
            event runs itself and everyone can focus on building. From registration to the final
            leaderboard, every step is tracked, transparent and fair.
          </p>
        </section>

        <div className="grid gap-5 sm:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className="surface-card hover-lift rounded-2xl p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/12 text-primary">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
