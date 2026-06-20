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
import { Faqs } from '@/components/landing/Faqs'
import { Footer } from '@/components/landing/Footer'

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Sunder - AI Document Operations for Claims Teams",
      },
      {
        name: "description",
        content: "Sunder turns messy legal claim packets into citation-backed review dossiers and report-ready artifacts.",
      },
      {
        property: "og:title",
        content: "Sunder - AI Document Operations for Claims Teams",
      },
      {
        property: "og:description",
        content: "Upload scattered claim documents, verify extracted fields against citations, and generate reviewed case artifacts.",
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
        content: "Sunder - AI Document Operations for Claims Teams",
      },
      {
        property: "twitter:description",
        content: "Citation-backed document operations for claims teams handling messy PDFs, scans, duplicates, and reports.",
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
        <Faqs />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
