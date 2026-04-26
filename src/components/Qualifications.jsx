import React from 'react'
import { motion } from 'framer-motion'
import { qualifications } from './data'
import { fadeUp, staggerContainer, viewport } from '../utils/animations'
import { SectionHeading, Card, ContentCardDescription } from './functions'

export default function Qualifications() {
  return (
    <section id="qualifications" className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      <SectionHeading>Additional Qualifications</SectionHeading>

      <motion.div
        className="mt-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div variants={fadeUp}>
          <Card>
            <ContentCardDescription>
              <ul className="list-disc ml-5 space-y-1.5">
                {qualifications.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </ContentCardDescription>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}
