import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LoadingScreen } from './components/LoadingScreen'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { AnswerSection } from './components/AnswerSection'
import { ThemeGallery } from './components/ThemeGallery'
import { Voices } from './components/Voices'
import { ChapterIndex } from './components/ChapterIndex'
import { FAQFooter } from './components/FAQFooter'
import { answer, type Match } from './lib/qaEngine'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [question, setQuestion] = useState('')
  const [matches, setMatches] = useState<Match[]>([])
  const [reflection, setReflection] = useState('')

  const handleAsk = useCallback((q: string) => {
    setQuestion(q)
    const result = answer(q)
    setMatches(result.matches)
    setReflection(result.reflection)
  }, [])

  const handleThemeClick = useCallback((theme: string) => {
    const themeQuestions: Record<string, string> = {
      self: 'Who am I really?',
      witness: 'What is the witness?',
      detachment: 'How do I let go?',
      liberation: 'How can I be free?',
      peace: 'How do I find peace?',
      bliss: 'What is true happiness?',
    }
    const q = themeQuestions[theme] || `Tell me about ${theme}`
    handleAsk(q)
    document.getElementById('answer')?.scrollIntoView({ behavior: 'smooth' })
  }, [handleAsk])

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <a href="#main" className="skip-link">Skip to content</a>
          <Navbar />
          <main id="main">
            <Hero onAsk={handleAsk} />
            <AnswerSection matches={matches} reflection={reflection} question={question} />
            <ThemeGallery onThemeClick={handleThemeClick} />
            <Voices />
            <ChapterIndex />
            <FAQFooter />
          </main>
        </>
      )}
    </>
  )
}

export default App
