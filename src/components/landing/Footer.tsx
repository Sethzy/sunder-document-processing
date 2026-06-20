import { Link } from '@tanstack/react-router'
import { Container } from '@/components/landing/Container'
import { Logo } from '@/components/landing/Logo'
import { NavLink } from '@/components/landing/NavLink'
import { PaperTextureBackground } from '@/components/landing/PaperTextureBackground'
import { MapPin, Mail, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative py-24 overflow-hidden">
      <PaperTextureBackground />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Brand & Contact */}
          <div className="space-y-6">
            <Link to="/" aria-label="Home" className="group inline-block transition-transform hover:scale-105">
              <Logo className="text-white" iconClassName="text-white" />
            </Link>
            <p className="text-sm text-white/70">
              AI document operations for claims teams
            </p>
            <div className="space-y-3 text-sm text-white/80">
              <a
                href="https://maps.google.com/?q=109+North+Bridge+Road+Funan+Singapore+179097"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-white transition-colors"
              >
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>109 North Bridge Road, Funan,<br />Singapore 179097</span>
              </a>
              <a
                href="mailto:seth@trysunder.com"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span>seth@trysunder.com</span>
              </a>
              <a
                href="https://wa.me/6597990493"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                <span>+65 9799 0493</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 flex flex-col lg:flex-row lg:justify-end gap-8 lg:gap-16 lg:pt-2">
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">Workflow</h3>
              <nav className="flex flex-col gap-3 text-sm">
                <NavLink href="#workflow" className="text-white/70 hover:text-white transition-colors">Upload and classify</NavLink>
                <NavLink href="#review" className="text-white/70 hover:text-white transition-colors">Review citations</NavLink>
                <NavLink href="#reports" className="text-white/70 hover:text-white transition-colors">Generate reports</NavLink>
              </nav>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">Proof</h3>
              <nav className="flex flex-col gap-3 text-sm">
                <NavLink href="#demo-limitations" className="text-white/70 hover:text-white transition-colors">Demo limitations</NavLink>
                <NavLink href="#demo-limitations" className="text-white/70 hover:text-white transition-colors">Security notes</NavLink>
              </nav>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">Product</h3>
              <nav className="flex flex-col gap-3 text-sm">
                <NavLink href="#workflow" className="text-white/70 hover:text-white transition-colors">Evidence pipeline</NavLink>
                <NavLink href="#workflow" className="text-white/70 hover:text-white transition-colors">Workflow</NavLink>
              </nav>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">Company</h3>
              <nav className="flex flex-col gap-3 text-sm">
                <Link to="/demo" className="text-white/70 hover:text-white transition-colors">Book a Demo</Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Sunder Inc. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
