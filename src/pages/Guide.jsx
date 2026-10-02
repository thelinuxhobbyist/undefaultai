import { decisionFramework, methodSteps, promptExamples, uniquenessTest } from '../lib/content'
import { Link } from '../router'

const extraSections = [
  { id: 'choices', title: 'Choose, don’t accept' },
  { id: 'prompts', title: 'Prompt library' },
  { id: 'test', title: 'The competitor test' },
]

const pad = (number) => String(number).padStart(2, '0')

function Guide() {
  return (
    <article className="guide">
      <header className="guide-hero">
        <p className="eyebrow">The guide — Break the default</p>
        <div>
          <h1>Move AI from creative director to production assistant.</h1>
          <p className="lede">
            Decide the strategy, personality, content and user experience yourself first — then
            use AI to execute and refine them. Vague prompts and shared templates push every tool
            toward the same familiar result.
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
            {extraSections.map((section) => (
              <li key={section.id}>
                <Link to={`/guide#${section.id}`}>
                  <span>—</span>
                  {section.title}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="guide-content">
          <ol className="method-list">
            {methodSteps.map((step, index) => (
              <li key={step.title} id={`step-${index + 1}`} className="method-step">
                <div className="method-index">
                  <span>{pad(index + 1)}</span>
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

          <section id="choices" className="guide-section">
            <h2>Choose, don’t accept.</h2>
            <p>
              Every design has an answer for each of these. The question is whether you picked it,
              or the model did.
            </p>
            <dl className="choices">
              {decisionFramework.map((group) => (
                <div key={group.title}>
                  <dt>{group.title}</dt>
                  <dd>
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="prompts" className="guide-section">
            <h2>Prompt library.</h2>
            <p>Replace adjectives with decisions the model can actually act on.</p>
            <ol className="say-list">
              {promptExamples.map((prompt) => (
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
          </section>

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
            <p className="eyebrow">Try it on your own work</p>
            <p className="further-line">See how much of your current design is default.</p>
            <Link className="button button-primary" to="/#detect">
              Open the detector →
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Guide
