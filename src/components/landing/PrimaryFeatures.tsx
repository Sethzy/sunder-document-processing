/**
 * Evidence workflow section for claim packet processing.
 */
import {
  BadgeCheck,
  ClipboardCheck,
  FileStack,
  GitBranch,
  UploadCloud,
} from 'lucide-react'
import { Container } from '@/components/landing/Container'

const workflowSteps = [
  {
    title: 'Ingest the packet',
    description:
      'Upload PDFs, scans, images, and combined documents into one claim workspace.',
    icon: UploadCloud,
  },
  {
    title: 'Classify and split',
    description:
      'Gemini triages files, describes them for reviewers, and separates combined PDFs into logical sections.',
    icon: GitBranch,
  },
  {
    title: 'Extract evidence',
    description:
      'Extend AI extracts structured claim data with confidence, citation, and dashboard trace metadata.',
    icon: FileStack,
  },
  {
    title: 'Review with context',
    description:
      'Reviewers compare each field against the source page, edit values, and resolve validation issues.',
    icon: ClipboardCheck,
  },
  {
    title: 'Generate work product',
    description:
      'Accepted case data becomes claim reports and exportable artifacts from the case library.',
    icon: BadgeCheck,
  },
]

export function PrimaryFeatures() {
  return (
    <section
      id="workflow"
      aria-labelledby="workflow-title"
      className="border-y border-zinc-200 bg-zinc-50 py-20 sm:py-24"
    >
      <Container>
        <div className="max-w-3xl">
          <h2
            id="workflow-title"
            className="font-serif text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl"
          >
            A claims workflow, not a generic chat shell.
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-700 sm:text-lg">
            Sunder is organized around the case dossier. Every step preserves
            source context so reviewers can see what happened and decide what to
            trust.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          {workflowSteps.map((step) => (
            <article
              key={step.title}
              className="rounded-lg border border-zinc-200 bg-white p-5"
            >
              <step.icon className="h-5 w-5 text-sunder-green" />
              <h3 className="mt-5 text-base font-semibold text-zinc-950">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
