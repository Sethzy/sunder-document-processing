/**
 * Review controls section for citation-backed claim evidence.
 */
import { AlertTriangle, CheckCircle2, Files, SearchCheck } from 'lucide-react'
import { Container } from '@/components/landing/Container'

const reviewDetails = [
  {
    title: 'Original file stays visible',
    body: 'Review extracted values while the source page remains open in the same workspace.',
    icon: Files,
  },
  {
    title: 'Citations travel with fields',
    body: 'Each extracted value can include source text, page context, reasoning, and confidence metadata.',
    icon: SearchCheck,
  },
  {
    title: 'Issues become checklist work',
    body: 'Missing fields, duplicates, payer classification, and validation issues stay visible until reviewed.',
    icon: AlertTriangle,
  },
  {
    title: 'Reviewer decisions are explicit',
    body: 'Humans accept, edit, dismiss, or escalate. AI output is never treated as final by default.',
    icon: CheckCircle2,
  },
]

export function SecondaryFeatures() {
  return (
    <section
      id="review"
      aria-labelledby="review-title"
      className="bg-white py-20 sm:py-24"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <h2
              id="review-title"
              className="font-serif text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl"
            >
              Review work stays attached to evidence.
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-700 sm:text-lg">
              The product is opinionated about trust. Extraction is useful only
              when a reviewer can inspect the document, understand the source,
              and make a defensible decision.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reviewDetails.map((detail) => (
              <article
                key={detail.title}
                className="rounded-lg border border-zinc-200 bg-white p-5"
              >
                <detail.icon className="h-5 w-5 text-sunder-green" />
                <h3 className="mt-4 text-base font-semibold text-zinc-950">
                  {detail.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {detail.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
