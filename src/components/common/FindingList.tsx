import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { SampleFinding } from "@/lib/demo-data";
import { Check, AlertTriangle, X } from "lucide-react";

const statusIcon = {
  pass: { Icon: Check, className: "border-success/30 bg-success/10 text-success" },
  review: {
    Icon: AlertTriangle,
    className: "border-warning/30 bg-warning/10 text-warning",
  },
  fail: { Icon: X, className: "border-danger/30 bg-danger/10 text-danger" },
};

export function FindingList({ findings }: { findings: SampleFinding[] }) {
  return (
    <Accordion type="single" collapsible className="grid gap-3">
      {findings.map((f) => {
        const { Icon, className } = statusIcon[f.status];
        return (
          <AccordionItem
            key={f.id}
            value={f.id}
            className="panel border-b px-4 last:border-b"
          >
            <AccordionTrigger className="py-4 hover:no-underline">
              <div className="grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-3 text-left sm:grid-cols-[auto_minmax(0,1fr)_auto]">
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-lg border ${className}`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{f.title}</span>
                  <span className="block truncate text-sm text-muted-foreground">
                    {f.summary}
                  </span>
                </span>
                <StatusBadge
                  level={f.severity}
                  label={
                    f.severity === "low"
                      ? "Passed"
                      : f.severity === "medium"
                        ? "Review"
                        : "Action needed"
                  }
                  className="col-span-2 justify-self-start sm:col-span-1 sm:justify-self-end"
                />
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-sm text-muted-foreground">
              <p>{f.detail}</p>
              <p className="mt-3 rounded-lg border border-border bg-surface-2 p-3 text-foreground/90">
                <span className="font-medium">Recommendation: </span>
                {f.recommendation}
              </p>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
