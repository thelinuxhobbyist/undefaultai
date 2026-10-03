import DefaultWorld from '../components/DefaultWorld'
import { defaultPatterns, defaultVsDecided, otherDefaults } from '../lib/content'
import { Link } from '../router'

function DefaultPage() {
  return (
    <>
      <DefaultWorld />

      <section className="catalogue" aria-labelledby="catalogue-title">
        <div className="catalogue-inner">
          <header className="catalogue-head">
            <span className="catalogue-pill">✦ Pattern library</span>
            <h2 id="catalogue-title">
              Everything you need to look like <span>everyone else.</span>
            </h2>
            <p>
              This section is built entirely from the defaults it describes. That’s the point: you
              recognise it before you’ve read a word.
            </p>
          </header>

          <ul className="catalogue-grid">
            {defaultPatterns.map((pattern) => (
              <li key={pattern.id} className={`catalogue-card catalogue-${pattern.id}`}>
                <span className="catalogue-category">{pattern.category}</span>
                <h3>{pattern.name}</h3>
                <p>{pattern.why}</p>
                <p className="catalogue-looks">
                  <b>Looks like</b> {pattern.looksLike}
                </p>
              </li>
            ))}
          </ul>

          <div className="catalogue-more">
            <h3>And the rest of the kit</h3>
            <ul>
              {otherDefaults.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}</strong>
                  <span>{item.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="contrast" aria-labelledby="contrast-title">
        <header className="contrast-head">
          <h2 id="contrast-title">
            Same six questions. <mark>Answered on purpose.</mark>
          </h2>
          <p>
            Every design answers these questions whether or not anyone asks them. The default
            answers them for you. This site answers them on purpose.
          </p>
        </header>

        <div className="contrast-table" role="table" aria-label="Default versus undefault decisions">
          <div className="contrast-row contrast-labels" role="row">
            <span role="columnheader" className="contrast-category">
              Question
            </span>
            <span role="columnheader" className="contrast-default">
              <b>Default</b> familiar AI/SaaS design language
            </span>
            <span role="columnheader" className="contrast-decided">
              <b>
                <mark>Un</mark>default
              </b>{' '}
              deliberate design decisions
            </span>
          </div>
          {defaultVsDecided.map((row) => (
            <div key={row.category} className="contrast-row" role="row">
              <span role="rowheader" className="contrast-category">
                {row.category}
              </span>
              <span role="cell" className="contrast-default">
                {row.byDefault}
              </span>
              <span role="cell" className="contrast-decided">
                {row.decided}
              </span>
            </div>
          ))}
        </div>
      </section>

      <nav className="page-next" aria-label="Where to go next">
        <p>Recognise any of these in your own work?</p>
        <div className="cta-row">
          <Link className="button button-primary" to="/detect">
            Detect a design →
          </Link>
          <Link className="button" to="/break">
            Learn to break it →
          </Link>
        </div>
      </nav>
    </>
  )
}

export default DefaultPage
