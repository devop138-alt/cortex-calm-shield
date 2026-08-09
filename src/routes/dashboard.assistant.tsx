import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Copy, Trash2, Send, Check } from "lucide-react";
import { PageHeading } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Logo } from "@/components/brand/Logo";
import { DemoNotice } from "@/components/common/StatePreview";

export const Route = createFileRoute("/dashboard/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — CyberCortex Lite" },
      {
        name: "description",
        content: "Ask security questions in plain language and get jargon-free explanations.",
      },
      { property: "og:title", content: "AI Assistant — CyberCortex Lite" },
      {
        property: "og:description",
        content: "Security answers without the security jargon.",
      },
    ],
  }),
  component: Assistant,
});

type Msg = { id: string; role: "user" | "assistant"; text: string };

const previewThread: Msg[] = [
  { id: "m1", role: "user", text: "Why is this website risky?" },
  {
    id: "m2",
    role: "assistant",
    text: "This website is missing several browser security protections. That doesn't automatically mean the website is malicious, but these settings are worth reviewing.",
  },
];

const suggestions = [
  "What is phishing?",
  "Why is HTTPS important?",
  "How do I protect my website?",
  "What is a security header?",
];

function Assistant() {
  const [messages, setMessages] = useState<Msg[]>(previewThread);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const send = (text: string) => {
    const value = text.trim();
    if (!value || pending) return;
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", text: value }]);
    setInput("");
    setMessages((m) => [
      ...m,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        text: "The assistant isn't connected yet, so I can't answer this question. Once the CyberCortex service is connected, answers will appear here.",
      },
    ]);
  };

  const copy = async (msg: Msg) => {
    await navigator.clipboard.writeText(msg.text);
    setCopied(msg.id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div>
      <PageHeading
        title="AI Assistant"
        description="Security answers without the security jargon.">
        <Button
          variant="ghost"
          onClick={() => setMessages([])}
          disabled={messages.length === 0}
        >
          <Trash2 className="size-4" />
          Clear conversation
        </Button>
      </PageHeading>

      <DemoNotice>
        The opening exchange is sample content. The assistant service will be connected later.
      </DemoNotice>

      <div className="panel mt-4 flex min-h-[28rem] flex-col p-0">
        <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
          {messages.length === 0 && (
            <p className="py-16 text-center text-sm text-muted-foreground">
              Ask a question to start a conversation.
            </p>
          )}
          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="rise-in flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                  {m.text}
                </p>
              </div>
            ) : (
              <div key={m.id} className="rise-in flex gap-3">
                <Logo showWordmark={false} className="mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="max-w-[90%] text-sm leading-relaxed text-foreground/90">
                    {m.text}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-1.5 h-8 px-2 text-xs text-muted-foreground"
                    onClick={() => copy(m)}
                  >
                    {copied === m.id ? (
                      <Check className="size-3.5" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                    {copied === m.id ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>
            ),
          )}
          {pending && (
            <div className="flex items-center gap-3" role="status" aria-live="polite">
              <Logo showWordmark={false} className="shrink-0" />
              <span className="flex gap-1" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-1.5 animate-pulse rounded-full bg-muted-foreground"
                    style={{ animationDelay: `${i * 160}ms` }}
                  />
                ))}
              </span>
              <span className="text-sm text-muted-foreground">Thinking...</span>
            </div>
          )}
        </div>

        <div className="border-t border-border p-4 sm:p-5">
          <ul className="mb-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
          <form
            className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <label htmlFor="assistant-input" className="sr-only">
              Message the assistant
            </label>
            <Textarea
              id="assistant-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask about a security topic..."
              className="min-h-11 resize-none"
              rows={1}
            />
            <Button
              type="submit"
              size="icon"
              className="min-h-11 min-w-11"
              disabled={!input.trim() || pending}
              aria-label="Send message"
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
