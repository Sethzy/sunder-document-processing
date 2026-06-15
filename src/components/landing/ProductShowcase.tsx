/**
 * ProductShowcase section with responsive rendering:
 * - Desktop (lg+): Interactive TaskDashboardMockup with 3D tilt effect
 * - Mobile/Tablet: Static PNG with "peek" effect
 */
import { useState } from 'react'
import { Container } from '@/components/landing/Container'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { TaskDashboardMockup } from '@/components/landing/TaskDashboardMockup'

export function ProductShowcase() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: imageRef, isVisible: imageVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: mockupRef, isVisible: mockupVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 })
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -3
    const rotateY = ((x - centerX) / centerX) * 3
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    })
  }

  const handleMouseLeave = () => {
    setTiltStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' })
  }

  return (
    <section
      id="product-showcase"
      aria-label="Product demonstration"
      className="py-12 sm:py-16 md:py-28 bg-white"
    >
      {/* Mobile/Tablet: Centered header + PNG with peek effect */}
      <div className="lg:hidden">
        <Container>
          <div
            ref={headerRef}
            className={`mx-auto max-w-2xl text-center scroll-reveal ${headerVisible ? 'is-visible' : ''}`}
          >
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gray-900 leading-tight tracking-tight">
              Everything you do,
              <br />
              <span className="italic text-sunder-green">supercharged</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Powerful AI for documents. Juniors work like seniors. Seniors deliver what used to take a team.
            </p>
          </div>
        </Container>

        {/* Mockup with peek effect */}
        <div
          ref={imageRef}
          className={`-mx-4 overflow-hidden px-4 sm:-mx-6 sm:px-6 scroll-reveal-scale ${imageVisible ? 'is-visible' : ''}`}
        >
          <div className="mt-16 pb-10">
            <div className="ml-4 sm:ml-6 min-w-[600px] w-[140%] sm:w-[130%] overflow-hidden rounded-xl bg-white shadow-lg shadow-zinc-200/50 ring-1 ring-zinc-900/5">
              {/* macOS window chrome */}
              <div className="bg-[#f6f6f6] px-3 py-2.5 flex items-center gap-1.5 border-b border-gray-200">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <TaskDashboardMockup isVisible={imageVisible} />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Two-column grid with interactive mockup */}
      <Container className="hidden lg:block">
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Text - left aligned */}
          <div className="col-span-4">
            <h2 className="font-serif text-4xl lg:text-5xl text-gray-900 leading-tight tracking-tight">
              Everything you do,
              <br />
              <span className="italic text-sunder-green">supercharged</span>
            </h2>
            <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
              Powerful AI for documents. Juniors work like seniors. Seniors deliver what used to take a team.
            </p>
          </div>

          {/* Interactive mockup with 3D tilt */}
          <div ref={mockupRef} className="col-span-8">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ ...tiltStyle, transition: 'transform 0.1s ease-out' }}
              className="max-w-3xl ml-auto rounded-xl overflow-hidden shadow-2xl ring-1 ring-zinc-900/5"
            >
              {/* macOS window chrome */}
              <div className="bg-[#f6f6f6] px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <TaskDashboardMockup isVisible={mockupVisible} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
