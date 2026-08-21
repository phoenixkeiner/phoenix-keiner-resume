import { motion } from 'framer-motion'
import { personalInfo } from './data'
import { viewport } from '../utils/animations'
import { SectionHeading } from './ui'

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      <SectionHeading>About</SectionHeading>

      <motion.div
        className="mt-10 max-w-3xl rounded-xl overflow-hidden border border-brand-blue/10 shadow-sm"
        initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={viewport}
        whileHover={{
          y: -4,
          boxShadow: '0 8px 20px rgba(31, 31, 31, 0.08)',
          transition: { type: 'spring', duration: 0.25, bounce: 0 },
        }}
        transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
      >
        <div className="flex items-center gap-1.5 px-4 py-3 bg-brand-navy" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-brand-rust" />
          <span className="w-3 h-3 rounded-full bg-brand-orange" />
          <span className="w-3 h-3 rounded-full bg-brand-gold" />
          <span className="ml-3 text-xs text-white/40 font-mono">about.md</span>
        </div>
        <p className="px-6 py-6 md:px-8 md:py-8 font-mono text-sm md:text-base text-brand-dark/80 leading-relaxed bg-brand-mint">
          {personalInfo.description}
        </p>
      </motion.div>
    </section>
  )
}
