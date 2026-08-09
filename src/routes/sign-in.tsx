import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign in — CyberCortex Lite" },
      {
        name: "description",
        content: "Sign in to your CyberCortex Lite workspace to review your security checks.",
      },
      { property: "og:title", content: "Sign in — CyberCortex Lite" },
      {
        property: "og:description",
        content: "Access your CyberCortex Lite security workspace.",
      },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  return (
    <div className="grid min-h-dvh place-items-center px-4 py-12">
      <div className="w-full max-w-sm">
        <Link to="/" className="mx-auto flex w-fit" aria-label="CyberCortex Lite home">
          <Logo />
        </Link>
        <div className="panel mt-8 p-6">
          <h1 className="font-display text-xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Authentication is not connected yet — this screen is the interface only.
          </p>
          <form
            className="mt-6 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input id="signin-email" type="email" placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signin-password">Password</Label>
              <Input id="signin-password" type="password" placeholder="••••••••" />
            </div>
            <Button type="submit" className="mt-2 w-full" disabled>
              Sign in
            </Button>
          </form>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Just exploring?{" "}
            <Link to="/dashboard" className="text-primary hover:underline">
              Open the dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
