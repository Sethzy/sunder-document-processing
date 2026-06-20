/**
 * Report generation section for reviewed claim data.
 */
import { FileCheck2, FileSpreadsheet, LibraryBig, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/landing/Container'

const artifactRows = [
  {
    name: 'Special damages summary',
    status: 'Reviewed',
    owner: 'Case library',
  },
  {
    name: 'Medical expense schedule',
    status: 'Needs citation check',
    owner: 'Reviewer queue',
  },
  {
    name: 'Income loss workbook',
    status: 'Draft generated',
    owner: 'Reports',
  },
]

const guarantees = [
  {
    title: 'Generated from reviewed data',
    icon: ShieldCheck,
  },
  {
    title: 'Stored with case artifacts',
    icon: LibraryBig,
  },
  {
    title: 'Exportable work product',
    icon: FileSpreadsheet,
  },
]

export function ProductShowcase() {
  return (
    <section
      id="reports"
      aria-labelledby="reports-title"
      className="border-y border-zinc-200 bg-zinc-50 py-20 sm:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <h2
              id="reports-title"
              className="font-serif text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl"
            >
              Reviewed evidence becomes submission-ready work product.
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-700 sm:text-lg">
              Sunder does not stop at a table of fields. The case library keeps
              generated reports, exports, and supporting schedules tied back to
              the same reviewed dossier.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {guarantees.map((item) => (
                <div key={item.title} className="flex items-center gap-2 text-sm text-zinc-700">
                  <item.icon className="h-4 w-4 text-sunder-green" />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white">
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-950">Case artifacts</h3>
                <p className="mt-1 text-xs text-zinc-500">Generated from reviewed claim data</p>
              </div>
              <FileCheck2 className="h-5 w-5 text-sunder-green" />
            </div>
            <div className="divide-y divide-zinc-200">
              {artifactRows.map((row) => (
                <div
                  key={row.name}
                  className="grid gap-3 px-5 py-4 text-sm sm:grid-cols-[1fr_10rem_8rem]"
                >
                  <span className="font-medium text-zinc-900">{row.name}</span>
                  <span className="text-zinc-600">{row.status}</span>
                  <span className="text-zinc-500">{row.owner}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
