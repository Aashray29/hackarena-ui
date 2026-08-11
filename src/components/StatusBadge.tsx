import { cn } from "@/lib/utils";

type Tone = "primary" | "success" | "warning" | "info" | "muted" | "destructive" | "accent";

const toneClasses: Record<Tone, string> = {
  primary: "bg-primary/12 text-primary border-primary/30",
  success: "bg-success/12 text-success border-success/30",
  warning: "bg-warning/12 text-warning border-warning/30",
  info: "bg-info/12 text-info border-info/30",
  accent: "bg-accent/12 text-accent border-accent/30",
  destructive: "bg-destructive/12 text-destructive border-destructive/30",
  muted: "bg-muted text-muted-foreground border-border",
};

const statusTone: Record<string, Tone> = {
  "Registration Open": "success",
  Upcoming: "info",
  Ongoing: "warning",
  Completed: "muted",
  Submitted: "success",
  "Not Submitted": "muted",
  Draft: "warning",
  Evaluated: "success",
  Pending: "warning",
  "In Review": "info",
  Active: "success",
  Inactive: "muted",
  Online: "info",
  Offline: "accent",
  Hybrid: "primary",
};

export function StatusBadge({
  status,
  tone,
  className,
}: {
  status: string;
  tone?: Tone;
  className?: string;
}) {
  const resolved = tone ?? statusTone[status] ?? "primary";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        toneClasses[resolved],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
