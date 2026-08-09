import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CyberCortex Lite — Security made understandable" },
      {
        name: "description",
        content:
          "Why CyberCortex Lite exists: plain-language cybersecurity guidance for students, freelancers, startups and small teams.",
      },
      { property: "og:title", content: "About CyberCortex Lite" },
      {
        property: "og:description",
        content:
          "Plain-language cybersecurity guidance for students, freelancers, startups and small teams.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-dvh">
      <SiteNav />
      <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <h1 className="font-display text-4xl font-semibold tracking-tight">
          Cybersecurity is complicated. CyberCortex makes it simple.
        </h1>
        <div className="mt-8 grid gap-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            Most security tooling is written for security teams. CyberCortex Lite is written
            for everyone else — students, freelancers, small businesses, and developers who
            need a clear answer to a simple question: is this safe, and what should I do
            next?
          </p>
          <p>
            We focus on explanation over alarm. A missing protection is not automatically an
            attack, and a passing check is not a guarantee. Every result is presented with
            context, severity, and a recommended next step written in plain language.
          </p>
          <p>
            Privacy shapes the product. Password strength is evaluated in your browser, and
            we avoid collecting more than a check requires.
          </p>
          <p className="rounded-xl border border-border bg-surface-2 p-4 text-foreground/90">
            CyberCortex Lite provides educational guidance. It is not a substitute for a
            professional security assessment, and it does not guarantee that a link, message,
            or website is safe.
          </p>
        </div>
        <Button asChild className="mt-10">
          <Link to="/dashboard">Explore the dashboard</Link>
        </Button>
      </main>
      <SiteFooter />
    </div>
  );
}
