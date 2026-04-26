import React from 'react'
import { motion } from 'framer-motion'
import { experiences } from './data'
import { fadeLeft, staggerContainer, viewport } from '../utils/animations'
import { SectionHeading } from './functions'

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 lg:px-24 bg-brand-mint">
      <SectionHeading>Experience</SectionHeading>

      <motion.div
        className="relative ml-4 mt-10 border-l-2 border-brand-blue/20"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {experiences.map((exp, i) => (
          <motion.div key={i} variants={fadeLeft} className="relative pl-10 pb-12 last:pb-0">
            <motion.div
              className="absolute left-[-9px] top-1.5 w-[18px] h-[18px] rounded-full bg-brand-orange border-2 border-white shadow-sm"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 400, delay: i * 0.08 }}
            />
            <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
              <span className="text-sm font-semibold text-brand-blue">{exp.date}</span>
              <span className="text-xs text-brand-dark/50 italic">{exp.role}</span>
            </div>
            <h3 className="text-lg font-semibold text-brand-dark mb-2">{exp.company}</h3>
            <ul className="list-disc ml-5 text-sm text-brand-dark/70 space-y-1.5">
              {exp.responsibilities.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
