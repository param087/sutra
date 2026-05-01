import { motion } from 'framer-motion'

const VOICES = [
  {
    name: 'Ramana Maharshi',
    title: 'Sage of Arunachala',
    quote: 'The Ashtavakra Gita is the purest expression of Advaita. It points directly to the Self without compromise.',
  },
  {
    name: 'Osho',
    title: 'Spiritual Teacher',
    quote: 'The Ashtavakra Gita has a beauty of its own — it is the ultimate statement, the highest peak of human consciousness.',
  },
  {
    name: 'Nisargadatta Maharaj',
    title: 'Jnani of Mumbai',
    quote: 'Be the witness of all that happens. That alone is enough. The Ashtavakra Gita says nothing more, nothing less.',
  },
  {
    name: 'S. Radhakrishnan',
    title: 'Philosopher & President of India',
    quote: 'A bold and uncompromising statement of the highest Vedanta, delivered with poetic force and intellectual clarity.',
  },
]

export function Voices() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Voices</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-light tracking-tight">
          What seekers <span className="font-['Instrument_Serif'] italic">say.</span>
        </h2>
      </motion.div>

      <div className="space-y-4">
        {VOICES.map((v, i) => (
          <motion.div
            key={v.name}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-surface border border-stroke rounded-[40px] md:rounded-full px-8 py-6 md:px-10 md:py-5 flex flex-col md:flex-row md:items-center gap-4"
          >
            <div className="shrink-0">
              <div className="w-10 h-10 rounded-full accent-gradient flex items-center justify-center text-bg text-xs font-bold">
                {v.name.charAt(0)}
              </div>
            </div>
            <p className="text-sm text-text-primary/90 flex-1 italic">
              &ldquo;{v.quote}&rdquo;
            </p>
            <div className="shrink-0 text-right">
              <p className="text-xs text-text-primary font-medium">{v.name}</p>
              <p className="text-[10px] text-muted">{v.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
