export const defaultPatterns = [
  { id: 'typography', category: 'Typography', name: 'Geometric sans', note: 'Neutral, friendly, everywhere.' },
  { id: 'gradient', category: 'Colour', name: 'Purple / blue gradients', note: 'The colour of “AI”.' },
  { id: 'centred', category: 'Layout', name: 'Centred hero', note: 'Headline, subline, two buttons.' },
  { id: 'rounded', category: 'Shape', name: 'Rounded cards', note: 'Soft corners read as modern.' },
  { id: 'bento', category: 'Composition', name: 'Bento grid', note: 'Features in tidy boxes.' },
  { id: 'hover', category: 'Motion', name: 'Subtle hover animation', note: 'Lift, glow, repeat.' },
]

export const homepagePrompts = [
  {
    dont: 'Make it modern.',
    say: 'Use an editorial visual language. Avoid contemporary SaaS conventions.',
  },
  {
    dont: 'Make it premium.',
    say: 'Use restrained typography, high contrast and a limited colour palette.',
  },
  {
    dont: 'Make it creative.',
    say: 'Break the conventional grid and allow elements to overlap.',
  },
]

export const decisionFramework = [
  { title: 'Typography', items: ['Serif', 'Condensed', 'Display', 'Mixed type'] },
  { title: 'Composition', items: ['Asymmetrical', 'Editorial', 'Off-grid', 'Full-bleed'] },
  { title: 'Colour', items: ['Monochrome', 'Muted', 'High contrast', 'Limited palette'] },
  { title: 'Shape', items: ['Sharp', 'Organic', 'Mixed', 'Unexpected'] },
  { title: 'Texture', items: ['Paper', 'Grain', 'Photography', 'Illustration'] },
  { title: 'Motion', items: ['Minimal', 'Scroll-driven', 'Interaction-led', 'None'] },
]

export const promptExamples = [
  {
    dont: 'Make it modern.',
    say: 'Use a high-contrast editorial type system with serif headlines and a restrained sans body. Avoid generic SaaS typography.',
  },
  {
    dont: 'Keep it clean and balanced.',
    say: 'Use asymmetric layout logic, deliberate whitespace, and off-grid image placement. Avoid the usual centred SaaS hero.',
  },
  {
    dont: 'Make it premium.',
    say: 'Build the palette around warm neutrals and one accent tone. Keep contrast high and avoid the usual blue-purple AI default.',
  },
  {
    dont: 'Make it futuristic.',
    say: 'Lean into a visual language inspired by print publishing and industrial interfaces, not generic AI fantasy visuals.',
  },
]

export const methodSteps = [
  {
    title: 'Start with a point of view',
    summary: 'Before generating anything, answer the questions a template can’t answer for you.',
    items: [
      'Who is this specifically for?',
      'What do they currently dislike about existing products?',
      'What should they feel within five seconds?',
      'What is your strongest non-obvious opinion?',
      'Why should someone choose you instead of three competitors?',
    ],
    contrast: {
      weak: 'We use AI to make businesses more productive.',
      strong: 'We help cautious finance teams automate repetitive work without giving up control.',
    },
    note: 'A distinctive website usually begins with distinctive positioning, not unusual decoration.',
  },
  {
    title: 'Create brand guardrails',
    summary: 'Give the AI rules it must follow, so it can’t fall back on defaults.',
    items: [
      'Three to five personality words',
      'Exact colours and where each may be used',
      'Primary and secondary fonts',
      'Border-radius rules',
      'Spacing and layout density',
      'Illustration or photography style',
      'Animation principles',
      'Words and phrases it must never use',
      'Common design clichés it must avoid',
    ],
    example:
      'Use an editorial, precise, slightly skeptical tone. No purple-blue gradients, glowing neural networks, robot illustrations, oversized rounded cards, or phrases such as “unlock the future.” Use cream, charcoal, and one orange accent. Prefer asymmetrical layouts and information-dense diagrams.',
    note: 'Constraints don’t reduce creativity here. They stop the model reaching for the familiar.',
  },
  {
    title: 'Design the user journey first',
    summary: 'Don’t begin with “make me a homepage.” Begin with the user’s actual task.',
    items: [
      'Who arrives?',
      'What do they need to understand?',
      'What doubt prevents them from continuing?',
      'What evidence answers that doubt?',
      'What is the next useful action?',
    ],
    note: 'Sketch the flow first, then ask AI to implement that structure. A research tool, a game, and an accounting product should not share the same page structure.',
  },
  {
    title: 'Use original material',
    summary: 'AI can’t invent your real business evidence. Feed it what competitors don’t have.',
    items: [
      'Customer interview excerpts',
      'Real product screenshots',
      'Original photography',
      'Your actual terminology',
      'Unusual statistics',
      'Case-study details',
      'Support questions',
      'Internal diagrams',
      'Real user workflows',
    ],
    note: 'Specific customer language makes copy and layout more distinctive than asking for “engaging website content.”',
  },
  {
    title: 'Break the layout, not just the colour',
    summary: 'Swapping a blue gradient for an orange one is cosmetic. Change the structure instead.',
    items: [
      'A homepage structured as a guided story',
      'A visual product simulator instead of a static hero image',
      'A comparison tool users can interact with',
      'A timeline, map, workspace, or editorial spread',
      'A product-first homepage showing the real interface immediately',
      'Navigation designed around user tasks, not company departments',
      'A custom interaction that expresses what the product actually does',
    ],
    note: 'A legal research product might feel like a well-organised case file. A music tool might behave like a mixing desk. The interface should express the product’s mental model.',
  },
  {
    title: 'Ask AI for divergence first',
    summary: 'Don’t ask for one polished answer. Ask for several structurally different directions.',
    example:
      'Create five homepage concepts. Each must use a different information architecture, not merely different colours. One should be editorial, one product-led, one story-led, one task-based, and one experimental. Do not use a conventional hero-plus-three-cards layout.',
    note: 'Then reject the safest option and combine the strongest ideas. AI explores the possibility space; a person chooses the direction that has meaning.',
  },
  {
    title: 'Reserve the final 30% for humans',
    summary: 'Split the work by where judgement matters.',
    split: {
      ai: 'Scaffolding, repetitive components, responsive variants, placeholder content, and accessibility checks.',
      human: 'Positioning, headline language, visual identity, distinctive interactions, original assets, and final editing.',
    },
    note: 'Test the result with real users rather than judging only whether it looks polished.',
  },
]

export const uniquenessTest = [
  'Can someone identify which one is yours?',
  'Does the first screen communicate a difference?',
  'Could the headline belong to any competitor?',
  'Are the images, layout, and interactions specific to your product?',
  'Would a customer describe the site using something more precise than “clean” or “modern”?',
]
