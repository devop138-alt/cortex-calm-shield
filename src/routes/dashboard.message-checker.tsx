import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, MessageSquareWarning } from "lucide-react";
import { PageHeading } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { EmptyState, ErrorState, LoadingState } from "@/components/common/States";
import { StatusBadge } from "@/components/common/StatusBadge";
import {
  DemoNotice,
  StatePreviewSwitcher,
  type ToolState,
} from "@/components/common/StatePreview";

export const Route = createFileRoute("/dashboard/message-checker")({
  head: () => ({
    meta: [
      { title: "Message Checker — CyberCortex Lite" },
      {
        name: "description",
        content:
          "Paste a message to understand common scam and social-engineering signals.",
      },
      { property: "og:title", content: "Message Checker — CyberCortex Lite" },
      {
        property: "og:description",
        content: "Spot social-engineering patterns in suspicious messages.",
      },
    ],
  }),
  component: MessageChecker,
});

const MAX = 2000;

function MessageChecker() {
  const [text, setText] = useState("");
  const [state, setState] = useState<ToolState>("empty");
  const analyze = () => {
    setState("error");
  };

  return (
    <div>
      <PageHeading
        title="Analyze a suspicious message"
        description="Paste a message to understand common scam and social-engineering signals."
      />

      <div className="panel p-6">
        <div className="grid gap-2">
          <Label htmlFor="message-input">Message</Label>
          <Textarea
            id="message-input"
            value={text}
            maxLength={MAX}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste the message you received..."
            className="min-h-44 resize-y text-base"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Personal details are never required for a check.</span>
            <span aria-live="polite">
              {text.length} / {MAX}
            </span>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button onClick={analyze} disabled={!text.trim() || state === "loading"}>
            {state === "loading" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Message"
            )}
          </Button>
          <Button variant="ghost" onClick={() => setText("")} disabled={!text}>
            Clear
          </Button>
        </div>
      </div>

      <StatePreviewSwitcher value={state} onChange={setState} className="mt-8" />

      <div className="mt-4">
        {state === "empty" && (
          <EmptyState
            icon={<MessageSquareWarning className="size-5" aria-hidden="true" />}
            title="No message analyzed yet."
            description="Paste a message above to see the signals explained here."
          />
        )}
        {state === "loading" && (
          <LoadingState
            title="Analyzing message..."
            description="Looking for common social-engineering patterns."
          />
        )}
        {state === "error" && (
          <ErrorState
            title="Something went wrong while analyzing the message."
            description="The analysis service isn't connected yet. Please try again later."
            onRetry={() => setState("empty")}
          />
        )}
        {state === "results" && (
          <div className="grid gap-4">
            <DemoNotice />
            <div className="panel p-6">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Message summary</p>
                  <p className="font-display text-lg font-semibold">
                    Prize claim with urgent deadline
                  </p>
                </div>
                <StatusBadge level="high" />
              </div>
              <ul className="mt-6 grid gap-2.5">
                {[
                  {
                    t: "Urgency pressure",
                    d: "The message pushes you to act within a short deadline.",
                  },
                  {
                    t: "Unexpected reward",
                    d: "A prize is offered for a competition you did not enter.",
                  },
                  {
                    t: "Requests personal data",
                    d: "It asks for identifying details to 'verify' you.",
                  },
                ].map((s) => (
                  <li
                    key={s.t}
                    className="rounded-xl border border-border bg-surface-2/50 px-4 py-3"
                  >
                    <p className="text-sm font-medium">{s.t}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
