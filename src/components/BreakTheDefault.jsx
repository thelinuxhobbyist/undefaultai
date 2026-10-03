import { useState } from 'react'
import { promptPairs } from '../lib/content'

function Thumb({ variant }) {
  return (
    <div className={`thumb thumb-${variant}`} aria-hidden="true">
      <span className="t-title" />
      <span className="t-line" />
      <span className="t-line" />
      <span className="t-block" />
      <span className="t-block" />
      <span className="t-block" />
    </div>
  )
}

function BreakTheDefault() {
  const [directed, setDirected] = useState(false)

  return (
    <div className={`break-demo ${directed ? 'is-directed' : ''}`}>
      <div className="break-switch" role="group" aria-label="Prompt style">
        <button type="button" aria-pressed={!directed} onClick={() => setDirected(false)}>
          Vague prompts
        </button>
        <button type="button" aria-pressed={directed} onClick={() => setDirected(true)}>
          Directed prompts
        </button>
      </div>

      <ol className="break-rows">
        {promptPairs.map((prompt) => (
          <li key={prompt.id}>
            <div className="break-prompt">
              <span>{directed ? 'Say' : 'Don’t say'}</span>
              {directed && <s>{prompt.dont}</s>}
              <p>{directed ? prompt.say : prompt.dont}</p>
            </div>
            <Thumb variant={directed ? prompt.id : 'default'} />
          </li>
        ))}
      </ol>

      <p className="break-caption" aria-live="polite">
        {directed ? (
          <>
            Three decisions. <mark>Three different results.</mark>
          </>
        ) : (
          <>
            Three different prompts. One familiar result.{' '}
            <button type="button" className="text-button" onClick={() => setDirected(true)}>
              Give it direction
            </button>
          </>
        )}
      </p>
    </div>
  )
}

export default BreakTheDefault
