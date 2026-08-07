/**
 * Fifteen questions. Every one is atomic — one thing asked, one thing answered.
 *
 * Compound questions ("how many people and bathrooms?", "postcode and timing?")
 * are the most common way a quiz corrupts its own data: the respondent answers
 * whichever half they read first and the other half is silently lost. Every
 * question below asks exactly one thing.
 *
 * Ordering carries the BANT frame without ever feeling like a sales
 * qualification:
 *
 *   Need      Q1 status, Q2 age            — first, because it is what they came for
 *   Authority Q3 ownership                 — early and cheap, and it gates everything
 *   Fit       Q4-Q12                       — the technical middle
 *   Timing    Q14                          — after they have seen the questions get useful
 *   Budget    Q15                          — last, and never before a recommendation
 *
 * Budget goes last deliberately. Asked early it reads as a salesman sizing up
 * the customer, and it is also the question a homeowner is least equipped to
 * answer before they have any idea what the work involves. Asked at the end,
 * after fourteen questions that visibly tried to help, it reads as reasonable.
 */

export type QuestionId =
  | "status"
  | "age"
  | "owner"
  | "current"
  | "fuel"
  | "household"
  | "bathrooms"
  | "simultaneous"
  | "location"
  | "priority"
  | "electrical"
  | "brand"
  | "zip"
  | "timeline"
  | "budget";

export interface Option {
  value: string;
  label: string;
  hint?: string;
}

export interface Question {
  id: QuestionId;
  kind?: "choice" | "zip";
  prompt: string;
  /** Why we are asking. A homeowner who can see the purpose answers more
   *  accurately, and it previews the reasoning behind the result. */
  why: string;
  options?: Option[];
  /** Dropped on the emergency path, where speed beats completeness. */
  skipWhenUrgent?: boolean;
}

export const QUESTIONS: Question[] = [
  // ---- Need -------------------------------------------------------------
  {
    id: "status",
    prompt: "What is happening with your water heater right now?",
    why: "This decides whether you have time to weigh options or need hot water back today.",
    options: [
      { value: "failed", label: "No hot water at all" },
      { value: "leaking", label: "It is leaking" },
      { value: "unreliable", label: "It works, but not reliably" },
      { value: "aging", label: "It works fine, but it is getting old" },
      { value: "planning", label: "Nothing is wrong, I am planning ahead" },
      { value: "new", label: "This is for a new build or a remodel" },
    ],
  },
  {
    id: "age",
    prompt: "How old is your current water heater?",
    why: "Past about twelve years, repairing a failed unit is usually money spent twice.",
    options: [
      { value: "under-5", label: "Less than 5 years" },
      { value: "5-8", label: "5 to 8 years" },
      { value: "9-12", label: "9 to 12 years" },
      { value: "over-12", label: "More than 12 years" },
      { value: "unknown", label: "I do not know" },
    ],
  },

  // ---- Authority --------------------------------------------------------
  {
    id: "owner",
    prompt: "Do you own the home?",
    why: "A water heater replacement needs a permit pulled by the owner, so this changes who has to be involved.",
    options: [
      { value: "own", label: "Yes, I own it" },
      { value: "own-with", label: "Yes, jointly with someone else" },
      { value: "rent", label: "No, I rent" },
      { value: "landlord", label: "I own it and rent it out" },
    ],
  },

  // ---- Technical fit ----------------------------------------------------
  {
    id: "current",
    prompt: "What type of water heater do you have now?",
    why: "Replacing like for like is straightforward. Switching type is where the real cost sits.",
    options: [
      { value: "gas-tank", label: "Gas tank" },
      { value: "electric-tank", label: "Electric tank" },
      { value: "tankless", label: "Tankless" },
      { value: "heat-pump", label: "Heat pump" },
      { value: "unsure", label: "I am not sure" },
    ],
  },
  {
    id: "fuel",
    prompt: "What fuel is available at the property?",
    why: "No gas service rules out every gas option, whatever else is true.",
    options: [
      { value: "natural-gas", label: "Natural gas" },
      { value: "propane", label: "Propane" },
      { value: "electric-only", label: "Electric only" },
      { value: "unsure", label: "I am not sure" },
    ],
  },
  {
    id: "household",
    prompt: "How many people live in the home?",
    why: "Sets the baseline for how much hot water the system has to deliver in a day.",
    options: [
      { value: "1-2", label: "1 or 2" },
      { value: "3-4", label: "3 or 4" },
      { value: "5+", label: "5 or more" },
    ],
  },
  {
    id: "bathrooms",
    prompt: "How many bathrooms does the home have?",
    why: "Bathroom count drives peak demand more than square footage does.",
    options: [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3+", label: "3 or more" },
    ],
  },
  {
    id: "simultaneous",
    prompt: "How often does more than one hot tap run at the same time?",
    why: "This is the single most important question for tankless sizing, and most guides skip it.",
    options: [
      { value: "rarely", label: "Rarely" },
      { value: "sometimes", label: "Some mornings" },
      { value: "often", label: "Most days" },
    ],
    skipWhenUrgent: true,
  },
  {
    id: "location",
    prompt: "Where is the water heater installed?",
    why: "A heat pump needs air around it, and an interior closet often cannot supply that.",
    options: [
      { value: "garage", label: "Garage" },
      { value: "closet", label: "Interior closet" },
      { value: "utility", label: "Utility or laundry room" },
      { value: "outside", label: "Outside the house" },
      { value: "unsure", label: "I am not sure" },
    ],
  },
  {
    id: "priority",
    prompt: "What matters most to you?",
    why: "Two technically valid options often split on this one answer.",
    options: [
      { value: "upfront", label: "Lowest upfront cost" },
      { value: "running", label: "Lowest running cost" },
      { value: "endless", label: "Never running out of hot water" },
      { value: "space", label: "Getting the floor space back" },
      { value: "electrify", label: "Moving the house off gas" },
    ],
    skipWhenUrgent: true,
  },
  {
    id: "electrical",
    prompt: "What do you know about your electrical panel?",
    why: "Heat pump and electric tankless both depend on spare capacity. Not knowing is a normal answer.",
    options: [
      { value: "space", label: "There is spare space in it" },
      { value: "full", label: "It looks full" },
      { value: "upgraded", label: "It was upgraded recently" },
      { value: "unsure", label: "Nothing at all" },
    ],
    skipWhenUrgent: true,
  },
  {
    id: "brand",
    prompt: "Do you already have a brand in mind?",
    why: "If you do, we will point you at an installer who works with that brand rather than talk you out of it.",
    // Noritz added on the brand research recommendation: its 2026 EZ Pro line
    // is built for retrofit and gives it a real claim on some tank-to-tankless
    // conversions, and it has installer and service presence around Modesto.
    //
    // State, American and Ruud are deliberately not separate buttons. They sit
    // under "another brand" and get mapped internally to their sibling
    // platforms, which keeps the homeowner's choice short without losing the
    // routing signal.
    options: [
      { value: "navien", label: "Navien" },
      { value: "rinnai", label: "Rinnai" },
      { value: "rheem", label: "Rheem" },
      { value: "ao-smith", label: "A. O. Smith" },
      { value: "noritz", label: "Noritz" },
      { value: "bradford-white", label: "Bradford White" },
      { value: "none", label: "No preference" },
      { value: "other", label: "Another brand, or whatever I have now" },
    ],
    skipWhenUrgent: true,
  },
  {
    id: "zip",
    kind: "zip",
    prompt: "What is your ZIP code?",
    why: "Rebates and permit rules follow utility territory, not city limits. Two homes fifteen miles apart can get different answers.",
  },

  // ---- Timing -----------------------------------------------------------
  {
    id: "timeline",
    prompt: "When are you looking to get started?",
    why: "Decides whether we introduce you to someone with capacity today or someone who quotes carefully.",
    options: [
      { value: "asap", label: "As soon as possible" },
      { value: "2-weeks", label: "Within 2 weeks" },
      { value: "month", label: "Within a month" },
      { value: "1-3-months", label: "1 to 3 months" },
      { value: "researching", label: "Just researching for now" },
    ],
  },

  // ---- Budget, last -----------------------------------------------------
  {
    id: "budget",
    prompt: "How much are you able to invest in this?",
    why: "Last question, and an honest one. It changes what we recommend, because pointing you at something out of reach helps nobody.",
    options: [
      { value: "under-2000", label: "Under $2,000" },
      { value: "2000-3500", label: "$2,000 to $3,500" },
      { value: "3500-5000", label: "$3,500 to $5,000" },
      { value: "5000-8000", label: "$5,000 to $8,000" },
      { value: "over-8000", label: "More than $8,000" },
      { value: "unsure", label: "I would rather see the options first" },
    ],
  },
];

export type Answers = Partial<Record<QuestionId, string>>;

/** Emergency path: a failed or leaking heater drops the long-horizon questions. */
export function isUrgent(answers: Answers): boolean {
  return answers.status === "failed" || answers.status === "leaking";
}

/**
 * A renter cannot authorise the work. They still get the full recommendation —
 * they are often the person who tells the owner what to buy — but they are not
 * treated as a ready opportunity, and the result page says so rather than
 * quietly dropping them.
 */
export function hasAuthority(answers: Answers): boolean {
  return answers.owner !== "rent";
}

export function activeQuestions(answers: Answers): Question[] {
  const urgent = isUrgent(answers);
  return QUESTIONS.filter((q) => !(urgent && q.skipWhenUrgent));
}
