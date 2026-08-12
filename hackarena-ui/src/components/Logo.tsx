import { Link } from "@tanstack/react-router";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2 font-display", className)}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <Code2 className="h-5 w-5" />
      </span>
      {!compact && (
        <span className="text-lg font-bold tracking-tight">
          Hack<span className="text-gradient">Arena</span>
        </span>
      )}
    </Link>
  );
}
