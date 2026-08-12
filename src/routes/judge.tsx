import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, FolderKanban, Hourglass, CheckCheck, User } from "lucide-react";
import { DashboardLayout, type NavItem } from "@/components/layout/DashboardLayout";
import { authService } from "@/services/authService";
import { requireAuth } from "@/lib/authGuard";

const items: NavItem[] = [
  { label: "Dashboard", to: "/judge", icon: LayoutDashboard, exact: true },
  { label: "Assigned Projects", to: "/judge/assigned", icon: FolderKanban },
  { label: "Pending Evaluations", to: "/judge/pending", icon: Hourglass },
  { label: "Completed Evaluations", to: "/judge/completed", icon: CheckCheck },
  { label: "Profile", to: "/judge/profile", icon: User },
];

export const Route = createFileRoute("/judge")({
  beforeLoad: () => requireAuth("judge"),
  component: JudgeLayout,
});

function JudgeLayout() {
  const user = authService.getUser();

  return (
    <DashboardLayout
      items={items}
      roleLabel="Judge"
      userName={user?.name || "Judge"}
      userMeta={user?.college || user?.email || ""}
    >
      <Outlet />
    </DashboardLayout>
  );
}
