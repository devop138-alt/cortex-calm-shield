import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutGrid,
  Link2,
  MessageSquareWarning,
  Globe,
  KeyRound,
  Bot,
  FileText,
  History,
  Settings,
  Menu,
  Bell,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Overview", to: "/dashboard", icon: LayoutGrid },
  { label: "Link Checker", to: "/dashboard/link-checker", icon: Link2 },
  { label: "Message Checker", to: "/dashboard/message-checker", icon: MessageSquareWarning },
  { label: "Website Scanner", to: "/dashboard/website-scanner", icon: Globe },
  { label: "Password Safety", to: "/dashboard/password-safety", icon: KeyRound },
  { label: "AI Assistant", to: "/dashboard/assistant", icon: Bot },
  { label: "Reports", to: "/dashboard/reports", icon: FileText },
  { label: "History", to: "/dashboard/history", icon: History },
  { label: "Settings", to: "/dashboard/settings", icon: Settings },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <ul className="grid gap-1">
      {nav.map((item) => {
        const active =
          item.to === "/dashboard" ? pathname === item.to : pathname.startsWith(item.to);
        return (
          <li key={item.to}>
            <Link
              to={item.to}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-surface-2 text-foreground"
                  : "text-muted-foreground hover:bg-surface-2/60 hover:text-foreground",
              )}
            >
              <item.icon className="size-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-dvh w-full bg-background">
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-border bg-sidebar px-3 py-5 lg:flex">
        <Link to="/" className="px-2" aria-label="CyberCortex Lite home">
          <Logo />
        </Link>
        <nav aria-label="Dashboard" className="mt-8 min-h-0 flex-1 overflow-y-auto">
          <NavList />
        </nav>
        <div className="rounded-xl border border-border bg-surface-2 p-3 text-xs text-muted-foreground">
          Values shown in this interface are sample content for design purposes.
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="min-h-11 min-w-11 lg:hidden"
                    aria-label="Open dashboard menu"
                  >
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[82vw] max-w-xs p-5">
                  <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>
                  <Logo />
                  <nav aria-label="Dashboard" className="mt-8">
                    <NavList onNavigate={() => setOpen(false)} />
                  </nav>
                </SheetContent>
              </Sheet>
              <span className="truncate text-sm text-muted-foreground">
                Workspace · Personal
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="min-h-11 min-w-11"
                aria-label="Notifications"
              >
                <Bell className="size-4.5" />
              </Button>
              <span
                className="grid size-9 place-items-center rounded-full border border-border bg-surface-2 text-xs font-medium"
                aria-hidden="true"
              >
                AK
              </span>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">{children}</main>
      </div>
    </div>
  );
}

export function PageHeading({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 grid gap-4 sm:flex sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="font-display text-2xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
