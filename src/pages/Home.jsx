import { useState } from 'react'
import { Link } from '../router'

const conventions = [
  'Purple / blue gradient',
  'Rounded cards',
  'Centred hero',
  'Familiar typography',
  'Bento-style layout',
  'Pills',
  'Generic SaaS structure',
]

const experiences = [
  {
    id: 'default',
    to: '/default',
    name: 'The default',
    claim: 'See the patterns AI keeps reaching for.',
    text: 'Explore the familiar visual conventions that repeatedly appear in AI-generated interfaces.',
    action: 'Explore',
    preview: <span className="preview-default">✦ Now with AI</span>,
  },
  {
    id: 'detect',
    to: '/detect',
    name: 'Detect',
    claim: 'How much of your design is default?',
    text: 'Upload a screenshot and explore the familiar patterns detected in it.',
    action: 'Detect a design',
    preview: (
      <span className="preview-detect">
        <b>42%</b> default patterns
      </span>
    ),
  },
  {
    id: 'break',
    to: '/break',
    name: 'Break',
    claim: 'Give AI better creative direction.',
    text: 'Learn how deliberate decisions can move an AI-generated design away from familiar conventions.',
    action: 'Break the default',
    preview: (
      <span className="preview-break">
        <s>Make it modern.</s> Use an editorial visual language.
      </span>
    ),
  },
  {
    id: 'guide',
    to: '/guide',
    name: 'Guide',
    claim: 'Go deeper.',
    text: 'A practical guide to using AI as a production tool without letting it make all of the creative decisions.',
    action: 'Read the guide',
    preview: <span className="preview-guide">Eight chapters</span>,
  },
]

const pad = (number) => String(number).padStart(2, '0')

function Marker({ index, active }) {
  return (
    <span className={`mini-marker mini-marker-${index + 1} ${active ? 'is-active' : ''}`}>
      {index + 1}
    </span>
  )
}

function Home() {
  const [hovered, setHovered] = useState(null)

  return (
    <>
      <section className="home-hero">
        <p className="home-kicker">UNDEFAULT AI</p>
        <h1>
          Why does AI design everything <mark>the same?</mark>
        </h1>
        <div className="home-hero-foot">
          <p className="lede">
            AI can build almost anything. But when the direction is vague, it tends to reach for the
            familiar.
          </p>
          <div className="cta-row">
            <Link className="button button-primary" to="/default">
              Explore the default
            </Link>
            <Link className="button" to="/detect">
              Detect a design
            </Link>
          </div>
        </div>
      </section>

      <section className="home-default" aria-labelledby="home-default-title">
        <div className="home-default-text">
          <h2 id="home-default-title">
            AI doesn’t invent from nothing. <span>It recognises patterns.</span>
          </h2>
          <ol className="home-default-legend" onMouseLeave={() => setHovered(null)}>
            {conventions.map((name, index) => (
              <li
                key={name}
                className={hovered === index ? 'is-active' : undefined}
                onMouseEnter={() => setHovered(index)}
              >
                <span>{index + 1}</span>
                {name}
              </li>
            ))}
          </ol>
          <Link className="arrow-link" to="/default">
            Explore the default →
          </Link>
        </div>

        <figure className="mini-default" aria-label="A typical AI-generated landing page">
          <div className="mini-site" aria-hidden="true">
            <div className="mini-nav">
              <b>Lumina</b>
              <span>Product</span>
              <span>Pricing</span>
              <i>Get started</i>
            </div>
            <div className="mini-hero">
              <span className="mini-pill">✦ Now with AI</span>
              <strong>Build the future of work, faster.</strong>
              <p>The all-in-one platform for modern teams.</p>
              <div className="mini-actions">
                <i>Start free</i>
                <i>Watch demo</i>
              </div>
            </div>
            <div className="mini-bento">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          {conventions.map((name, index) => (
            <Marker key={name} index={index} active={hovered === index} />
          ))}
          <figcaption>You’ve seen this page before. Nobody chose any of it.</figcaption>
        </figure>
      </section>

      <section className="thesis">
        <p className="thesis-setup">The problem isn’t that these choices are bad.</p>
        <h2 className="thesis-statement">
          The problem is when <mark>nobody actually chose them.</mark>
        </h2>
      </section>

      <section className="experiences" aria-labelledby="experiences-title">
        <header className="experiences-head">
          <h2 id="experiences-title">Four ways in.</h2>
          <p>
            UNDEFAULT AI helps you recognise familiar patterns, analyse them, and make more
            deliberate design decisions. Start wherever you like.
          </p>
        </header>

        <ol className="experience-list">
          {experiences.map((item, index) => (
            <li key={item.id}>
              <Link className={`experience experience-${item.id}`} to={item.to}>
                <span className="experience-number">{pad(index + 1)}</span>
                <span className="experience-name">{item.name}</span>
                <span className="experience-copy">
                  <strong>{item.claim}</strong>
                  <span>{item.text}</span>
                </span>
                <span className="experience-preview" aria-hidden="true">
                  {item.preview}
                </span>
                <span className="experience-action">{item.action} →</span>
              </Link>
            </li>
          ))}
        </ol>
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
