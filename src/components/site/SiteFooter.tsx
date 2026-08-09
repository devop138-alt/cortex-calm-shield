import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <Logo />
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            CyberCortex Lite helps people understand security signals in plain language.
            Educational guidance only — not a guarantee of safety.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a href="/#product" className="text-muted-foreground hover:text-foreground">
            Product
          </a>
          <a href="/#security" className="text-muted-foreground hover:text-foreground">
            Security
          </a>
          <Link to="/about" className="text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
            Dashboard
          </Link>
        </nav>
      </div>
    </footer>
  );
}
