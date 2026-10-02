import { useEffect } from 'react'
import { Link, useLocation } from './router'
import Home from './pages/Home'
import Guide from './pages/Guide'
import NotFound from './pages/NotFound'
import './App.css'

const routes = {
  '/': {
    Page: Home,
    title: 'UNDEFAULT AI — Why does AI design everything the same?',
  },
  '/guide': {
    Page: Guide,
    title: 'Break the default — A guide to directing AI | UNDEFAULT AI',
  },
}

const navigation = [
  { label: 'The default', to: '/#default' },
  { label: 'Detect', to: '/#detect' },
  { label: 'Break', to: '/#break' },
  { label: 'Guide', to: '/guide' },
]

const colophon = [
  { choice: 'White paper', reason: 'An unmarked page. Nothing is decided until something is written on it.' },
  { choice: 'Black ink', reason: 'Everything we decided to say.' },
  { choice: 'Marker yellow', reason: 'The opposite hue of the default’s blue-violet. It only ever marks a decision.' },
  { choice: 'Serif and mono', reason: 'Geometric sans-serif is left to the default world.' },
  { choice: 'Square corners', reason: 'Rounding is what the default reaches for first.' },
  { choice: 'Motion', reason: 'Things only move when you change them.' },
]

function App() {
  const location = useLocation()
  const route = routes[location.path]
  const Page = route?.Page ?? NotFound

  useEffect(() => {
    document.title = route?.title ?? 'Not found | UNDEFAULT AI'

    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical && route) {
      canonical.href = `https://undefaultai.com${location.path === '/' ? '/' : location.path}`
    }
  }, [route, location.path])

  useEffect(() => {
    if (location.source === 'pop') {
      return
    }

    const target = location.hash && document.getElementById(location.hash.slice(1))

    if (target) {
      target.scrollIntoView({ behavior: location.source === 'initial' ? 'auto' : 'smooth' })
    } else if (location.source === 'push') {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location])

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="UNDEFAULT AI home">
          <mark>UN</mark>DEFAULT AI
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              aria-current={item.to === location.path ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="button button-small header-cta" to="/#detect">
          Detect a design
        </Link>
      </header>

      <main>
        <Page />
      </main>

      <footer className="site-footer">
        <div className="footer-about">
          <p>
            <strong>UNDEFAULT AI</strong> is an interactive experiment about the visual habits AI
            repeats when the direction is vague.
          </p>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link to="/#detect">Detector</Link>
            <Link to="/guide">Guide</Link>
          </nav>
        </div>

        <dl className="colophon" aria-label="Why this site looks like this">
          {colophon.map((item) => (
            <div key={item.choice}>
              <dt>{item.choice}</dt>
              <dd>{item.reason}</dd>
            </div>
          ))}
        </dl>
      </footer>
    </div>
  )
}

export default App
