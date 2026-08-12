import { useEffect, useState } from "react";
import { Pencil, Save, X } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/StatusBadge";
import { authService, type UserProfile } from "@/services/authService";
import type { Role } from "@/types";

const roleLabels: Record<Role, string> = {
  participant: "Participant",
  admin: "Administrator",
  judge: "Judge",
};

type ProfileFields = Pick<UserProfile, "name" | "email" | "college" | "phone">;

export function ProfileView({ role }: { role: Role }) {
  const [profile, setProfile] = useState<ProfileFields | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ProfileFields>({
    name: "",
    email: "",
    college: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await authService.getMe();
        const fields: ProfileFields = {
          name: user.name,
          email: user.email,
          college: user.college ?? "",
          phone: user.phone ?? "",
        };
        setProfile(fields);
        setDraft(fields);
      } catch {
        const cached = authService.getUser();
        if (cached) {
          const fields: ProfileFields = {
            name: cached.name,
            email: cached.email,
            college: cached.college ?? "",
            phone: cached.phone ?? "",
          };
          setProfile(fields);
          setDraft(fields);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const fields: { key: keyof ProfileFields; label: string; type?: string; readOnly?: boolean }[] = [
    { key: "name", label: "Full name" },
    { key: "email", label: "Email", type: "email", readOnly: true },
    { key: "college", label: role === "judge" ? "Organisation" : "College" },
    { key: "phone", label: "Phone", type: "tel" },
  ];

  if (loading || !profile) {
    return <div className="p-6 text-muted-foreground">Loading profile...</div>;
  }

  return (
    <>
      <PageHeader
        title="Profile"
        description="Your account details as they appear to organisers and teammates."
        actions={
          editing ? (
            <>
              <Button
                variant="ghost"
                onClick={() => {
                  setDraft(profile);
                  setEditing(false);
                }}
              >
                <X className="mr-1.5 h-4 w-4" /> Cancel
              </Button>
              <Button
                onClick={async () => {
                  try {
                    await authService.updateProfile({
                      name: draft.name,
                      college: draft.college ?? "",
                      phone: draft.phone ?? "",
                    });
                    setProfile(draft);
                    setEditing(false);
                    toast.success("Profile updated");
                  } catch (error) {
                    toast.error(
                      error instanceof Error ? error.message : "Update failed",
                    );
                  }
                }}
              >
                <Save className="mr-1.5 h-4 w-4" /> Save changes
              </Button>
            </>
          ) : (
            <Button variant="secondary" onClick={() => setEditing(true)}>
              <Pencil className="mr-1.5 h-4 w-4" /> Edit profile
            </Button>
          )
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="surface-card rounded-2xl p-6 text-center">
          <div className="flex justify-center">
            <Avatar name={profile.name} size="lg" />
          </div>
          <h2 className="mt-4 truncate font-display text-xl font-bold">{profile.name}</h2>
          <p className="mt-1 truncate text-sm text-muted-foreground">{profile.email}</p>
          <div className="mt-4 flex justify-center">
            <StatusBadge status={roleLabels[role]} tone="primary" />
          </div>
        </div>

        <div className="surface-card rounded-2xl p-6">
          <h2 className="font-display text-lg font-semibold">Account details</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.key} className="space-y-2">
                <Label htmlFor={f.key}>{f.label}</Label>
                {editing && !f.readOnly ? (
                  <Input
                    id={f.key}
                    type={f.type ?? "text"}
                    value={draft[f.key] ?? ""}
                    onChange={(e) =>
                      setDraft((s) => ({ ...s, [f.key]: e.target.value }))
                    }
                  />
                ) : (
                  <p className="truncate rounded-lg border border-border bg-background/40 px-3 py-2.5 text-sm">
                    {profile[f.key] || "—"}
                  </p>
                )}
              </div>
            ))}
            <div className="space-y-2">
              <Label>Role</Label>
              <p className="rounded-lg border border-border bg-background/40 px-3 py-2.5 text-sm">
                {roleLabels[role]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
