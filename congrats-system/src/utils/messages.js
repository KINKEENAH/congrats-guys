const API_URL = import.meta.env.VITE_API_URL;

/**
 * Calls POST /messages on the backend with a name, graduation year, and
 * message style. Returns { name, year, style, message }.
 */
export async function requestMessage(name, year, style) {
  const res = await fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, year, style }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Something went wrong. Please try again.");
  }

  return res.json();
}