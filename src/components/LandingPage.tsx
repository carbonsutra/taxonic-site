export default function LandingPage() {
  return (
    <div className="not-prose relative left-1/2 my-0 w-screen max-w-none -translate-x-1/2 overflow-x-hidden bg-white text-slate-900 dark:bg-[#05090e] dark:text-white">
      <div className="flex min-h-[calc(100svh-136px)] w-full flex-col overflow-x-hidden">
        <main className="landing-main flex w-full flex-1 items-start px-5 pt-0 pb-4 sm:px-8 sm:pt-0 sm:pb-4 lg:px-12">
          <section className="landing-hero mx-auto grid w-full max-w-[1800px] items-center gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="landing-hero-content">
              <p className="mb-4 text-xs font-bold tracking-[0.16em] sm:text-sm">
                <span className="text-cyan-600">AUTOMATED</span>{" "}
                <span className="text-emerald-600">
                  SEMANTIC INTELLIGENCE ENGINE.
                </span>
              </p>

              <h1 className="mb-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.055em] sm:text-5xl xl:text-7xl">
                Classification
                <br />
                <span className="inline-block max-w-full rounded-xl bg-gradient-to-r from-blue-500 via-cyan-300 to-emerald-500 px-2 py-1 text-slate-950 sm:px-3">
                  instantly, @scale.
                </span>
              </h1>

              <p className="mb-2 max-w-2xl text-base leading-relaxed text-slate-700 dark:text-slate-100 sm:text-lg">
                The Automated Cataloging Engine for Publishers, Libraries, and
                EdTech.
              </p>

              <p className="mb-2 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-8">
                Taxonic converts unstructured text such as book titles, academic
                course names, syllabus excerpts, and digital learning assets
                into standardized subject codes across publishing and higher
                education taxonomies.
              </p>

              <p className="mb-2 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-8">
                Classifying books, research papers, and course materials is
                crucial for content discoverability. However, manual tagging
                takes 15 to 45 minutes per title. Taxonic solves this bottleneck
                completely. It is an automated classification engine that
                converts raw text like book titles, syllabi, and learning assets
                into official subject codes within a single second.
              </p>

              <p className="mb-2 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-8">
                Taxonic uses AI to understand the actual meaning of your
                content, not just keywords. It then maps unstructured text
                directly to key global standards, including Library of Congress
                Subject Headings (LCSH), THEMA (v1.7), and HECoS (v9.0).
              </p>

              <p className="mb-2 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-8">
                Your team can start using Taxonic instantly with zero training,
                and can test it here itself at no cost. Editorial staff and
                catalogers can bulk-classify thousands of records directly in
                Google Sheets using a simple custom formula like =TAXONIC(). For
                enterprise software, Library Services Platforms, and publishing
                tools, Taxonic provides a fully documented high-speed REST API.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4 sm:gap-5">
                <a
                  href="/api-playground"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-cyan-400/60 bg-gradient-to-r from-blue-500/15 to-emerald-400/15 px-5 py-3 text-sm font-semibold text-cyan-800 dark:text-cyan-100 transition hover:-translate-y-0.5 hover:border-emerald-400 sm:px-6"
                >
                  Try Now <span className="text-xl"></span>
                </a>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300"></span>

                <a
                  href="mailto:support@contactous.com"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 px-5 py-3 text-sm font-semibold text-[#031016] transition hover:-translate-y-0.5 hover:from-blue-500 hover:via-cyan-400 hover:to-emerald-400 sm:px-6"
                >
                  Contact Us
                </a>
              </div>
            </div>

            <aside className="landing-hero-visual flex w-full min-w-0 items-center justify-center overflow-hidden rounded-xl p-0">
              <img
                src="/images/taxonic-robot.jpeg"
                alt="Taxonic's Automated Classification"
                fetchPriority="high"
                className="block h-auto w-full max-w-[680px] object-contain rounded-xl border-black-700 border"
              />
            </aside>
          </section>
        </main>

        <footer className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-200 px-5 py-3 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400 sm:px-8 sm:py-3 lg:px-12">
          <p className="mx-auto">
            © 2026 Contactous Pte Ltd. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
