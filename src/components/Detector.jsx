import { useEffect, useRef, useState } from 'react'
import { analyzeDesign, createExampleScreenshot, sampleAnalysis } from '../lib/detector'

const acceptedTypes = ['image/png', 'image/jpeg', 'image/webp']
const steps = ['Upload', 'Analyse', 'See patterns', 'Get suggestions']
const minimumAnalysisMs = 900

const bands = [
  { label: 'Mostly decided', from: 0, to: 35 },
  { label: 'Mixed', from: 35, to: 65 },
  { label: 'Mostly default', from: 65, to: 101 },
]

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const pad = (number) => String(number).padStart(2, '0')

function currentStep(status) {
  if (status === 'analyzing') return 1
  if (status === 'done') return 4
  return 0
}

function Detector() {
  const [status, setStatus] = useState('idle')
  const [analysis, setAnalysis] = useState(sampleAnalysis)
  const [error, setError] = useState('')
  const [fileName, setFileName] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!previewUrl) {
      return undefined
    }
    return () => URL.revokeObjectURL(previewUrl)
  }, [previewUrl])

  const analyse = async (file) => {
    if (!file) {
      return
    }

    setFileName(file.name)
    setError('')

    if (!acceptedTypes.includes(file.type)) {
      setPreviewUrl('')
      setStatus('error')
      setError('That file isn’t a PNG, JPG or WEBP image.')
      return
    }

    setPreviewUrl(URL.createObjectURL(file))
    setStatus('analyzing')

    try {
      const uploadBody = new FormData()
      uploadBody.append('file', file)
      fetch('/api/detect', { method: 'POST', body: uploadBody }).catch(() => {})

      const [result] = await Promise.all([analyzeDesign(file), wait(minimumAnalysisMs)])
      setAnalysis(result)
      setStatus('done')
    } catch (analysisError) {
      setStatus('error')
      setError(analysisError.message || 'Something went wrong reading that image.')
    }
  }

  const analyseExample = async () => {
    try {
      analyse(await createExampleScreenshot())
    } catch {
      setStatus('error')
      setError('Couldn’t create the example screenshot in this browser.')
    }
  }

  const reset = () => {
    setStatus('idle')
    setAnalysis(sampleAnalysis)
    setError('')
    setFileName('')
    setPreviewUrl('')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    analyse(event.dataTransfer.files?.[0])
  }

  const step = currentStep(status)
  const isExample = status === 'idle' || status === 'error'
  const activeBand = bands.find((band) => analysis.score >= band.from && analysis.score < band.to)
  const detectedCount = analysis.patterns.filter((pattern) => pattern.status === 'detected').length

  return (
    <div className={`tool ${status === 'analyzing' ? 'is-analyzing' : ''}`}>
      <div className="tool-bar">
        <span>undefault / detector</span>
        <span>experimental — v0.2</span>
      </div>

      <ol className="tool-steps" aria-label="How the detector works">
        {steps.map((label, index) => (
          <li
            key={label}
            className={index < step ? 'is-done' : index === step ? 'is-current' : undefined}
            aria-current={index === step ? 'step' : undefined}
          >
            <span>{pad(index + 1)}</span>
            {label}
          </li>
        ))}
      </ol>

      <div className="tool-body">
        <div className="tool-input">
          <p className="tool-label">01 — Upload</p>
          <label
            className={`dropzone ${isDragging ? 'is-dragging' : ''} ${previewUrl ? 'has-preview' : ''}`}
            onDragOver={(event) => {
              event.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept={acceptedTypes.join(',')}
              onChange={(event) => analyse(event.target.files?.[0])}
            />
            {previewUrl ? (
              <img src={previewUrl} alt={`Uploaded screenshot: ${fileName}`} />
            ) : (
              <>
                <strong>Drop a screenshot here</strong>
                <small>or click to choose a file — PNG, JPG or WEBP</small>
              </>
            )}
          </label>

          <div className="tool-meta">
            <span>
              {status === 'analyzing' ? '02 — Analysing…' : fileName || 'No file selected'}
            </span>
            {status === 'idle' ? (
              <button type="button" className="text-button" onClick={analyseExample}>
                No screenshot? Use an example
              </button>
            ) : (
              <button type="button" className="text-button" onClick={reset} disabled={status === 'analyzing'}>
                Analyse another
              </button>
            )}
          </div>

          {error && (
            <p className="tool-error" role="alert">
              {error}
            </p>
          )}
        </div>

        <div className="report" aria-live="polite" aria-busy={status === 'analyzing'}>
          {isExample && <p className="report-flag">Example report — upload a screenshot to see yours</p>}

          <div className="report-score">
            <p className="report-figure">
              <strong>{analysis.score}%</strong> default patterns
            </p>
            <p className="report-caveat">
              <b>Experimental design indicator.</b> It measures how strongly a screenshot leans on
              familiar AI/SaaS conventions. It is not proof that a design was made by AI, and it
              doesn’t judge whether a design is good.
            </p>
          </div>

          <ol className="report-scale" aria-label="Where this design sits">
            {bands.map((band) => (
              <li key={band.label} className={band === activeBand ? 'is-active' : undefined}>
                {band.label}
              </li>
            ))}
          </ol>

          <div>
            <p className="report-label">Categories</p>
            <ul className="report-categories">
              {analysis.categories.map((category) => (
                <li key={category.name} data-status={category.status}>
                  <strong>{category.name}</strong>
                  <span>{category.status}</span>
                  <small>{category.note}</small>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="report-label">
              03 — Patterns found
              <span>
                {detectedCount} detected, {analysis.patterns.length - detectedCount} possible
              </span>
            </p>
            {analysis.patterns.length === 0 ? (
              <p className="report-empty">
                None of the measured conventions came through strongly. That doesn’t make the design
                decided — it means the obvious defaults aren’t doing the work.
              </p>
            ) : (
              <ul className="report-patterns">
                {analysis.patterns.map((pattern) => (
                  <li key={pattern.id} data-status={pattern.status}>
                    <div className="report-pattern-head">
                      <strong>{pattern.name}</strong>
                      <span>
                        {pattern.category} · {pattern.status}
                      </span>
                    </div>
                    <span className="report-meter" aria-hidden="true">
                      <span style={{ width: `${Math.round(pattern.confidence * 100)}%` }} />
                    </span>
                    <p className="report-evidence">{pattern.evidence}</p>
                    <p>{pattern.explanation}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <p className="report-label">04 — Suggestions</p>
            <ul className="report-suggestions">
              {(analysis.patterns.length ? analysis.patterns : analysis.measured.slice(0, 1)).map((pattern) => (
                <li key={pattern.id}>
                  <span>Instead of {pattern.name.toLowerCase()}</span>
                  <p>{pattern.alternative}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detector
