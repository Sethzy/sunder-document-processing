/**
 * Secondary features section with feature cards and animated document processing visualization.
 * Animation is rendered once and positioned to work for both mobile and desktop layouts.
 */
import { useId } from 'react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/landing/Container'
import { DocumentProcessingAnimation } from '@/components/landing/DocumentProcessingAnimation'
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal'
import inventory from '@/assets/landing/screenshots/inventory.png'

interface Feature {
  name: string
  value: string
  summary: string
  description: string
  icon: React.ComponentType
}

const features: Array<Feature> = [
  {
    name: 'Picks up new formats on day one',
    value: 'templates',
    summary: 'No onboarding manual needed.',
    description:
      'No rules to configure. Sunder understands new document types instantly—like the hire who just "gets it."',
    icon: function TemplateIcon() {
      const id = useId()
      return (
        <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 40 40">
          <defs>
            <linearGradient
              id={id}
              x1="11.5"
              y1={18}
              x2={36}
              y2="15.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset=".194" stopColor="currentColor" />
              <stop offset={1} stopColor="currentColor" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <path
            d="m30 15-4 5-4-11-4 18-4-11-4 7-4-5"
            stroke={`url(#${id})`}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
  },
  {
    name: 'Thinks through problems',
    value: 'learns',
    summary:
      'Handles messy real-world data.',
    description:
      'Figures out complex edge cases, adapts to exceptions, and improves from corrections.',
    icon: function LearnIcon() {
      return (
        <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 40 40">
          <path
            d="M8 17a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z"
            fill="currentColor"
            fillOpacity={0.6}
          />
          <path
            d="M8 24a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z"
            fill="currentColor"
            fillOpacity={0.3}
          />
          <path
            d="M8 10a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z"
            fill="currentColor"
          />
        </svg>
      )
    },
  },
  {
    name: '24/7 availability',
    value: 'availability',
    summary:
      'Queue up work. Come back to results.',
    description:
      'Process documents overnight, weekends, holidays. No overtime, no burnout, no backlogs Monday morning.',
    icon: function AvailabilityIcon() {
      return (
        <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 40 40">
          <path
            d="M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z"
            fill="currentColor"
            fillOpacity={0.4}
          />
          <path
            d="M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z"
            fill="currentColor"
          />
        </svg>
      )
    },
  },
]

function FeatureCard({
  feature,
  isActive,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  feature: Feature
  isActive: boolean
}) {
  return (
    <div
      className={cn(className, !isActive && 'opacity-75 hover:opacity-100')}
      {...props}
    >
      <div
        className={cn(
          'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
          isActive
            ? 'bg-sunder-green text-white shadow-lg shadow-sunder-green/20'
            : 'bg-zinc-100 text-zinc-400',
        )}
      >
        <feature.icon />
      </div>
      <h3
        className={cn(
          'mt-4 font-serif text-lg transition-colors',
          isActive ? 'text-sunder-green' : 'text-zinc-400',
        )}
      >
        {feature.name}
      </h3>
      <p className="mt-2 font-serif text-xl text-foreground">
        {feature.summary}
      </p>
      <p className="mt-4 text-sm text-muted-foreground">{feature.description}</p>
    </div>
  )
}

function FeaturesMobile() {
  const { ref, isVisible } = useStaggeredReveal<HTMLDivElement>({
    threshold: 0.1
  })

  return (
    <div className="mt-16 lg:hidden">
      <div
        ref={ref}
        className={`flex flex-col gap-y-4 px-4 sm:px-6 stagger-children ${isVisible ? 'is-visible' : ''}`}
      >
        {features.map((feature) => (
          <FeatureCard
            key={feature.value}
            feature={feature}
            className="mx-auto max-w-2xl rounded-xl bg-gradient-to-br from-white to-zinc-50 p-4 shadow-sm ring-1 ring-zinc-100"
            isActive
          />
        ))}
      </div>
    </div>
  )
}

function FeaturesDesktop() {
  return (
    <div className="hidden lg:mt-20 lg:block">
      <div className="grid grid-cols-3 gap-x-8">
        {features.map((feature) => (
          <FeatureCard key={feature.value} feature={feature} isActive />
        ))}
      </div>
    </div>
  )
}

export function SecondaryFeatures() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: imageRef, isVisible: imageVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section
      id="secondary-features"
      aria-label="Features for simplifying your work"
      className="py-20 sm:py-24 md:py-32"
    >
      <Container>
        <div
          ref={headerRef}
          className={`mx-auto max-w-2xl md:text-center scroll-reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <h2 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl md:text-5xl">
            AI that works like a skilled <span className="italic text-sunder-green">employee.</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
            Zero hand-holding. Outputs Excel, Word, PDF, and PPT on its own. Never sleeps.
          </p>
        </div>
        <FeaturesMobile />
        <FeaturesDesktop />
        {/* Animation on desktop, static image on mobile */}
        <div className="mt-10 lg:mt-16">
          <div className="hidden md:block">
            <DocumentProcessingAnimation />
          </div>
          <div
            ref={imageRef}
            className={`-mx-4 overflow-hidden px-4 sm:-mx-6 sm:px-6 md:hidden scroll-reveal-scale ${imageVisible ? 'is-visible' : ''}`}
          >
            <div className="relative mt-10 pb-10">
              <div className="absolute -inset-x-4 bottom-0 top-8 bg-zinc-100 sm:-inset-x-6" />
              <div className="relative w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-zinc-200/50 ring-1 ring-zinc-900/5">
                <img
                  src={inventory}
                  alt="Inventory table showing item codes, names, cost prices, sale prices, and quantities"
                  className="w-full"
                />
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
