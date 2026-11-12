import type { Metadata } from "next";

// Served (with HTTP 404) for any address that is not a real page. Netlify returns out/404.html,
// which the static export builds from this file. It deliberately loads no analytics: see
// src/app/(site)/layout.tsx.
export const metadata: Metadata = {
  title: "Page not found — Graticus",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        textAlign: "center",
        gap: "1rem",
      }}
    >
      <h1 style={{ fontFamily: "Fraunces, serif", fontWeight: 400, fontSize: "2.25rem", margin: 0 }}>
        Page not found
      </h1>
      <p style={{ margin: 0, opacity: 0.75 }}>The page you asked for does not exist on this site.</p>
      <p style={{ margin: 0 }}>
        <a href="/">Go to the Graticus home page &rarr;</a>
      </p>
    </main>
  );
}
