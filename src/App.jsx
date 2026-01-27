import { useState } from 'react'
import './App.scss'
import IntroAnimation from './pages/Intro/IntroAnimation'

function App() {
  const [introKlaar, setIntroKlaar] = useState(false)

  return (
    <div className="app">
      {!introKlaar && (
        <IntroAnimation onFinish={() => setIntroKlaar(true)} />
      )}
    </div>
  )
}

export default App
