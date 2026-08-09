import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ScoreRing({
  score,
  label = "Low Risk",
  size = 168,
  caption = "Security Score",
  className,
}: {
  score: number;
  label?: string;
  size?: number;
  caption?: string;
  className?: string;
}) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setProgress(score));
    return () => cancelAnimationFrame(id);
  }, [score]);

  const stroke = Math.max(8, Math.round(size * 0.055));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${caption}: ${score} out of 100. ${label}.`}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id="scoreRingGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-violet)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-surface-2)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#scoreRingGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * progress) / 100}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute text-center">
        <div
          className="font-display font-semibold tracking-tight"
          style={{ fontSize: size * 0.26 }}
        >
          {score}
        </div>
        <div className="text-xs text-muted-foreground">/ 100</div>
        <div className="mt-1 text-xs font-medium text-success">{label}</div>
      </div>
    </div>
  );
}
