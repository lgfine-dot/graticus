"use client";

/*
 * One door, one destination.
 *
 * Every sales CTA on the page used to land somewhere different — two mailto
 * links and a sign-in — so a reader who clicked the wrong one left the site
 * entirely. These all scroll to the contact form instead and tell it what the
 * reader was looking at, so the form arrives already filled in with the right
 * area of interest. The sample-brief buttons also seed the message, which makes
 * the hero CTA an email capture rather than a promise the page cannot keep.
 */
export type Interest = {
  area: string;
  message?: string;
};

export const INTEREST_EVENT = "graticus:interest";

export default function InterestLink({
  interest,
  className,
  children,
}: {
  interest: Interest;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#contact"
      className={className}
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent<Interest>(INTEREST_EVENT, { detail: interest }),
        );
      }}
    >
      {children}
      <span className="arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}
