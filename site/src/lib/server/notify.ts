import "server-only";

/**
 * Lead notifications.
 *
 * The ordering rule that governs this whole file: the lead is already durably
 * in Postgres before anything here runs. Every function returns rather than
 * throws, and every failure is logged and swallowed. A Resend or Twilio outage
 * must never produce an error for the homeowner, and must never be able to
 * roll back a saved lead. Losing a lead to a third-party outage is the exact
 * failure this project exists to stop.
 *
 * Missing credentials are treated the same way as an outage: logged, skipped,
 * and the lead still saved. That is what lets the database go live before the
 * Resend and Twilio accounts exist.
 */

import type { Recommendation } from "@/lib/quiz/engine";

export interface LeadNotification {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  zip: string;
  urgent: boolean;
  leadScore: number | null;
  recommendedTech: string | null;
  recommendationSummary: string | null;
  notes: string | null;
  consentText: string | null;
  consentAt: string | null;
  /** True when they also asked to be introduced to an installer. */
  introRequested: boolean;
}

const PROJECT_REF = "lqxqmucpxcydwoyfeclj";

function rowLink(id: string): string {
  return `https://supabase.com/dashboard/project/${PROJECT_REF}/editor?schema=public&table=leads&filter=id:eq:${id}`;
}

/**
 * Subject carries the decision-relevant facts, so the inbox list alone is
 * triageable without opening anything.
 */
function subject(lead: LeadNotification): string {
  const score = lead.leadScore === null ? "?" : String(lead.leadScore);
  const tech = lead.recommendedTech ?? "unknown";
  // Two intents, two prefixes. A list signup and a homeowner asking to be
  // called today should not look the same in the inbox, or the second one gets
  // lost among the first within a month.
  const tag = lead.introRequested ? "Lead" : "List";
  return `[${tag}] ${lead.zip} — ${tech} — score ${score}${lead.urgent ? " — URGENT" : ""}`;
}

function body(lead: LeadNotification): string {
  return [
    `Name:  ${lead.fullName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone ?? "not given"}`,
    `Zip:   ${lead.zip}`,
    lead.introRequested
      ? "\nAsked to be introduced to an installer."
      : "\nDid NOT ask for an installer. Results email only - do not pass these details to a contractor.",
    lead.urgent ? "\nURGENT — no hot water or a leaking tank. Same-day response decides this job." : "",
    "\n--- Recommendation ---",
    lead.recommendationSummary ?? "none recorded",
    "\n--- The homeowner's own words ---",
    lead.notes?.trim() || "none given",
    "\n--- Consent ---",
    lead.consentAt ? `Agreed ${lead.consentAt}` : "no timestamp recorded",
    lead.consentText ?? "no wording recorded",
    `\n${rowLink(lead.id)}`,
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendEmail(lead: LeadNotification): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;

  // Name the missing variables. "Not configured" on its own sends you to the
  // dashboard to compare three values by eye, which is how a single unticked
  // environment goes unnoticed through two deploys.
  const missing = [
    !key && "RESEND_API_KEY",
    !to && "LEAD_NOTIFY_EMAIL",
    !from && "LEAD_FROM_EMAIL",
  ].filter(Boolean);

  if (missing.length) {
    console.warn(
      `lead ${lead.id} saved, email skipped. Missing: ${missing.join(", ")}`,
    );
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], subject: subject(lead), text: body(lead) }),
    });
    if (!res.ok) {
      console.error(`lead ${lead.id} email failed: ${res.status} ${await res.text()}`);
    }
  } catch (err) {
    console.error(`lead ${lead.id} email threw`, err);
  }
}

/**
 * Urgent leads only.
 *
 * An alert that fires on everything gets muted within a week, and then it is
 * not an alert. `urgent` is set by the engine for the no-hot-water and
 * leaking-tank paths — the exact cases where response time decides the job.
 */
async function sendSms(lead: LeadNotification): Promise<void> {
  if (!lead.urgent) return;

  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  const to = process.env.LEAD_NOTIFY_SMS;

  if (!sid || !token || !from || !to) {
    console.warn(`urgent lead ${lead.id} saved, SMS skipped: Twilio is not configured`);
    return;
  }

  const text = `WHA urgent lead: ${lead.fullName}, ${lead.zip}. ${
    lead.phone ?? "no phone"
  }. ${lead.recommendedTech ?? "unknown"}.`;

  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ From: from, To: to, Body: text }),
      },
    );
    if (!res.ok) {
      console.error(`lead ${lead.id} SMS failed: ${res.status} ${await res.text()}`);
    }
  } catch (err) {
    console.error(`lead ${lead.id} SMS threw`, err);
  }
}

/** Never throws. Callers do not need to await it before responding. */
export async function notifyLead(lead: LeadNotification): Promise<void> {
  await Promise.allSettled([sendEmail(lead), sendSms(lead)]);
}


/* -------------------------------------------------------------------------
   The homeowner's own copy
   ------------------------------------------------------------------------- */

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/**
 * What the homeowner actually asked for when they typed their address.
 *
 * The recommendation is already on screen by the time they reach the form -
 * that is the promise the whole site rests on - so a bare copy of it is a weak
 * reason to hand over an email. What this adds is the part they cannot keep in
 * their head: the questions to ask and the things to watch for, in their inbox,
 * at the kitchen table with a contractor standing there.
 *
 * Both lists are already computed by the engine and already rendered on the
 * results page. Nothing new is invented here.
 */
function homeownerBody(lead: LeadNotification, rec: Recommendation): string {
  const lines: string[] = [
    `${lead.fullName.split(" ")[0] || "Hello"},`,
    "",
    "Here is the recommendation from your answers, so you have it in writing.",
    "",
    "YOUR RECOMMENDATION",
    `  System        ${rec.primary.name}`,
    `  Size          ${rec.sizing}`,
    `  Expected cost ${usd(rec.costRange[0])} to ${usd(rec.costRange[1])}`,
    `  Installer     ${rec.installerType}`,
    `  Confidence    ${rec.confidence}`,
  ];

  if (rec.alternative) {
    lines.push(`  Also worth considering: ${rec.alternative.name}`);
  }

  if (rec.ruledOut.length) {
    lines.push("", "WHAT WE RULED OUT, AND WHY");
    for (const r of rec.ruledOut) lines.push(`  ${r.technology} - ${r.reason}`);
  }

  if (rec.questionsToAsk.length) {
    lines.push("", "QUESTIONS TO ASK BEFORE YOU SIGN ANYTHING");
    for (const q of rec.questionsToAsk) lines.push(`  - ${q}`);
  }

  if (rec.watchFor.length) {
    lines.push("", "WHAT TO WATCH FOR");
    for (const w of rec.watchFor) lines.push(`  - ${w}`);
  }

  if (rec.brandFits.length) {
    lines.push("", "BRANDS THAT SUIT THIS JOB");
    for (const b of rec.brandFits) {
      // Lead with the technology, not the brand name. A brand read on its own
      // gets filled in from reputation - somebody who knows Navien for tankless
      // will read "Navien" as tankless even under a heat pump recommendation.
      lines.push(`  ${b.name} (${rec.primary.name})`);
      for (const reason of b.reasons) lines.push(`      ${reason}`);
      if (b.caution) lines.push(`      Worth checking: ${b.caution}`);
    }
  }

  lines.push(
    "",
    lead.introRequested
      ? "WHAT HAPPENS NEXT\n  You asked to be introduced to a local installer. We will look at\n  your answers and put you in touch with one contractor who does this\n  specific work, within one working day."
      : "WHAT HAPPENS NEXT\n  Nothing, unless you want it to. You did not ask to be introduced to\n  an installer, so we have not passed your details to anyone. This\n  recommendation is yours to take to any contractor you like.",
    "",
    "We are not a plumbing company and we do not install anything. We are paid",
    "by the installers we introduce people to, and that never changes what we",
    "recommend.",
    "",
    "Water Heater Advisor",
    "https://waterheateradvisor.com",
  );

  return lines.join("\n");
}

/**
 * Sends the homeowner their own copy. Returns true when the provider accepted
 * it, so the caller can record `results_email_sent_at`.
 *
 * Same posture as every other send in this file: never throws, never blocks.
 * Until the sending domain is verified, Resend's shared sender can only deliver
 * to the account owner, so this will fail for real homeowners and succeed for
 * nobody else. That failure is logged and the lead is unaffected.
 */
export async function sendHomeownerResults(
  lead: LeadNotification,
  rec: Recommendation,
): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;

  if (!key || !from) {
    const missing = [!key && "RESEND_API_KEY", !from && "LEAD_FROM_EMAIL"].filter(Boolean);
    console.warn(
      `lead ${lead.id}: homeowner copy not sent. Missing: ${missing.join(", ")}`,
    );
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [lead.email],
        subject: `Your water heater recommendation: ${rec.primary.name}`,
        text: homeownerBody(lead, rec),
      }),
    });
    if (!res.ok) {
      console.error(
        `lead ${lead.id}: homeowner copy failed ${res.status} ${await res.text()}`,
      );
      return false;
    }
    return true;
  } catch (err) {
    console.error(`lead ${lead.id}: homeowner copy threw`, err);
    return false;
  }
}
