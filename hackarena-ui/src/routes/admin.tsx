import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CalendarRange,
  Users,
  UsersRound,
  FileCode2,
  Gavel,
  Trophy,
  Settings,
} from "lucide-react";
import { DashboardLayout, type NavItem } from "@/components/layout/DashboardLayout";
import { currentAdmin } from "@/data/mockUsers";

const items: NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Hackathons", to: "/admin/hackathons", icon: CalendarRange },
  { label: "Participants", to: "/admin/participants", icon: Users },
  { label: "Teams", to: "/admin/teams", icon: UsersRound },
  { label: "Submissions", to: "/admin/submissions", icon: FileCode2 },
  { label: "Judges", to: "/admin/judges", icon: Gavel },
  { label: "Results", to: "/admin/results", icon: Trophy },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <DashboardLayout
      items={items}
      roleLabel="Admin"
      userName={currentAdmin.name}
      userMeta={currentAdmin.college}
    >
      <Outlet />
    </DashboardLayout>
  );
}
