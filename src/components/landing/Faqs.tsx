/**
 * FAQ section with 3-column grid layout.
 * Mobile: collapsible accordion. Desktop: 3-column grid.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/landing/Container'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What file formats do you support?',
    answer:
      'We support PDFs, images (PNG, JPG), scanned documents, and screenshots. Our AI can even process low-quality scans that are hard to read manually.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Your data is encrypted at rest and in transit, never used to train models, and you remain the sole data owner.',
  },
  {
    question: 'Can I customize the reports?',
    answer:
      "We go beyond templates. Tell us what reports you manually create today—AI generates them on demand. Custom date ranges, filters, formats. If you can describe it, we can automate it.",
  },
  {
    question: 'How accurate is the AI extraction?',
    answer:
      '99%+ accuracy on standard documents. Every extraction includes a confidence score, and our review interface lets you verify and correct any edge cases before export.',
  },
  {
    question: 'How long does setup take?',
    answer:
      "We handle everything. Our team configures your workflows, trains the AI on your documents, and gets you live—no setup fees, no DIY. Most teams are processing within days.",
  },
  {
    question: 'How do I get started?',
    answer:
      "Book a demo with our team. We'll walk through your specific use case and build a custom plan that fits your workflow.",
  },
  {
    question: 'Can I use my existing file storage?',
    answer:
      'Yes. We can layer on top of SharePoint, Google Drive, or local folders. No need to migrate your existing document repository.',
  },
  {
    question: 'What types of documents does it support?',
    answer:
      'Invoices, receipts, contracts, applications, statements, and more. Our system adapts to any structured document type.',
  },
  {
    question: 'What support is available?',
    answer:
      'All plans get priority support with same-day response. Enterprise plans include a dedicated account manager.',
  },
]

function FaqAccordion({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="divide-y divide-zinc-200">
      {faqs.map((faq, index) => (
        <div key={index} className="py-4">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="font-medium text-zinc-900">{faq.question}</span>
            <ChevronDown
              className={`h-5 w-5 text-zinc-500 transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="pt-3 text-sm text-zinc-600">{faq.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export function Faqs() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: faqsRef, isVisible: faqsVisible } = useScrollReveal<HTMLDivElement>()

  // Generate FAQPage JSON-LD schema for Google rich results
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-white py-20 sm:py-24 md:py-32"
    >
      <Container className="relative">
        <div
          ref={headerRef}
          className={`mx-auto max-w-2xl lg:mx-0 scroll-reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <h2
            id="faq-title"
            className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl md:text-5xl"
          >
            Frequently asked <span className="italic text-sunder-green">questions.</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
            Everything you need to know about Sunder and how our AI handles your sensitive documents.
          </p>
        </div>

        {/* Mobile: Accordion */}
        <div
          ref={faqsRef}
          className={`mt-10 lg:hidden scroll-reveal ${faqsVisible ? 'is-visible' : ''}`}
        >
          <FaqAccordion faqs={faqs} />
        </div>

        {/* Desktop: 3-column grid - unchanged from original */}
        <dl className="hidden lg:mx-auto lg:mt-16 lg:grid lg:max-w-2xl lg:grid-cols-1 lg:gap-x-8 lg:gap-y-10 lg:max-w-none lg:grid-cols-3">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="font-serif text-lg leading-7 text-foreground">
                {faq.question}
              </dt>
              <dd className="mt-4 text-sm leading-6 text-muted-foreground">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
    </>
  )
}
