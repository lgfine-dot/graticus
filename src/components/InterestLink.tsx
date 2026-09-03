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
  /**
   * The arrow suits a standalone call to action. On a price line the link IS the
   * price, and an arrow after every figure reads as clutter rather than as an
   * invitation, so it can be turned off.
   */
  arrow = true,
}: {
  interest: Interest;
  className?: string;
  children: React.ReactNode;
  arrow?: boolean;
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
      {arrow && (
        <span className="arrow" aria-hidden="true">
          →
        </span>
      )}
    </a>
  );
}
