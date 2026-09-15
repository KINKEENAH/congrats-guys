import { useEffect, useRef, useState } from "react";

const CARD_WIDTH = 1000;
const CARD_HEIGHT = 1200;

// Canvas has no built-in text wrapping — this measures each word against
// the available width and breaks lines manually.
function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const testLine = `${currentLine} ${words[i]}`;
    if (ctx.measureText(testLine).width > maxWidth) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  return lines;
}

export default function CongratsCard({ name, year, message }) {
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function draw() {
      // Make sure the real web fonts are actually loaded before drawing —
      // otherwise the canvas renders with a fallback font, and unlike
      // HTML, a canvas never redraws itself once the real font arrives.
      await Promise.all([
        document.fonts.load("600 64px Fraunces"),
        document.fonts.load("400 28px Inter"),
      ]);
      if (cancelled) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = CARD_WIDTH;
      canvas.height = CARD_HEIGHT;

      ctx.fillStyle = "#FFF9F2"; // cream
      ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

      ctx.strokeStyle = "#D4A84F"; // gold
      ctx.lineWidth = 6;
      ctx.strokeRect(40, 40, CARD_WIDTH - 80, CARD_HEIGHT - 80);

      ctx.textAlign = "center";
      ctx.font = "100px sans-serif";
      ctx.fillText("🎓", CARD_WIDTH / 2, 220);

      ctx.fillStyle = "#766C68"; // muted
      ctx.font = "600 28px Inter";
      ctx.fillText(`CLASS OF ${year}`, CARD_WIDTH / 2, 290);

      ctx.fillStyle = "#7B3545"; // burgundy
      ctx.font = "600 64px Fraunces";
      ctx.fillText(name, CARD_WIDTH / 2, 400);

      ctx.fillStyle = "#2D2523"; // ink
      ctx.font = "400 32px Inter";
      const lines = wrapText(ctx, message, CARD_WIDTH - 160);
      const lineHeight = 48;
      const startY = 520;
      lines.forEach((line, i) => {
        ctx.fillText(line, CARD_WIDTH / 2, startY + i * lineHeight);
      });

      setReady(true);
    }

    draw();
    return () => {
      cancelled = true;
    };
  }, [name, year, message]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `${name.replace(/\s+/g, "-").toLowerCase()}-congratulations.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="text-center">
      <canvas
        ref={canvasRef}
        className="w-full rounded-xl border border-rose/30 mb-5"
        style={{ aspectRatio: `${CARD_WIDTH} / ${CARD_HEIGHT}` }}
      />
      <button
        onClick={handleDownload}
        disabled={!ready}
        className="w-full rounded-lg bg-burgundy hover:bg-burgundy/90 disabled:opacity-50 text-cream font-medium py-3 transition-colors"
      >
        ⬇️ Download the card
      </button>
    </div>
  );
}