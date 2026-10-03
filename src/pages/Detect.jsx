import Detector from '../components/Detector'
import { checks } from '../lib/detector'
import { Link } from '../router'

const totalWeight = checks.reduce((sum, check) => sum + check.weight, 0)

function Detect() {
  return (
    <>
      <header className="detect-head">
        <h1>How much of your design is default?</h1>
        <p>Upload a screenshot and explore the familiar patterns in your design.</p>
      </header>

      <Detector />

      <section className="method" aria-labelledby="method-title">
        <h2 id="method-title">How to read the score</h2>

        <div className="method-columns">
          <div>
            <h3>What it measures</h3>
            <p>
              Four visual signals, each weighted by how strongly it marks the AI/SaaS default. The
              score is the weighted share of those signals found in your screenshot.
            </p>
            <table className="method-table">
              <tbody>
                {checks.map((check) => (
                  <tr key={check.id}>
                    <th scope="row">{check.name}</th>
                    <td>{check.category}</td>
                    <td>{Math.round((check.weight / totalWeight) * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3>What it can’t see</h3>
            <p>
              Typography, corner radius and motion are part of the default too, but a screenshot
              doesn’t reliably show them. They’re listed as “not measured” rather than guessed.
            </p>
            <p>
              The detector reads colour and composition from a small, downscaled copy of your image.
              It will miss things, and it will occasionally flag a decided design.
            </p>
          </div>

          <div>
            <h3>What it isn’t</h3>
            <p>
              It’s not an AI detector. Plenty of people design centred, blue-violet pages by hand,
              and AI can produce work that scores zero.
            </p>
            <p>
              A high score doesn’t mean a design is bad. It means the familiar conventions are doing
              most of the work — so it’s worth checking whether anyone chose them.
            </p>
          </div>
        </div>
      </section>

      <nav className="page-next" aria-label="Where to go next">
        <p>Found some defaults?</p>
        <div className="cta-row">
          <Link className="button button-primary" to="/break">
            Learn to break them →
          </Link>
          <Link className="button" to="/default">
            See the full pattern library
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Detect
