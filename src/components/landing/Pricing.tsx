/**
 * Pricing section with three plan tiers.
 */
import { cn } from '@/lib/utils'
import { Button } from '@/components/landing/Button'
import { Container } from '@/components/landing/Container'
import { PaperTextureBackground } from '@/components/landing/PaperTextureBackground'
import { useScrollReveal } from '@/hooks/useScrollReveal'


function CheckIcon({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        'h-6 w-6 flex-none fill-current stroke-current',
        className,
      )}
      {...props}
    >
      <path
        d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
        strokeWidth={0}
      />
      <circle
        cx={12}
        cy={12}
        r={8.25}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const plan = {
  name: "Everything Included",
  href: "/demo",
  features: [
    'Custom workflows built for your documents',
    'Full AI suite: split, extract, validate, reconcile, generate',
    'Unlimited users, usage-based pricing',
    'Always the latest AI models',
    'Ongoing optimization and support',
    'API access when you need it',
  ],
  buttonText: "Book a demo",
};

const valueProps = [
  'We build it for you—no DIY',
  'No setup fees, no surprises',
  'Dedicated success team from day one',
];

export function Pricing() {
  const { ref: leftRef, isVisible: leftVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: cardRef, isVisible: cardVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section
      id="pricing"
      aria-label="Pricing"
      className="bg-zinc-50/50 py-20 sm:py-24 md:py-32"
    >
      <Container>
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:gap-x-16 lg:items-center sm:gap-y-12">
          {/* Left side - Copy */}
          <div
            ref={leftRef}
            className={`scroll-reveal ${leftVisible ? 'is-visible' : ''}`}
          >
            <h2 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl md:text-5xl">
              Pay for output, <span className="italic text-sunder-green">not headcount.</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
              Custom pricing based on your document volume. If we don't deliver ROI in 90 days, we make it right.
            </p>
            <ul className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
              {valueProps.map((prop) => (
                <li key={prop} className="flex gap-x-3 text-base text-zinc-700">
                  <CheckIcon className="h-6 w-6 flex-none text-sunder-green" />
                  {prop}
                </li>
              ))}
            </ul>
          </div>

          {/* Right side - Card */}
          <div
            ref={cardRef}
            className={`relative flex flex-col rounded-2xl p-6 text-white shadow-2xl overflow-hidden sm:rounded-[2.5rem] sm:p-8 scroll-reveal-scale ${cardVisible ? 'is-visible' : ''}`}
          >
            <PaperTextureBackground />
            <div className="relative z-10 flex-1">
              <h3 className="font-serif text-2xl font-medium text-white">
                {plan.name}
              </h3>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-emerald-50"
              >
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-6 flex-none text-white"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Button
              href={plan.href}
              className="press-effect relative z-10 mt-6 rounded-full py-2.5 text-sm font-semibold transition-all bg-white text-sunder-green hover:bg-emerald-50 sm:mt-8"
              aria-label="Book a demo"
            >
              {plan.buttonText}
            </Button>
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
