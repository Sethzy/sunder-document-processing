/**
 * Minimal public homepage for Sunder's claims document-processing product.
 * Authenticated product routes remain separate from this one-page marketing surface.
 */
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Sunder - AI document agent for claims",
      },
      {
        name: "description",
        content:
          "Sunder turns messy PDFs and scans into citation-backed claim dossiers for extraction, review, and export.",
      },
      {
        property: "og:title",
        content: "Sunder - AI document agent for claims",
      },
      {
        property: "og:description",
        content:
          "Sunder turns messy PDFs and scans into citation-backed claim dossiers for extraction, review, and export.",
      },
      {
        property: "og:image",
        content: "https://www.trysunder.com/exports/og-image.png",
      },
      {
        property: "og:url",
        content: "https://www.trysunder.com/",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "twitter:card",
        content: "summary_large_image",
      },
      {
        property: "twitter:title",
        content: "Sunder - AI document agent for claims",
      },
      {
        property: "twitter:description",
        content:
          "Sunder turns messy PDFs and scans into citation-backed claim dossiers for extraction, review, and export.",
      },
      {
        property: "twitter:image",
        content: "https://www.trysunder.com/exports/og-image.png",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.trysunder.com/",
      },
    ],
  }),
  component: LandingPage,
});

const proofCards = [
  "Medical expense found with citation on page 12.",
  "Low-confidence fields queued for human review.",
  "Claim report ready with source-backed evidence.",
];

const promptCards = [
  "What documents are in this packet?",
  "Where is the supporting evidence?",
  "Can I trust this extraction?",
];

const promptOffsets = ["", "md:mr-[-2.5rem]", "md:mr-[-1rem]"];
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunder-green/45 focus-visible:ring-offset-2 focus-visible:ring-offset-parchment";

function LogoMark() {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sunder-green text-[13px] font-black text-parchment shadow-sm">
      S
    </div>
  );
}

function DocumentIllustration() {
  return (
    <div className="relative mx-auto h-44 w-56 sm:h-56 sm:w-72" aria-hidden="true">
      <div className="absolute left-14 top-20 h-20 w-36 rotate-[31deg] rounded-xl border border-lp-border-warm bg-parchment" />
      <div className="absolute left-8 top-16 h-24 w-44 rotate-[31deg] rounded-xl bg-sunder-green-dark shadow-[0_22px_40px_rgba(21,80,67,0.16)]" />
      <div className="absolute left-16 top-9 h-28 w-36 rotate-[31deg] rounded-xl border-2 border-sunder-green bg-[#fbf6e8] shadow-sm">
        <div className="absolute left-8 top-8 h-1.5 w-16 rounded-full bg-[#cad7cd]" />
        <div className="absolute left-7 top-14 h-1.5 w-20 rounded-full bg-[#cad7cd]" />
        <div className="absolute left-8 top-20 h-1.5 w-12 rounded-full bg-[#cad7cd]" />
        <div className="absolute left-24 top-16 h-9 w-1.5 rotate-[-12deg] rounded-full bg-sunder-green" />
      </div>
      <div className="absolute right-16 top-16 h-10 w-14 rounded-[50%] bg-sunder-green" />
    </div>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-parchment p-1 font-sans text-[#163c34]">
      <div className="relative min-h-[calc(100vh-8px)] overflow-hidden rounded-[1.75rem] border border-lp-border-warm bg-[#f8f1e2] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset]">
        <div className="pointer-events-none absolute inset-x-[clamp(1.5rem,7vw,8rem)] top-[72px] hidden h-[calc(100%-72px)] border-x border-dashed border-[#ddd4c3] md:block" />
        <div className="pointer-events-none absolute left-[35.75%] top-[54%] hidden h-[46%] border-l border-dashed border-[#ddd4c3] md:block" />
        <div className="pointer-events-none absolute left-[64.25%] top-[54%] hidden h-[46%] border-l border-dashed border-[#ddd4c3] md:block" />
        <div className="pointer-events-none absolute inset-x-0 top-[72px] border-t border-dashed border-[#ddd4c3]" />
        <div className="pointer-events-none absolute inset-x-[clamp(1.5rem,7vw,8rem)] top-[54%] hidden border-t border-dashed border-[#ddd4c3] md:block" />

        <header className="relative z-10 grid h-[72px] grid-cols-[1fr_auto] items-center gap-4 px-5 sm:px-8 md:px-[clamp(1.5rem,7vw,8.5rem)] lg:grid-cols-[1fr_auto_1fr]">
          <Link
            to="/"
            aria-label="Sunder home"
            className={`flex min-h-11 w-fit items-center gap-2.5 rounded-lg justify-self-start ${focusRing}`}
          >
            <LogoMark />
            <span className="font-serif text-xl font-black tracking-[-0.02em] text-sunder-green">
              Sunder
            </span>
          </Link>

          <nav className="hidden items-center gap-12 text-[13px] font-semibold text-[#41544e] lg:flex">
            <a
              href="#workflow"
              className={`rounded-md px-1.5 py-2 transition hover:text-sunder-green ${focusRing}`}
            >
              Workflow
            </a>
            <a
              href="#review"
              className={`rounded-md px-1.5 py-2 transition hover:text-sunder-green ${focusRing}`}
            >
              Review
            </a>
            <a
              href="#evidence"
              className={`rounded-md px-1.5 py-2 transition hover:text-sunder-green ${focusRing}`}
            >
              Evidence
            </a>
          </nav>

          <div className="flex items-center justify-end gap-3 sm:gap-5">
            <Link
              to="/login"
              className={`hidden rounded-md px-1.5 py-2 text-[13px] font-bold text-[#334a43] transition hover:text-sunder-green sm:inline ${focusRing}`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`flex min-h-11 items-center whitespace-nowrap rounded-full bg-sunder-green px-5 text-[13px] font-black text-white shadow-[0_10px_22px_rgba(31,106,87,0.24)] transition hover:bg-sunder-green-dark sm:px-7 ${focusRing}`}
            >
              Get Started
            </Link>
          </div>
        </header>

        <main className="relative z-10">
          <section className="mx-auto flex min-h-[calc(54vh-72px)] max-w-[1120px] flex-col items-center justify-center px-5 pb-10 pt-10 text-center sm:pb-12 sm:pt-12 md:min-h-[calc(54vh-72px)]">
            <h1 className="max-w-[980px] text-balance font-serif text-[42px] font-black leading-[0.95] tracking-[-0.035em] text-sunder-green sm:text-6xl md:text-[60px] lg:text-[68px]">
              AI document agent that actually understands claims
            </h1>
            <p className="mt-8 max-w-xl text-pretty text-base font-semibold leading-6 text-[#52605b] sm:text-[17px]">
              Transform messy PDFs and scans into citation-backed claim dossiers
              with extraction, review, and export in one workflow.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/register"
                className={`flex min-h-11 items-center rounded-full bg-sunder-green px-6 text-sm font-black text-white shadow-[0_14px_28px_rgba(31,106,87,0.22)] transition hover:bg-sunder-green-dark ${focusRing}`}
              >
                Process a Packet <span className="ml-1" aria-hidden="true">→</span>
              </Link>
              <Link
                to="/demo"
                className={`flex min-h-11 items-center rounded-full border border-lp-border-warm bg-white/80 px-6 text-sm font-black text-[#354b43] shadow-[0_4px_8px_rgba(41,35,22,0.08)] transition hover:border-[#c8bda8] ${focusRing}`}
              >
                View Demo
              </Link>
            </div>
          </section>

          <section
            id="workflow"
            aria-label="Claims document workflow preview"
            className="mx-auto grid min-h-[46vh] max-w-[1408px] grid-cols-1 items-center gap-8 px-5 pb-12 pt-8 sm:px-8 md:grid-cols-[1fr_1.15fr_1fr] md:gap-4 md:px-0 md:pb-12 md:pt-10"
          >
            <div id="review" className="flex flex-col items-center gap-4 md:items-end">
              {promptCards.map((prompt, index) => (
                <div
                  key={prompt}
                  className={`w-full max-w-[280px] rounded-lg border border-lp-border-warm bg-[#fbf8ef] px-5 py-3 text-[13px] font-bold leading-4 text-[#65716c] shadow-[0_4px_8px_rgba(42,36,24,0.08)] md:max-w-none ${promptOffsets[index]}`}
                >
                  {prompt}
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <DocumentIllustration />
            </div>

            <div id="evidence" className="flex flex-col items-center gap-5 md:items-start">
              {proofCards.map((card) => (
                <div
                  key={card}
                  className="w-full max-w-[295px] rounded-xl bg-sunder-green px-5 py-4 text-[13px] font-black leading-4 text-white shadow-[0_12px_22px_rgba(24,94,73,0.24)]"
                >
                  {card}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
