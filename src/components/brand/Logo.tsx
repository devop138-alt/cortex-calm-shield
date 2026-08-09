import { cn } from "@/lib/utils";

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-border bg-surface-2">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-4.5 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2.5 4.5 5.6v6c0 4.6 3.1 8.3 7.5 9.9 4.4-1.6 7.5-5.3 7.5-9.9v-6L12 2.5Z" />
          <path d="M12 8.2v7.6M9 10.4h6M9.6 13.6h4.8" className="text-violet" />
        </svg>
      </span>
      {showWordmark && (
        <span className="font-display text-[0.95rem] font-semibold tracking-tight">
          CyberCortex <span className="text-muted-foreground">Lite</span>
        </span>
      )}
    </span>
  );
}
