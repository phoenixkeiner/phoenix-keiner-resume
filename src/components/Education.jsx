import { motion } from 'framer-motion'
import { education } from './data'
import { fadeUp, staggerContainer, viewport } from '../utils/animations'
import { SectionHeading } from './ui'

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 md:px-12 lg:px-24 bg-brand-mint">
      <SectionHeading>Education</SectionHeading>

      <motion.div
        className="mt-10 space-y-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {education.map((edu, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="border-l-2 border-brand-blue/20 pl-6 md:grid md:grid-cols-[200px_1fr] md:gap-10 md:border-l-0 md:pl-0"
          >
            <div className="md:border-l-2 md:border-brand-blue/20 md:pl-6">
              <p className="font-mono text-sm text-brand-blue">{edu.date}</p>
              <h3 className="mt-1 text-lg font-semibold text-brand-dark">{edu.institution}</h3>
            </div>
            <div className="mt-4 text-sm text-brand-dark/70 leading-relaxed md:mt-0 md:border-l-2 md:border-brand-blue/20 md:pl-10">
              <p className="mb-2">{edu.degree}</p>
              <ul className="ml-5 list-disc space-y-1">
                {edu.details.map((detail, j) => (
                  <li key={j}>{detail}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
