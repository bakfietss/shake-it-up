import { useState } from 'react'
import './App.scss'
import HeroPage from './pages/Hero/HeroPage'
import TestPage from './TestPage'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  const [pagina, setPagina] = useState('hero')

  return (
    <div className="app">
      {pagina === 'hero' && (
        <HeroPage onGetStarted={() => setPagina('test')} />
      )}
      {pagina === 'test' && (
        <>
          <Navbar />
          <TestPage />
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
