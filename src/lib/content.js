export const defaultPatterns = [
  {
    id: 'typography',
    category: 'Typography',
    name: 'Geometric sans',
    note: 'Neutral, friendly, everywhere.',
    why: 'It is the most common type in the interfaces models learned from: legible, safe, and never wrong enough to be corrected.',
    looksLike: 'Inter or similar, bold, tightly tracked, set very large.',
  },
  {
    id: 'gradient',
    category: 'Colour',
    name: 'Purple / blue gradients',
    note: 'The colour of “AI”.',
    why: 'Blue-violet became shorthand for technology, so anything with “AI” in the brief gets it.',
    looksLike: 'A diagonal violet-to-blue wash behind the hero, often with a glow.',
  },
  {
    id: 'centred',
    category: 'Layout',
    name: 'Centred hero',
    note: 'Headline, subline, two buttons.',
    why: 'It is the statistical average of a landing page. Nobody has to decide where the eye goes.',
    looksLike: 'A symmetrical first screen with a pill above the headline and a primary plus ghost button.',
  },
  {
    id: 'rounded',
    category: 'Shape',
    name: 'Rounded cards',
    note: 'Soft corners read as modern.',
    why: 'Component libraries ship them by default, and soft corners never look broken.',
    looksLike: '16–28px radii on everything: cards, buttons, inputs, images.',
  },
  {
    id: 'bento',
    category: 'Composition',
    name: 'Bento grid',
    note: 'Features in tidy boxes.',
    why: 'Tidy boxes fill space with features without anyone deciding which one matters most.',
    looksLike: 'Tiles of uneven spans, each with an icon, a title and one line of copy.',
  },
  {
    id: 'hover',
    category: 'Motion',
    name: 'Subtle animation',
    note: 'Lift, glow, repeat.',
    why: 'Lift, glow and fade-in are added because they are expected, not because they explain anything.',
    looksLike: 'Cards that float on hover, staggered fade-ins, shimmering borders.',
  },
]

export const otherDefaults = [
  { name: '✦ Sparkle icon', note: 'The universal sign for “AI”.' },
  { name: 'Pill above the headline', note: '“Now with AI”, “New”, “Beta”.' },
  { name: 'Glow and blurred orbs', note: 'Light from nowhere, behind everything.' },
  { name: 'Glass panels', note: 'Frosted cards over the gradient.' },
  { name: '“Trusted by” logo strip', note: 'Greyed out, auto-scrolling.' },
  { name: 'Three pricing tiers', note: 'The middle one is “Most popular”.' },
  { name: '“Build the future of…”', note: 'A headline that fits any product.' },
  { name: 'Icon, title, one line — ×3', note: 'The feature row.' },
  { name: 'Dark mode with neon accents', note: 'For when the gradient isn’t enough.' },
]

export const defaultVsDecided = [
  {
    category: 'Typography',
    byDefault: 'Geometric sans, because it’s safe.',
    decided: 'Serif to read, mono to measure, because this site is about both.',
  },
  {
    category: 'Colour',
    byDefault: 'Blue-violet, because it signals “AI”.',
    decided: 'Black, white and one yellow that only ever marks a decision.',
  },
  {
    category: 'Layout',
    byDefault: 'Centred, because that’s how heroes look.',
    decided: 'Asymmetric, because the content isn’t symmetrical.',
  },
  {
    category: 'Shape',
    byDefault: 'Rounded, because it feels friendly.',
    decided: 'Square, because rounding is what the default reaches for first.',
  },
  {
    category: 'Composition',
    byDefault: 'Bento, because it fills the space.',
    decided: 'Ranked, because some things matter more than others.',
  },
  {
    category: 'Motion',
    byDefault: 'Hover lifts, because they’re expected.',
    decided: 'Movement only when something actually changes.',
  },
]

export const promptPairs = [
  {
    id: 'editorial',
    dont: 'Make it modern.',
    say: 'Use an editorial visual language. Avoid contemporary SaaS conventions.',
  },
  {
    id: 'restrained',
    dont: 'Make it premium.',
    say: 'Use restrained typography, high contrast and a limited colour palette.',
  },
  {
    id: 'broken',
    dont: 'Make it creative.',
    say: 'Break the conventional grid and allow elements to overlap.',
  },
]

export const promptLibrary = [
  {
    dont: 'Make it clean.',
    say: 'Use generous whitespace, one typeface in two weights, and thin rules instead of boxes to separate content.',
    decides: 'Composition',
  },
  {
    dont: 'Make it bold.',
    say: 'Set the headline at a size that crops at the edge of the viewport. Everything else stays small and quiet.',
    decides: 'Typography',
  },
  {
    dont: 'Make it friendly.',
    say: 'Write in short first-person sentences, use hand-drawn annotations, and avoid stock illustration characters.',
    decides: 'Texture',
  },
  {
    dont: 'Make it futuristic.',
    say: 'Reference industrial interfaces and print publishing, not generic AI fantasy visuals.',
    decides: 'References',
  },
  {
    dont: 'Make it pop.',
    say: 'Pick one accent colour and only use it on the element you want people to act on.',
    decides: 'Colour',
  },
  {
    dont: 'Make it engaging.',
    say: 'Replace the hero image with an interactive version of the product that works without signing up.',
    decides: 'Composition',
  },
  {
    dont: 'Make it minimal.',
    say: 'Square corners, no shadows, no gradients, no icons. Hierarchy comes from size and position only.',
    decides: 'Shape',
  },
  {
    dont: 'Add some animation.',
    say: 'Animate only when something changes state, and keep every transition under 200ms.',
    decides: 'Motion',
  },
]

export const decisionFramework = [
  {
    title: 'Typography',
    question: 'What voice should the type have?',
    byDefault: 'a bold geometric sans',
    options: [
      { label: 'Serif', phrase: 'Set headlines in a high-contrast serif with a quiet text face for body copy.' },
      { label: 'Condensed', phrase: 'Use a condensed grotesque so information can sit densely.' },
      { label: 'Mono', phrase: 'Use a monospaced face for labels and data, like a technical instrument.' },
      { label: 'Mixed', phrase: 'Pair a display face with a plain text face and let the contrast carry hierarchy.' },
    ],
  },
  {
    title: 'Composition',
    question: 'Where does the eye go first, and why?',
    byDefault: 'a centred hero above a bento grid',
    options: [
      { label: 'Asymmetric', phrase: 'Use an asymmetric layout with a strong left axis. No centred hero.' },
      { label: 'Editorial', phrase: 'Lay pages out like a magazine spread: columns, captions, pull quotes.' },
      { label: 'Off-grid', phrase: 'Break the grid deliberately and let images and text overlap.' },
      { label: 'Product-first', phrase: 'Open on the real product interface instead of a marketing hero.' },
    ],
  },
  {
    title: 'Colour',
    question: 'What job does each colour do?',
    byDefault: 'a purple-to-blue gradient',
    options: [
      { label: 'Monochrome', phrase: 'Work in black and white, with one accent used only for what matters most.' },
      { label: 'Muted', phrase: 'Use a muted palette taken from the physical world the product lives in.' },
      { label: 'High contrast', phrase: 'Keep contrast high: near-black on white, no mid-tone washes.' },
      { label: 'From the brand', phrase: 'Derive every colour from existing brand material and give each one a single job.' },
    ],
  },
  {
    title: 'Shape',
    question: 'What do the corners and edges say?',
    byDefault: 'rounded corners on everything',
    options: [
      { label: 'Sharp', phrase: 'Use square corners throughout.' },
      { label: 'Organic', phrase: 'Use irregular, hand-drawn shapes instead of geometric containers.' },
      { label: 'Ruled', phrase: 'Round only interactive elements. Every container stays square.' },
      { label: 'No containers', phrase: 'Avoid cards entirely. Separate content with space and thin rules.' },
    ],
  },
  {
    title: 'Texture',
    question: 'What surface is it printed on?',
    byDefault: 'flat surfaces with soft glows',
    options: [
      { label: 'Paper', phrase: 'Give surfaces a printed quality: off-white, slight grain, ink rather than light.' },
      { label: 'Photography', phrase: 'Use original documentary photography, not stock images or 3D renders.' },
      { label: 'Illustration', phrase: 'Commission one illustration style and use it consistently.' },
      { label: 'None', phrase: 'No texture, no glow, no glass. Flat colour only.' },
    ],
  },
  {
    title: 'Motion',
    question: 'When should something move?',
    byDefault: 'fade-ins and hover lifts everywhere',
    options: [
      { label: 'Minimal', phrase: 'Animate state changes only, and keep them under 200ms.' },
      { label: 'Scroll-driven', phrase: 'Use scroll to reveal a sequence that explains how the product works.' },
      { label: 'Interaction-led', phrase: 'Move things only in response to what the visitor does.' },
      { label: 'None', phrase: 'No animation at all.' },
    ],
  },
  {
    title: 'References',
    question: 'What should it remind people of?',
    byDefault: 'other SaaS landing pages',
    options: [
      { label: 'Print', phrase: 'Reference print publishing: newspapers, journals, annual reports.' },
      { label: 'Industrial', phrase: 'Reference industrial interfaces: control panels, equipment labels, manuals.' },
      { label: 'Exhibition', phrase: 'Reference museum and exhibition signage.' },
      { label: 'Their world', phrase: 'Reference the physical environment the customers actually work in.' },
    ],
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
      'Use an editorial, precise, slightly skeptical tone. No purple-blue gradients, glowing neural networks, robot illustrations, oversized rounded cards, or phrases such as “unlock the future.” Use white, black, and one marker colour that may only highlight a decision. Prefer asymmetrical layouts and information-dense diagrams.',
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
  {
    title: 'Hire a production assistant, not a creative director',
    summary:
      'A model is an excellent production assistant and an unreliable creative director. It is fast, tireless and fluent, and it will always choose the most expected answer unless someone tells it otherwise.',
    split: {
      ai: 'Executes a brief, produces variations, fills in the repetitive parts, checks the details.',
      human: 'Writes the brief, picks the direction, says no to the safe option, and owns the result.',
    },
    note: 'If nobody in the process is making the creative decisions, the model will make them for you — and it will make the same ones it made for everyone else.',
  },
]

export const uniquenessTest = [
  'Can someone identify which one is yours?',
  'Does the first screen communicate a difference?',
  'Could the headline belong to any competitor?',
  'Are the images, layout, and interactions specific to your product?',
  'Would a customer describe the site using something more precise than “clean” or “modern”?',
]
