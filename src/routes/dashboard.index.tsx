import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, ListChecks, AlertTriangle, ShieldAlert, ArrowRight } from "lucide-react";
import { PageHeading } from "@/components/dashboard/DashboardShell";
import { ScoreRing } from "@/components/common/ScoreRing";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { DemoNotice } from "@/components/common/StatePreview";
import { sampleActivity } from "@/lib/demo-data";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Security overview — CyberCortex Lite" },
      {
        name: "description",
        content:
          "Your CyberCortex Lite security overview: score, completed checks, warnings and recent activity.",
      },
      { property: "og:title", content: "Security overview — CyberCortex Lite" },
      {
        property: "og:description",
        content: "Score, completed checks, warnings and recent activity in one calm view.",
      },
    ],
  }),
  component: Overview,
});

const stats = [
  { label: "Security Score", value: "82 / 100", icon: ShieldCheck, tone: "text-primary" },
  { label: "Checks Completed", value: "24", icon: ListChecks, tone: "text-foreground" },
  { label: "Warnings", value: "3", icon: AlertTriangle, tone: "text-warning" },
  { label: "High Risk", value: "1", icon: ShieldAlert, tone: "text-danger" },
];

function Overview() {
  return (
    <div>
      <PageHeading title="Good evening." description="Here's your security overview.">
        <Button asChild>
          <Link to="/dashboard/website-scanner">Run a check</Link>
        </Button>
      </PageHeading>

      <DemoNotice />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="panel p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className={`size-4 shrink-0 ${s.tone}`} aria-hidden="true" />
            </div>
            <p className="mt-3 font-display text-2xl font-semibold tracking-tight">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[auto_minmax(0,1fr)]">
        <div className="panel flex flex-col items-center justify-center gap-3 p-6">
          <ScoreRing score={82} size={180} />
          <p className="text-sm text-muted-foreground">Overall security posture</p>
        </div>

        <section className="panel min-w-0 p-6" aria-labelledby="recent-activity">
          <div className="flex items-center justify-between gap-3">
            <h2 id="recent-activity" className="text-base font-semibold">
              Recent activity
            </h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/dashboard/history">
                View all
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <ul className="mt-4 grid gap-2">
            {sampleActivity.map((a) => (
              <li
                key={a.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-surface-2/50 px-4 py-3"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm">{a.type}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {a.target} · {a.time}
                  </span>
                </span>
                <StatusBadge level={a.level} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
