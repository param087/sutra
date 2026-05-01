import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const WORDS = ['Witness', 'Stillness', 'Freedom']

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)
  const [wordIdx, setWordIdx] = useState(0)
  const raf = useRef<number>(0)
  const start = useRef(Date.now())

  useEffect(() => {
    const duration = 1800
    const tick = () => {
      const elapsed = Date.now() - start.current
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(progress * 100))
      if (progress < 1) {
        raf.current = requestAnimationFrame(tick)
      } else {
        setTimeout(onComplete, 300)
      }
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [onComplete])

  useEffect(() => {
    const interval = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <div className="text-6xl md:text-8xl font-light tracking-tight text-text-primary mb-8 tabular-nums">
          {String(count).padStart(3, '0')}
        </div>
        <div className="h-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="block text-sm uppercase tracking-[0.3em] text-muted"
            >
              {WORDS[wordIdx]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-0.5 bg-stroke rounded-full overflow-hidden">
        <div
          className="h-full accent-gradient rounded-full transition-all duration-100"
          style={{ width: `${count}%` }}
        />
      </div>
    </motion.div>
  )
}
