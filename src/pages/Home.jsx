import { useState } from 'react'
import BreakTheDefault from '../components/BreakTheDefault'
import DefaultWorld from '../components/DefaultWorld'
import Detector from '../components/Detector'
import { Link } from '../router'

const journey = [
  { step: '1', label: 'See the default', to: '/#default' },
  { step: '2', label: 'Understand it', to: '/#idea' },
  { step: '3', label: 'Detect your design', to: '/#detect' },
  { step: '4', label: 'Break it', to: '/#break' },
]

const decisions = [
  { label: 'Switch off a default page', to: '/#default' },
  { label: 'Analyse my own design', to: '/#detect' },
  { label: 'Learn to direct AI', to: '/guide' },
]

function Home() {
  const [heroDefault, setHeroDefault] = useState(false)

  return (
    <>
      <section className={`hero ${heroDefault ? 'is-default' : ''}`}>
        <div className="hero-switch" role="group" aria-label="View this hero">
          <span>View this page</span>
          <button type="button" aria-pressed={!heroDefault} onClick={() => setHeroDefault(false)}>
            decided
          </button>
          <button type="button" aria-pressed={heroDefault} onClick={() => setHeroDefault(true)}>
            by default
          </button>
        </div>

        <p className="hero-kicker">{heroDefault ? 'Now with AI' : 'UNDEFAULT AI'}</p>
        <h1>
          Why does AI design everything <mark>the same?</mark>
        </h1>
        <p className="lede">
          AI can build almost anything. But when the direction is vague, it reaches for the
          familiar. UNDEFAULT AI helps you see those patterns — and decide what to do instead.
        </p>

        <p className="hero-note" aria-live="polite">
          {heroDefault
            ? 'Same words, nobody deciding: gradient, centred, geometric sans, pills, glow.'
            : 'Try “by default” to see this page if nobody made a decision.'}
        </p>

        <nav className="journey" aria-label="What you can do here">
          <ol>
            {journey.map((item) => (
              <li key={item.step}>
                <Link to={item.to}>
                  <span>{item.step}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      <DefaultWorld />

      <section id="idea" className="thesis">
        <p className="step-mark">2 / 4 — Understand it</p>
        <p className="thesis-setup">The problem isn’t that these choices are bad.</p>
        <h2 className="thesis-statement">
          The problem is when <mark>nobody actually chose them.</mark>
        </h2>
        <p className="thesis-note">
          AI is very good at producing familiar design. UNDEFAULT is about making the decisions
          visible again.
        </p>
      </section>

      <section id="detect" className="section detect">
        <header className="section-head">
          <p className="step-mark">3 / 4 — Detect it</p>
          <h2>How much of your design is default?</h2>
          <p className="section-intro">
            Upload a screenshot and see which familiar patterns it leans on.
          </p>
        </header>

        <Detector />
      </section>

      <section id="break" className="section break">
        <header className="section-head">
          <p className="step-mark">4 / 4 — Break it</p>
          <h2>Don’t just tell AI what you want. Tell it what decisions to make.</h2>
        </header>

        <BreakTheDefault />

        <p className="further">
          Want to go further?{' '}
          <Link to="/guide">Learn how to give AI better creative direction →</Link>
        </p>
      </section>

      <section className="final">
        <h2>
          <span>AI can make the website.</span> You still need to make the decisions.
        </h2>

        <nav className="decide" aria-label="Make a decision">
          <p className="step-mark">Make a decision</p>
          <ol>
            {decisions.map((decision) => (
              <li key={decision.label}>
                <Link to={decision.to}>{decision.label}</Link>
              </li>
            ))}
          </ol>
        </nav>
      </section>
    </>
  )
}

export default Home
