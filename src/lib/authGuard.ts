import { redirect } from "@tanstack/react-router";
import type { Role } from "@/types";
import { authService } from "@/services/authService";
import { getDashboardForRole } from "@/lib/roles";

export function requireAuth(expectedRole?: Role) {
  if (!authService.isLoggedIn()) {
    throw redirect({ to: "/login" });
  }

  if (!expectedRole) {
    return;
  }

  const user = authService.getUser();

  if (!user) {
    throw redirect({ to: "/login" });
  }

  if (user.role !== expectedRole) {
    throw redirect({ to: getDashboardForRole(user.role) });
  }
}
