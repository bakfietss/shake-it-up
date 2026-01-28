import { useState } from 'react'
import './App.scss'
import HeroPage from './pages/Hero/HeroPage'
import TestPage from './TestPage'

function App() {
  const [pagina, setPagina] = useState('hero')

  return (
    <div className="app">
      {pagina === 'hero' && (
        <HeroPage onGetStarted={() => setPagina('test')} />
      )}
      {pagina === 'test' && <TestPage />}
    </div>
  )
}

export default App
