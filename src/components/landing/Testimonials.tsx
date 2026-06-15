/**
 * Testimonials section with 3-column grid of customer quotes.
 * Mobile: horizontal carousel with active indicators. Desktop: 3-column grid.
 */
import { useState, useEffect, useRef, useCallback } from 'react'
import { Container } from '@/components/landing/Container'
import { useScrollReveal } from '@/hooks/useScrollReveal'

/** Type for a single testimonial */
interface Testimonial {
  content: string
  stats: { value: string; label: string }[]
  author: { name: string; role: string }
}

/**
 * Animated stat that counts up from 0 when triggered.
 * Works on both mobile and desktop.
 * Uses ease-out timing for smooth deceleration.
 */
function AnimatedStat({ value, isActive, isVisible, hasAnimated, onAnimated }: {
  value: string
  isActive: boolean
  isVisible: boolean
  hasAnimated: boolean
  onAnimated: () => void
}) {
  const [displayValue, setDisplayValue] = useState('0')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Skip if already animated, not visible, or not active
    if (hasAnimated || !isVisible || !isActive) return

    // Parse numeric part and suffix (e.g., "90%" → 90, "%")
    const match = value.match(/^(\d+)(.*)$/)
    if (!match) {
      // Non-numeric values just show immediately
      setDisplayValue(value)
      onAnimated()
      return
    }

    const targetNum = parseInt(match[1], 10)
    const suffix = match[2] || ''

    // Start from 0 for dramatic count-up
    const startNum = 0
    const duration = 1200
    const startTime = performance.now()

    setIsAnimating(true)

    // Ease-out quart: starts fast, slows down dramatically at end
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuart(progress)

      const currentNum = Math.round(startNum + (targetNum - startNum) * easedProgress)
      setDisplayValue(`${currentNum}${suffix}`)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
        onAnimated()
      }
    }

    requestAnimationFrame(animate)
  }, [isActive, isVisible, hasAnimated, value, onAnimated])

  return (
    <span
      className={`inline-block transition-transform duration-300 ${
        isAnimating ? 'scale-110 text-sunder-green' : 'scale-100'
      }`}
    >
      {displayValue}
    </span>
  )
}

/**
 * Desktop testimonial card with scroll-triggered stat animations.
 * Uses IntersectionObserver to animate stats when the card enters viewport.
 */
function DesktopTestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const cardRef = useRef<HTMLLIElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <li ref={cardRef}>
      <figure className="relative rounded-2xl bg-zinc-50 p-6 shadow-sm ring-1 ring-zinc-900/5 transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50">
        <blockquote className="relative">
          <p className="font-serif text-base tracking-tight text-foreground">
            &ldquo;{testimonial.content}&rdquo;
          </p>
        </blockquote>
        <div className="mt-4 flex justify-around border-t border-zinc-100 pt-4">
          {testimonial.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-bold tracking-tight text-foreground">
                <AnimatedStat
                  value={stat.value}
                  isActive={true}
                  isVisible={isVisible}
                  hasAnimated={hasAnimated}
                  onAnimated={() => setHasAnimated(true)}
                />
              </div>
              <div className="text-xs font-medium text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <figcaption className="mt-4 border-t border-zinc-100 pt-4">
          <div className="text-sm font-semibold text-foreground">
            {testimonial.author.name}
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            {testimonial.author.role}
          </div>
        </figcaption>
      </figure>
    </li>
  )
}

const testimonials = [
  [
    {
      content:
        "Month-end close used to mean three days of matching invoices to POs. Now it's done by the time I get my morning coffee.",
      stats: [
        { value: '90%', label: 'Faster Close' },
        { value: '0', label: 'Manual Matching' },
      ],
      author: {
        name: 'James Ong',
        role: 'Controller',
      },
    },
    {
      content:
        "Orders come in from emails, PDFs, Excel files—you name it. We used to have two people just re-keying data. Now it's fully automated.",
      stats: [
        { value: '2', label: 'FTEs Saved' },
        { value: '100%', label: 'Real-time Sync' },
      ],
      author: {
        name: 'Rachel Wong',
        role: 'COO',
      },
    },
  ],
  [
    {
      content:
        "Booking confirmations, visa documents, itineraries—all arriving in different formats. We used to manually re-key everything. Now it flows straight into our CRM.",
      stats: [
        { value: '80%', label: 'Less Data Entry' },
        { value: '0', label: 'Booking Errors' },
      ],
      author: {
        name: 'Michael Tan',
        role: 'Travel Agency Director',
      },
    },
    {
      content:
        "Progress claims require matching dozens of contractor invoices to project budgets. What took my team a full week now takes an afternoon of review.",
      stats: [
        { value: '85%', label: 'Faster Review' },
        { value: '50+', label: 'Invoices/Claim' },
      ],
      author: {
        name: 'Sarah Chen',
        role: 'CEO',
      },
    },
  ],
  [
    {
      content:
        "Invoices arrive from 200+ vendors in every format. We went from manual line-item entry to fully automated reconciliation.",
      stats: [
        { value: '200+', label: 'Vendors Automated' },
        { value: '0', label: 'Manual Entry' },
      ],
      author: {
        name: 'David Lim',
        role: 'Head of Finance',
      },
    },
    {
      content:
        "Client onboarding meant manually extracting data from contracts and IDs. Now I just drop the folder and review the output.",
      stats: [
        { value: '10x', label: 'Faster Onboarding' },
        { value: '3', label: 'Doc Types/Client' },
      ],
      author: {
        name: 'Linda Ng',
        role: 'Director',
      },
    },
  ],
]

// Flatten for mobile carousel
const allTestimonials = testimonials.flat()

export function Testimonials() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.05
  })

  // Track active carousel item for indicators
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Track which cards have had their stats animated
  const [animatedCards, setAnimatedCards] = useState<Set<number>>(new Set())
  const markCardAnimated = useCallback((index: number) => {
    setAnimatedCards(prev => new Set(prev).add(index))
  }, [])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft
      const cardWidth = carousel.offsetWidth * 0.85 + 16 // 85vw + gap
      const index = Math.round(scrollLeft / cardWidth)
      setActiveIndex(Math.min(index, allTestimonials.length - 1))
    }

    carousel.addEventListener('scroll', handleScroll, { passive: true })
    return () => carousel.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="bg-white py-24 sm:py-32"
    >
      <Container>
        <div
          ref={headerRef}
          className={`mx-auto max-w-2xl md:text-center scroll-reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <h2 className="font-serif text-3xl tracking-tight text-foreground sm:text-5xl">
            What teams say about <span className="italic text-sunder-green">Sunder.</span>
          </h2>
          <p className="mt-6 text-lg tracking-tight text-muted-foreground">
            See how teams are getting their nights and weekends back.
          </p>
        </div>

        {/* Mobile carousel */}
        <div
          ref={cardsRef}
          className={`lg:hidden scroll-reveal ${cardsVisible ? 'is-visible' : ''}`}
        >
          <div ref={carouselRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 -mx-4 pb-4 mt-16">
            {allTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="snap-center shrink-0 w-[85vw] max-w-sm"
              >
                <figure className="relative rounded-2xl bg-gradient-to-br from-white to-zinc-50/80 p-6 shadow-md ring-1 ring-zinc-100 min-h-[280px] flex flex-col">
                  <blockquote className="relative flex-1">
                    <p className="font-serif text-base tracking-tight text-foreground">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                  </blockquote>
                  <div className="mt-4 flex justify-around border-t border-zinc-100 pt-4">
                    {testimonial.stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-xl font-bold tracking-tight text-foreground">
                          <AnimatedStat
                            value={stat.value}
                            isActive={index === activeIndex}
                            isVisible={cardsVisible}
                            hasAnimated={animatedCards.has(index)}
                            onAnimated={() => markCardAnimated(index)}
                          />
                        </div>
                        <div className="text-xs font-medium text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <figcaption className="mt-4 border-t border-zinc-100 pt-4">
                    <div className="text-sm font-semibold text-foreground">
                      {testimonial.author.name}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      {testimonial.author.role}
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
          {/* Scroll indicators */}
          <div className="flex justify-center gap-1.5 mt-4">
            {allTestimonials.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-4 bg-sunder-green'
                    : 'w-1.5 bg-zinc-300'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-xs text-zinc-400 mt-2">
            Swipe to see more
          </p>
        </div>

        {/* Desktop grid with animated stats */}
        <ul
          role="list"
          className="hidden lg:grid mx-auto mt-16 max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((column, colIdx) => (
            <li key={colIdx}>
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                {column.map((testimonial) => (
                  <DesktopTestimonialCard
                    key={testimonial.author.name}
                    testimonial={testimonial}
                  />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
