import { motion } from 'framer-motion'
import { education } from './data'
import { fadeUp, staggerContainer, viewport } from '../utils/animations'
import { SectionHeading, Card, CardEyebrow, CardDescription } from './ui'

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 md:px-12 lg:px-24 bg-brand-mint">
      <SectionHeading>Education</SectionHeading>

      <motion.div
        className="space-y-6 mt-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {education.map((edu, i) => (
          <motion.div key={i} variants={fadeUp}>
            <Card>
              <CardEyebrow className="text-lg font-semibold">{edu.date}</CardEyebrow>
              <h3 className="text-base font-semibold text-brand-dark/70">{edu.institution}</h3>
              <CardDescription>
                <p className="mb-1">{edu.degree}</p>
                <ul className="list-disc ml-5 space-y-0.5">
                  {edu.details.map((detail, j) => (
                    <li key={j}>{detail}</li>
                  ))}
                </ul>
              </CardDescription>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
