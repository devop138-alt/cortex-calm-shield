import { cn } from "@/lib/utils";

export type ToolState = "empty" | "loading" | "error" | "results";

const options: { value: ToolState; label: string }[] = [
  { value: "empty", label: "Empty" },
  { value: "loading", label: "Loading" },
  { value: "error", label: "Error" },
  { value: "results", label: "Results" },
];

export function StatePreviewSwitcher({
  value,
  onChange,
  className,
}: {
  value: ToolState;
  onChange: (v: ToolState) => void;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <span
        className="text-xs text-muted-foreground"
        id="state-preview-label"
      >
        Interface state preview
      </span>
      <div
        role="group"
        aria-labelledby="state-preview-label"
        className="inline-flex w-fit max-w-full flex-wrap gap-1 rounded-lg border border-border bg-surface-2 p-1"
      >
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              value === o.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function DemoNotice({ children }: { children?: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs text-muted-foreground">
      {children ??
        "Sample content shown to demonstrate the interface. No analysis has been performed — the security engine will be connected later."}
    </p>
  );
}
