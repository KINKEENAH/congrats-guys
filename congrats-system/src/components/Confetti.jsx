import { useRef } from "react";

const COLORS = ["#D4A84F", "#C9828C", "#7B3545", "#F4E3B2"];

export default function Confetti({ active }) {
  // Generated once per mount so pieces don't reshuffle on re-render.
  const pieces = useRef(
    Array.from({ length: 26 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 2.2 + Math.random() * 1.4,
      size: 5 + Math.random() * 5,
      color: COLORS[i % COLORS.length],
      drift: (Math.random() - 0.5) * 60,
    }))
  ).current;

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 rounded-full animate-confetti-fall"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            "--drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
