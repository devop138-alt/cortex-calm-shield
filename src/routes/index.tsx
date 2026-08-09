import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Link2,
  MessageSquareWarning,
  Globe,
  KeyRound,
  Lock,
  EyeOff,
  Sparkle,
  ListChecks,
  ArrowRight,
  Check,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ScoreRing } from "@/components/common/ScoreRing";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Logo } from "@/components/brand/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CyberCortex Lite — Your digital safety, simplified" },
      {
        name: "description",
        content:
          "Understand suspicious links, scam messages, password risks and website security in plain language — no cybersecurity expertise required.",
      },
      {
        property: "og:title",
        content: "CyberCortex Lite — Your digital safety, simplified",
      },
      {
        property: "og:description",
        content:
          "An AI-powered assistant that explains security signals in plain language for everyday users, freelancers and small teams.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: Link2,
    title: "Suspicious Link Check",
    body: "Understand whether a link contains suspicious signals before you open it.",
  },
  {
    icon: MessageSquareWarning,
    title: "Scam Message Analysis",
    body: "Identify common social-engineering patterns in suspicious messages.",
  },
  {
    icon: Globe,
    title: "Website Security Scan",
    body: "Review important security protections used by your website.",
  },
  {
    icon: KeyRound,
    title: "Password Safety",
    body: "Understand whether your password habits need improvement.",
  },
];

const trust = [
  { icon: ShieldCheck, label: "Human-friendly security" },
  { icon: EyeOff, label: "Privacy-conscious design" },
  { icon: Sparkle, label: "AI-powered explanations" },
  { icon: ListChecks, label: "Actionable recommendations" },
];

const steps = [
  { n: "01", title: "Check", body: "Paste a link, message, or website." },
  { n: "02", title: "Understand", body: "CyberCortex analyzes security signals." },
  { n: "03", title: "Act", body: "Get a simple explanation and recommended next steps." },
];

function Landing() {
  return (
    <div className="min-h-dvh">
      <SiteNav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="ambient-glow drift-slow -top-32 left-[-10%] size-[28rem] bg-primary"
            aria-hidden="true"
          />
          <div
            className="ambient-glow drift-slow top-24 right-[-15%] size-[26rem] bg-violet"
            aria-hidden="true"
          />
          <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center">
            <div className="rise-in min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5 text-primary" aria-hidden="true" />
                Security, explained in plain language
              </span>
              <h1 className="mt-5 font-display text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl">
                Your digital safety, <span className="text-gradient">simplified.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                CyberCortex helps you understand suspicious links, scam messages, password
                risks, and website security — without requiring cybersecurity expertise.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/dashboard">Check Your Security</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#product">Explore CyberCortex</a>
                </Button>
              </div>
            </div>

            {/* Hero dashboard preview (presentation UI) */}
            <div className="rise-in min-w-0">
              <div className="panel p-5" aria-label="Interface preview">
                <div className="flex items-center justify-between gap-3">
                  <Logo showWordmark={false} />
                  <span className="rounded-full border border-border bg-surface-2 px-2 py-0.5 text-[0.68rem] text-muted-foreground">
                    Interface preview
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-5">
                  <ScoreRing score={82} size={116} caption="Security score preview" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Security Score</p>
                    <p className="font-display text-2xl font-semibold">82 / 100</p>
                    <StatusBadge level="low" className="mt-2" />
                  </div>
                </div>

                <ul className="mt-5 grid gap-2">
                  {[
                    { label: "Website scan", meta: "example.com", level: "low" as const },
                    {
                      label: "Suspicious message",
                      meta: "Prize claim",
                      level: "high" as const,
                    },
                    {
                      label: "Link analysis",
                      meta: "example.com/login",
                      level: "medium" as const,
                    },
                  ].map((r) => (
                    <li
                      key={r.label}
                      className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border bg-surface-2/60 px-3 py-2.5"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm">{r.label}</span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {r.meta}
                        </span>
                      </span>
                      <StatusBadge level={r.level} />
                    </li>
                  ))}
                </ul>

                <p className="mt-4 rounded-lg border border-primary/25 bg-primary/8 p-3 text-xs leading-relaxed text-foreground/90">
                  <span className="font-medium text-primary">AI recommendation · </span>
                  Your website has a few security improvements worth reviewing.
                </p>
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Sample content shown for design purposes — not a live scan.
              </p>
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="border-y border-border/70 bg-surface/40">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
            <h2 className="font-display text-lg font-semibold">
              Built to make cybersecurity easier to understand.
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {trust.map((t) => (
                <li key={t.label} className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-surface-2 text-primary">
                    <t.icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 text-sm text-foreground/90">{t.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Features */}
        <section id="product" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Understand risks before you click.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              Analyze suspicious links, messages, and websites — with explanations you can
              actually use.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <article
                  key={f.title}
                  className="panel p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lift"
                >
                  <span className="grid size-10 place-items-center rounded-xl border border-border bg-surface-2 text-primary">
                    <f.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-20 border-y border-border/70 bg-surface/40">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              How it works
            </h2>
            <ol className="relative mt-10 grid gap-6 md:grid-cols-3">
              <span
                className="absolute top-9 right-8 left-8 hidden h-px bg-border md:block"
                aria-hidden="true"
              />
              {steps.map((s) => (
                <li key={s.n} className="relative">
                  <span className="relative z-10 grid size-9 place-items-center rounded-full border border-border bg-surface-2 font-display text-xs text-primary">
                    {s.n}
                  </span>
                  <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* AI section */}
        <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="min-w-0">
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Security answers without the security jargon.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Ask a question in your own words. CyberCortex explains what a signal means,
                why it matters, and what a reasonable next step looks like.
              </p>
              <Button asChild variant="outline" className="mt-7">
                <Link to="/dashboard/assistant">
                  Open the assistant
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="panel min-w-0 p-5">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <Logo showWordmark={false} />
                <span className="text-sm font-medium">CyberCortex Assistant</span>
                <span className="ml-auto rounded-full border border-border bg-surface-2 px-2 py-0.5 text-[0.68rem] text-muted-foreground">
                  Preview
                </span>
              </div>
              <div className="mt-4 grid gap-4">
                <div className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                    Why is this website risky?
                  </p>
                </div>
                <div className="flex gap-3">
                  <Logo showWordmark={false} className="mt-0.5 shrink-0" />
                  <p className="max-w-[88%] text-sm leading-relaxed text-foreground/90">
                    This website is missing several browser security protections. That
                    doesn't automatically mean the website is malicious, but these settings
                    are worth reviewing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Website security */}
        <section id="security" className="scroll-mt-20 border-t border-border/70 bg-surface/40">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center">
            <div className="justify-self-center">
              <ScoreRing score={82} size={200} caption="Example security score" />
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Example score — not a real result
              </p>
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Website security, in review-ready language.
              </h2>
              <p className="mt-3 max-w-lg text-sm text-muted-foreground">
                Each check explains what the protection does and what to do about it.
              </p>
              <ul className="mt-7 grid gap-2.5">
                {[
                  { ok: true, text: "HTTPS enabled" },
                  { ok: true, text: "HSTS detected" },
                  { ok: false, text: "Content Security Policy needs review" },
                  { ok: true, text: "Cookie protection detected" },
                ].map((i) => (
                  <li
                    key={i.text}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm"
                  >
                    {i.ok ? (
                      <Check className="size-4 shrink-0 text-success" aria-hidden="true" />
                    ) : (
                      <AlertTriangle
                        className="size-4 shrink-0 text-warning"
                        aria-hidden="true"
                      />
                    )}
                    <span className="min-w-0">{i.text}</span>
                    <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                      {i.ok ? "Passed" : "Review"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="panel flex flex-col items-start gap-6 p-8 sm:p-10 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Start with one check.
              </h2>
              <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                Paste a link, a message, or a website address and see what CyberCortex can
                explain.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/dashboard">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/sign-in">
                  <Lock className="size-4" />
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
