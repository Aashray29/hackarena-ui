import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Rocket, ShieldCheck, Gavel } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/authService";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — HackArena" },
      { name: "description", content: "Sign in to your HackArena participant, admin or judge workspace." },
      { property: "og:title", content: "Login — HackArena" },
      { property: "og:description", content: "Access your HackArena dashboard." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("aarav.menon@psgtech.edu");
  const [password, setPassword] = useState("hackarena");

  const demoButtons = [
    { label: "Continue as Participant", to: "/participant" as const, icon: Rocket },
    { label: "Continue as Admin", to: "/admin" as const, icon: ShieldCheck },
    { label: "Continue as Judge", to: "/judge" as const, icon: Gavel },
  ];

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="hero-glow absolute inset-0" />
      <div className="bg-grid absolute inset-0 opacity-50" />

      <div className="surface-card relative w-full max-w-md rounded-3xl p-7 sm:p-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center font-display text-2xl font-bold">Welcome back</h1>
        <p className="mt-1.5 text-center text-sm text-muted-foreground">
          Sign in to continue to your workspace.
        </p>

        <form
          className="mt-7 space-y-4"
              onSubmit={async (e) => {
                      e.preventDefault();

                      try {
                        const data = await authService.login(email, password);

                        toast.success("Login successful");

                        if (data.user?.role === "admin") {
                          navigate({ to: "/admin" });
                        } else if (data.user?.role === "judge") {
                          navigate({ to: "/judge" });
                        } else {
                          navigate({ to: "/participant" });
                        }
                      } catch (error) {
                        toast.error(
                          error instanceof Error
                            ? error.message
                            : "Invalid email or password"
        );
      }
    }}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                onClick={() => toast.info("Password reset link sent (demo)")}
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            Login
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs uppercase tracking-wide text-muted-foreground">Demo access</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-2.5">
          {demoButtons.map((b) => (
            <Button key={b.to} asChild variant="secondary" className="w-full justify-start">
              <Link to={b.to}>
                <b.icon className="mr-2 h-4 w-4 text-primary" />
                {b.label}
              </Link>
            </Button>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to HackArena?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Create an account
          </Link>
        </p>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
