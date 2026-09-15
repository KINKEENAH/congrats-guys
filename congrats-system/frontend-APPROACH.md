# Congratulatory System — Frontend Approach

A graduate enters their name, graduation year, and a message style, gets
back one AI-generated congratulatory message, and can copy, share, or
turn it into a downloadable card image.

## 1. The flow

Three screens, one state machine in `App.jsx`:

```
form  →  revealed  →  card
 ↑___________|            |
              ←────────────
```

- **form** — `GenerateForm`: name, graduation year, and a Formal /
  Emotional / Funny style picker.
- **revealed** — `MessageReveal`: the generated message, plus
  Generate another / Copy / Share / Generate a card.
- **card** — `CongratsCard`: a canvas-drawn, downloadable image version
  of the message, with a way back to the text view.

## 2. Project structure

```
congrats-system/
├── src/
│   ├── main.jsx
│   ├── index.css
│   ├── App.jsx                    # the state machine above
│   ├── components/
│   │   ├── GenerateForm.jsx        # name + year + style
│   │   ├── MessageReveal.jsx       # message + actions
│   │   ├── CongratsCard.jsx        # canvas card + download
│   │   └── Confetti.jsx            # celebratory animation on reveal
│   └── utils/
│       └── messages.js            # the one call to the backend
├── tailwind.config.js              # custom palette + fonts + animation
└── .env.example
```

## 3. How the result is obtained

`utils/messages.js` holds one function, `requestMessage(name, year,
style)`, which POSTs to the backend's `/api/messages` and returns
`{ name, year, style, message }`. `App.jsx` calls it on submit and again
on "generate another," storing the result in state. Nothing about *how*
the message was written — AI or fallback pool — is visible to the
frontend; it only ever sees the final text.

## 4. The card is drawn client-side, not generated as an image by the backend

`CongratsCard.jsx` uses the browser's `<canvas>` API to draw the card
entirely in JavaScript — background, border, name, year, and the
word-wrapped message — then converts that canvas to a PNG for download
via `canvas.toDataURL()`. No image-generation API, no extra request to
the backend: the card is built from data already in the browser.

## 5. The color palette

Defined once in `tailwind.config.js` as named colors (`cream`, `ink`,
`gold`, `rose`, `burgundy`, `card`, `muted`, `highlight`), so every
component references e.g. `bg-cream` or `text-burgundy` rather than
repeating hex codes. `CongratsCard.jsx` is the one exception — canvas
drawing calls need raw hex strings (`ctx.fillStyle = "#FFF9F2"`), since
canvas has no awareness of Tailwind classes at all.

## 6. Running it locally

```bash
cp .env.example .env      # set VITE_API_URL to the backend's URL
npm install
npm run dev
```

Requires the backend running separately (see its own APPROACH.md).

## 7. What changed from the very first version of this app

The original design checked names against a database and had a
relationship-based flow (friend/sister/lover/other) for unrecognized
names — that's gone. The message shape changed from a heartfelt +
congrats pair to one message in a chosen style. Graduation year and the
downloadable card are new. The color palette moved from a dark
ceremonial navy/gold theme to the current cream/burgundy/gold one.
