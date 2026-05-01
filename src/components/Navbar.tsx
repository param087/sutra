import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/cn'

const LINKS = [
  { label: 'Ask', href: '#hero' },
  { label: 'Themes', href: '#themes' },
  { label: 'Chapters', href: '#chapters' },
  { label: 'About', href: '#faq' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <nav
        className={cn(
          'fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-1.5 rounded-full bg-surface/80 backdrop-blur-xl border border-stroke transition-shadow duration-300',
          scrolled && 'shadow-md shadow-black/10'
        )}
      >
        {/* Logo */}
        <a href="#hero" className="flex items-center justify-center w-9 h-9 rounded-full p-[2px] accent-gradient shrink-0">
          <span className="flex items-center justify-center w-full h-full rounded-full bg-bg text-text-primary text-xs font-medium">
            ॥
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-0.5 ml-2">
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs text-muted hover:text-text-primary rounded-full px-3 py-1.5 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#chapters"
          className="relative ml-2 text-xs px-4 py-1.5 rounded-full text-text-primary group"
        >
          <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative bg-surface rounded-full px-4 py-1.5 block">Read &rarr;</span>
        </a>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden ml-1 p-2 text-muted"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg/95 backdrop-blur-xl z-[60] flex flex-col items-center justify-center gap-8"
          >
            <button
              className="absolute top-6 right-6 text-muted p-2"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            {LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl text-text-primary hover:text-muted transition-colors"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
