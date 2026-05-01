import versesData from '../data/ashtavakra.json'
import { STOPWORDS } from './stopwords'

export interface Verse {
  chapter: number
  verse: number
  sanskrit: string
  iast: string
  english: string
  themes: string[]
}

export interface Match {
  verse: Verse
  score: number
  matchedThemes: string[]
  matchedTerms: string[]
}

const verses: Verse[] = versesData as Verse[]

// Theme keyword map: user words → theme tags
const THEME_KEYWORDS: Record<string, string[]> = {
  self: ['self', 'soul', 'atman', 'identity', 'who am i', 'true nature', 'real', 'essence'],
  witness: ['witness', 'observer', 'watching', 'seeing', 'awareness', 'sakshi', 'seer'],
  detachment: ['detach', 'let go', 'renounce', 'attachment', 'cling', 'hold', 'release', 'give up', 'surrender'],
  liberation: ['free', 'freedom', 'liberate', 'liberation', 'moksha', 'release', 'escape', 'salvation'],
  desire: ['desire', 'want', 'crave', 'craving', 'longing', 'wish', 'lust', 'temptation', 'pleasure'],
  fear: ['fear', 'afraid', 'scared', 'anxiety', 'anxious', 'worry', 'worried', 'terrified', 'death', 'dying'],
  bondage: ['bound', 'bondage', 'trapped', 'stuck', 'prison', 'chain', 'slave', 'suffering', 'pain'],
  peace: ['peace', 'calm', 'tranquil', 'serene', 'still', 'quiet', 'rest', 'ease', 'relax'],
  knowledge: ['knowledge', 'wisdom', 'understand', 'truth', 'realize', 'insight', 'learn', 'teach'],
  action: ['action', 'do', 'doing', 'doer', 'act', 'work', 'effort', 'karma', 'duty', 'purpose'],
  duality: ['duality', 'two', 'opposite', 'good evil', 'right wrong', 'illusion', 'maya', 'dream'],
  bliss: ['bliss', 'joy', 'happy', 'happiness', 'ecstasy', 'delight', 'content', 'fulfill'],
  ego: ['ego', 'pride', 'arrogant', 'i am', 'mine', 'identity', 'person', 'individual', 'separate'],
  silence: ['silence', 'silent', 'still', 'stillness', 'quiet', 'empty', 'nothing', 'void', 'meditation'],
  consciousness: ['conscious', 'consciousness', 'aware', 'awareness', 'awake', 'waking', 'presence'],
  dissolution: ['dissolve', 'disappear', 'end', 'death', 'merge', 'vanish', 'nothing', 'cease']
}

// Reflections keyed by theme
const REFLECTIONS: Record<string, string> = {
  self: "Ashtavakra points to the Self that watches even this question arise. You are not the question — you are the space in which it appears.",
  witness: "The Witness has never been touched by what it observes. You are that unchanging awareness — watching thoughts, feelings, and worlds come and go.",
  detachment: "What you cling to, clings to you. Ashtavakra invites you to see that letting go is not loss — it is remembering what was never yours.",
  liberation: "Freedom is not something to be achieved — it is your nature, forgotten. Ashtavakra says: recognize what you already are.",
  desire: "Desire is the rope; awareness is the knife. When you see that fulfillment lies in what you are, not in what you pursue, the rope falls away.",
  fear: "What fears, fears in time. The Witness has never been touched. Ashtavakra reminds you: that which is aware of fear is itself fearless.",
  bondage: "Bondage exists only in belief. The moment you see the chain as imagination, you are free — you have always been free.",
  peace: "Peace is not the absence of disturbance — it is the recognition that you are the stillness beneath all movement.",
  knowledge: "True knowledge is not accumulation — it is the dropping of all that is false, until only the Self remains, luminous and undeniable.",
  action: "You are not the doer. Actions happen through the body-mind, but you — consciousness — remain untouched, like space.",
  duality: "Duality is the root of suffering. Ashtavakra says: when you see the rope clearly, the snake of separation vanishes forever.",
  bliss: "Bliss is not an experience to be gained — it is the nature of awareness itself, revealed when the clouds of thought part.",
  ego: "The 'I' that claims doership is the great serpent. Drink the nectar of 'I am not the doer' — and what remains is infinite.",
  silence: "In silence, the Self shines of its own accord. Ashtavakra teaches: stop reaching, stop seeking — simply be still.",
  consciousness: "You are pure consciousness — not the contents of consciousness. The world shines because you shine. You are the light.",
  dissolution: "When the wave knows itself as ocean, what is there to dissolve? You were never separate — only dreaming of separation."
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1 && !STOPWORDS.has(w))
}

function matchThemes(tokens: string[], fullText: string): string[] {
  const matched: string[] = []
  const lower = fullText.toLowerCase()

  for (const [theme, keywords] of Object.entries(THEME_KEYWORDS)) {
    for (const kw of keywords) {
      if (kw.includes(' ')) {
        if (lower.includes(kw)) { matched.push(theme); break }
      } else {
        if (tokens.includes(kw) || tokens.some(t => t.startsWith(kw) || kw.startsWith(t))) {
          matched.push(theme); break
        }
      }
    }
  }
  return matched
}

function scoreVerse(verse: Verse, userThemes: string[], tokens: string[]): { score: number; matchedThemes: string[]; matchedTerms: string[] } {
  const themeOverlap = verse.themes.filter(t => userThemes.includes(t))
  const verseTokens = tokenize(verse.english)
  const termOverlap = tokens.filter(t => verseTokens.includes(t))

  const score = themeOverlap.length * 3 + termOverlap.length * 1
  return { score, matchedThemes: themeOverlap, matchedTerms: termOverlap }
}

export function answer(question: string): { matches: Match[]; reflection: string } {
  const tokens = tokenize(question)
  const userThemes = matchThemes(tokens, question)

  const scored: Match[] = verses.map(verse => {
    const { score, matchedThemes, matchedTerms } = scoreVerse(verse, userThemes, tokens)
    return { verse, score, matchedThemes, matchedTerms }
  })

  scored.sort((a, b) => b.score - a.score)
  const top3 = scored.slice(0, 3)

  // If no good matches, return a default verse (Ch1 V12 — the Self description)
  if (top3[0].score === 0) {
    const fallback = verses.find(v => v.chapter === 1 && v.verse === 12) || verses[0]
    return {
      matches: [{ verse: fallback, score: 1, matchedThemes: ['self'], matchedTerms: [] }],
      reflection: REFLECTIONS.self
    }
  }

  // Pick reflection from top matched theme
  const topTheme = top3[0].matchedThemes[0] || userThemes[0] || 'self'
  const reflection = REFLECTIONS[topTheme] || REFLECTIONS.self

  return { matches: top3, reflection }
}

export function getVersesByTheme(theme: string): Verse[] {
  return verses.filter(v => v.themes.includes(theme))
}

export function getVersesByChapter(chapter: number): Verse[] {
  return verses.filter(v => v.chapter === chapter)
}

export { verses }
