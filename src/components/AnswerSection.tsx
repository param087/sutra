import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { type Match } from '../lib/qaEngine'

interface AnswerSectionProps {
  matches: Match[]
  reflection: string
  question: string
}

export function AnswerSection({ matches, reflection, question }: AnswerSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0)

  if (!question) {
    return (
      <section id="answer" className="min-h-[50vh] flex items-center justify-center px-6">
        <p className="text-muted text-sm italic">Ask above to receive a verse.</p>
      </section>
    )
  }

  const current = matches[activeIdx]
  if (!current) return null

  return (
    <section id="answer" className="py-24 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Answer</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-light tracking-tight mb-12">
          The Gita <span className="font-['Instrument_Serif'] italic">responds.</span>
        </h2>

        {/* Answer card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="relative group"
          >
            <span className="absolute inset-[-1px] rounded-3xl accent-gradient opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative bg-surface border border-stroke rounded-3xl p-8 md:p-12 grid md:grid-cols-12 gap-8">
              {/* Left: English + reflection */}
              <div className="md:col-span-7 space-y-6">
                <blockquote className="text-xl md:text-2xl font-['Instrument_Serif'] italic leading-relaxed text-text-primary">
                  &ldquo;{current.verse.english}&rdquo;
                </blockquote>
                <p className="text-muted text-sm leading-relaxed">{reflection}</p>
              </div>

              {/* Right: Sanskrit + meta */}
              <div className="md:col-span-5 space-y-4 md:border-l md:border-stroke md:pl-8">
                <p className="text-lg leading-relaxed text-text-primary/80 whitespace-pre-line font-light">
                  {current.verse.sanskrit}
                </p>
                <p className="text-xs text-muted leading-relaxed whitespace-pre-line">
                  {current.verse.iast}
                </p>
                <div className="pt-4 border-t border-stroke">
                  <span className="inline-block text-xs font-medium text-text-primary bg-stroke/50 rounded-full px-3 py-1">
                    Ch {current.verse.chapter} &middot; Verse {current.verse.verse}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {current.verse.themes.map(t => (
                    <span key={t} className="text-[10px] uppercase tracking-wider text-muted bg-bg rounded-full px-2.5 py-0.5 border border-stroke">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel dots */}
        {matches.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {matches.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === activeIdx ? 'accent-gradient w-6' : 'bg-stroke'}`}
                aria-label={`View verse ${i + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  )
}
