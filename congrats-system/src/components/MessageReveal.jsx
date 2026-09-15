import { useState } from "react";
import Confetti from "./Confetti.jsx";

export default function MessageReveal({
  name,
  message,
  showConfetti,
  onAnother,
  onGenerateCard,
  onReset,
  loading = false,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can fail (permissions, insecure context) — not
      // worth surfacing an error for a nice-to-have action.
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `Congratulations, ${name}!`, text: message });
      } catch {
        // The user closing the native share sheet also rejects this
        // promise — that's not a failure worth reacting to.
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="relative text-center">
      <Confetti active={showConfetti} />

      <div className="text-4xl mb-5">🎓</div>
      <p className="text-ink text-lg leading-relaxed mb-9">{message}</p>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <button
          onClick={onAnother}
          disabled={loading}
          className="rounded-lg border border-rose/40 text-muted hover:text-ink hover:border-gold py-2.5 text-xs font-medium transition-colors disabled:opacity-50"
        >
          ✨ Another
        </button>
        <button
          onClick={handleCopy}
          className="rounded-lg border border-rose/40 text-muted hover:text-ink hover:border-gold py-2.5 text-xs font-medium transition-colors"
        >
          {copied ? "✓ Copied" : "📋 Copy"}
        </button>
        <button
          onClick={handleShare}
          className="rounded-lg border border-rose/40 text-muted hover:text-ink hover:border-gold py-2.5 text-xs font-medium transition-colors"
        >
          📱 Share
        </button>
      </div>

      <button
        onClick={onGenerateCard}
        className="w-full rounded-lg bg-burgundy hover:bg-burgundy/90 text-cream font-medium py-3 transition-colors mb-4"
      >
        🖼️ Generate a congratulatory card
      </button>

      <button
        onClick={onReset}
        className="text-xs text-muted hover:text-ink transition-colors"
      >
        Generate for someone else
      </button>
    </div>
  );
}