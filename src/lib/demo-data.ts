/**
 * Sample presentation content used to demonstrate the interface.
 * These values are static UI examples — they are NOT results of any scan.
 * Real values will come from the backend once it is connected.
 */

import type { RiskLevel } from "@/components/common/StatusBadge";

export type SampleFinding = {
  id: string;
  status: "pass" | "review" | "fail";
  title: string;
  summary: string;
  severity: RiskLevel;
  detail: string;
  recommendation: string;
};

export const sampleFindings: SampleFinding[] = [
  {
    id: "https",
    status: "pass",
    title: "HTTPS",
    summary: "Encrypted connection detected.",
    severity: "low",
    detail:
      "Traffic between the browser and the site is encrypted, which prevents casual interception of page content and form data.",
    recommendation: "Keep certificates renewed and redirect all HTTP traffic to HTTPS.",
  },
  {
    id: "hsts",
    status: "pass",
    title: "HSTS",
    summary: "Strict transport security header present.",
    severity: "low",
    detail:
      "HSTS tells browsers to only connect over HTTPS, reducing the chance of a downgrade to an unencrypted connection.",
    recommendation: "Consider a longer max-age once you are confident in HTTPS coverage.",
  },
  {
    id: "csp",
    status: "review",
    title: "Content Security Policy",
    summary: "Review whether the website should publish a Content Security Policy.",
    severity: "medium",
    detail:
      "A Content Security Policy limits which scripts and resources a page may load, which reduces the impact of injected content.",
    recommendation:
      "Start with a report-only policy, review the reports, then enforce once it is stable.",
  },
  {
    id: "cookies",
    status: "pass",
    title: "Cookie protection",
    summary: "Secure and HttpOnly attributes detected.",
    severity: "low",
    detail:
      "Cookie flags restrict access from scripts and require an encrypted connection when cookies are sent.",
    recommendation: "Add SameSite where session cookies are used for authenticated areas.",
  },
];

export const sampleActivity = [
  {
    id: "a1",
    type: "Website security scan",
    target: "example.com",
    level: "low" as RiskLevel,
    time: "12 minutes ago",
  },
  {
    id: "a2",
    type: "Message analysis",
    target: "Suspicious prize message",
    level: "high" as RiskLevel,
    time: "1 hour ago",
  },
  {
    id: "a3",
    type: "Link analysis",
    target: "example.com/login",
    level: "medium" as RiskLevel,
    time: "Yesterday",
  },
  {
    id: "a4",
    type: "Password safety check",
    target: "Local check",
    level: "low" as RiskLevel,
    time: "2 days ago",
  },
];
