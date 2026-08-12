import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  UserSearch,
  UploadCloud,
  Trophy,
  User,
} from "lucide-react";
import { DashboardLayout, type NavItem } from "@/components/layout/DashboardLayout";
import { authService } from "@/services/authService";


const items: NavItem[] = [
  { label: "Dashboard", to: "/participant", icon: LayoutDashboard, exact: true },
  { label: "My Hackathons", to: "/participant/hackathons", icon: CalendarCheck },
  { label: "My Team", to: "/participant/team", icon: Users },
  { label: "Find Teams", to: "/participant/find-teams", icon: UserSearch },
  { label: "Project Submission", to: "/participant/submission", icon: UploadCloud },
  { label: "Results", to: "/participant/results", icon: Trophy },
  { label: "Profile", to: "/participant/profile", icon: User },
];


export const Route = createFileRoute("/participant")({
  component: ParticipantLayout,
});


function ParticipantLayout() {
  const user = authService.getUser();

  return (
    <DashboardLayout
      items={items}
      roleLabel="Participant"
      userName={user?.name || "Participant"}
      userMeta={user?.email || ""}
    >
      <Outlet />
    </DashboardLayout>
  );
}