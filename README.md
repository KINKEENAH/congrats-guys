# Congratulatory System

A small web app for graduates: type your name, pick a graduation year
and a message style, and get a personalized congratulatory message —
then copy it, share it, or download it as a card.

The project has two parts: a React frontend and a Node.js/Express
backend that generates the messages.

## Features

- Formal, Emotional, or Funny message styles, generated fresh by AI
  each time
- Copy, share (native share sheet where supported), or regenerate
  instantly
- Downloadable congratulatory card, drawn client-side and saved as a
  PNG — no image-generation API involved
- No accounts, no saved data — nothing about who used it is stored
- No database on the backend — every visitor is treated as a graduate

## Tech stack

- **Frontend:** React + Vite, Tailwind CSS
- **Backend:** Node.js + Express, Google Gemini API (`gemini-3.1-flash-lite`)

## Project structure

```
congrats-system/            # frontend
└── ...

congrats-system-backend/    # backend
└── ...
```

## API

### `POST /api/messages`

**Request body**

```json
{
  "name": "Miriam Owusu",
  "year": 2026,
  "style": "emotional"
}
```

`style` must be one of `formal`, `emotional`, or `funny`.

**Response**

```json
{
  "name": "Sakeenah Ibrahim",
  "year": 2026,
  "style": "emotional",
  "message": "..."
}
```

## Setup

### Backend

```bash
cd congrats-system-backend
npm install
cp .env.example .env
```

Fill in `.env`:

```
GEMINI_API_KEY=your-key-here     # free at aistudio.google.com
PORT=4000
CORS_ORIGIN=http://localhost:5173
```

Run it:

```bash
npm run dev     # development, auto-restarts on file changes
npm start       # production
```

### Frontend

```bash
cd congrats-system
npm install
cp .env.example .env
```

Fill in `.env`:

```
VITE_API_URL=http://localhost:4000/api
```

Point this at your deployed backend's URL in production.

Run it:

```bash
npm run dev
```

The frontend expects the backend to already be running.

## Screenshots

_Add a screenshot or two here once you're happy with how it looks._

## License

MIT — or delete this section if you'd rather not license it.
