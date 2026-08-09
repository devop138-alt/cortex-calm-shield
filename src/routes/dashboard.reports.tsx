import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { PageHeading } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ScoreRing } from "@/components/common/ScoreRing";
import { FindingList } from "@/components/common/FindingList";
import { DemoNotice } from "@/components/common/StatePreview";
import { sampleFindings } from "@/lib/demo-data";

export const Route = createFileRoute("/dashboard/reports")({
  head: () => ({
    meta: [
      { title: "Security Reports — CyberCortex Lite" },
      {
        name: "description",
        content: "Preview a shareable CyberCortex security report with findings and next steps.",
      },
      { property: "og:title", content: "Security Reports — CyberCortex Lite" },
      {
        property: "og:description",
        content: "Executive summary, findings and recommendations in one report.",
      },
    ],
  }),
  component: Reports,
});

function Reports() {
  return (
    <div>
      <PageHeading
        title="Reports"
        description="A shareable summary of a completed security review."
      >
        <Button disabled>
          <Download className="size-4" />
          Download Report
        </Button>
      </PageHeading>

      <DemoNotice>
        Report preview using sample content. Report generation will be connected later.
      </DemoNotice>

      <article className="panel mt-4 p-6 sm:p-8">
        <header className="grid gap-6 border-b border-border pb-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <FileText className="size-3.5" aria-hidden="true" />
              CyberCortex Security Report
            </span>
            <h2 className="mt-2 truncate font-display text-2xl font-semibold">example.com</h2>
            <p className="mt-1 text-sm text-muted-foreground">Scan date · 14 March 2026</p>
            <StatusBadge level="low" className="mt-3" />
          </div>
          <ScoreRing score={82} size={132} className="justify-self-center" />
        </header>

        <section className="mt-6">
          <h3 className="text-base font-semibold">Executive summary</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The site uses an encrypted connection and enforces HTTPS through transport
            security. One area — content security policy — is worth reviewing to reduce the
            impact of injected content. No high-severity issues were recorded in this
            review.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="text-base font-semibold">Findings</h3>
          <div className="mt-4">
            <FindingList findings={sampleFindings} />
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-base font-semibold">Recommendations</h3>
          <ol className="mt-3 grid gap-2 text-sm text-muted-foreground">
            {[
              "Publish a Content Security Policy in report-only mode and review the reports.",
              "Add SameSite attributes to session cookies.",
              "Re-run the review after each deployment that changes headers.",
            ].map((r, i) => (
              <li key={r} className="flex gap-3">
                <span className="text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0">{r}</span>
              </li>
            ))}
          </ol>
        </section>
      </article>
    </div>
  );
}
