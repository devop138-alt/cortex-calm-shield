import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Globe, Loader2, Check } from "lucide-react";
import { PageHeading } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmptyState, ErrorState } from "@/components/common/States";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreRing } from "@/components/common/ScoreRing";
import { FindingList } from "@/components/common/FindingList";
import { sampleFindings } from "@/lib/demo-data";
import {
  DemoNotice,
  StatePreviewSwitcher,
  type ToolState,
} from "@/components/common/StatePreview";

export const Route = createFileRoute("/dashboard/website-scanner")({
  head: () => ({
    meta: [
      { title: "Website Security Scanner — CyberCortex Lite" },
      {
        name: "description",
        content: "Review important security protections used by a website.",
      },
      { property: "og:title", content: "Website Security Scanner — CyberCortex Lite" },
      {
        property: "og:description",
        content: "Review HTTPS, headers and browser protections in plain language.",
      },
    ],
  }),
  component: WebsiteScanner,
});

const stages = [
  "Checking connection",
  "Reviewing security headers",
  "Reviewing browser protections",
  "Checking domain security",
  "Preparing results",
];

function WebsiteScanner() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<ToolState>("empty");
  const [stage, setStage] = useState(0);

  const scan = () => {
    setStage(0);
    setState("error");
  };

  return (
    <div>
      <PageHeading
        title="Website Security Scanner"
        description="Review important security protections used by a website."
      />

      <div className="panel p-6">
        <div className="grid gap-2">
          <Label htmlFor="scan-url">Website address</Label>
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
            <Input
              id="scan-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              inputMode="url"
              className="h-12 text-base"
            />
            <Button
              className="h-12 sm:w-40"
              onClick={scan}
              disabled={!url.trim() || state === "loading"}
            >
              {state === "loading" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                "Scan Website"
              )}
            </Button>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Only scan websites you own or are authorized to review.
        </p>
      </div>

      <StatePreviewSwitcher value={state} onChange={setState} className="mt-8" />

      <div className="mt-4">
        {state === "empty" && (
          <EmptyState
            icon={<Globe className="size-5" aria-hidden="true" />}
            title="No scans yet."
            description="Your recent security checks will appear here."
          />
        )}

        {state === "loading" && (
          <div className="panel p-8" role="status" aria-live="polite">
            <p className="text-sm font-medium">Analyzing website...</p>
            <ol className="mt-6 grid gap-3">
              {stages.map((s, i) => (
                <li key={s} className="flex items-center gap-3 text-sm">
                  <span
                    className={`grid size-6 shrink-0 place-items-center rounded-full border ${
                      i < stage
                        ? "border-success/40 bg-success/10 text-success"
                        : i === stage
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-border text-muted-foreground"
                    }`}
                  >
                    {i < stage ? (
                      <Check className="size-3.5" aria-hidden="true" />
                    ) : i === stage ? (
                      <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                    ) : (
                      <span className="size-1.5 rounded-full bg-current" />
                    )}
                  </span>
                  <span className={i <= stage ? "text-foreground" : "text-muted-foreground"}>
                    {s}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {state === "error" && (
          <ErrorState
            title="Something went wrong while analyzing the website."
            description="The scanning engine isn't connected yet. Please check the URL and try again later."
            onRetry={() => setState("empty")}
          />
        )}

        {state === "results" && (
          <div className="grid gap-4">
            <DemoNotice />
            <div className="panel grid gap-6 p-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
              <ScoreRing score={82} size={148} className="justify-self-center" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Website</p>
                <p className="truncate font-display text-xl font-semibold">example.com</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Security score 82 / 100
                </p>
                <StatusBadge level="low" className="mt-3" />
              </div>
            </div>
            <h2 className="mt-2 font-display text-lg font-semibold">Findings</h2>
            <FindingList findings={sampleFindings} />
          </div>
        )}
      </div>
    </div>
  );
}
