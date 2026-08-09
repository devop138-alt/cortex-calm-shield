import { createFileRoute } from "@tanstack/react-router";
import { PageHeading } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({
    meta: [
      { title: "Settings — CyberCortex Lite" },
      {
        name: "description",
        content: "Manage your CyberCortex Lite profile, notifications and privacy preferences.",
      },
      { property: "og:title", content: "Settings — CyberCortex Lite" },
      {
        property: "og:description",
        content: "Profile, notification and privacy preferences.",
      },
    ],
  }),
  component: Settings,
});

const toggles = [
  {
    id: "weekly-summary",
    label: "Weekly security summary",
    hint: "A short email recapping your checks.",
  },
  {
    id: "risk-alerts",
    label: "High risk alerts",
    hint: "Notify me when a check is marked high risk.",
  },
  {
    id: "store-history",
    label: "Store check history",
    hint: "Keep past checks available in your workspace.",
  },
];

function Settings() {
  return (
    <div>
      <PageHeading
        title="Settings"
        description="Preferences are interface-only until the backend is connected."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="panel p-6" aria-labelledby="profile-heading">
          <h2 id="profile-heading" className="text-base font-semibold">
            Profile
          </h2>
          <div className="mt-5 grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Alex Kerr" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="alex@example.com" />
            </div>
            <Button className="mt-2 w-fit" disabled>
              Save changes
            </Button>
          </div>
        </section>

        <section className="panel p-6" aria-labelledby="prefs-heading">
          <h2 id="prefs-heading" className="text-base font-semibold">
            Notifications & privacy
          </h2>
          <div className="mt-5 grid gap-5">
            {toggles.map((t, i) => (
              <div key={t.id}>
                {i > 0 && <Separator className="mb-5" />}
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                  <div className="min-w-0">
                    <Label htmlFor={t.id} className="text-sm font-medium">
                      {t.label}
                    </Label>
                    <p className="mt-1 text-xs text-muted-foreground">{t.hint}</p>
                  </div>
                  <Switch id={t.id} defaultChecked={i !== 2} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
