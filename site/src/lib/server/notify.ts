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
  return `[Lead] ${lead.zip} — ${tech} — score ${score}${lead.urgent ? " — URGENT" : ""}`;
}

function body(lead: LeadNotification): string {
  return [
    `Name:  ${lead.fullName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone ?? "not given"}`,
    `Zip:   ${lead.zip}`,
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

  if (!key || !to || !from) {
    console.warn(`lead ${lead.id} saved, email skipped: Resend is not configured`);
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
