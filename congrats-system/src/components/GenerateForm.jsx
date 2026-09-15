import { useState } from "react";

const STYLES = [
  { id: "formal", label: "Formal" },
  { id: "emotional", label: "Emotional" },
  { id: "funny", label: "Funny" },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 10 }, (_, i) => CURRENT_YEAR - i);

export default function GenerateForm({ onGenerate, loading = false }) {
  const [name, setName] = useState("");
  const [year, setYear] = useState(CURRENT_YEAR);
  const [style, setStyle] = useState("emotional");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || loading) return;
    onGenerate({ name: name.trim(), year, style });
  };

  return (
    <div className="relative text-center">
      <div className="mx-auto mb-6 h-px w-12 bg-gold" />
      <h1 className="text-3xl sm:text-4xl font-serif font-medium text-ink mb-3">
        Enter your name
      </h1>
      <p className="text-muted text-sm leading-relaxed mb-8 max-w-xs mx-auto">
        Tell us who's graduating, the year, and how you'd like it said.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5 text-left">
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5 text-center">
            Your name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            disabled={loading}
            className="w-full rounded-lg border border-rose/40 bg-cream px-4 py-3 text-ink placeholder-muted/60 text-center focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold disabled:opacity-50"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-muted mb-1.5 text-center">
            Graduation year
          </label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            disabled={loading}
            className="w-full rounded-lg border border-rose/40 bg-cream px-4 py-3 text-ink text-center focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold disabled:opacity-50"
          >
            {YEAR_OPTIONS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted mb-1.5 text-center">
            Message style
          </label>
          <div className="grid grid-cols-3 rounded-lg border border-rose/40 divide-x divide-rose/40 overflow-hidden">
            {STYLES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStyle(s.id)}
                disabled={loading}
                className={`py-2.5 text-sm font-medium transition-colors disabled:opacity-50 ${
                  style === s.id
                    ? "bg-gold text-ink"
                    : "bg-cream text-muted hover:bg-highlight/60"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!name.trim() || loading}
          className="w-full rounded-lg bg-burgundy hover:bg-burgundy/90 disabled:bg-muted/30 disabled:text-muted disabled:cursor-not-allowed text-cream font-medium py-3 transition-colors mt-2"
        >
          {loading ? "Generating…" : "Generate message"}
        </button>
      </form>
    </div>
  );
}
