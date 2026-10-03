import { useState } from 'react'
import { decisionFramework } from '../lib/content'

const pad = (number) => String(number).padStart(2, '0')

function composeBrief(choices) {
  const decided = decisionFramework.filter((group) => choices[group.title] !== undefined)
  const undecided = decisionFramework.filter((group) => choices[group.title] === undefined)

  const lines = decided.map((group) => `- ${group.title}: ${group.options[choices[group.title]].phrase}`)

  if (undecided.length) {
    lines.push(
      '',
      `Avoid the usual defaults: ${undecided.map((group) => group.byDefault).join('; ')}.`,
    )
  }

  const opening = decided.length
    ? 'Design this website with the following decisions:'
    : 'Design this website. (Nothing decided yet — choose options to add direction.)'

  return [opening, ...lines].join('\n')
}

function DirectionBuilder() {
  const [choices, setChoices] = useState({})
  const [copied, setCopied] = useState(false)

  const decidedCount = Object.keys(choices).length
  const brief = composeBrief(choices)

  const choose = (title, index) => {
    setCopied(false)
    setChoices((current) => {
      const next = { ...current }
      if (next[title] === index) {
        delete next[title]
      } else {
        next[title] = index
      }
      return next
    })
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(brief)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="builder">
      <ol className="builder-groups">
        {decisionFramework.map((group, groupIndex) => {
          const chosen = choices[group.title]

          return (
            <li key={group.title} className="builder-group">
              <div className="builder-title">
                <span>{pad(groupIndex + 1)}</span>
                <h3>{group.title}</h3>
              </div>

              <div className="builder-body">
                <p className="builder-question">{group.question}</p>
                <p className="builder-default">
                  Left undecided, AI picks <s>{group.byDefault}</s>
                </p>
                <div className="builder-options" role="group" aria-label={`${group.title} options`}>
                  {group.options.map((option, index) => (
                    <button
                      key={option.label}
                      type="button"
                      aria-pressed={chosen === index}
                      onClick={() => choose(group.title, index)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {chosen !== undefined && <p className="builder-phrase">{group.options[chosen].phrase}</p>}
              </div>
            </li>
          )
        })}
      </ol>

      <aside className="builder-output" aria-live="polite">
        <div className="builder-output-head">
          <span>Your direction</span>
          <span>
            {decidedCount} of {decisionFramework.length} decided
          </span>
        </div>
        <pre>{brief}</pre>
        <div className="builder-actions">
          <button type="button" className="button button-small button-primary" onClick={copy}>
            {copied ? 'Copied' : 'Copy brief'}
          </button>
          {decidedCount > 0 && (
            <button
              type="button"
              className="text-button"
              onClick={() => {
                setChoices({})
                setCopied(false)
              }}
            >
              Clear
            </button>
          )}
        </div>
      </aside>
    </div>
  )
}

export default DirectionBuilder
