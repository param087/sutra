import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

const FAQ_ITEMS = [
  { q: 'How does this site choose verses?', a: 'Your question is analyzed for themes and keywords, then matched against 129 verses of the Ashtavakra Gita. The top 3 most relevant verses are returned with a contextual reflection.' },
  { q: 'Is this a substitute for a teacher?', a: 'No. This is a contemplation tool, not a guru. The Ashtavakra Gita itself says that understanding comes from within. Use this as a mirror, not an authority.' },
  { q: 'Why the Ashtavakra Gita?', a: 'It is the most direct, uncompromising expression of non-dual wisdom in Sanskrit literature. No rituals, no prerequisites — just the naked truth of what you already are.' },
  { q: 'What translation do you use?', a: 'The English text is based on John Richards\' public-domain translation. Sanskrit is from standard Devanagari sources with IAST transliteration.' },
  { q: 'Can I download the text?', a: 'The Ashtavakra Gita is in the public domain. The full text is available at sacred-texts.com and many other sources freely.' },
]

const MARQUEE_TERMS = [
  'आत्मन् · Self', 'साक्षी · Witness', 'मोक्ष · Liberation', 'ज्ञान · Knowledge',
  'मौन · Silence', 'आनन्द · Bliss', 'वैराग्य · Detachment', 'चित् · Consciousness',
  'शान्ति · Peace', 'अद्वैत · Non-duality', 'बोध · Awakening', 'निर्वाण · Dissolution',
]

export function FAQFooter() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !marqueeRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      })
    })
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="faq" className="relative">
      {/* FAQ */}
      <div className="py-24 px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight">
            Common <span className="font-['Instrument_Serif'] italic">questions.</span>
          </h2>
        </motion.div>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border border-stroke rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                aria-expanded={openIdx === i}
                className="w-full text-left px-5 py-4 flex items-center justify-between text-sm text-text-primary hover:bg-surface/50 transition-colors"
              >
                {item.q}
                <svg
                  className={`w-4 h-4 text-muted shrink-0 ml-4 transition-transform ${openIdx === i ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-xs text-muted leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden py-8 border-t border-stroke">
        <div ref={marqueeRef} className="flex whitespace-nowrap gap-12">
          {[...MARQUEE_TERMS, ...MARQUEE_TERMS].map((term, i) => (
            <span key={i} className="text-sm text-muted/40 font-light">
              {term}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-stroke py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full p-[1.5px] accent-gradient">
              <span className="flex items-center justify-center w-full h-full rounded-full bg-bg text-text-primary text-[10px]">॥</span>
            </div>
            <span className="text-sm text-text-primary font-light">Sutra</span>
          </div>
          <p className="text-xs text-muted">
            Built with reverence. The Ashtavakra Gita is in the public domain.
          </p>
        </div>
      </footer>
    </section>
  )
}
