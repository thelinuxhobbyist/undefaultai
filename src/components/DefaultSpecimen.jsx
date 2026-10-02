import { useState } from 'react'
import { defaultPatterns } from '../lib/content'

const allIds = defaultPatterns.map((pattern) => pattern.id)

const features = [
  { label: 'Plan', title: 'Smarter workflows' },
  { label: 'Build', title: 'Ship in minutes' },
  { label: 'Scale', title: 'Enterprise ready' },
  { label: 'Insight', title: 'Real-time analytics' },
]

function captionFor(activeCount) {
  if (activeCount === allIds.length) {
    return 'Familiar? Every choice on this page was made by default.'
  }

  if (activeCount === 0) {
    return 'Not necessarily better — but now every choice is a decision.'
  }

  return `${allIds.length - activeCount} decided, ${activeCount} still on autopilot.`
}

function DefaultSpecimen() {
  const [active, setActive] = useState(() => new Set(allIds))
  const activeCount = active.size

  const toggle = (id) => {
    setActive((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const specimenClass = ['specimen', ...[...active].map((id) => `p-${id}`)].join(' ')

  return (
    <div className="default-layout">
      <ul className="pattern-toggles" aria-label="Common AI design defaults">
        {defaultPatterns.map((pattern) => {
          const isOn = active.has(pattern.id)

          return (
            <li key={pattern.id}>
              <button
                type="button"
                className="pattern-toggle"
                aria-pressed={isOn}
                onClick={() => toggle(pattern.id)}
              >
                <strong>{pattern.name}</strong>
                <small>{pattern.note}</small>
                <span className="switch">{isOn ? 'On' : 'Off'}</span>
              </button>
            </li>
          )
        })}
      </ul>

      <figure className="specimen-frame">
        <div className="specimen-meta">
          <span>
            {activeCount} of {allIds.length} defaults on
          </span>
          <button
            type="button"
            className="text-button"
            onClick={() => setActive(activeCount === 0 ? new Set(allIds) : new Set())}
          >
            {activeCount === 0 ? 'Restore the default' : 'Switch all off'}
          </button>
        </div>

        <div className={specimenClass} aria-hidden="true">
          <div className="specimen-nav">
            <span className="specimen-logo">Lumina</span>
            <span className="specimen-links">
              <span>Product</span>
              <span>Pricing</span>
              <span>About</span>
            </span>
            <span className="specimen-cta">Get started</span>
          </div>

          <div className="specimen-hero">
            <span className="specimen-kicker">Now with AI</span>
            <h3>Build the future of work, faster.</h3>
            <p>The all-in-one platform that helps modern teams move from idea to impact.</p>
            <div className="specimen-actions">
              <span>Start free</span>
              <span>Watch demo</span>
            </div>
          </div>

          <div className="specimen-features">
            {features.map((feature) => (
              <div key={feature.label} className="specimen-feature">
                <span>{feature.label}</span>
                <strong>{feature.title}</strong>
              </div>
            ))}
          </div>
        </div>

        <figcaption aria-live="polite">{captionFor(activeCount)}</figcaption>
      </figure>
    </div>
  )
}

export default DefaultSpecimen
