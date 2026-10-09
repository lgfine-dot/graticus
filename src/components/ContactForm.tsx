"use client";

import { useState, useEffect, FormEvent } from "react";
import { INTEREST_EVENT, type Interest } from "./InterestLink";

type Status = "idle" | "submitting" | "success" | "error";

const AREAS = [
  "Graticus Platform",
  "Training",
  "Advisory",
  "A combination of the above",
  "Not sure yet",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  /* Controlled, so a CTA elsewhere on the page can set them. An uncontrolled
     select with only a defaultValue also rendered inconsistently — the browser
     drew its own chrome inside a field styled to have none. `appearance: none`
     plus an explicit value on every option settles that. */
  const [area, setArea] = useState(AREAS[0]);
  const [note, setNote] = useState("");

  useEffect(() => {
    function onInterest(e: Event) {
      const detail = (e as CustomEvent<Interest>).detail;
      if (!detail) return;
      setArea(detail.area);
      if (detail.message) setNote(detail.message);
    }
    window.addEventListener(INTEREST_EVENT, onInterest);
    return () => window.removeEventListener(INTEREST_EVENT, onInterest);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    /* The Netlify Function holds the Resend key. The browser only ever talks to
       our own origin, so there is no key here to leak and no CORS to arrange. */
    try {
      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setArea(AREAS[0]);
        setNote("");
        return;
      }

      /* A failed send must never look like a sent one. Anyone who gets here is
         given the address directly rather than a dead end — this form is the
         only route to the sample brief, so a silent failure costs a lead. */
      const body = await res.json().catch(() => null);
      setStatus("error");
      setMessage(
        typeof body?.error === "string" && res.status === 400
          ? body.error
          : "That did not send. Please email hello@graticus.com.",
      );
    } catch {
      setStatus("error");
      setMessage("That did not send. Please email hello@graticus.com.");
    }
  }

  const buttonLabel =
    status === "submitting"
      ? "Sending…"
      : status === "success"
      ? "Thank you — we will be in touch."
      : "Send";

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required placeholder="Your name" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required placeholder="you@company.com" />
      </div>
      <div className="field">
        <label htmlFor="org">Organization</label>
        <input id="org" name="org" type="text" placeholder="Company or fund" />
      </div>
      <div className="field">
        <label htmlFor="area">Area of interest</label>
        <div className="select-wrap">
          <select
            id="area"
            name="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <span className="chevron" aria-hidden="true">
            ▾
          </span>
        </div>
      </div>
      <div className="field">
        <label htmlFor="msg">What are you working on?</label>
        <textarea
          id="msg"
          name="msg"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="A sentence or two is plenty."
        />
      </div>
      {/* Not for humans: hidden from sight, from screen readers and from the
          tab order, and never autofilled. A bot that fills it in is answered
          with a cheerful 200 and no email is sent. */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <button type="submit" className="btn-primary" disabled={status === "submitting"}>
        {buttonLabel}
        {status !== "success" && <span className="arrow">→</span>}
      </button>
      {status === "error" && (
        <p className="form-status error" role="alert">
          {message}
        </p>
      )}
      {status === "success" && (
        <p className="form-status" role="status">
          Sent. We reply within two business days — usually faster.
        </p>
      )}
    </form>
  );
}
