import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function SectionHeading({ children }) {
  return (
    <div className="inline-block">
      <motion.h2
        className="text-3xl font-bold text-brand-rust"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.h2>
      <motion.div
        className="h-0.5 mt-1 rounded-full bg-brand-orange origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

export function SocialLink({ icon: Icon, ...props }) {
  return (
    <a className="group -m-1 p-1" {...props} target="_blank" rel="noopener noreferrer">
      <Icon className="h-6 w-6 fill-brand-blue/50 transition group-hover:fill-brand-blue" />
    </a>
  )
}

export function Card({ as, className, children }) {
  const Component = as ? motion[as] ?? motion.div : motion.div
  return (
    <Component
      className={`relative flex flex-col items-start bg-white rounded-xl border border-brand-blue/10 shadow-sm p-5 ${className ?? ''}`}
      whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(31, 31, 31, 0.08)' }}
      transition={{ type: 'spring', duration: 0.35, bounce: 0 }}
    >
      {children}
    </Component>
  )
}

export function CardTitle({ as, href, children }) {
  const Component = as ?? 'h2'
  return (
    <Component className="text-base font-semibold tracking-tight text-brand-dark">
      {href ? <a href={href} className="relative z-10">{children}</a> : children}
    </Component>
  )
}

export function CardEyebrow({ as, decorate = false, className, children, ...props }) {
  const Component = as ?? 'p'
  return (
    <Component className={`relative z-10 order-first mb-2 flex items-center text-brand-blue ${className ?? ''}`} {...props}>
      {decorate && (
        <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
          <span className="h-4 w-0.5 rounded-full bg-brand-blue/30" />
        </span>
      )}
      {children}
    </Component>
  )
}

export function CardDescription({ children }) {
  return (
    <div className="mt-2 text-sm text-brand-dark/70 leading-relaxed">
      {children}
    </div>
  )
}

export function ExternalLinkIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  )
}

export function Typewriter({ words, className }) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(query.matches)
    const listener = (e) => setReducedMotion(e.matches)
    query.addEventListener('change', listener)
    return () => query.removeEventListener('change', listener)
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    const currentWord = words[wordIndex]
    const atWordEnd = !deleting && subIndex === currentWord.length
    const atWordStart = deleting && subIndex === 0

    let delay = deleting ? 30 : 55
    if (atWordEnd) delay = 1400
    if (atWordStart) delay = 300

    const timeout = setTimeout(() => {
      if (atWordEnd) {
        setDeleting(true)
      } else if (atWordStart) {
        setDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      } else {
        setSubIndex((prev) => prev + (deleting ? -1 : 1))
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [subIndex, deleting, wordIndex, words, reducedMotion])

  const displayText = reducedMotion ? words[0] : words[wordIndex].slice(0, subIndex)

  return (
    <span className={className}>
      <span aria-hidden="true">
        {displayText}
        {!reducedMotion && (
          <motion.span
            className="inline-block w-[2px] h-[1em] bg-current ml-0.5 align-middle"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: 'linear' }}
          />
        )}
      </span>
      <span className="sr-only">{words.join(', ')}</span>
    </span>
  )
}
