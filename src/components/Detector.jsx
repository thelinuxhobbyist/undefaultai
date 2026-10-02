import { useEffect, useRef, useState } from 'react'
import { analyzeDesign, createExampleScreenshot, sampleAnalysis } from '../lib/detector'

const acceptedTypes = ['image/png', 'image/jpeg', 'image/webp']
const steps = ['Upload', 'Analyse', 'See patterns', 'Get suggestions']
const minimumAnalysisMs = 900

const bands = [
  { label: 'Mostly decided', from: 0, to: 40 },
  { label: 'Mixed', from: 40, to: 70 },
  { label: 'Mostly default', from: 70, to: 101 },
]

const failedAnalysis = {
  score: 0,
  experimental: true,
  patterns: [{ category: 'input', name: 'Analysis failed', severity: 'low' }],
  recommendations: [
    {
      detected: 'Upload issue',
      alternative: 'Try a PNG, JPG, or WEBP screenshot with a clear product or landing-page composition.',
    },
  ],
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function currentStep(status) {
  if (status === 'analyzing') return 1
  if (status === 'done' || status === 'error') return 4
  return 0
}

function Detector() {
  const [status, setStatus] = useState('idle')
  const [analysis, setAnalysis] = useState(sampleAnalysis)
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
    setPreviewUrl(acceptedTypes.includes(file.type) ? URL.createObjectURL(file) : '')
    setStatus('analyzing')

    try {
      const uploadBody = new FormData()
      uploadBody.append('file', file)
      fetch('/api/detect', { method: 'POST', body: uploadBody }).catch(() => {})

      const [result] = await Promise.all([analyzeDesign(file), wait(minimumAnalysisMs)])
      setAnalysis(result)
      setStatus('done')
    } catch {
      setAnalysis(failedAnalysis)
      setStatus('error')
    }
  }

  const analyseExample = async () => {
    try {
      analyse(await createExampleScreenshot())
    } catch {
      setAnalysis(failedAnalysis)
      setStatus('error')
    }
  }

  const reset = () => {
    setStatus('idle')
    setAnalysis(sampleAnalysis)
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
  const isExample = status === 'idle'
  const activeBand = bands.find((band) => analysis.score >= band.from && analysis.score < band.to)

  return (
    <div className={`tool ${status === 'analyzing' ? 'is-analyzing' : ''}`}>
      <div className="tool-bar">
        <span>undefault / detector</span>
        <span>experimental — v0.1</span>
      </div>

      <ol className="tool-steps" aria-label="How the detector works">
        {steps.map((label, index) => (
          <li
            key={label}
            className={index < step ? 'is-done' : index === step ? 'is-current' : undefined}
            aria-current={index === step ? 'step' : undefined}
          >
            <span>{index + 1}</span>
            {label}
          </li>
        ))}
      </ol>

      <div className="tool-body">
        <div className="tool-input">
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
            <span>{status === 'analyzing' ? 'Analysing…' : fileName || 'No file selected'}</span>
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
        </div>

        <div className="report" aria-live="polite" aria-busy={status === 'analyzing'}>
          {isExample && <p className="report-flag">Example report — upload a screenshot to see yours</p>}

          <div className="report-score">
            <p>
              <strong>{analysis.score}%</strong> default patterns
            </p>
            <p className="report-caveat">
              Experimental indicator, based on detected visual conventions. This is not a
              measurement of whether the design was created by AI.
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
            <p className="report-label">Patterns found</p>
            <ul className="report-patterns">
              {analysis.patterns.map((pattern) => (
                <li key={`${pattern.category}-${pattern.name}`} data-severity={pattern.severity}>
                  <strong>{pattern.name}</strong>
                  <span>
                    {pattern.category} · {pattern.severity}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="report-label">Suggestions</p>
            <ul className="report-suggestions">
              {analysis.recommendations.map((recommendation) => (
                <li key={`${recommendation.detected}-${recommendation.alternative}`}>
                  <span>Instead of {recommendation.detected.toLowerCase()}</span>
                  <p>{recommendation.alternative}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="tool-note">
        The detector reads simple visual signals — colour, brightness and composition — and points
        at familiar conventions. It doesn’t judge whether a design is good.
      </p>
    </div>
  )
}

export default Detector
