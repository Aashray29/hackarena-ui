import { createFileRoute } from "@tanstack/react-router";
import { ProfileView } from "@/components/ProfileView";

export const Route = createFileRoute("/participant/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — HackArena" },
      { name: "description", content: "View and edit your HackArena participant profile." },
      { property: "og:title", content: "My Profile — HackArena" },
      { property: "og:description", content: "Manage your participant account details." },
    ],
  }),
  component: () => <ProfileView role="participant" />,
});
