import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, FolderKanban, Hourglass, CheckCheck, User } from "lucide-react";
import { DashboardLayout, type NavItem } from "@/components/layout/DashboardLayout";
import { currentJudge } from "@/data/mockUsers";

const items: NavItem[] = [
  { label: "Dashboard", to: "/judge", icon: LayoutDashboard, exact: true },
  { label: "Assigned Projects", to: "/judge/assigned", icon: FolderKanban },
  { label: "Pending Evaluations", to: "/judge/pending", icon: Hourglass },
  { label: "Completed Evaluations", to: "/judge/completed", icon: CheckCheck },
  { label: "Profile", to: "/judge/profile", icon: User },
];

export const Route = createFileRoute("/judge")({
  component: JudgeLayout,
});

function JudgeLayout() {
  return (
    <DashboardLayout
      items={items}
      roleLabel="Judge"
      userName={currentJudge.name}
      userMeta={currentJudge.organization}
    >
      <Outlet />
    </DashboardLayout>
  );
}
