"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // NOTE: wire this to Formspree or Resend before production.
    // Formspree example:
    //   const endpoint = "https://formspree.io/f/YOUR_ID";
    //   const res = await fetch(endpoint, {
    //     method: "POST",
    //     headers: { Accept: "application/json" },
    //     body: data,
    //   });
    //   if (res.ok) { setStatus("success"); form.reset(); }
    //   else { setStatus("error"); setMessage("Please email hello@graticus.com."); }

    // Placeholder: pretend-submit to show UX path.
    await new Promise((r) => setTimeout(r, 600));
    void data;
    setStatus("success");
    form.reset();
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
        <select id="area" name="area" defaultValue="Protocol Generator">
          <option>Protocol Generator</option>
          <option>Training</option>
          <option>The full dashboard</option>
          <option>Advisory</option>
          <option>A combination of the above</option>
          <option>Not sure yet</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="msg">What are you working on?</label>
        <textarea id="msg" name="msg" rows={3} placeholder="A sentence or two is plenty." />
      </div>
      <button type="submit" className="btn-primary" disabled={status === "submitting"}>
        {buttonLabel}
        {status !== "success" && <span className="arrow">→</span>}
      </button>
      {status === "error" && <p className={`form-status error`}>{message}</p>}
    </form>
  );
}
