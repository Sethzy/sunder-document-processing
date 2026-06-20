/**
 * Landing page header with desktop and mobile navigation.
 * Uses ShadCN Sheet for mobile nav drawer.
 */
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Logo } from '@/components/landing/Logo'
import { NavLink } from '@/components/landing/NavLink'

function MobileNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  // For hash links, scroll to element without changing URL (preserves clean back navigation)
  if (href.startsWith('#')) {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault()
      const id = href.slice(1)
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }

    return (
      <SheetClose asChild>
        <a href={href} onClick={handleClick} className="block w-full p-2 text-foreground">
          {children}
        </a>
      </SheetClose>
    )
  }

  return (
    <SheetClose asChild>
      <Link to={href} className="block w-full p-2 text-foreground">
        {children}
      </Link>
    </SheetClose>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-muted-foreground"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={`origin-center transition ${open ? 'scale-90 opacity-0' : ''}`}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={`origin-center transition ${!open ? 'scale-90 opacity-0' : ''}`}
      />
    </svg>
  )
}

function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        className="relative z-10 flex h-8 w-8 items-center justify-center focus:outline-none"
        aria-label="Toggle Navigation"
      >
        <MobileNavIcon open={isOpen} />
      </SheetTrigger>
      <SheetContent side="top" showCloseButton={false} className="rounded-b-2xl p-4">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <SheetDescription className="sr-only">Main site navigation links</SheetDescription>
        <nav className="flex flex-col text-lg tracking-tight text-foreground">
          <MobileNavLink href="#workflow">Workflow</MobileNavLink>
          <MobileNavLink href="#review">Review</MobileNavLink>
          <MobileNavLink href="#demo-limitations">Limitations</MobileNavLink>
          <hr className="m-2 border-border/40" />
          <MobileNavLink href="/login">Sign in</MobileNavLink>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center sm:px-4 sm:py-4">
      {/* Mobile: full-width bar | Desktop: floating pill */}
      <nav className="flex w-full items-center justify-between border-b border-zinc-200 bg-white/80 px-4 py-3 backdrop-blur-xl sm:w-auto sm:justify-start sm:gap-x-8 sm:rounded-full sm:border sm:px-6 sm:py-2.5 sm:shadow-sm sm:ring-1 sm:ring-zinc-900/5">
        {/* Logo */}
        <Link to="/" aria-label="Sunder Home" className="transition-opacity hover:opacity-80">
          <Logo className="h-6 w-auto sm:h-7" />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-x-6 md:flex">
          <NavLink href="#workflow">Workflow</NavLink>
          <NavLink href="#review">Review</NavLink>
          <NavLink href="#demo-limitations">Limitations</NavLink>
        </div>
        <div className="hidden h-4 w-px bg-zinc-200 md:block" />

        {/* Right side: demo CTA + hamburger (mobile) / demo CTA + Sign in (desktop) */}
        <div className="flex items-center gap-x-3 sm:gap-x-5">
          <Link
            to="/login"
            className="hidden text-sm font-medium text-zinc-600 transition hover:text-sunder-green md:block"
          >
            Sign in
          </Link>
          <Link
            to="/demo"
            className="flex items-center justify-center rounded-full bg-sunder-green px-3 py-1.5 text-sm font-medium text-white transition hover:bg-sunder-green-dark sm:px-4"
            aria-label="Book a demo"
          >
            Book demo
          </Link>
          <div className="md:hidden">
            <MobileNavigation />
          </div>
        </div>
      </nav>
    </header>
  )
}
