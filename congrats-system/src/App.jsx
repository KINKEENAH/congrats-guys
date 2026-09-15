import { useState } from "react";
import GenerateForm from "./components/GenerateForm.jsx";
import MessageReveal from "./components/MessageReveal.jsx";
import CongratsCard from "./components/CongratsCard.jsx";
import { requestMessage } from "./utils/messages.js";

export default function App() {
  const [screen, setScreen] = useState("form"); // "form" | "revealed" | "card"
  const [name, setName] = useState("");
  const [year, setYear] = useState(null);
  const [style, setStyle] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const triggerConfetti = () => {
    setShowConfetti(true);
    window.setTimeout(() => setShowConfetti(false), 3200);
  };

  const handleGenerate = async ({ name: newName, year: newYear, style: newStyle }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await requestMessage(newName, newYear, newStyle);
      setName(res.name);
      setYear(res.year);
      setStyle(res.style);
      setMessage(res.message);
      setScreen("revealed");
      triggerConfetti();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnother = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await requestMessage(name, year, style);
      setMessage(res.message);
      triggerConfetti();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setScreen("form");
    setName("");
    setYear(null);
    setStyle(null);
    setMessage(null);
    setError(null);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cream px-6 py-16">
      <div className="relative w-full max-w-lg">
        <div className="relative rounded-2xl border border-rose/30 bg-card shadow-lg shadow-burgundy/5 px-8 py-10 sm:px-12 sm:py-14 animate-card-in">
          {error && (
            <p className="mb-6 text-sm text-burgundy text-center">{error}</p>
          )}

          {screen === "form" && (
            <GenerateForm onGenerate={handleGenerate} loading={loading} />
          )}

          {screen === "revealed" && message && (
            <MessageReveal
              name={name}
              message={message}
              showConfetti={showConfetti}
              onAnother={handleAnother}
              onGenerateCard={() => setScreen("card")}
              onReset={handleReset}
              loading={loading}
            />
          )}

          {screen === "card" && message && (
            <>
              <CongratsCard name={name} year={year} message={message} />
              <button
                onClick={() => setScreen("revealed")}
                className="mt-4 text-xs text-muted hover:text-ink transition-colors"
              >
                ← Back to message
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}