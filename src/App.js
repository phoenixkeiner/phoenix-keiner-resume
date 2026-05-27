import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/nav.jsx'
import Game from './game/Game.jsx'
import Hero from './components/Hero.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Education from './components/Education.jsx'
import Qualifications from './components/Qualifications.jsx'
import Projects from './components/Projects.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'

function HomePage() {
  return (
    <SmoothScroll>
      <div className="bg-brand-mint text-brand-dark">
        <Nav />
        <Hero />
        <Experience />
        <Skills />
        <Education />
        <Qualifications />
        <Projects />
      </div>
    </SmoothScroll>
  )
}

export default function App() {
  return (
    <Router
      basename={import.meta.env.BASE_URL.replace(/\/$/, '')}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
