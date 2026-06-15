/**
 * Call-to-action section with paper texture background.
 */
import { Button } from '@/components/landing/Button'
import { Container } from '@/components/landing/Container'
import { PaperTextureBackground } from '@/components/landing/PaperTextureBackground'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function CallToAction() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden py-20 sm:py-24 md:py-32"
    >
      <PaperTextureBackground />

      <Container className="relative z-10">
        <div
          ref={ref}
          className={`mx-auto max-w-lg text-center scroll-reveal ${isVisible ? 'is-visible' : ''}`}
        >
          <h2 className="font-serif text-2xl tracking-tight text-white sm:text-3xl md:text-4xl">
            Ready to make the <span className="italic">hire?</span>
          </h2>
          <p className="mt-4 text-base tracking-tight text-emerald-100 sm:mt-6 sm:text-lg">
            Sunder handles the document work. Your team handles the decisions.
          </p>
          <Button
            href="/demo"
            className="press-effect mt-8 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-sunder-green transition hover:bg-emerald-50 shadow-xl shadow-sunder-green-dark/20 sm:mt-10 sm:px-10 sm:py-4"
          >
            Book a demo
          </Button>
        </div>
      </Container>
    </section>
  )
}
