import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link2, Loader2, ShieldCheck } from "lucide-react";
import { PageHeading } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmptyState, ErrorState, LoadingState } from "@/components/common/States";
import { StatusBadge } from "@/components/common/StatusBadge";
import {
  DemoNotice,
  StatePreviewSwitcher,
  type ToolState,
} from "@/components/common/StatePreview";

interface AnalysisResult {
  url: string;
  level: "low" | "medium" | "high";
  signals: string[];
  recommendation: string;
}

export const Route = createFileRoute("/dashboard/link-checker")({
  head: () => ({
    meta: [
      { title: "Link Checker — CyberCortex Lite" },
      {
        name: "description",
        content: "Analyze a URL before you open it and understand suspicious signals.",
      },
      { property: "og:title", content: "Link Checker — CyberCortex Lite" },
      {
        property: "og:description",
        content: "Paste a URL and understand suspicious signals before you click.",
      },
    ],
  }),
  component: LinkChecker,
});

function LinkChecker() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<ToolState>("empty");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyze = async () => {
    if (!url.trim()) return;

    setState("loading");
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/check-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
      setState("results");
    } catch (error) {
      console.error("Failed to analyze link:", error);
      setState("error");
    }
  };

  return (
    <div>
      <PageHeading
        title="Check a suspicious link"
        description="Analyze a URL before you open it."
      />

      <div className="panel p-6">
        <div className="grid gap-2">
          <Label htmlFor="link-url">URL</Label>
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
            <Input
              id="link-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste a URL..."
              inputMode="url"
              className="h-12 text-base"
            />
            <Button
              className="h-12 sm:w-40"
              onClick={analyze}
            >
              {state === "loading" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Link"
              )}
            </Button>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Only analyze links you are authorized to inspect.
        </p>
      </div>

      <StatePreviewSwitcher value={state} onChange={setState} className="mt-8" />

      <div className="mt-4">
        {state === "empty" && (
          <EmptyState
            icon={<Link2 className="size-5" aria-hidden="true" />}
            title="No link analyzed yet."
            description="Paste a URL above and the analysis will appear here."
          />
        )}
        {state === "loading" && (
          <LoadingState
            title="Analyzing link..."
            description="Reviewing the address and its security signals."
          />
        )}
        {state === "error" && (
          <ErrorState
            title="Something went wrong while analyzing the link."
            description="The analysis service isn't connected yet. Please check the URL and try again later."
            onRetry={() => setState("empty")}
          />
        )}
        {state === "results" && (
          <div className="grid gap-4">
            <DemoNotice />
            <div className="panel p-6">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Analyzed link</p>
                  <p className="truncate font-display text-lg font-semibold">
                    example.com/login
                  </p>
                </div>
                <StatusBadge level="medium" />
              </div>
              <ul className="mt-6 grid gap-2.5">
                {[
                  "Domain registered recently",
                  "Link text does not match the destination",
                  "Login form requested over a redirect chain",
                ].map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-3 rounded-xl border border-border bg-surface-2/50 px-4 py-3 text-sm"
                  >
                    <ShieldCheck
                      className="mt-0.5 size-4 shrink-0 text-warning"
                      aria-hidden="true"
                    />
                    <span className="min-w-0">{s}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-lg border border-primary/25 bg-primary/8 p-4 text-sm leading-relaxed">
                <span className="font-medium text-primary">What to do next · </span>
                Avoid entering credentials. If the message claims to be from a service you
                use, open that service directly instead of following the link.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
