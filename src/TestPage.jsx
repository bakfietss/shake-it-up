import './TestPage.scss'

function TestPage() {
  return (
    <div className="test-page">
      <div className="section-dark">
        <h1>Lorem Ipsum</h1>
        <h2>Lorem Ipsum</h2>
        <h3>Lorem Ipsum</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className="button-row">
          <button className="btn-gold">Button Gold</button>
          <button className="btn-outline">Button Outline</button>
        </div>
      </div>

      <div className="section-light">
        <h1>Lorem Ipsum</h1>
        <h2>Lorem Ipsum</h2>
        <h3>Lorem Ipsum</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className="button-row">
          <button className="btn-dark">Button Dark</button>
          <button className="btn-outline-dark">Button Outline</button>
        </div>
      </div>
    </div>
  )
}

export default TestPage
