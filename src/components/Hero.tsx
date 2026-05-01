import { useRef, useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface HeroProps {
  onAsk: (question: string) => void
}

export function Hero({ onAsk }: HeroProps) {
  const [question, setQuestion] = useState('')
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !sectionRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.2 })
        .fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .fromTo('.hero-input', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (question.trim()) {
      onAsk(question.trim())
      document.getElementById('answer')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background gradient instead of video for reliability */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-surface/30 to-bg" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(210_30%_20%_/_0.3)_0%,_transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h1 className="hero-title text-5xl sm:text-7xl md:text-8xl font-light tracking-tight leading-[0.95] mb-6">
          Ask your question.
          <br />
          <span className="font-['Instrument_Serif'] italic">Hear the Self.</span>
        </h1>

        <p className="hero-sub text-muted text-sm md:text-base max-w-lg mx-auto mb-12">
          129 verses of the Ashtavakra Gita — ancient wisdom on consciousness, freedom, and the nature of reality — mapped to your moment.
        </p>

        <form onSubmit={handleSubmit} className="hero-input w-full max-w-xl mx-auto">
          <div className="relative group">
            <span className="absolute inset-[-2px] rounded-2xl accent-gradient opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center bg-surface border border-stroke rounded-2xl overflow-hidden">
              <input
                type="text"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="What troubles you? e.g., I am afraid..."
                aria-label="Ask your question"
                className="flex-1 bg-transparent px-5 py-4 text-text-primary placeholder:text-muted/60 text-sm md:text-base outline-none"
              />
              <button
                type="submit"
                className="mr-2 px-5 py-2.5 rounded-xl accent-gradient text-bg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Ask
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="w-px h-12 bg-stroke relative overflow-hidden rounded-full">
          <div className="absolute w-full h-4 accent-gradient animate-scroll-down rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
