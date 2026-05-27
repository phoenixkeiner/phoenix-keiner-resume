import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useLenis } from './SmoothScroll'

const navLinks = [
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
]

export default function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef(null)
  const lenisRef = useLenis()
  const { scrollY, scrollYProgress } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60)
  })

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.3 }
      )
      observer.observe(el)
      return { observer, el }
    })
    return () => observers.forEach((o) => o?.observer.unobserve(o.el))
  }, [])

  return (
    <div className="sticky top-0 z-50">
      <nav className={`w-full flex items-center justify-between px-6 py-3 bg-brand-blue transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-white font-bold text-xl tracking-widest select-none"
            onClick={(e) => { e.preventDefault(); lenisRef?.current?.scrollTo(0, { duration: 1.2 }) }}
          >
            PK
          </Link>
          <div className="hidden md:flex items-center">
            {navLinks.map(({ label, href }) => {
              const id = href.slice(1)
              const isActive = activeSection === id
              return (
                <a
                  key={id}
                  href={href}
                  className={`relative px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive ? 'text-brand-orange' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange"
                    />
                  )}
                </a>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/game"
            className="px-4 py-2 bg-brand-orange hover:bg-brand-rust text-white text-sm font-medium rounded-md transition-colors"
          >
            Career Game
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="inline-flex items-center rounded-md bg-brand-orange px-4 py-2 text-sm font-medium text-white hover:bg-brand-rust focus:outline-none transition-colors"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              Side Projects
              <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-52 rounded-md bg-brand-dark shadow-lg ring-1 ring-black/10"
                role="menu"
                aria-orientation="vertical"
              >
                <div className="py-1" role="none">
                  <a
                    href="https://phoenixkeiner.github.io/bmt-notes/"
                    className="block px-4 py-2 text-sm text-white/80 hover:text-brand-orange transition-colors"
                    role="menuitem"
                    onClick={() => setIsDropdownOpen(false)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bang Muay Thai Notes
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <motion.div
        className="h-0.5 bg-brand-orange origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  )
}
