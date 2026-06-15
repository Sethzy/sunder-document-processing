import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/landing/Container'
import { DocumentSplitAnimation } from '@/components/landing/DocumentSplitAnimation'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { FolderOpen, Sparkles, AlertCircle, FileSpreadsheet } from 'lucide-react'
import vatReturnsMobile from '@/assets/landing/screenshots/mobile-hero-gen.png'

const features = [
  {
    title: 'Organizes everything',
    value: 'organize',
    description:
      'Drop documents in any format—PDFs, handwritten receipts, scans, images, spreadsheets. Sunder automatically classifies each one and routes it to the right folder, no matter how messy the originals.',
    icon: FolderOpen,
  },
  {
    title: 'Extracts the data',
    value: 'extract',
    description:
      'Pull structured data from documents with 99% accuracy, down to the field level. Every extracted value links directly back to its source—click any number and see exactly where it came from. No more hunting through pages to verify a figure.',
    icon: Sparkles,
  },
  {
    title: 'Flags errors',
    value: 'verify',
    description:
      'Built-in validation catches discrepancies before they become costly mistakes. Confidence scores surface anything that looks off, and business rules flag exceptions for review.',
    icon: AlertCircle,
  },
  {
    title: 'Delivers reports',
    value: 'generate',
    description:
      'Your custom AI agent creates ready-to-use reports on demand—Excel with working formulas, reconciliations, trend analysis. Need a different format? Just ask. No waiting days for a simple change.',
    icon: FileSpreadsheet,
  },
]

export function PrimaryFeatures() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: imageRef, isVisible: imageVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section
      id="features"
      aria-label="Features for document processing"
      className="relative overflow-hidden bg-background py-20 sm:py-24 md:py-32"
    >
      <Container className="relative">
        <div
          ref={headerRef}
          className={`max-w-2xl md:mx-auto md:text-center xl:max-w-none scroll-reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <h2 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl md:text-5xl">
            Your AI teammate <span className="italic text-sunder-green">at work.</span>
          </h2>
          <p className="mt-4 text-base tracking-tight text-muted-foreground sm:mt-6 sm:text-lg">
            Hand off the documents. Review what matters. Like leaving them on a coworker's desk.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-y-8 sm:mt-16 sm:gap-y-12 md:mt-20 lg:grid-cols-12 lg:gap-x-12">
          <div
            ref={featuresRef}
            className={`lg:col-span-4 flex flex-col scroll-reveal ${featuresVisible ? 'is-visible' : ''}`}
          >
            {features.map((feature, featureIndex) => (
              <div
                key={feature.title}
                onMouseEnter={() => setSelectedIndex(featureIndex)}
                className={cn(
                  'group relative py-5 text-left transition-all duration-300 select-none sm:py-6',
                  // Dashed divider for all except the last item
                  featureIndex !== features.length - 1 && 'border-b border-dashed border-zinc-200',
                  // Cursor pointer on desktop only
                  'md:cursor-pointer'
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center transition-colors',
                      // Mobile: always active color
                      'text-sunder-green',
                      // Desktop: color based on hover state
                      selectedIndex !== featureIndex && 'md:text-zinc-400 md:group-hover:text-zinc-500'
                    )}
                  >
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3
                    className={cn(
                      'font-serif text-lg transition-colors sm:text-xl',
                      // Mobile: always active color
                      'text-foreground',
                      // Desktop: color based on hover state
                      selectedIndex !== featureIndex && 'md:text-zinc-400 md:group-hover:text-zinc-600'
                    )}
                  >
                    {feature.title}
                  </h3>
                </div>

                <div
                  className={cn(
                    'grid transition-all duration-300 ease-in-out',
                    // Mobile: always expanded
                    'grid-rows-[1fr]',
                    // Desktop: expand/collapse based on hover
                    selectedIndex !== featureIndex && 'md:grid-rows-[0fr]'
                  )}
                >
                  <div className="overflow-hidden">
                    <p
                      className={cn(
                        'pl-[3.5rem] text-base leading-6 text-muted-foreground pt-4 transition-opacity duration-300',
                        // Mobile: always visible
                        'opacity-100',
                        // Desktop: fade based on hover
                        selectedIndex !== featureIndex && 'md:opacity-0'
                      )}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-8">
            <div className="w-full relative">
              {/* Animation on desktop, static image on mobile */}
              <div className="hidden md:block">
                <DocumentSplitAnimation />
              </div>
              <div
                ref={imageRef}
                className={`-mx-4 overflow-hidden px-4 sm:-mx-6 sm:px-6 md:hidden scroll-reveal-scale ${imageVisible ? 'is-visible' : ''}`}
              >
                <div className="relative mt-10 pb-10">
                  <div className="absolute -inset-x-4 bottom-0 top-8 bg-zinc-100 sm:-inset-x-6" />
                  <div className="relative w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-zinc-200/50 ring-1 ring-zinc-900/5">
                    <img
                      src={vatReturnsMobile}
                      alt="Data processing pipeline showing extraction and validation progress"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile section divider */}
      <div className="mt-16 sm:hidden">
        <div className="section-divider" />
      </div>
    </section>
  )
}
