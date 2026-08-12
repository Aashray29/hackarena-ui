export function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-11 w-11 text-sm",
    lg: "h-20 w-20 text-2xl",
  } as const;

  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary/25 to-accent/25 font-display font-semibold text-foreground ring-1 ring-border ${sizes[size]}`}
    >
      {initials}
    </span>
  );
}
