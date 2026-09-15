import { generateWithAI } from "../services/aiMessages.js";

// One fallback pool per selectable style. Used only if the AI call
// fails — see generateMessage() below. Each pool is a function of
// (name, year) so both get woven naturally into the sentence.

const FORMAL_MESSAGES = (name, year) => [
  `Congratulations, ${name}, on your graduation with the Class of ${year}. This achievement reflects sustained discipline and intellectual growth — a milestone well earned.`,
  `${name}, please accept our warmest congratulations on completing your degree as part of the Class of ${year}. This accomplishment is a credit to your dedication and hard-earned expertise.`,
  `On the occasion of your graduation, ${name}, the Class of ${year} is honored to count you among its number. Congratulations on an achievement built on years of disciplined effort.`,
  `Congratulations, ${name}. Your graduation with the Class of ${year} marks the successful culmination of considerable effort and sustained commitment to your studies.`,
];

const EMOTIONAL_MESSAGES = (name, year) => [
  `Congratulations! ${name}, you did it! After all the hard work, the late nights, and the moments you wanted to give up — Class of ${year} is officially yours. We are so incredibly proud of you.`,
  `${name}, there were so many nights this degree asked more of you than felt fair — and you gave it anyway. Class of ${year}, you made it, and it means everything.`,
  `Congratulations, ${name}. Watching you reach this moment, Class of ${year}, means more than words can really hold. You should be so proud of who you've become getting here.`,
  `${name}, this is it — Class of ${year}, done. Every hard morning, every doubt you pushed through, it was all worth it. We couldn't be prouder of you.`,
];

const FUNNY_MESSAGES = (name, year) => [
  `${name}, Class of ${year} graduate, now officially certified as someone who survived deadlines, bad WiFi, and 8am lectures. Congratulations — go nap, you've earned it.`,
  `Breaking news: ${name} has officially defeated the final boss of ${year} — graduation. Achievement unlocked. Sleep schedule: still loading.`,
  `Congratulations, ${name}! You traded ramen noodles and all-nighters for an actual diploma. Class of ${year}, you made it out alive — barely, but alive.`,
  `${name}, Class of ${year}: proof that caffeine, deadlines, and sheer stubbornness can, in fact, produce a graduate. Congratulations, you legend.`,
];

const STYLE_POOLS = {
  formal: FORMAL_MESSAGES,
  emotional: EMOTIONAL_MESSAGES,
  funny: FUNNY_MESSAGES,
};

export const STYLES = Object.keys(STYLE_POOLS);

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fallbackMessage(name, year, style) {
  const pool = STYLE_POOLS[style];
  if (!pool) return null;
  return pick(pool(name, year));
}

/**
 * Generates one congratulatory message in the requested style. Tries
 * the AI first for a fresh message every time; falls back to the
 * hand-written pool for that style if the AI call fails for any reason.
 */
export async function generateMessage(name, year, style) {
  try {
    return await generateWithAI(name, year, style);
  } catch (err) {
    console.warn("AI generation failed, using fallback pool:", err.message);
    return fallbackMessage(name, year, style);
  }
}