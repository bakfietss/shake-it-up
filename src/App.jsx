import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.scss'
import HeroPage from './pages/Hero/HeroPage'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Search from './pages/Search/Search'
import Random from './pages/Random/Random'
import Favorites from './pages/Favorites/Favorites'
import Contact from './pages/Contact/Contact'
import Login from './pages/Login_Register/Login'
import Details from './pages/DetailsCocktail/Details'
import NotFound from './pages/NotFound/NotFound'

function App() {
  const location = useLocation()
  const isHero = location.pathname === '/'
  const isRandom = location.pathname === '/random'

  const [loginOpen, setLoginOpen] = useState(false)

  return (
    <div className="app">
      {!isHero && <Navbar onLoginClick={() => setLoginOpen(true)} />}

      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/random" element={<Random />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cocktail/:id" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isHero && !isRandom && <Footer />}

      <Login isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  )
}

export default App
