import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import chaptersData from '../data/chapters.json'
import { getVersesByChapter } from '../lib/qaEngine'

interface Chapter {
  num: number
  title: string
  summary: string
  verseCount: number
}

const chapters: Chapter[] = chaptersData as Chapter[]

export function ChapterIndex() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section id="chapters" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">The Text</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-light tracking-tight">
          Twenty <span className="font-['Instrument_Serif'] italic">chapters.</span>
        </h2>
        <p className="text-muted text-sm md:text-base max-w-lg mt-4">
          A dialogue between sage Ashtavakra and King Janaka on the nature of Self, reality, and freedom.
        </p>
      </motion.div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {chapters.map((ch, i) => (
          <motion.div
            key={ch.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.03 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <span className="absolute inset-[-1px] rounded-2xl accent-gradient opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            <div className="relative bg-surface border border-stroke rounded-2xl p-5 h-full">
              <button
                onClick={() => setExpanded(expanded === ch.num ? null : ch.num)}
                className="w-full text-left"
                aria-expanded={expanded === ch.num}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-3xl font-light text-text-primary/20">{String(ch.num).padStart(2, '0')}</span>
                    <h3 className="text-sm font-medium text-text-primary mt-1">{ch.title}</h3>
                    <p className="text-xs text-muted mt-1">{ch.verseCount} verses</p>
                  </div>
                  <svg
                    className={`w-4 h-4 text-muted transition-transform ${expanded === ch.num ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {expanded === ch.num && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-stroke">
                      <p className="text-xs text-muted mb-3">{ch.summary}</p>
                      <div className="max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-stroke scrollbar-track-transparent">
                        {getVersesByChapter(ch.num).map(v => (
                          <p key={`${v.chapter}-${v.verse}`} className="text-xs text-text-primary/70 mb-2 leading-relaxed">
                            <span className="text-muted">{v.verse}.</span> {v.english}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
