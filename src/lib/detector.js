export const categories = ['Colour', 'Layout', 'Composition', 'Typography', 'Shape', 'Motion']

export const checks = [
  {
    id: 'palette',
    category: 'Colour',
    name: 'Blue–violet palette',
    weight: 3,
    explanation:
      'Blue-violet is the colour most often used to signal “technology” or “AI”. When a large share of a design sits in that range, it reads as the familiar default.',
    alternative:
      'Derive colour from the product, the audience or the physical world it belongs to — and give each colour one job.',
  },
  {
    id: 'gradient',
    category: 'Colour',
    name: 'Gradient surface',
    weight: 2,
    explanation:
      'The background shifts colour from one corner to another. A diagonal gradient behind the hero is one of the most repeated SaaS conventions.',
    alternative: 'Try a flat ground colour, or a real image or texture that carries meaning instead of atmosphere.',
  },
  {
    id: 'centred',
    category: 'Layout',
    name: 'Centred, symmetrical hero',
    weight: 3,
    explanation:
      'The content in the first screen mirrors itself around the vertical centre: headline, subline and buttons stacked in the middle.',
    alternative:
      'Let the content decide the composition. An asymmetric axis, a product-first opening or an editorial alignment gives the eye a place to start.',
  },
  {
    id: 'cards',
    category: 'Composition',
    name: 'Row of matching cards',
    weight: 2,
    explanation:
      'The lower part of the screen breaks into several boxes of the same width — the classic feature row or bento grid.',
    alternative:
      'Rank the content. Give the most important idea the space, and separate the rest with rules and whitespace rather than identical boxes.',
  },
]

const notMeasured = {
  Typography: 'Typefaces can’t be read reliably from a screenshot yet.',
  Shape: 'Corner radius isn’t measured yet.',
  Motion: 'A still image has no motion.',
}

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max)

function hueOf(r, g, b) {
  const max = Math.max(r, g, b)
  const delta = max - Math.min(r, g, b)
  if (delta === 0) return 0

  let hue
  if (max === r) hue = ((g - b) / delta) % 6
  else if (max === g) hue = (b - r) / delta + 2
  else hue = (r - g) / delta + 4

  hue *= 60
  return hue < 0 ? hue + 360 : hue
}

const toHex = (rgb) => `#${rgb.map((value) => Math.round(value).toString(16).padStart(2, '0')).join('')}`

function luminanceGrid({ data, width, height }) {
  const lum = new Float32Array(width * height)
  for (let i = 0; i < width * height; i += 1) {
    lum[i] = (0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2]) / 255
  }
  return lum
}

// Removes a per-row quadratic trend so that multi-stop background gradients don't read as content.
function detrendRow(lum, width, y) {
  const row = new Float32Array(width)
  const position = (x) => (width === 1 ? 0 : (2 * x) / (width - 1) - 1)
  let s0 = 0
  let s2 = 0
  let s4 = 0
  let t0 = 0
  let t1 = 0
  let t2 = 0

  for (let x = 0; x < width; x += 1) {
    const p = position(x)
    const value = lum[y * width + x]
    s0 += 1
    s2 += p * p
    s4 += p ** 4
    t0 += value
    t1 += p * value
    t2 += p * p * value
  }

  const determinant = s0 * s4 - s2 * s2 || 1
  const constant = (t0 * s4 - s2 * t2) / determinant
  const curve = (s0 * t2 - s2 * t0) / determinant
  const slope = t1 / (s2 || 1)

  for (let x = 0; x < width; x += 1) {
    const p = position(x)
    row[x] = lum[y * width + x] - (constant + slope * p + curve * p * p)
  }
  return row
}

function measurePalette({ data, width, height }) {
  let blueViolet = 0
  const total = width * height

  for (let i = 0; i < total; i += 1) {
    const r = data[i * 4] / 255
    const g = data[i * 4 + 1] / 255
    const b = data[i * 4 + 2] / 255
    const max = Math.max(r, g, b)
    const chroma = max === 0 ? 0 : (max - Math.min(r, g, b)) / max
    const hue = hueOf(r, g, b)

    if (chroma > 0.25 && max > 0.12 && hue >= 205 && hue <= 300) {
      blueViolet += 1
    }
  }

  const share = blueViolet / total
  return {
    confidence: clamp((share - 0.05) / 0.35),
    evidence: `${Math.round(share * 100)}% of the image sits in the blue–violet range.`,
  }
}

function averageRegion({ data, width }, x0, y0, x1, y1) {
  const sum = [0, 0, 0]
  let count = 0
  for (let y = y0; y < y1; y += 1) {
    for (let x = x0; x < x1; x += 1) {
      const i = (y * width + x) * 4
      sum[0] += data[i]
      sum[1] += data[i + 1]
      sum[2] += data[i + 2]
      count += 1
    }
  }
  return sum.map((value) => value / Math.max(count, 1))
}

function measureGradient(image) {
  const { width, height } = image
  const cw = Math.max(1, Math.round(width * 0.12))
  const ch = Math.max(1, Math.round(height * 0.12))
  const topLeft = averageRegion(image, 0, 0, cw, ch)
  const topRight = averageRegion(image, width - cw, 0, width, ch)
  const bottomLeft = averageRegion(image, 0, height - ch, cw, height)
  const bottomRight = averageRegion(image, width - cw, height - ch, width, height)

  const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) / (255 * Math.sqrt(3))
  const pairs = [
    [topLeft, bottomRight, distance(topLeft, bottomRight)],
    [topRight, bottomLeft, distance(topRight, bottomLeft)],
    [topLeft, bottomLeft, distance(topLeft, bottomLeft)],
  ]
  const [from, to, shift] = pairs.reduce((best, pair) => (pair[2] > best[2] ? pair : best))

  const cornerChroma =
    [topLeft, topRight, bottomLeft, bottomRight]
      .map(([r, g, b]) => {
        const max = Math.max(r, g, b)
        return max === 0 ? 0 : (max - Math.min(r, g, b)) / max
      })
      .reduce((sum, value) => sum + value, 0) / 4

  return {
    confidence: clamp((shift - 0.06) / 0.2) * (cornerChroma > 0.15 ? 1 : 0.3),
    evidence:
      shift < 0.06
        ? 'The corners share roughly the same colour.'
        : `The background shifts from ${toHex(from)} to ${toHex(to)} across the frame.`,
  }
}

// Scores each horizontal band of the hero: centred content is both mirror-symmetric
// and balanced around the middle, which a text-left / image-right layout is not.
function measureCentred(image, lum) {
  const { width, height } = image
  const y0 = Math.round(height * 0.12)
  const y1 = Math.round(height * 0.7)
  const bandHeight = Math.max(2, Math.round(height * 0.05))

  let weighted = 0
  let totalEnergy = 0
  let symmetrySum = 0

  for (let top = y0; top < y1; top += bandHeight) {
    const energy = new Float32Array(width)
    for (let y = top; y < Math.min(y1, top + bandHeight); y += 1) {
      const row = detrendRow(lum, width, y)
      for (let x = 0; x < width; x += 1) energy[x] += Math.abs(row[x])
    }

    let bandTotal = 0
    let moment = 0
    let mismatch = 0
    for (let x = 0; x < width; x += 1) {
      bandTotal += energy[x]
      moment += energy[x] * (x + 0.5)
      mismatch += Math.abs(energy[x] - energy[width - 1 - x])
    }

    if (bandTotal / (bandHeight * width) < 0.01) continue

    const symmetry = 1 - mismatch / (2 * bandTotal)
    const centroid = moment / bandTotal / width
    const balance = clamp(1 - Math.abs(centroid - 0.5) / 0.08)

    weighted += bandTotal * symmetry * balance
    symmetrySum += bandTotal * symmetry
    totalEnergy += bandTotal
  }

  if (totalEnergy === 0) {
    return { confidence: 0, evidence: 'The top of the screen is almost empty.' }
  }

  const score = weighted / totalEnergy
  const symmetry = symmetrySum / totalEnergy

  return {
    confidence: clamp((score - 0.45) / 0.35),
    evidence:
      score >= 0.45
        ? `Content in the first screen is ${Math.round(symmetry * 100)}% mirror-symmetric and balanced on the centre line.`
        : 'Content in the first screen is weighted to one side rather than centred.',
  }
}

// Blocks are found from their sharp left and right edges, which smooth background gradients don't have.
function findBlocks(edges, sign, minWidth) {
  const blocks = []
  for (let i = 0; i < edges.length - 1; i += 1) {
    if (edges[i].sign === sign && edges[i + 1].sign === -sign) {
      const blockWidth = edges[i + 1].x - edges[i].x
      if (blockWidth >= minWidth) blocks.push(blockWidth)
    }
  }
  return blocks
}

function measureCards(image, lum) {
  const { width, height } = image
  const y0 = Math.round(height * 0.66)
  const y1 = Math.round(height * 0.96)
  const profile = new Float32Array(width)

  for (let y = y0; y < y1; y += 1) {
    for (let x = 0; x < width; x += 1) profile[x] += lum[y * width + x] / (y1 - y0)
  }

  const slope = new Float32Array(width)
  for (let x = 1; x < width - 1; x += 1) slope[x] = profile[x + 1] - profile[x - 1]
  const strongest = slope.reduce((max, value) => Math.max(max, Math.abs(value)), 0)

  if (strongest < 0.015) {
    return { confidence: 0, evidence: 'No repeated blocks found in the lower part of the screen.' }
  }

  const edges = []
  for (let x = 1; x < width - 1; x += 1) {
    const magnitude = Math.abs(slope[x])
    const isPeak = magnitude >= Math.abs(slope[x - 1]) && magnitude > Math.abs(slope[x + 1])
    if (isPeak && magnitude > strongest * 0.35) {
      const last = edges[edges.length - 1]
      if (last && x - last.x < 3 && last.sign === Math.sign(slope[x])) continue
      edges.push({ x, sign: Math.sign(slope[x]) })
    }
  }

  const minWidth = Math.round(width * 0.06)
  const candidates = [1, -1].map((sign) => findBlocks(edges, sign, minWidth))

  const scored = candidates.map((segments) => {
    if (segments.length < 2 || segments.length > 6) return 0
    const regular = Math.min(...segments) / Math.max(...segments) > 0.6
    if (segments.length >= 3) return regular ? 1 : 0.4
    return regular ? 0.55 : 0.2
  })

  const best = scored[0] >= scored[1] ? 0 : 1
  const count = candidates[best].length

  return {
    confidence: scored[best],
    evidence:
      scored[best] === 0
        ? 'No row of same-width blocks found in the lower part of the screen.'
        : `${count} blocks of similar width sit side by side in the lower part of the screen.`,
  }
}

function statusFor(confidence) {
  if (confidence >= 0.5) return 'detected'
  if (confidence >= 0.25) return 'possible'
  return 'clear'
}

export function buildReport(measurements) {
  const measured = checks.map((check) => {
    const { confidence, evidence } = measurements[check.id]
    return { ...check, confidence, evidence, status: statusFor(confidence) }
  })

  const totalWeight = measured.reduce((sum, check) => sum + check.weight, 0)
  const score = Math.round(
    (100 * measured.reduce((sum, check) => sum + check.weight * check.confidence, 0)) / totalWeight,
  )

  const rank = { detected: 2, possible: 1, clear: 0 }
  const categorySummary = categories.map((name) => {
    if (notMeasured[name]) {
      return { name, status: 'not measured', note: notMeasured[name] }
    }
    const inCategory = measured.filter((check) => check.category === name)
    const strongest = inCategory.reduce((best, check) => (rank[check.status] > rank[best.status] ? check : best))
    return { name, status: strongest.status, note: strongest.name }
  })

  const patterns = measured
    .filter((check) => check.status !== 'clear')
    .sort((a, b) => b.confidence - a.confidence)

  return { score, experimental: true, measured, patterns, categories: categorySummary }
}

export function analyzePixels(image) {
  const lum = luminanceGrid(image)
  return buildReport({
    palette: measurePalette(image),
    gradient: measureGradient(image),
    centred: measureCentred(image, lum),
    cards: measureCards(image, lum),
  })
}

export const sampleAnalysis = buildReport({
  palette: { confidence: 0.4, evidence: '19% of the image sits in the blue–violet range.' },
  gradient: { confidence: 0.05, evidence: 'The corners share roughly the same colour.' },
  centred: {
    confidence: 0.8,
    evidence: 'Content in the first screen is 84% mirror-symmetric and balanced on the centre line.',
  },
  cards: { confidence: 0.25, evidence: '2 blocks of similar width sit side by side in the lower part of the screen.' },
})

function readImageData(image) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d', { willReadFrequently: true })
  const targetSize = 180
  const scale = Math.min(targetSize / image.width, targetSize / image.height)
  canvas.width = Math.max(1, Math.round(image.width * scale))
  canvas.height = Math.max(1, Math.round(image.height * scale))
  context.drawImage(image, 0, 0, canvas.width, canvas.height)
  return context.getImageData(0, 0, canvas.width, canvas.height)
}

function roundedRect(context, x, y, width, height, radius) {
  context.beginPath()
  context.roundRect(x, y, width, height, radius)
  context.fill()
}

export function createExampleScreenshot() {
  const canvas = document.createElement('canvas')
  canvas.width = 1280
  canvas.height = 800
  const context = canvas.getContext('2d')

  const background = context.createLinearGradient(0, 0, 1280, 800)
  background.addColorStop(0, '#6d4ef5')
  background.addColorStop(0.48, '#2a5cf5')
  background.addColorStop(1, '#101a52')
  context.fillStyle = background
  context.fillRect(0, 0, 1280, 800)

  context.fillStyle = 'rgba(255, 255, 255, 0.16)'
  roundedRect(context, 540, 150, 200, 36, 18)

  context.fillStyle = '#f4f5ff'
  context.textAlign = 'center'
  context.font = '700 64px Inter, "Segoe UI", system-ui, sans-serif'
  context.fillText('Build the future of work,', 640, 270)
  context.fillText('faster.', 640, 345)

  context.fillStyle = 'rgba(244, 245, 255, 0.7)'
  context.font = '400 24px Inter, "Segoe UI", system-ui, sans-serif'
  context.fillText('The all-in-one platform for modern teams.', 640, 400)

  context.fillStyle = '#f4f5ff'
  roundedRect(context, 500, 440, 130, 50, 25)
  context.fillStyle = 'rgba(255, 255, 255, 0.16)'
  roundedRect(context, 650, 440, 130, 50, 25)

  context.fillStyle = 'rgba(255, 255, 255, 0.1)'
  roundedRect(context, 120, 560, 330, 180, 24)
  roundedRect(context, 475, 560, 330, 180, 24)
  roundedRect(context, 830, 560, 330, 180, 24)

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Could not create example screenshot.'))
        return
      }
      resolve(new File([blob], 'example-saas-landing.png', { type: 'image/png' }))
    }, 'image/png')
  })
}

export function analyzeDesign(file) {
  if (!file || !file.type.startsWith('image/')) {
    return Promise.reject(new Error('Upload a PNG, JPG or WEBP screenshot.'))
  }

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()

    image.onload = () => {
      try {
        resolve(analyzePixels(readImageData(image)))
      } catch (error) {
        reject(error)
      } finally {
        URL.revokeObjectURL(url)
      }
    }

    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not read that image.'))
    }

    image.src = url
  })
}
