/**
 * Auth page layout with paper texture background and feature highlights.
 */
import { PaperTextureBackground } from '@/components/landing/PaperTextureBackground'

function ShieldIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
    </svg>
  )
}

function FeatureItem({ icon, title, description, index }: { icon: React.ReactNode; title: string; description: string; index: number }) {
  return (
    <div 
      className="group relative flex gap-5 rounded-2xl bg-white/10 p-6 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 hover:bg-white/20 hover:-translate-y-1.5 hover:shadow-blue-900/40 animate-slide-up"
      style={{ animationDelay: `${index * 150}ms`, opacity: 0 }}
    >
      {/* Shine effect on hover */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:transition-transform group-hover:duration-1000 group-hover:translate-x-[100%] ease-in-out" />
      </div>

      <div className="relative flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 text-white border border-white/10 shadow-inner group-hover:scale-110 group-hover:bg-white/20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300">
        {icon}
      </div>
      <div className="relative">
        <h3 className="text-lg font-medium text-white tracking-tight font-serif">{title}</h3>
        <p className="mt-1 text-sm text-blue-50/80 leading-relaxed font-normal font-display group-hover:text-white transition-colors duration-300">{description}</p>
      </div>
    </div>
  )
}

export function SlimLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative flex min-h-screen justify-center md:px-12 lg:px-0 bg-white">
        <div className="relative z-10 flex flex-1 flex-col bg-background px-4 py-10 shadow-2xl sm:justify-center md:flex-none md:px-28">
          <main className="mx-auto w-full max-w-sm sm:px-4 md:w-80 md:max-w-sm md:px-0">
            {children}
          </main>
        </div>
        <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
          <PaperTextureBackground />
          {/* Feature highlights overlay */}
          <div className="relative z-10 flex h-full items-center justify-center p-12">
            <div className="flex flex-col gap-6 w-full max-w-md">
              <FeatureItem
                index={0}
                icon={<ShieldIcon />}
                title="Your data stays secure"
                description="Encrypted at rest and in transit for total privacy."
              />
              <FeatureItem
                index={1}
                icon={<CheckCircleIcon />}
                title="99%+ extraction accuracy"
                description="AI-powered precision with expert human review."
              />
              <FeatureItem
                index={2}
                icon={<LinkIcon />}
                title="Every field cited"
                description="Verify any value back to its original source."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
