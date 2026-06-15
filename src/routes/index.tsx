/**
 * Landing page route - home page with marketing content.
 * Auth redirect handled by __root.tsx beforeLoad.
 */
import { createFileRoute } from "@tanstack/react-router";
import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { PrimaryFeatures } from '@/components/landing/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/landing/SecondaryFeatures'
import { ProductShowcase } from '@/components/landing/ProductShowcase'
import { CallToAction } from '@/components/landing/CallToAction'
import { Testimonials } from '@/components/landing/Testimonials'
import { Pricing } from '@/components/landing/Pricing'
import { Faqs } from '@/components/landing/Faqs'
import { Footer } from '@/components/landing/Footer'

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Sunder - AI Document Processing for Singapore SMEs",
      },
      {
        name: "description",
        content: "Sunder: Upload your documents. Invoices, receipts, contracts, anything. Come back to an organized Excel report.",
      },
      {
        property: "og:title",
        content: "Sunder - AI Document Processing for Singapore SMEs",
      },
      {
        property: "og:description",
        content: "Sunder: Upload your documents. Invoices, receipts, contracts, anything. Come back to an organized Excel report.",
      },
      {
        property: "og:image",
        content: "https://www.trysunder.com/exports/og-image.png",
      },
      {
        property: "og:url",
        content: "https://www.trysunder.com/",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "twitter:card",
        content: "summary_large_image",
      },
      {
        property: "twitter:title",
        content: "Sunder - AI Document Processing for Singapore SMEs",
      },
      {
        property: "twitter:description",
        content: "Sunder: Upload your documents. Invoices, receipts, contracts, anything. Come back to an organized Excel report.",
      },
      {
        property: "twitter:image",
        content: "https://www.trysunder.com/exports/og-image.png",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.trysunder.com/",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="landing-page min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <ProductShowcase />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </div>
  )
}
