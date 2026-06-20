/**
 * Demo limitations and operational notes for the public landing page.
 */
import { Container } from '@/components/landing/Container'

const notes = [
  {
    question: 'Are demo documents included?',
    answer:
      'No. Claim packets can contain legal, medical, and financial information, so demo files are private and redacted outside git.',
  },
  {
    question: 'What is required for full processing?',
    answer:
      'The full workflow needs Supabase, Gemini, Extend AI, Anthropic, and Vercel environment variables configured locally or in Vercel.',
  },
  {
    question: 'Does Sunder make legal decisions?',
    answer:
      'No. It prepares review packs and first-draft operational artifacts. Reviewers still verify evidence, decide what to accept, and apply legal judgment.',
  },
  {
    question: 'How is AI output handled?',
    answer:
      'AI output is treated as draft evidence. Extracted values, citations, validation issues, and generated reports remain reviewable before use.',
  },
]

export function Faqs() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: notes.map((note) => ({
      '@type': 'Question',
      name: note.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: note.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section
        id="demo-limitations"
        aria-labelledby="limitations-title"
        className="bg-white py-20 sm:py-24"
      >
        <Container>
          <div className="max-w-3xl">
            <h2
              id="limitations-title"
              className="font-serif text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl"
            >
              Demo limitations are explicit.
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-700 sm:text-lg">
              The public repo is a portfolio reference implementation. It is
              intentionally careful about private documents, provider keys, and
              the boundary between extraction support and legal judgment.
            </p>
          </div>

          <dl className="mt-12 grid gap-4 lg:grid-cols-4">
            {notes.map((note) => (
              <div key={note.question} className="rounded-lg border border-zinc-200 p-5">
                <dt className="text-base font-semibold text-zinc-950">{note.question}</dt>
                <dd className="mt-3 text-sm leading-6 text-zinc-600">{note.answer}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </>
  )
}
