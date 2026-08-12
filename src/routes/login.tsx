import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Rocket, ShieldCheck, Gavel, Info } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/authService";
import {
  DEMO_ACCOUNTS,
  getDashboardForRole,
  ROLE_LABELS,
} from "@/lib/roles";
import type { Role } from "@/types";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — HackArena" },
      { name: "description", content: "Sign in to your HackArena participant, admin or judge workspace." },
    ],
  }),
  component: LoginPage,
});

const roleIcons: Record<Role, typeof Rocket> = {
  participant: Rocket,
  admin: ShieldCheck,
  judge: Gavel,
};

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("aashray@example.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [quickLoading, setQuickLoading] = useState<Role | null>(null);

  const completeLogin = async (loginEmail: string, loginPassword: string) => {
    const data = await authService.login(loginEmail, loginPassword);
    toast.success(`Signed in as ${ROLE_LABELS[data.user.role]}`);
    navigate({ to: getDashboardForRole(data.user.role) });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await completeLogin(email, password);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Invalid email or password",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (role: Role) => {
    const account = DEMO_ACCOUNTS.find((item) => item.role === role);

    if (!account) {
      return;
    }

    setEmail(account.email);
    setPassword(account.password);
    setQuickLoading(role);

    try {
      await completeLogin(account.email, account.password);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Demo login failed — run `npm run fix-passwords` in the backend folder",
      );
    } finally {
      setQuickLoading(null);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="hero-glow absolute inset-0" />
      <div className="bg-grid absolute inset-0 opacity-50" />

      <div className="surface-card relative w-full max-w-lg rounded-3xl p-7 sm:p-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center font-display text-2xl font-bold">Welcome back</h1>
        <p className="mt-1.5 text-center text-sm text-muted-foreground">
          Your role (Participant, Admin, or Judge) is set on your account in the database.
          After login you are sent to the matching dashboard automatically.
        </p>

        <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div className="space-y-1">
              <p className="font-medium text-foreground">How roles work</p>
              <p>
                <strong>Register</strong> always creates a Participant account.
                Admin and Judge accounts are created in the database (seed data).
              </p>
              <p>Login with the correct email — the app detects your role and opens the right dashboard.</p>
            </div>
          </div>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@college.edu"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs uppercase tracking-wide text-muted-foreground">Demo logins</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-2.5">
          {DEMO_ACCOUNTS.map((account) => {
            const Icon = roleIcons[account.role];

            return (
              <Button
                key={account.role}
                variant="secondary"
                className="h-auto w-full flex-col items-start gap-1 py-3 text-left"
                disabled={quickLoading !== null}
                onClick={() => handleQuickLogin(account.role)}
              >
                <span className="flex items-center gap-2 font-medium">
                  <Icon className="h-4 w-4 text-primary" />
                  {quickLoading === account.role
                    ? `Signing in as ${account.label}...`
                    : `Login as ${account.label}`}
                </span>
                <span className="text-xs font-normal text-muted-foreground">
                  {account.email} — {account.description}
                </span>
              </Button>
            );
          })}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to HackArena?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Create a participant account
          </Link>
        </p>
      </div>
    </div>
  );
}
