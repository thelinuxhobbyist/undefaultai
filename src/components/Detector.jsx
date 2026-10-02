import { useEffect, useRef, useState } from 'react'
import { analyzeDesign, sampleAnalysis } from '../lib/detector'

const acceptedTypes = ['image/png', 'image/jpeg', 'image/webp']
const steps = ['Upload', 'Analyse', 'See patterns', 'Get suggestions']

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

function currentStep(status) {
  if (status === 'analyzing') return 1
  if (status === 'done' || status === 'error') return 3
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

      setAnalysis(await analyzeDesign(file))
      setStatus('done')
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

  return (
    <>
      <div className={`detector ${status === 'analyzing' ? 'is-analyzing' : ''}`}>
        <ol className="detector-steps" aria-label="How the detector works">
          {steps.map((label, index) => (
            <li
              key={label}
              className={index < step ? 'is-done' : index === step ? 'is-current' : undefined}
              aria-current={index === step ? 'step' : undefined}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {label}
            </li>
          ))}
        </ol>

        <div className="detector-input">
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

          <div className="detector-meta">
            <span>{status === 'analyzing' ? 'Analysing…' : fileName || 'No file selected'}</span>
            {status !== 'idle' && (
              <button type="button" className="text-button" onClick={reset}>
                Analyse another
              </button>
            )}
          </div>
        </div>

        <div className="detector-report" aria-live="polite" aria-busy={status === 'analyzing'}>
          <div className="report-top">
            <div>
              <p className="report-label">Default score</p>
              <p className="report-score">
                {analysis.score}
                <small>%</small>
              </p>
            </div>
            <span className="report-tag">{isExample ? 'Example report' : 'Experimental'}</span>
          </div>

          <div className="report-meter" aria-hidden="true">
            <span style={{ width: `${analysis.score}%` }} />
          </div>

          <div>
            <p className="report-label">Patterns found</p>
            <ul className="report-patterns">
              {analysis.patterns.map((pattern) => (
                <li key={`${pattern.category}-${pattern.name}`} data-severity={pattern.severity}>
                  <span>{pattern.category}</span>
                  <strong>{pattern.name}</strong>
                  <em>{pattern.severity}</em>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="report-label">Suggestions</p>
            <ul className="report-suggestions">
              {analysis.recommendations.map((recommendation) => (
                <li key={`${recommendation.detected}-${recommendation.alternative}`}>
                  <span>Instead of: {recommendation.detected}</span>
                  <p>{recommendation.alternative}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="detector-note">
        <p className="eyebrow">About the score</p>
        <p>
          The score is an experimental indicator built from simple visual signals — colour,
          brightness and composition. It points at familiar conventions. It can’t tell whether a
          design was made by AI, and it doesn’t judge whether a design is good.
        </p>
      </div>
    </>
  )
}

export default Detector
