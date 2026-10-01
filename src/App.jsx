import { useState } from 'react'
import {
  analyzeDesign,
  decisionFramework,
  defaultPatterns,
  promptExamples,
  sampleAnalysis,
} from './lib/detector'
import './App.css'

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'Why', href: '#why' },
  { label: 'Detect', href: '#detect' },
  { label: 'Break', href: '#framework' },
  { label: 'Library', href: '#library' },
  { label: 'About', href: '#about' },
]

function App() {
  const [defaultMode, setDefaultMode] = useState(false)
  const [analysis, setAnalysis] = useState(sampleAnalysis)
  const [selectedFile, setSelectedFile] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setSelectedFile(file.name)
    setIsAnalyzing(true)

    try {
      const uploadBody = new FormData()
      uploadBody.append('file', file)
      fetch('/api/detect', { method: 'POST', body: uploadBody }).catch(() => {})

      const nextAnalysis = await analyzeDesign(file)
      setAnalysis(nextAnalysis)
    } catch {
      setAnalysis({
        score: 0,
        experimental: true,
        patterns: [{ category: 'input', name: 'Analysis failed', severity: 'low' }],
        recommendations: [
          {
            detected: 'Upload issue',
            alternative: 'Try a PNG, JPG, or WEBP screenshot with a clear product or landing-page composition.',
          },
        ],
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className={`app-shell ${defaultMode ? 'ai-default-mode' : ''}`}>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="UNDEFAULT AI home">
          <span className="brand-mark">UN</span>
          <span className="brand-text">UNDEFAULT AI</span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="ghost-button"
          onClick={() => setDefaultMode((mode) => !mode)}
        >
          {defaultMode ? 'MAKE A DECISION' : 'SHOW AI DEFAULT'}
        </button>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-copy">
            <p className="eyebrow">UNDEFAULT AI</p>
            <h1>Why does AI design everything the same?</h1>
            <p className="lede">
              AI can build almost anything. But when the design decisions stay vague,
              it tends to reach for the familiar.
            </p>

            <div className="cta-row">
              <a className="primary-button" href="#detect">
                Explore the default
              </a>
              <button
                type="button"
                className="secondary-button"
                onClick={() => setDefaultMode(true)}
              >
                Break the default
              </button>
            </div>
          </div>

          <div className="hero-visual" aria-live="polite">
            <div className={`default-demo ${defaultMode ? 'is-default' : ''}`}>
              <div className="mini-nav">
                <span />
                <span />
                <span />
                <div className="mini-pill">alpha</div>
              </div>

              <div className="demo-hero">
                <p className="demo-kicker">A brighter workflow</p>
                <h2>Design the future without becoming another template.</h2>
                <div className="demo-actions">
                  <button type="button">Start free</button>
                  <button type="button" className="secondary-demo">
                    Watch demo
                  </button>
                </div>
              </div>

              <div className="demo-grid">
                <article>
                  <span>Plan</span>
                  <strong>Faster direction</strong>
                </article>
                <article>
                  <span>Build</span>
                  <strong>Sharper decisions</strong>
                </article>
                <article>
                  <span>Critique</span>
                  <strong>Less default thinking</strong>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="why" className="section">
          <div className="section-heading">
            <p className="eyebrow">The pattern</p>
            <h2>AI doesn’t invent from nothing. It recognises patterns.</h2>
          </div>

          <div className="pattern-grid">
            {defaultPatterns.map((pattern) => (
              <article key={pattern.name} className="pattern-card">
                <span className="pattern-label">{pattern.category}</span>
                <h3>{pattern.name}</h3>
                <p>{pattern.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section problem-block">
          <div className="problem-copy">
            <p className="eyebrow">The problem</p>
            <h2>The issue is not that these choices are bad.</h2>
            <p>
              It is that repeated use makes them feel inevitable. Familiarity can be
              efficient, but it can also flatten a brand into a generic visual language.
            </p>
          </div>

          <div className="quote-box">
            <p>“AI knows the familiar. You decide what happens next.”</p>
          </div>
        </section>

        <section id="framework" className="section framework-section">
          <div className="section-heading">
            <p className="eyebrow">Decision framework</p>
            <h2>Break the default by deciding more clearly.</h2>
          </div>

          <div className="framework-grid">
            {decisionFramework.map((group) => (
              <article key={group.title} className="framework-card">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="detect" className="section detector-section">
          <div className="section-heading">
            <p className="eyebrow">Detector</p>
            <h2>Experimental pattern analysis for visual familiarity.</h2>
          </div>

          <div className="detector-layout">
            <div className="detector-panel">
              <label className="upload-label" htmlFor="screenshot-upload">
                Upload a screenshot
              </label>
              <input
                id="screenshot-upload"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
              />

              <div className="upload-meta">
                <span>Supported: PNG, JPG, WEBP</span>
                <span>{isAnalyzing ? 'Analyzing…' : selectedFile || 'No file selected'}</span>
              </div>
            </div>

            <div className="report-panel" aria-live="polite">
              <div className="report-header">
                <div>
                  <p className="eyebrow small">AI default</p>
                  <h3>{analysis.score}%</h3>
                </div>
                <span className="report-tag">Experimental indicator</span>
              </div>

              <div className="pattern-breakdown">
                {analysis.patterns.map((pattern) => (
                  <div key={`${pattern.category}-${pattern.name}`} className="breakdown-row">
                    <span>{pattern.category}</span>
                    <strong>{pattern.name}</strong>
                    <em>{pattern.severity}</em>
                  </div>
                ))}
              </div>

              <ul className="recommendation-list">
                {analysis.recommendations.map((recommendation) => (
                  <li key={`${recommendation.detected}-${recommendation.alternative}`}>
                    <span>Detected: {recommendation.detected}</span>
                    <p>{recommendation.alternative}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="library" className="section library-section">
          <div className="section-heading">
            <p className="eyebrow">Don’t say / Say</p>
            <h2>Give AI better creative direction.</h2>
          </div>

          <div className="library-list">
            {promptExamples.map((example) => (
              <article key={example.category} className="prompt-card">
                <div className="prompt-side">
                  <span>Don’t say</span>
                  <p>{example.dont}</p>
                </div>
                <div className="prompt-side alt">
                  <span>Say</span>
                  <p>{example.say}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="section-heading">
            <p className="eyebrow">About</p>
            <h2>The goal is not to shame AI. It is to make design decisions visible.</h2>
          </div>

          <div className="about-copy">
            <p>
              UNDEFAULT AI is a design publication and interactive experiment built to
              surface the visual habits AI tends to repeat when direction is vague.
            </p>
            <p>
              The website itself follows the same principle: it should feel authored,
              editorial, and deliberate rather than simply generic.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>AI knows the familiar.</p>
        <strong>You decide what happens next.</strong>
      </footer>
    </div>
  )
}

export default App
