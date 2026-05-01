import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const THEMES = [
  { id: 'self', label: 'Self', sanskrit: 'आत्मन्', gradient: 'from-blue-900/30 to-blue-800/10' },
  { id: 'witness', label: 'Witness', sanskrit: 'साक्षी', gradient: 'from-purple-900/30 to-purple-800/10' },
  { id: 'detachment', label: 'Detachment', sanskrit: 'वैराग्य', gradient: 'from-emerald-900/30 to-emerald-800/10' },
  { id: 'liberation', label: 'Liberation', sanskrit: 'मोक्ष', gradient: 'from-amber-900/30 to-amber-800/10' },
  { id: 'peace', label: 'Peace', sanskrit: 'शान्ति', gradient: 'from-cyan-900/30 to-cyan-800/10' },
  { id: 'bliss', label: 'Bliss', sanskrit: 'आनन्द', gradient: 'from-rose-900/30 to-rose-800/10' },
]

interface ThemeGalleryProps {
  onThemeClick: (theme: string) => void
}

export function ThemeGallery({ onThemeClick }: ThemeGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !sectionRef.current) return
    const ctx = gsap.context(() => {
      const leftCol = sectionRef.current!.querySelector('.parallax-left')
      const rightCol = sectionRef.current!.querySelector('.parallax-right')
      if (leftCol) {
        gsap.fromTo(leftCol, { y: '5vh' }, {
          y: '-10vh', ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
        })
      }
      if (rightCol) {
        gsap.fromTo(rightCol, { y: '15vh' }, {
          y: '-5vh', ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={sectionRef} id="themes" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Themes</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-light tracking-tight">
          Walk every <span className="font-['Instrument_Serif'] italic">thread.</span>
        </h2>
        <p className="text-muted text-sm md:text-base max-w-lg mt-4">
          The Ashtavakra Gita addresses the deepest questions through these core themes. Click to explore.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-12">
        <div className="parallax-left space-y-6">
          {THEMES.filter((_, i) => i % 2 === 0).map((theme, i) => (
            <motion.button
              key={theme.id}
              onClick={() => onThemeClick(theme.id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group w-full text-left"
            >
              <span className="absolute inset-[-2px] rounded-2xl accent-gradient opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              <div className={`relative bg-gradient-to-br ${theme.gradient} border border-stroke rounded-2xl p-8 md:p-10`}>
                <span className="text-3xl md:text-4xl text-text-primary/30 font-['Instrument_Serif'] italic block mb-3">
                  {theme.sanskrit}
                </span>
                <h3 className="text-xl md:text-2xl text-text-primary font-light">{theme.label}</h3>
              </div>
            </motion.button>
          ))}
        </div>
        <div className="parallax-right space-y-6 md:mt-16">
          {THEMES.filter((_, i) => i % 2 !== 0).map((theme, i) => (
            <motion.button
              key={theme.id}
              onClick={() => onThemeClick(theme.id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group w-full text-left"
            >
              <span className="absolute inset-[-2px] rounded-2xl accent-gradient opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              <div className={`relative bg-gradient-to-br ${theme.gradient} border border-stroke rounded-2xl p-8 md:p-10`}>
                <span className="text-3xl md:text-4xl text-text-primary/30 font-['Instrument_Serif'] italic block mb-3">
                  {theme.sanskrit}
                </span>
                <h3 className="text-xl md:text-2xl text-text-primary font-light">{theme.label}</h3>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
