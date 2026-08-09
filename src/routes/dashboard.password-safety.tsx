import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, EyeOff, Check, X, ShieldCheck } from "lucide-react";
import { PageHeading } from "@/components/dashboard/DashboardShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/password-safety")({
  head: () => ({
    meta: [
      { title: "Password Safety — CyberCortex Lite" },
      {
        name: "description",
        content: "Check password strength locally in your browser — nothing is sent anywhere.",
      },
      { property: "og:title", content: "Password Safety — CyberCortex Lite" },
      {
        property: "og:description",
        content: "A privacy-first password strength check that runs in your browser.",
      },
    ],
  }),
  component: PasswordSafety,
});

const rules = [
  { id: "len", label: "At least 12 characters", test: (v: string) => v.length >= 12 },
  { id: "case", label: "Upper and lowercase letters", test: (v: string) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { id: "num", label: "Contains a number", test: (v: string) => /\d/.test(v) },
  { id: "sym", label: "Contains a symbol", test: (v: string) => /[^\w\s]/.test(v) },
  { id: "rep", label: "No obvious repetition", test: (v: string) => v.length > 0 && !/(.)\1{2,}/.test(v) },
];

const levels = [
  { label: "Very weak", bar: "bg-danger", text: "text-danger" },
  { label: "Weak", bar: "bg-danger", text: "text-danger" },
  { label: "Fair", bar: "bg-warning", text: "text-warning" },
  { label: "Good", bar: "bg-primary", text: "text-primary" },
  { label: "Strong", bar: "bg-success", text: "text-success" },
  { label: "Very strong", bar: "bg-success", text: "text-success" },
];

function PasswordSafety() {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);

  const passed = useMemo(() => rules.filter((r) => r.test(value)).length, [value]);
  const level = levels[value ? passed : 0] ?? levels[0]!;
  const percent = value ? (passed / rules.length) * 100 : 0;

  return (
    <div>
      <PageHeading
        title="Password Safety"
        description="Check password strength without sending your password to the server."
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="panel p-6">
          <div className="grid gap-2">
            <Label htmlFor="pw">Password</Label>
            <div className="relative">
              <Input
                id="pw"
                type={visible ? "text" : "password"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type a password to evaluate"
                autoComplete="new-password"
                className="h-12 pr-12 text-base"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setVisible((v) => !v)}
                aria-label={visible ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-1 min-h-10 min-w-10 -translate-y-1/2"
              >
                {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Strength</span>
              <span className={`font-medium ${value ? level.text : "text-muted-foreground"}`}>
                {value ? level.label : "Not evaluated"}
              </span>
            </div>
            <div
              className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2"
              role="progressbar"
              aria-valuenow={Math.round(percent)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Password strength"
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ${level.bar}`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <ul className="mt-6 grid gap-2">
            {rules.map((r) => {
              const ok = r.test(value);
              return (
                <li key={r.id} className="flex items-center gap-3 text-sm">
                  <span
                    className={`grid size-5 shrink-0 place-items-center rounded-full border ${
                      ok
                        ? "border-success/40 bg-success/10 text-success"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {ok ? <Check className="size-3" /> : <X className="size-3" />}
                  </span>
                  <span className={ok ? "text-foreground" : "text-muted-foreground"}>
                    {r.label}
                  </span>
                </li>
              );
            })}
          </ul>

          {value && (
            <Button variant="ghost" className="mt-6" onClick={() => setValue("")}>
              Clear
            </Button>
          )}
        </div>

        <aside className="panel h-fit p-6">
          <span className="grid size-10 place-items-center rounded-xl border border-border bg-surface-2 text-primary">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-base font-semibold">Handled locally</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            This check runs entirely in your browser. The password is never transmitted,
            stored, or logged. Length matters more than complexity — a long passphrase is
            usually stronger than a short scrambled word.
          </p>
        </aside>
      </div>
    </div>
  );
}
