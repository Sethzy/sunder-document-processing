/**
 * Hero section for the claims document operations landing page.
 */
import { CheckCircle2, FileSearch, ShieldCheck } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Container } from '@/components/landing/Container'
import reviewScreenshot from '@/assets/landing/screenshots/verifyv1.png'

const proofPoints = [
  {
    label: 'Source-visible review',
    icon: FileSearch,
  },
  {
    label: 'Citation-backed fields',
    icon: CheckCircle2,
  },
  {
    label: 'Human approval required',
    icon: ShieldCheck,
  },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 sm:pt-32">
      <Container>
        <div className="grid items-center gap-12 pb-16 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14 lg:pb-20">
          <div>
            <div className="inline-flex items-center rounded-full border border-sunder-green/20 bg-sunder-green/5 px-4 py-1.5 text-sm font-medium text-sunder-green">
              Built for messy claim packets
            </div>
            <h1 className="mt-7 max-w-3xl font-serif text-4xl font-medium tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
              AI document operations for claims teams.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">
              Upload scattered legal, medical, and financial documents. Sunder
              classifies the packet, extracts structured evidence, and keeps the
              source page beside every field a reviewer needs to trust.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/demo"
                className="inline-flex items-center justify-center rounded-md bg-sunder-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-sunder-green-dark focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunder-green"
              >
                Book a demo
              </Link>
              <a
                href="#workflow"
                className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunder-green"
              >
                See the workflow
              </a>
            </div>
            <dl className="mt-10 grid gap-3 sm:grid-cols-3">
              {proofPoints.map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm text-zinc-700">
                  <item.icon className="h-4 w-4 text-sunder-green" />
                  <dt>{item.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="ml-3 text-xs font-medium text-zinc-500">
                  Citation review workspace
                </span>
              </div>
              <img
                src={reviewScreenshot}
                alt="Sunder document review workspace showing a source PDF beside extracted fields and citations"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
