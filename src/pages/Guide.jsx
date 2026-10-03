import { methodSteps, uniquenessTest } from '../lib/content'
import { Link } from '../router'

const pad = (number) => String(number).padStart(2, '0')

function Guide() {
  return (
    <article className="guide">
      <header className="guide-hero">
        <p className="eyebrow">
          The guide
          <span>{methodSteps.length} chapters · about 10 minutes</span>
        </p>
        <div>
          <h1>Use AI to make the website. Don’t let it make the decisions.</h1>
          <p className="guide-standfirst">
            AI is an excellent production tool. The trouble starts when it quietly becomes the
            creative director, because it will direct every project towards the same familiar
            place. This guide is about keeping the decisions where they belong.
          </p>
        </div>
      </header>

      <div className="guide-body">
        <nav className="guide-toc" aria-label="Guide contents">
          <p className="eyebrow">Contents</p>
          <ol>
            {methodSteps.map((step, index) => (
              <li key={step.title}>
                <Link to={`/guide#step-${index + 1}`}>
                  <span>{pad(index + 1)}</span>
                  {step.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/guide#test">
                <span>—</span>
                The competitor test
              </Link>
            </li>
          </ol>
        </nav>

        <div className="guide-content">
          <p className="guide-opening">
            Ask a model for “a homepage for my AI product” and it will give you a centred headline on
            a purple-blue gradient, a pill that says “Now with AI”, and three rounded cards. Not
            because it’s lazy, but because that’s the most likely answer to a question with no
            other information in it. Every chapter below is a way of giving it that other
            information — or of keeping certain decisions for yourself.
          </p>

          <ol className="method-list">
            {methodSteps.map((step, index) => (
              <li key={step.title} id={`step-${index + 1}`} className="method-step">
                <div className="method-index">
                  <span>Chapter {pad(index + 1)}</span>
                  <h2>{step.title}</h2>
                </div>

                <div className="method-body">
                  <p className="method-summary">{step.summary}</p>

                  {step.items && (
                    <ul className="method-items">
                      {step.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {step.contrast && (
                    <div className="method-contrast">
                      <div>
                        <span>Generic</span>
                        <p>“{step.contrast.weak}”</p>
                      </div>
                      <div>
                        <span>Specific</span>
                        <p>“{step.contrast.strong}”</p>
                      </div>
                    </div>
                  )}

                  {step.split && (
                    <div className="method-contrast">
                      <div>
                        <span>Let AI handle</span>
                        <p>{step.split.ai}</p>
                      </div>
                      <div>
                        <span>Keep for humans</span>
                        <p>{step.split.human}</p>
                      </div>
                    </div>
                  )}

                  {step.example && (
                    <blockquote className="method-example">
                      <span>Example prompt</span>
                      <p>{step.example}</p>
                    </blockquote>
                  )}

                  <p className="method-note">{step.note}</p>
                </div>
              </li>
            ))}
          </ol>

          <section id="test" className="guide-section">
            <h2>Put your homepage beside three competitors and hide the logos.</h2>
            <p>If the answers are no, the website is probably still using category defaults.</p>
            <ol className="test-list">
              {uniquenessTest.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ol>
          </section>

          <p className="guide-principle">
            Don’t make an ordinary AI website look unusual at the end. Give the AI an unusual
            strategy at the beginning.
          </p>

          <div className="guide-further">
            <p className="eyebrow">Put it into practice</p>
            <p className="further-line">
              Turn these ideas into a brief, then check the result.
            </p>
            <div className="cta-row">
              <Link className="button button-primary" to="/break#decisions">
                Build a brief →
              </Link>
              <Link className="button" to="/detect">
                Detect a design
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Guide
