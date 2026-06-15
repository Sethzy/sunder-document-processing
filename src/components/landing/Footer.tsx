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
              AI document processing for Singapore SMEs
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
              <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">Solutions</h3>
              <nav className="flex flex-col gap-3 text-sm">
                <Link to="/use-cases/$slug" params={{ slug: 'invoices' }} className="text-white/70 hover:text-white transition-colors">Invoice Processing</Link>
                <Link to="/use-cases/$slug" params={{ slug: 'receipts' }} className="text-white/70 hover:text-white transition-colors">Receipt Management</Link>
                <Link to="/use-cases/$slug" params={{ slug: 'contracts' }} className="text-white/70 hover:text-white transition-colors">Contract Analysis</Link>
                <Link to="/use-cases/$slug" params={{ slug: 'forms' }} className="text-white/70 hover:text-white transition-colors">Form Processing</Link>
              </nav>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">Industries</h3>
              <nav className="flex flex-col gap-3 text-sm">
                <Link to="/industries/$slug" params={{ slug: 'accounting' }} className="text-white/70 hover:text-white transition-colors">Accounting</Link>
                <Link to="/industries/$slug" params={{ slug: 'legal' }} className="text-white/70 hover:text-white transition-colors">Legal</Link>
                <Link to="/industries/$slug" params={{ slug: 'logistics' }} className="text-white/70 hover:text-white transition-colors">Logistics</Link>
              </nav>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">Product</h3>
              <nav className="flex flex-col gap-3 text-sm">
                <NavLink href="#features" className="text-white/70 hover:text-white transition-colors">Features</NavLink>
                <NavLink href="#pricing" className="text-white/70 hover:text-white transition-colors">Pricing</NavLink>
              </nav>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">Company</h3>
              <nav className="flex flex-col gap-3 text-sm">
                <NavLink href="#testimonials" className="text-white/70 hover:text-white transition-colors">Testimonials</NavLink>
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
