import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Github, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

const navLinks = [
  { label: "Home", to: "/" as const },
  { label: "Hackathons", to: "/hackathons" as const },
  { label: "Leaderboard", to: "/leaderboard" as const },
  { label: "About", to: "/about" as const },
];

function PublicNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/register">Register</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Button asChild variant="secondary" onClick={() => setOpen(false)}>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild onClick={() => setOpen(false)}>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function PublicFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            HackArena is a college hackathon platform for discovering events, forming teams,
            submitting projects and getting evaluated by expert judges.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/hackathons" className="hover:text-primary">Hackathons</Link></li>
            <li><Link to="/leaderboard" className="hover:text-primary">Leaderboard</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/login" className="hover:text-primary">Login</Link></li>
            <li><Link to="/register" className="hover:text-primary">Register</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold">Contact</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="min-w-0 break-words">team@hackarena.dev</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>+91 98400 00000</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>Coimbatore, Tamil Nadu</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto w-full max-w-7xl px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} HackArena. Built for the love of building.
        </p>
      </div>
    </footer>
  );
}

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
