import React from 'react'
import { motion } from 'framer-motion'
import { projects } from './data'
import { fadeUp, staggerContainer, viewport } from '../utils/animations'
import { SectionHeading, Card, CardTitle, ContentCardDescription } from './functions'

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 bg-brand-mint">
      <SectionHeading>Projects</SectionHeading>

      <motion.div
        className="space-y-4 mt-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {projects.map((project, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card>
              <CardTitle>{project.title}</CardTitle>
              <ContentCardDescription>{project.description}</ContentCardDescription>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
