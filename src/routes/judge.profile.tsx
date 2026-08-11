import { createFileRoute } from "@tanstack/react-router";
import { ProfileView } from "@/components/ProfileView";

export const Route = createFileRoute("/judge/profile")({
  head: () => ({
    meta: [
      { title: "Judge Profile — HackArena" },
      { name: "description", content: "View and edit your HackArena judge profile." },
      { property: "og:title", content: "Judge Profile — HackArena" },
      { property: "og:description", content: "Manage your judge account details." },
    ],
  }),
  component: () => <ProfileView role="judge" />,
});
