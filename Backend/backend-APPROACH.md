# Congratulatory System — Backend Approach

Node.js + Express API that generates one congratulatory message for a
given name, graduation year, and style. No database — every visitor is
treated as a graduate, and no names are ever saved.

## 1. What it does

One endpoint:

```
POST /api/messages
Body: { "name": "Miriam Owusu", "year": 2026, "style": "emotional" }

→ { "name": "...", "year": 2026, "style": "emotional", "message": "..." }
```

`style` must be one of `formal`, `emotional`, or `funny`. All three
fields are required on every request — there's no multi-step exchange
like an earlier version of this app had; each call is self-contained.

## 2. Project structure

```
congrats-system-backend/
├── src/
│   ├── server.js                # Express app + CORS + route mounting
│   ├── routes/
│   │   └── messages.js           # validates input, calls generateMessage
│   ├── data/
│   │   └── messageTemplates.js   # style pools (fallback) + generateMessage
│   └── services/
│       └── aiMessages.js         # the actual Gemini API call
└── .env.example
```

## 3. How the result is obtained

1. **Validate.** The route checks `name` is a non-empty string, `year`
   is a sensible integer, and `style` is one of the three known values —
   before anything else runs.
2. **Try the AI.** `generateMessage(name, year, style)` calls
   `generateWithAI()`, which sends the name/year/style to Google's
   Gemini API (`gemini-3.1-flash-lite`) with a system prompt asking for
   one short message in the requested style, and returns the plain text
   response.
3. **Fall back on any failure.** If the AI call throws for any reason —
   missing API key, network error, rate limit, empty response —
   `generateMessage()` catches it, logs a warning, and picks a message
   from a hand-written pool for that style instead. The person asking
   never sees an error; they just get a slightly less varied message.
4. **Respond.** The route sends back the name, year, style, and
   whichever message resulted, so the frontend always knows exactly
   what was used to generate what it's displaying.

## 4. No database, on purpose

An earlier version of this app checked submitted names against a
Postgres `graduates` table and branched into a separate "relationship"
flow for unrecognized names. That's gone — every name is now treated as
a graduate, nothing is looked up, and nothing is stored. This removed
`src/db/`, `scripts/seedGraduates.js`, the `pg` dependency, and
`DATABASE_URL` entirely.

## 5. Running it locally

```bash
cp .env.example .env      # fill in GEMINI_API_KEY (get one free at aistudio.google.com)
npm install
npm run dev                 # starts on http://localhost:4000
```

Without `GEMINI_API_KEY` set, every request still works — it just
always uses the fallback pool. Watch the terminal: a line reading
`AI generation failed, using fallback pool: ...` means the fallback is
being used; silence on that request means the real AI call succeeded.

Quick manual check:

```bash
curl -X POST http://localhost:4000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"name":"Sakeenah Ibrahim","year":2026,"style":"emotional"}'
```

## 6. What's next (not done yet, on purpose)

- **Deploy** — Render, same as the original plan, now simpler since
  there's no database to also stand up alongside it.
- Rate limiting per IP, if this ever gets real public traffic and the
  Gemini free tier's daily quota becomes a concern.
