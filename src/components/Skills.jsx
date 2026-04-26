import React from 'react'
import { motion } from 'framer-motion'
import { techSkills } from './data'
import { scaleIn, staggerFast, viewport } from '../utils/animations'
import { SectionHeading } from './functions'

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      <SectionHeading>Skills</SectionHeading>

      <motion.div
        className="flex flex-wrap gap-3 mt-10"
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {techSkills.map((skill, i) => (
          <motion.span
            key={i}
            variants={scaleIn}
            whileHover={{ scale: 1.08, y: -3 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="px-4 py-2 rounded-full bg-brand-mint text-brand-dark text-sm font-medium border border-brand-blue/15 shadow-sm cursor-default select-none"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}
