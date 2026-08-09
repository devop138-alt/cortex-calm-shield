import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { label: "Product", href: "/#product" },
  { label: "Security", href: "/#security" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link to="/" aria-label="CyberCortex Lite home" className="min-w-0">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm">
            <Link to="/sign-in">Sign In</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/dashboard">Get Started</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="min-h-11 min-w-11 md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] max-w-sm p-6">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <Logo />
            <ul className="mt-8 grid gap-1">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base text-foreground/90 transition-colors hover:bg-surface-2"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-2">
              <Button asChild variant="outline" onClick={() => setOpen(false)}>
                <Link to="/sign-in">Sign In</Link>
              </Button>
              <Button asChild onClick={() => setOpen(false)}>
                <Link to="/dashboard">Get Started</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
