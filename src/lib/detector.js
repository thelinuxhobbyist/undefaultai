export const sampleAnalysis = {
  score: 73,
  experimental: true,
  patterns: [
    { category: 'layout', name: 'Centred hero', severity: 'high' },
    { category: 'shape', name: 'Rounded cards', severity: 'high' },
    { category: 'colour', name: 'Purple / blue gradient', severity: 'medium' },
  ],
  recommendations: [
    {
      detected: 'Centred hero',
      alternative: 'Consider asymmetric composition or editorial alignment to create sharper focus.',
    },
    {
      detected: 'Rounded cards',
      alternative: 'Introduce a mix of square edges and stronger spatial rhythm to reduce default familiarity.',
    },
  ],
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

function buildPatternList(patterns) {
  return patterns.map(({ category, name, severity }) => ({ category, name, severity }))
}

function calculateImageMetrics(image) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d', { willReadFrequently: true })
  const targetSize = 180
  const scale = Math.min(targetSize / image.width, targetSize / image.height)
  const width = Math.max(1, Math.round(image.width * scale))
  const height = Math.max(1, Math.round(image.height * scale))

  canvas.width = width
  canvas.height = height
  context.drawImage(image, 0, 0, width, height)

  const pixels = context.getImageData(0, 0, width, height).data
  let red = 0
  let green = 0
  let blue = 0
  let brightness = 0
  let saturation = 0
  let nearCenter = 0

  for (let index = 0; index < pixels.length; index += 4) {
    const r = pixels[index]
    const g = pixels[index + 1]
    const b = pixels[index + 2]
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const luminance = (r + g + b) / 3 / 255
    const chroma = max === 0 ? 0 : (max - min) / max

    red += r
    green += g
    blue += b
    brightness += luminance
    saturation += chroma

    const x = (index / 4) % width
    const y = Math.floor((index / 4) / width)
    const centerDistance = Math.hypot(x - width / 2, y - height / 2)
    nearCenter += clamp(1 - centerDistance / (Math.hypot(width, height) / 2), 0, 1)
  }

  const sampleCount = pixels.length / 4
  const averageRed = red / sampleCount / 255
  const averageGreen = green / sampleCount / 255
  const averageBlue = blue / sampleCount / 255
  const averageBrightness = brightness / sampleCount
  const averageSaturation = saturation / sampleCount
  const centerBias = nearCenter / sampleCount
  const blueSignal = averageBlue > averageRed * 1.08 && averageBlue > averageGreen * 1.02
  const purpleSignal = averageRed > 0.3 && averageBlue > 0.35 && averageRed > averageGreen * 0.8
  const defaultSignal = averageSaturation > 0.3 && (blueSignal || purpleSignal)

  return {
    width,
    height,
    aspectRatio: width / height,
    averageBrightness,
    averageSaturation,
    averageRed,
    averageGreen,
    averageBlue,
    blueSignal,
    purpleSignal,
    defaultSignal,
    centerBias,
  }
}

export function analyzeDesign(file) {
  if (!file || !file.type.startsWith('image/')) {
    return Promise.resolve({
      score: 0,
      experimental: true,
      patterns: [{ category: 'input', name: 'No image uploaded', severity: 'low' }],
      recommendations: [
        {
          detected: 'No image',
          alternative: 'Upload a screenshot for a visual pattern analysis.',
        },
      ],
    })
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    const image = new Image()

    reader.onload = () => {
      image.onload = () => {
        try {
          const metrics = calculateImageMetrics(image)
          const patterns = []

          if (metrics.defaultSignal || metrics.blueSignal || metrics.purpleSignal) {
            patterns.push({ category: 'colour', name: 'Purple / blue gradient', severity: 'high' })
          }

          if (metrics.aspectRatio > 1.1 && metrics.aspectRatio < 1.8 && metrics.centerBias > 0.58) {
            patterns.push({ category: 'layout', name: 'Centred hero', severity: 'high' })
          }

          if (metrics.averageBrightness > 0.45 && metrics.averageBrightness < 0.85) {
            patterns.push({ category: 'shape', name: 'Rounded cards', severity: 'medium' })
          }

          if (metrics.averageSaturation > 0.2) {
            patterns.push({ category: 'typography', name: 'High-contrast sans-serif mood', severity: 'medium' })
          }

          if (patterns.length === 0) {
            patterns.push({ category: 'layout', name: 'Low default signal', severity: 'low' })
          }

          const score = Math.min(96, 26 + patterns.length * 12 + (metrics.defaultSignal ? 12 : 4) + (metrics.centerBias > 0.6 ? 8 : 0))

          resolve({
            score: Math.round(score),
            experimental: true,
            patterns: buildPatternList(patterns),
            recommendations: [
              {
                detected: patterns[0]?.name ?? 'Generic SaaS rhythm',
                alternative: 'Introduce asymmetry, stronger typography contrast, or a more constrained palette to reduce the default signal.',
              },
              {
                detected: 'Default composition',
                alternative: 'Use off-grid layout decisions and fewer rounded, modular surfaces to make the design feel authored rather than generated.',
              },
            ],
          })
        } catch (error) {
          reject(error)
        }
      }

      image.onerror = () => reject(new Error('Could not read uploaded image.'))
      image.src = reader.result
    }

    reader.onerror = () => reject(new Error('Could not read file.'))
    reader.readAsDataURL(file)
  })
}
