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
    return 'Familiar? Nobody chose any of this. Start switching it off.'
  }

  if (activeCount === 0) {
    return 'Not necessarily better — but now every choice is a decision.'
  }

  return `${allIds.length - activeCount} decided, ${activeCount} still on autopilot.`
}

function DefaultWorld() {
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

  const worldClass = ['world', ...[...active].map((id) => `p-${id}`)].join(' ')

  return (
    <section id="default" className={worldClass}>
      <div className="world-inner">
        <header className="world-head">
          <p className="world-kicker">1 / 4 — See the default</p>
          <h2>AI doesn’t invent from nothing. It recognises patterns.</h2>
        </header>

        <div className="world-body">
          <div className="world-controls">
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
                      <span className="switch">{isOn ? 'on' : 'off'}</span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <button
              type="button"
              className="world-all"
              onClick={() => setActive(activeCount === 0 ? new Set(allIds) : new Set())}
            >
              {activeCount === 0 ? 'Restore the default' : 'Switch all off'}
            </button>
          </div>

          <figure className="specimen-frame">
            <div className="specimen" aria-hidden="true">
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

            <figcaption aria-live="polite">
              <span>
                {activeCount} of {allIds.length} defaults on
              </span>
              {captionFor(activeCount)}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

export default DefaultWorld
