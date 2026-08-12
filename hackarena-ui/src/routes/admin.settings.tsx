import { createFileRoute } from "@tanstack/react-router";
import { ProfileView } from "@/components/ProfileView";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Admin Settings — HackArena" },
      { name: "description", content: "Manage the organiser account and platform settings." },
      { property: "og:title", content: "Admin Settings — HackArena" },
      { property: "og:description", content: "Organiser account and platform preferences." },
    ],
  }),
  component: () => <ProfileView role="admin" />,
});
