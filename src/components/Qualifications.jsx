import { motion } from 'framer-motion'
import { qualifications } from './data'
import { scaleIn, staggerFast, viewport } from '../utils/animations'
import { SectionHeading } from './ui'

export default function Qualifications() {
  return (
    <section id="qualifications" className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      <SectionHeading>Additional Qualifications</SectionHeading>

      <motion.ul
        className="mt-10 flex flex-wrap gap-3"
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {qualifications.map((qualification, i) => (
          <motion.li
            key={i}
            variants={scaleIn}
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-orange/30 px-4 py-2 text-sm font-medium text-brand-dark"
          >
            <span className="text-brand-orange" aria-hidden="true">+</span>
            {qualification}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
