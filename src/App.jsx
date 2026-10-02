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
          <span className="brand-mark">UN</span>
          <span className="brand-text">UNDEFAULT AI</span>
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
        <p>
          <strong>UNDEFAULT AI</strong> is an interactive experiment about the visual habits AI
          repeats when the direction is vague.
        </p>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/#detect">Detector</Link>
          <Link to="/guide">Guide</Link>
        </nav>
      </footer>
    </div>
  )
}

export default App
