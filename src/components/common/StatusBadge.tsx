import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, ShieldAlert, Info } from "lucide-react";

export type RiskLevel = "low" | "medium" | "high" | "info";

const config: Record<
  RiskLevel,
  { label: string; icon: typeof CheckCircle2; className: string }
> = {
  low: {
    label: "Low Risk",
    icon: CheckCircle2,
    className: "border-success/30 bg-success/10 text-success",
  },
  medium: {
    label: "Medium Risk",
    icon: AlertTriangle,
    className: "border-warning/30 bg-warning/10 text-warning",
  },
  high: {
    label: "High Risk",
    icon: ShieldAlert,
    className: "border-danger/35 bg-danger/12 text-danger",
  },
  info: {
    label: "Informational",
    icon: Info,
    className: "border-border bg-surface-2 text-muted-foreground",
  },
};

export function StatusBadge({
  level,
  label,
  className,
}: {
  level: RiskLevel;
  label?: string;
  className?: string;
}) {
  const item = config[level];
  const Icon = item.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        item.className,
        className,
      )}
    >
      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
      {label ?? item.label}
    </span>
  );
}
