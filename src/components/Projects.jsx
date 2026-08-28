import { motion } from 'framer-motion'
import { projects } from './data'
import { fadeUp, staggerContainer, viewport } from '../utils/animations'
import { SectionHeading, CardDescription, ExternalLinkIcon } from './ui'

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 bg-brand-mint">
      <SectionHeading>Projects</SectionHeading>

      <motion.div
        className="mt-10 grid gap-6 md:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {projects.map((project, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(31, 31, 31, 0.08)' }}
            transition={{ type: 'spring', duration: 0.35, bounce: 0 }}
            className="group flex flex-col rounded-xl border border-brand-blue/10 bg-white p-6"
          >
            <h3 className="text-base font-semibold tracking-tight text-brand-dark">
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors group-hover:text-brand-orange"
                >
                  {project.title}
                  <ExternalLinkIcon className="h-4 w-4 text-brand-blue/40 transition-colors group-hover:text-brand-orange" />
                </a>
              ) : (
                project.title
              )}
            </h3>
            <CardDescription>{project.description}</CardDescription>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
