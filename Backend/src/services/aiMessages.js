import "dotenv/config";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent";

const STYLE_GUIDANCE = {
  formal: "Formal and polished — no contractions, measured and respectful in tone, as if from an institution or elder.",
  emotional: "Warm, heartfelt, and personal — short sentences, direct address, reflective of the effort it took to get here.",
  funny: "Light and humorous — playful, a little cheeky, references to the everyday chaos of student life.",
};

const SYSTEM_PROMPT = `You write a single short congratulatory message for a graduation app.
Given a name, a graduation year, and a requested style, write ONE message, 2-4 sentences, that:
- uses the name and year naturally
- matches the requested style exactly
- feels specific rather than generic, and avoids cliché phrasing
Respond with ONLY the message text itself — no quotes, no labels, no markdown, no preamble, no explanation.`;

function buildUserPrompt(name, year, style) {
  const guidance = STYLE_GUIDANCE[style] ?? STYLE_GUIDANCE.emotional;
  return `Name: ${name}\nGraduation year: ${year}\nStyle: ${style} — ${guidance}`;
}

export async function generateWithAI(name, year, style) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const res = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY,
    },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [
        { role: "user", parts: [{ text: buildUserPrompt(name, year, style) }] },
      ],
      generationConfig: { maxOutputTokens: 200 },
    }),
  });

  if (!res.ok) {
    throw new Error(`Gemini API responded ${res.status}`);
  }

  const data = await res.json();
  const message = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!message) {
    throw new Error("AI response was empty");
  }

  return message;
}