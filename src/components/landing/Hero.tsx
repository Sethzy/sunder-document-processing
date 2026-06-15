/**
 * Hero section with headline, CTA button, and promo video.
 */
import { useState, useEffect, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Container } from '@/components/landing/Container'
import { PromoVideo } from '@/components/landing/PromoVideo'

export function Hero() {
  const [taskIndex, setTaskIndex] = useState(0)
  const tasks = useMemo(
    () => ['processing invoices', 'extracting data', 'excel reconciliation', 'organising pdfs'],
    []
  )

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTaskIndex((prev) => (prev + 1) % tasks.length)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [taskIndex, tasks])

  return (
    <div className="relative overflow-hidden bg-background pt-28 pb-0 sm:pt-36">
      <div className="grid-pattern absolute inset-0 opacity-50" />
      <div className="glow-accent absolute -top-24 -left-20 h-[500px] w-[500px]" />
      <div className="glow-accent absolute top-1/2 -right-20 h-[600px] w-[600px] opacity-40" />

      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sunder-green/10 bg-sunder-green/5 px-4 py-1.5 text-sm font-medium text-sunder-green mb-8 transition-colors hover:bg-sunder-green/10 sm:px-5 sm:text-base">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sunder-green-light opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sunder-green"></span>
            </span>
            Made for Singapore SMEs
          </div>

          <h1 className="max-w-5xl font-serif text-5xl font-medium tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            Your assistant for
            <span className="relative flex w-[120%] -ml-[10%] justify-center overflow-y-hidden text-center pt-1 pb-2 md:pt-2 md:pb-4">
                &nbsp;
                {tasks.map((task, index) => (
                  <motion.span
                    key={index}
                    className="absolute italic text-sunder-green whitespace-nowrap"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      taskIndex === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: taskIndex > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {task}
                  </motion.span>
                ))}
              </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground px-2 sm:mt-6 sm:max-w-2xl sm:text-lg sm:leading-8 sm:px-0">
            Upload your documents. Invoices, receipts, contracts, anything.{' '}
            <br className="hidden sm:inline" />
            Come back to an organized Excel report. No prompts needed.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-4 sm:mt-10">
            <Link
              to="/demo"
              className="press-effect rounded-full bg-sunder-green px-10 py-4 text-base font-semibold text-white shadow-lg shadow-sunder-green/20 transition hover:shadow-sunder-green/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              Book a demo
            </Link>
          </div>

          {/* Promo video - peeks at the fold */}
          <div className="mt-16 w-full px-2 pb-16 sm:px-4 sm:mt-20 sm:pb-24 lg:mt-24">
            <PromoVideo />
          </div>
        </div>
      </Container>
    </div>
  )
}
