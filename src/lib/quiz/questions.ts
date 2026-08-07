/**
 * The ten core questions.
 *
 * Ordering is deliberate. Q1 establishes urgency before anything else, because
 * it is the one answer that changes the shape of the rest of the quiz: a
 * homeowner standing over a leaking tank gets a short path, and asking them
 * about long-term energy priorities first would be tone deaf and would lose
 * them.
 *
 * Every question earns its place by changing a recommendation. "How many
 * bathrooms" survives because it drives simultaneous demand; a question like
 * "what is your budget" does not appear because it invites an answer the
 * homeowner cannot give accurately before seeing any prices.
 */

export type QuestionId =
  | "status"
  | "current"
  | "fuel"
  | "household"
  | "bathrooms"
  | "simultaneous"
  | "location"
  | "priority"
  | "electrical"
  | "timeline";

export interface Option {
  value: string;
  label: string;
  hint?: string;
}

export interface Question {
  id: QuestionId;
  /** Shown as the step heading. Phrased as a person would ask it out loud. */
  prompt: string;
  /** Why we are asking. Shown inline — a homeowner who understands why a
   *  question matters answers it more accurately and trusts the output more. */
  why: string;
  options: Option[];
  /** Skipped on the emergency path, where speed beats completeness. */
  skipWhenUrgent?: boolean;
}

export const QUESTIONS: Question[] = [
  {
    id: "status",
    prompt: "What is happening with your water heater right now?",
    why: "This decides whether you have time to weigh options or need hot water back today.",
    options: [
      { value: "failed", label: "No hot water at all", hint: "It has already failed" },
      { value: "leaking", label: "It is leaking", hint: "Water around the base or tank" },
      { value: "aging", label: "Still working, but it is old", hint: "Roughly 8 years or more" },
      { value: "planning", label: "Working fine, I am planning ahead" },
      { value: "new", label: "New build or remodel" },
    ],
  },
  {
    id: "current",
    prompt: "What do you have now?",
    why: "Replacing like for like is straightforward. Switching technology is where the real cost sits.",
    options: [
      { value: "gas-tank", label: "Gas tank" },
      { value: "electric-tank", label: "Electric tank" },
      { value: "tankless", label: "Tankless" },
      { value: "heat-pump", label: "Heat pump" },
      { value: "unsure", label: "I am not sure", hint: "That is fine, we will work around it" },
    ],
  },
  {
    id: "fuel",
    prompt: "What fuel is available at the house?",
    why: "No gas service rules out gas options entirely, whatever else is true.",
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
    prompt: "How many bathrooms?",
    why: "Together with household size this drives the size of unit you need.",
    options: [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3+", label: "3 or more" },
    ],
  },
  {
    id: "simultaneous",
    prompt: "How often do two hot water things run at once?",
    why: "This is the single most important question for tankless sizing, and most sizing guides skip it. Two showers at the same time is a very different job from one.",
    options: [
      { value: "rarely", label: "Rarely", hint: "One thing at a time, mostly" },
      { value: "sometimes", label: "Sometimes", hint: "Mornings get busy" },
      { value: "often", label: "Often", hint: "Showers, laundry and dishes overlap" },
    ],
    skipWhenUrgent: true,
  },
  {
    id: "location",
    prompt: "Where does the water heater live?",
    why: "A heat pump needs air around it. An interior closet often cannot supply that without ducting.",
    options: [
      { value: "garage", label: "Garage" },
      { value: "closet", label: "Interior closet", hint: "Tight space, inside the house" },
      { value: "utility", label: "Utility or laundry room" },
      { value: "outside", label: "Outside or in an exterior cupboard" },
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
    prompt: "Do you know anything about your electrical panel?",
    why: "Heat pump and electric tankless both depend on spare capacity. Unsure is a perfectly normal answer.",
    options: [
      { value: "space", label: "There is spare space in the panel" },
      { value: "full", label: "The panel looks full" },
      { value: "upgraded", label: "It was upgraded recently" },
      { value: "unsure", label: "I have no idea" },
    ],
    skipWhenUrgent: true,
  },
  {
    id: "timeline",
    prompt: "When does this need to happen?",
    why: "Decides whether we introduce you to someone with capacity today or someone who quotes carefully.",
    options: [
      { value: "today", label: "Today or tomorrow" },
      { value: "week", label: "Within a week" },
      { value: "month", label: "Within a month" },
      { value: "researching", label: "Just researching for now" },
    ],
  },
];

export type Answers = Partial<Record<QuestionId, string>>;

/** Emergency path: a failed or leaking heater drops the long-horizon questions. */
export function isUrgent(answers: Answers): boolean {
  return answers.status === "failed" || answers.status === "leaking";
}

export function activeQuestions(answers: Answers): Question[] {
  const urgent = isUrgent(answers);
  return QUESTIONS.filter((q) => !(urgent && q.skipWhenUrgent));
}
