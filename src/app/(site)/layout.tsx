/*
 * Layout for every real page of the site (the "(site)" folder name is not part of any URL).
 *
 * Its only job is to load Plausible analytics. It is kept out of the root layout on purpose:
 * the "page not found" page (src/app/not-found.tsx) sits outside this folder, so it never loads
 * the script, and bots requesting dead URLs are not recorded as pageviews.
 *
 * Every new page must go inside src/app/(site)/ or it will not be counted.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Privacy-friendly analytics by Plausible */}
      <script async src="https://plausible.io/js/pa-_V8q4kPzKd52Ou1z0gMH1.js" />
      <script
        dangerouslySetInnerHTML={{
          __html:
            "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()",
        }}
      />
      {children}
    </>
  );
}
