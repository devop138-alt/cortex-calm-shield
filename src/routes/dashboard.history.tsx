import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { History as HistoryIcon } from "lucide-react";
import { PageHeading } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/States";
import { DemoNotice } from "@/components/common/StatePreview";
import { sampleActivity } from "@/lib/demo-data";

export const Route = createFileRoute("/dashboard/history")({
  head: () => ({
    meta: [
      { title: "Check History — CyberCortex Lite" },
      {
        name: "description",
        content: "Review every link, message, website and password check in one timeline.",
      },
      { property: "og:title", content: "Check History — CyberCortex Lite" },
      {
        property: "og:description",
        content: "A timeline of your CyberCortex security checks.",
      },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const [showSample, setShowSample] = useState(true);

  return (
    <div>
      <PageHeading title="History" description="Every check you run appears here.">
        <Button variant="outline" onClick={() => setShowSample((s) => !s)}>
          {showSample ? "Preview empty state" : "Preview sample history"}
        </Button>
      </PageHeading>

      {showSample ? (
        <>
          <DemoNotice />
          <ul className="mt-4 grid gap-2">
            {sampleActivity.map((a) => (
              <li
                key={a.id}
                className="panel grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{a.type}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {a.target} · {a.time}
                  </span>
                </span>
                <StatusBadge level={a.level} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <EmptyState
          icon={<HistoryIcon className="size-5" aria-hidden="true" />}
          title="No scans yet."
          description="Your recent security checks will appear here."
          actionLabel="Run Your First Check"
          onAction={() => setShowSample(true)}
        />
      )}
    </div>
  );
}
