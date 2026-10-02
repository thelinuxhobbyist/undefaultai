import DefaultSpecimen from '../components/DefaultSpecimen'
import Detector from '../components/Detector'
import { homepagePrompts } from '../lib/content'
import { Link } from '../router'

const journey = [
  { step: '01', label: 'See the default', detail: 'Six patterns you’ve seen before', to: '/#default' },
  { step: '02', label: 'Understand it', detail: 'Why it matters, in two lines', to: '/#idea' },
  { step: '03', label: 'Detect it', detail: 'Analyse your own screenshot', to: '/#detect' },
  { step: '04', label: 'Break it', detail: 'Direct AI with decisions', to: '/#break' },
]

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">UNDEFAULT AI</p>
          <h1>Why does AI design everything the same?</h1>
          <p className="lede">
            AI can build almost anything. But when the direction is vague, it tends to reach for
            the familiar. UNDEFAULT AI helps you see those patterns — and decide what to do
            instead.
          </p>

          <div className="cta-row">
            <Link className="button button-primary" to="/#default">
              Explore the default
            </Link>
            <Link className="button" to="/#detect">
              Detect a design
            </Link>
          </div>
        </div>

        <nav className="journey" aria-label="What you can do here">
          <p className="eyebrow">What you can do here</p>
          <ol>
            {journey.map((item) => (
              <li key={item.step}>
                <Link to={item.to}>
                  <span>{item.step}</span>
                  <strong>{item.label}</strong>
                  <em>{item.detail}</em>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      <section id="default" className="section">
        <header className="section-head">
          <p className="eyebrow">01 — The default</p>
          <div>
            <h2>AI doesn’t invent from nothing. It recognises patterns.</h2>
            <p className="section-intro">Switch them off one by one and watch what’s left.</p>
          </div>
        </header>

        <DefaultSpecimen />
      </section>

      <section id="idea" className="section idea">
        <p className="eyebrow">02 — The idea</p>
        <div>
          <h2 className="idea-statement">
            The problem isn’t that these choices are bad. The problem is when{' '}
            <em>nobody actually chose them.</em>
          </h2>
          <div className="idea-follow">
            <p>AI is very good at producing familiar design.</p>
            <p>UNDEFAULT is about making the decisions visible again.</p>
          </div>
        </div>
      </section>

      <section id="detect" className="section">
        <header className="section-head">
          <p className="eyebrow">03 — Detect</p>
          <div>
            <h2>How much of your design is default?</h2>
            <p className="section-intro">
              Upload a screenshot and explore the familiar patterns in your design.
            </p>
          </div>
        </header>

        <Detector />
      </section>

      <section id="break" className="section">
        <header className="section-head">
          <p className="eyebrow">04 — Break the default</p>
          <div>
            <h2>Don’t just tell AI what you want. Tell it what decisions to make.</h2>
          </div>
        </header>

        <ol className="say-list">
          {homepagePrompts.map((prompt) => (
            <li key={prompt.dont}>
              <div className="say-dont">
                <span>Don’t say</span>
                <p>{prompt.dont}</p>
              </div>
              <div className="say-do">
                <span>Say</span>
                <p>{prompt.say}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="further">
          <p className="eyebrow">Want to go further?</p>
          <p className="further-line">Learn how to give AI better creative direction.</p>
          <Link className="button button-primary" to="/guide">
            Explore design direction →
          </Link>
        </div>
      </section>

      <section className="final">
        <h2>
          <span>AI can make the website.</span> You still need to make the decisions.
        </h2>
      </section>
    </>
  )
}

export default Home
