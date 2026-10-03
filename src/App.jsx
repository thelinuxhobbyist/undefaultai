import { useEffect } from 'react'
import { Link, navigate, useLocation } from './router'
import Home from './pages/Home'
import DefaultPage from './pages/DefaultPage'
import Detect from './pages/Detect'
import Break from './pages/Break'
import Guide from './pages/Guide'
import NotFound from './pages/NotFound'
import './App.css'

const routes = {
  '/': {
    Page: Home,
    title: 'UNDEFAULT AI — Why does AI design everything the same?',
  },
  '/default': {
    Page: DefaultPage,
    title: 'The default — The patterns AI keeps reaching for | UNDEFAULT AI',
  },
  '/detect': {
    Page: Detect,
    title: 'Detect — How much of your design is default? | UNDEFAULT AI',
  },
  '/break': {
    Page: Break,
    title: 'Break — Give AI better creative direction | UNDEFAULT AI',
  },
  '/guide': {
    Page: Guide,
    title: 'Guide — Using AI without letting it decide | UNDEFAULT AI',
  },
}

const legacyAnchors = {
  '#default': '/default',
  '#detect': '/detect',
  '#break': '/break',
  '#idea': '/',
}

const navigation = [
  { label: 'The default', to: '/default' },
  { label: 'Detect', to: '/detect' },
  { label: 'Break', to: '/break' },
  { label: 'Guide', to: '/guide' },
]

const colophon = [
  { choice: 'White paper', reason: 'An unmarked page. Nothing is decided until something is written on it.' },
  { choice: 'Black ink', reason: 'Everything we decided to say.' },
  { choice: 'Marker yellow', reason: 'The opposite hue of the default’s blue-violet. It only ever marks a decision.' },
  { choice: 'Serif and mono', reason: 'Serif for reading, mono for measuring. Geometric sans is left to the default.' },
  { choice: 'Square corners', reason: 'Rounding is what the default reaches for first.' },
  { choice: 'Motion', reason: 'Things only move when you change them.' },
]

function App() {
  const location = useLocation()
  const route = routes[location.path]
  const Page = route?.Page ?? NotFound

  useEffect(() => {
    if (location.path === '/' && legacyAnchors[location.hash]) {
      navigate(legacyAnchors[location.hash], { replace: true })
    }
  }, [location])

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
              key={item.to}
              to={item.to}
              aria-current={item.to === location.path ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="button button-small header-cta" to="/detect">
          Detect a design
        </Link>
      </header>

      <main className={`page page-${location.path.slice(1) || 'home'}`}>
        <Page />
      </main>

      <footer className="site-footer">
        <div className="footer-about">
          <p>
            <strong>UNDEFAULT AI</strong> is an interactive experiment about the visual habits AI
            repeats when the direction is vague.
          </p>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link to="/">Home</Link>
            {navigation.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
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
