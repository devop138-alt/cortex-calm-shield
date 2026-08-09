import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Inbox, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoadingState({
  title = "Analyzing...",
  description = "This usually takes a few seconds.",
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("panel p-8 text-center", className)}
      role="status"
      aria-live="polite"
    >
      <Loader2 className="mx-auto size-6 animate-spin text-primary" aria-hidden="true" />
      <p className="mt-4 text-sm font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <div className="mx-auto mt-6 grid max-w-sm gap-2">
        <div className="shimmer h-3 rounded-full bg-surface-2" />
        <div className="shimmer h-3 w-4/5 rounded-full bg-surface-2" />
        <div className="shimmer h-3 w-3/5 rounded-full bg-surface-2" />
      </div>
    </div>
  );
}

export function EmptyState({
  title = "No scans yet.",
  description = "Your recent security checks will appear here.",
  actionLabel,
  onAction,
  icon,
  className,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("panel p-10 text-center", className)}>
      <div className="mx-auto grid size-11 place-items-center rounded-xl border border-border bg-surface-2 text-muted-foreground">
        {icon ?? <Inbox className="size-5" aria-hidden="true" />}
      </div>
      <p className="mt-4 font-display text-base font-semibold">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {actionLabel && (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong while analyzing.",
  description = "Please check your input and try again.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn("panel border-danger/30 p-8 text-center", className)}
      role="alert"
    >
      <div className="mx-auto grid size-11 place-items-center rounded-xl border border-danger/30 bg-danger/10 text-danger">
        <TriangleAlert className="size-5" aria-hidden="true" />
      </div>
      <p className="mt-4 font-display text-base font-semibold">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {onRetry && (
        <Button variant="outline" className="mt-6" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
