import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/authService";
import { getDashboardForRole } from "@/lib/roles";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your account — HackArena" },
      {
        name: "description",
        content: "Register on HackArena to join hackathons, form teams and submit projects.",
      },
      { property: "og:title", content: "Create your account — HackArena" },
      { property: "og:description", content: "Join HackArena and start hacking." },
    ],
  }),
  component: RegisterPage,
});

const fields = [
  { id: "fullName", label: "Full name", type: "text", placeholder: "Aarav Menon" },
  { id: "email", label: "Email", type: "email", placeholder: "you@college.edu" },
  { id: "college", label: "College", type: "text", placeholder: "PSG College of Technology" },
  { id: "phone", label: "Phone", type: "tel", placeholder: "+91 98400 12345" },
  { id: "password", label: "Password", type: "password", placeholder: "••••••••" },
  { id: "confirmPassword", label: "Confirm password", type: "password", placeholder: "••••••••" },
];

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Record<string, string>>({});

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="hero-glow absolute inset-0" />
      <div className="bg-grid absolute inset-0 opacity-50" />

      <div className="surface-card relative w-full max-w-xl rounded-3xl p-7 sm:p-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center font-display text-2xl font-bold">Create your account</h1>
        <p className="mt-1.5 text-center text-sm text-muted-foreground">
          New accounts are created as <strong>Participants</strong>. Admin and Judge access is
          assigned separately in the database.
        </p>

        <form
          className="mt-7 grid gap-4 sm:grid-cols-2"
          onSubmit={async (e) => {
            e.preventDefault();
            if (form["password"] !== form["confirmPassword"]) {
              toast.error("Passwords do not match");
              return;
            }
            try {
              await authService.register(form);
              const loginData = await authService.login(
                form["email"] ?? "",
                form["password"] ?? "",
              );
              toast.success("Participant account created!");
              navigate({ to: getDashboardForRole(loginData.user.role) });
            } catch (error) {
              toast.error(
                error instanceof Error ? error.message : "Registration failed",
              );
            }
          }}
        >
          {fields.map((f) => (
            <div
              key={f.id}
              className={`space-y-2 ${f.id === "email" || f.id === "fullName" ? "sm:col-span-2" : ""}`}
            >
              <Label htmlFor={f.id}>{f.label}</Label>
              <Input
                id={f.id}
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.id] ?? ""}
                onChange={(e) => setForm((s) => ({ ...s, [f.id]: e.target.value }))}
                required
              />
            </div>
          ))}
          <Button type="submit" size="lg" className="sm:col-span-2">
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already registered?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
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
