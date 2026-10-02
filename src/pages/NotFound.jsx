import { Link } from '../router'

function NotFound() {
  return (
    <section className="final">
      <p className="eyebrow">404</p>
      <h2>
        <span>This page doesn’t exist.</span> That wasn’t a decision either.
      </h2>
      <div className="cta-row">
        <Link className="button button-primary" to="/">
          Back to the start
        </Link>
      </div>
    </section>
  )
}

export default NotFound
