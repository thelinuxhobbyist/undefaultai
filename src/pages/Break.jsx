import BreakTheDefault from '../components/BreakTheDefault'
import DirectionBuilder from '../components/DirectionBuilder'
import { promptLibrary } from '../lib/content'
import { Link } from '../router'

const sections = [
  { id: 'adjectives', label: 'Adjectives aren’t directions' },
  { id: 'library', label: 'Don’t say → Say' },
  { id: 'decisions', label: 'Seven decisions' },
]

function Break() {
  return (
    <>
      <header className="break-head">
        <h1>
          Don’t just tell AI what you want. <mark>Tell it what decisions to make.</mark>
        </h1>
        <div className="break-head-aside">
          <p>
            A vague prompt doesn’t give the model less to do. It hands every decision back to it,
            and it answers with the most familiar option every time.
          </p>
          <nav aria-label="On this page">
            <ol>
              {sections.map((section) => (
                <li key={section.id}>
                  <Link to={`/break#${section.id}`}>{section.label}</Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </header>

      <section id="adjectives" className="break-section">
        <header className="break-section-head">
          <span>01</span>
          <h2>Adjectives aren’t directions.</h2>
          <p>
            “Modern”, “premium” and “creative” all describe the same familiar result. Switch the
            prompts and watch what changes when each one names a decision instead.
          </p>
        </header>
        <BreakTheDefault />
      </section>

      <section id="library" className="break-section">
        <header className="break-section-head">
          <span>02</span>
          <h2>Don’t say → Say.</h2>
          <p>Replace each adjective with something the model can actually act on.</p>
        </header>

        <ol className="say-list">
          {promptLibrary.map((prompt) => (
            <li key={prompt.dont}>
              <div className="say-dont">
                <span>Don’t say</span>
                <p>{prompt.dont}</p>
              </div>
              <div className="say-do">
                <span>Say</span>
                <p>{prompt.say}</p>
              </div>
              <span className="say-decides">{prompt.decides}</span>
            </li>
          ))}
        </ol>
      </section>

      <section id="decisions" className="break-section">
        <header className="break-section-head">
          <span>03</span>
          <h2>Seven decisions the default makes for you.</h2>
          <p>
            Make each one deliberately. Pick an option for every decision you care about, and the
            brief on the right turns your choices into direction you can paste into any AI tool.
          </p>
        </header>
        <DirectionBuilder />
      </section>

      <nav className="page-next" aria-label="Where to go next">
        <p>Generated something? Check how much of it is still default.</p>
        <div className="cta-row">
          <Link className="button button-primary" to="/detect">
            Detect a design →
          </Link>
          <Link className="button" to="/guide">
            Read the full guide
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Break
