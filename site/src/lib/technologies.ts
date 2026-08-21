import type { TechId } from "@/lib/quiz/engine";

/**
 * Editorial content for the four technology pages.
 *
 * Kept as data rather than four hand-written page files because the *structure*
 * of the argument is identical in each case and only the content differs. The
 * copy itself is written per technology and is not generated from a template,
 * which is the distinction between a system and a page mill.
 *
 * `theCatch` is the load-bearing field. Every one of these technologies is sold
 * hard by somebody, so each page owes the reader the thing the sales pitch
 * leaves out. If a new technology is added here without a real answer in that
 * field, the page is not ready to publish.
 */
export interface TechContent {
  /** URL segment. Deliberately the homeowner's word, not the engine's id. */
  slug: string;
  id: TechId;
  name: string;
  title: string;
  metaDescription: string;
  h1: string;
  lead: string;
  howItWorks: string[];
  fits: string[];
  cautions: string[];
  catchTitle: string;
  theCatch: string[];
  /** Plain-language note on the yearly fuel cost figure from lib/energy.ts. */
  runningCost: string;
  askInstaller: string[];
}

export const TECH_SLUGS = [
  "gas-storage",
  "tankless",
  "heat-pump",
  "electric-storage",
] as const;

export const TECHNOLOGY_CONTENT: Record<string, TechContent> = {
  "gas-storage": {
    slug: "gas-storage",
    id: "gas-tank",
    name: "Gas storage tank",
    title: "Gas storage water heaters",
    metaDescription:
      "The default replacement, what it costs installed, what it costs to run, and the " +
      "cases where spending more upfront is the better decision.",
    h1: "The gas storage tank, and why it is still usually the answer",
    lead:
      "The unglamorous option that most homes should probably still buy. It has the lowest upfront cost, the shortest install, and the largest pool of people who can fix it at short notice. Almost every article you will read is trying to talk you out of it, which is worth noticing.",
    howItWorks: [
      "A burner under an insulated tank heats forty to seventy-five gallons of water and keeps it hot around the clock. When you open a tap, hot water leaves the top and cold water enters the bottom, and the burner fires to catch up.",
      "That standing reserve is the whole design. It is why a tank can serve three fixtures at once without any sizing calculation, and it is also why the burner runs when nobody is using hot water at all. Everything good and bad about this technology follows from those two facts.",
    ],
    fits: [
      "Your gas tank has already failed and you need hot water today",
      "You want the smallest possible upfront bill",
      "A like for like swap with no gas, venting or electrical changes",
      "You are renting the property out, or selling within a few years",
      "The existing space is a closet with no airflow",
    ],
    cautions: [
      "Running cost is the highest of the gas options",
      "You are planning to electrify the house later anyway",
      "You genuinely run out of hot water most weeks",
      "The tank sits somewhere a leak would do real damage",
    ],
    catchTitle: "What the upgrade pitch gets right",
    theCatch: [
      "The honest case against a gas tank is that it is the most expensive of the gas options to run, and that a tank has a worse failure mode than anything else on this page. When a tankless unit fails you lose hot water. When a tank fails you can lose hot water and forty gallons onto the floor.",
      "If your unit sits in a garage with a drain nearby, that risk is an inconvenience. If it sits above a finished room or against drywall you care about, it is worth pricing a pan, an alarm and a shutoff at the same time as the unit.",
    ],
    runningCost:
      "The most expensive of the four to run in Turlock, at roughly $439 a year in fuel on our model. That is the number every other technology on this page is trying to beat, and it is worth holding in your head as you read them.",
    askInstaller: [
      "Is this a straight swap, or does anything have to move?",
      "Does the existing flue meet current code?",
      "What is included beyond the unit itself?",
      "Is the permit in this price?",
      "What size do you recommend, and why that one?",
    ],
  },

  tankless: {
    slug: "tankless",
    id: "gas-tankless",
    name: "Gas tankless",
    title: "Gas tankless water heaters",
    metaDescription:
      "Endless hot water and a smaller footprint, with the conversion costs most articles " +
      "leave out and the flow figure the marketing does not show you.",
    h1: "Gas tankless, and the number the marketing leaves out",
    lead:
      "Endless hot water, a much smaller footprint, and the lowest running cost of the gas options. It is also the technology most often sold to people it does not suit, because the install is where the money goes and the headline flow figure describes a condition your house never sees.",
    howItWorks: [
      "There is no stored water. A burner fires only when a tap opens, heating water as it passes through a heat exchanger, which is why the hot water never runs out and why the unit costs nothing to run when nobody is home.",
      "The limit is not volume, it is flow. A tankless unit can raise water by a certain number of degrees at a certain number of gallons per minute, and those two figures trade against each other. Ask for more flow and you get less temperature rise.",
    ],
    fits: [
      "Several showers or fixtures genuinely run at once",
      "You want the floor space back",
      "Your gas service is already adequate for the load",
      "You are replacing an existing tankless unit",
      "You expect to stay in the house long enough to see the payback",
    ],
    cautions: [
      "Gas line, venting or electrical work can double the job",
      "It needs annual descaling, and hard water makes that non negotiable",
      "You are buying it mainly to lower the bill",
      "Nobody local services the brand you are being quoted",
    ],
    catchTitle: "The headline flow figure is not what you will get",
    theCatch: [
      "Tankless units are advertised at the flow they achieve across a small temperature rise, and a Central Valley winter asks for a large one. Water arrives around 55°F and you want it at 120°F, which is a 65°F rise. Both of the flagship units we hold data for advertise near 11 gallons a minute and deliver close to 6 at that condition.",
      "Six gallons a minute is a real amount of hot water, roughly two showers at once with a little to spare. It is simply not eleven, and a unit sized on eleven runs cold the first cold morning two taps open together. Ask for the flow at your design rise in writing before you sign anything.",
      "The second thing the pitch tends to skip is the fuel saving. In Turlock a condensing tankless unit saves around $156 a year against a gas tank, and a conversion costs a few thousand more than a straight tank swap. Tankless earns its price on endless hot water and floor space. It does not earn it on the gas bill.",
    ],
    runningCost:
      "About $283 a year in fuel on our Turlock model, the cheapest of the two gas options and roughly $156 a year better than a gas tank. Divide that into the conversion premium before you treat it as a saving.",
    askInstaller: [
      "What flow does this model give at my winter design rise?",
      "Will this run on my existing gas line, or does it need upsizing?",
      "What venting does it need, and does my run allow it?",
      "Does a recirculation loop change my warranty?",
      "Who descales it, how often, and what does that cost?",
    ],
  },

  "heat-pump": {
    slug: "heat-pump",
    id: "heat-pump",
    name: "Heat pump",
    title: "Heat pump water heaters",
    metaDescription:
      "By far the cheapest to run in the Central Valley, and the fussiest to install. " +
      "Space, air, electrical capacity and condensate all have to work.",
    h1: "The heat pump, and the one thing that decides it",
    lead:
      "By a wide margin the cheapest of the four to run, and the only one where a utility will currently pay you a meaningful amount to install it. It is also the fussiest. It needs space, air, electrical capacity and somewhere for condensate to go, and the electrical panel is usually what decides whether it is a good idea or a long payback.",
    howItWorks: [
      "It works like a refrigerator running backwards. Instead of making heat, it moves heat out of the surrounding air and into the tank, which is why it can deliver three or four units of heat for every unit of electricity it consumes. No combustion, no flue.",
      "Because it takes its heat from the air around it, the air matters. Warmer surrounding air means better efficiency, and a Central Valley garage in summer is close to ideal. A sealed interior closet is close to the opposite, because the unit rapidly chills the small volume of air it has to work with.",
    ],
    fits: [
      "A garage or utility room with room to breathe",
      "Lower energy bills matter more than upfront cost",
      "You already have solar, or you are heading that way",
      "Your panel has capacity and sits near the install location",
      "You are on a utility that pays a heat pump rebate",
    ],
    cautions: [
      "A tight interior closet will not work without ducting",
      "Panel capacity and a condensate route both have to check out",
      "Your gas tank has already failed and you need hot water today",
      "The unit would sit next to a bedroom wall, because it makes noise",
    ],
    catchTitle: "The panel decides this, not the technology",
    theCatch: [
      "On our Turlock numbers a heat pump saves roughly $290 to $330 a year against a gas tank. Real money, and not the fortune the category advertises. On fuel alone that does not pay back a four thousand dollar job quickly.",
      "What changes the arithmetic is the rebate and the electrical. After the TID $1,000 conversion rebate, a straightforward heat pump conversion lands within a few hundred dollars of simply replacing the gas tank, which makes the running saving close to free. Add a dedicated circuit and the payback stretches to three to seven years. Add a panel upgrade and it runs from about six years out to twenty.",
      "So what settles this is your electrical panel rather than any abstract comparison of the technologies. Find out what capacity it has left and how far it sits from the garage, and get that checked before you get attached to either option.",
    ],
    runningCost:
      "Between about $108 and $152 a year in Turlock, depending which TID tier your household lands in. That is roughly a third of what a gas tank costs to run and a quarter of an electric resistance tank.",
    askInstaller: [
      "What capacity does my panel have left, and what does a circuit cost from there?",
      "Will this space give it enough air, or does it need ducting?",
      "Where does the condensate go?",
      "How loud is it, and what is on the other side of that wall?",
      "Which rebates are you filing, and which do I file myself?",
    ],
  },

  "electric-storage": {
    slug: "electric-storage",
    id: "electric-tank",
    name: "Electric storage tank",
    title: "Electric storage water heaters",
    metaDescription:
      "Cheap to install and expensive to run. Usually the right answer only when a heat " +
      "pump genuinely will not fit the space.",
    h1: "The electric tank, and when it is genuinely the right call",
    lead:
      "Simple, cheap to install, and the most expensive thing on this page to run. In most Central Valley homes it is the right answer only when a heat pump will not physically fit, and being honest about that is more useful than pretending the choice is close.",
    howItWorks: [
      "One or two electric elements sit inside an insulated tank and heat the water directly, the same way a kettle does. There is no combustion, no flue and no gas connection, which makes it the simplest installation of the four and the easiest to put almost anywhere.",
      "It is also close to one hundred percent efficient at converting electricity into heat, which sounds excellent until you compare it with a heat pump that moves three or four times as much heat for the same electricity.",
    ],
    fits: [
      "You are replacing an existing electric tank and the budget is tight",
      "There is no room or airflow for a heat pump",
      "The space is an interior closet with no condensate route",
      "Upfront budget is the binding constraint",
      "It is a rental, an accessory unit or a low-use property",
    ],
    cautions: [
      "You have a garage or utility space that would take a heat pump",
      "You are switching from gas expecting to save money",
      "The household uses a lot of hot water",
      "You are eligible for a heat pump rebate",
    ],
    catchTitle: "Switching from gas to this will cost you money",
    theCatch: [
      "This is the case worth being blunt about. On our Turlock model an electric resistance tank costs between about $403 and $570 a year to run, against roughly $439 for the gas tank it would replace. At the bottom TID tier you break about even, and at the top tier you are around $130 a year worse off.",
      "When people say electrification saves money, the saving is coming from the efficiency of the heat pump rather than from the price of electricity. Swapping a gas tank for a resistance tank captures none of that and gives up the cheaper fuel.",
      "Where it does make sense: replacing an existing electric tank, or any space that physically cannot host a heat pump. Those are real situations and this is a perfectly good product for them. It is simply not an upgrade from gas.",
    ],
    runningCost:
      "Between about $403 and $570 a year in Turlock depending on your TID tier, which makes it the most expensive of the four to run and the only one that can cost more than the gas tank it replaced.",
    askInstaller: [
      "Would a heat pump fit this space, and what would it cost here?",
      "Is the existing circuit adequate for this unit?",
      "Is this a straight swap, or does anything have to move?",
      "Is the permit in this price?",
      "What size do you recommend, and why that one?",
    ],
  },
};
