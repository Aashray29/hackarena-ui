import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { CalendarRange, Users, UsersRound, FileCode2, Hourglass } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import {
  participantsPerHackathon,
  submissionsPerHackathon,
  evaluationStatusBreakdown,
} from "@/data/mockEvaluations";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — HackArena" },
      {
        name: "description",
        content: "Organiser overview of hackathons, participants, teams, submissions and evaluations.",
      },
      { property: "og:title", content: "Admin Dashboard — HackArena" },
      { property: "og:description", content: "Platform-wide hackathon statistics and charts." },
    ],
  }),
  component: AdminDashboard,
});

const pieColors = ["var(--chart-4)", "var(--chart-2)", "var(--chart-3)"];

const axisStyle = { fill: "var(--muted-foreground)", fontSize: 12 };
const tooltipStyle = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  color: "var(--popover-foreground)",
};

function AdminDashboard() {
  return (
    <>
      <PageHeader
        title="Admin Overview"
        description="Live snapshot of every hackathon running on HackArena."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Hackathons" value={5} icon={CalendarRange} hint="2 accepting registrations" />
        <StatCard label="Total Participants" value={1480} icon={Users} hint="+128 this week" />
        <StatCard label="Total Teams" value={373} icon={UsersRound} hint="Avg 3.9 members" />
        <StatCard label="Total Submissions" value={329} icon={FileCode2} hint="88% of eligible teams" />
        <StatCard label="Pending Evaluations" value={69} icon={Hourglass} hint="Across 4 judges" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="surface-card rounded-2xl p-6">
          <h2 className="font-display text-lg font-semibold">Participants per Hackathon</h2>
          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={participantsPerHackathon}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
                <Bar dataKey="participants" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="surface-card rounded-2xl p-6">
          <h2 className="font-display text-lg font-semibold">Submissions per Hackathon</h2>
          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={submissionsPerHackathon}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
                <Bar dataKey="submissions" fill="var(--chart-2)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="surface-card rounded-2xl p-6 xl:col-span-2">
          <h2 className="font-display text-lg font-semibold">Evaluation status</h2>
          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={evaluationStatusBreakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  stroke="var(--background)"
                >
                  {evaluationStatusBreakdown.map((entry, i) => (
                    <Cell key={entry.name} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ color: "var(--muted-foreground)", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </>
  );
}
