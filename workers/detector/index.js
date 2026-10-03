const allowedTypes = new Set(['image/png', 'image/jpeg', 'image/webp'])

function scoreFromMetadata(file) {
  const name = (file.name || '').toLowerCase()
  const size = file.size || 0

  const rules = [
    { category: 'layout', name: 'Centred hero', severity: 'high', active: /landing|hero|home|homepage|startup|saas/i.test(name) },
    { category: 'shape', name: 'Rounded cards', severity: 'high', active: /dashboard|app|ui|product/i.test(name) },
    { category: 'colour', name: 'Purple / blue gradient', severity: 'high', active: /ai|brand|product|startup/i.test(name) },
    { category: 'typography', name: 'Geometric sans-serif mood', severity: 'medium', active: /saas|startup|landing/i.test(name) },
    { category: 'composition', name: 'Bento grid', severity: 'medium', active: /grid|dashboard|product/i.test(name) },
  ]

  const patterns = rules.filter((rule) => rule.active).map(({ category, name, severity }) => ({ category, name, severity }))

  if (patterns.length === 0) {
    patterns.push({ category: 'layout', name: 'Low default signal', severity: 'low' })
  }

  const score = Math.min(
    96,
    28 + patterns.length * 12 + (size > 500000 ? 10 : 4) + (name.includes('ai') || name.includes('brand') ? 8 : 0),
  )

  return {
    score: Math.round(score),
    experimental: true,
    patterns,
    recommendations: [
      {
        detected: patterns[0]?.name ?? 'Generic SaaS rhythm',
        alternative: 'Introduce asymmetry, stronger typography contrast, or a more constrained palette to reduce the default signal.',
      },
      {
        detected: 'Default composition',
        alternative: 'Use off-grid structure and fewer rounded, modular surfaces to make the design feel authored rather than generated.',
      },
    ],
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (!url.pathname.startsWith('/api/')) {
      return env.ASSETS.fetch(request)
    }

    if (url.pathname !== '/api/detect') {
      return Response.json({ error: 'Not found' }, { status: 404 })
    }

    if (request.method !== 'POST') {
      return Response.json({ error: 'Method not allowed' }, { status: 405 })
    }

    const contentType = request.headers.get('content-type') || ''

    if (!contentType.includes('multipart/form-data')) {
      return Response.json({ error: 'Expected multipart/form-data upload.' }, { status: 400 })
    }

    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File) || !allowedTypes.has(file.type)) {
      return Response.json({ error: 'Upload a PNG, JPG, or WEBP image.' }, { status: 400 })
    }

    const analysis = scoreFromMetadata(file)

    return Response.json({
      ...analysis,
      stored: false,
      note: 'Experimental design indicator only; this identifies visual conventions, not AI authorship. Uploads are never stored.',
    })
  },
}
