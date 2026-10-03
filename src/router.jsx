import { useEffect, useState } from 'react'

const listeners = new Set()

function readLocation(source) {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  return { path, hash: window.location.hash, source }
}

export function navigate(to, { replace = false } = {}) {
  window.history[replace ? 'replaceState' : 'pushState']({}, '', to)
  listeners.forEach((listener) => listener())
}

export function useLocation() {
  const [location, setLocation] = useState(() => readLocation('initial'))

  useEffect(() => {
    const onPush = () => setLocation(readLocation('push'))
    const onPop = () => setLocation(readLocation('pop'))

    listeners.add(onPush)
    window.addEventListener('popstate', onPop)

    return () => {
      listeners.delete(onPush)
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  return location
}

export function Link({ to, onClick, ...props }) {
  const handleClick = (event) => {
    onClick?.(event)

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    event.preventDefault()
    navigate(to)
  }

  return <a {...props} href={to} onClick={handleClick} />
}
