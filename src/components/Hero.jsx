import { motion, useScroll, useTransform } from 'framer-motion'
import { personalInfo } from './data'
import faceImage from '../images/face.jpg'
import { SocialLink } from './ui'
import * as SocialIcons from './SocialIcons'

export default function Hero() {
  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 500], [0, -80])
  const textY = useTransform(scrollY, [0, 500], [0, -40])
  const heroOpacity = useTransform(scrollY, [0, 380], [1, 0])

  const [first, last] = personalInfo.name.split(' ')

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-mint">
      <div className="max-w-6xl mx-auto px-6 w-full flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <motion.div className="flex-shrink-0" style={{ y: imageY }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              className="w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-brand-orange shadow-glow"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
            >
              <img src={faceImage} alt="Phoenix Keiner" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-brand-orange/30 pointer-events-none"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center md:text-left"
          style={{ y: textY, opacity: heroOpacity }}
        >
          <div className="overflow-hidden">
            <motion.h1
              className="text-6xl md:text-8xl font-bold text-brand-dark leading-none"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {first}
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="text-6xl md:text-8xl font-bold text-brand-blue leading-none"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {last}
            </motion.h1>
          </div>

          <motion.p
            className="text-lg md:text-xl font-medium text-brand-dark/70 mb-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {personalInfo.title}
          </motion.p>

          <motion.p
            className="text-sm text-brand-dark/40 mb-8 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {personalInfo.email}
          </motion.p>

          <motion.div
            className="flex justify-center md:justify-start gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <SocialLink href="https://github.com/phoenixkeiner/" aria-label="Follow on GitHub" icon={SocialIcons.GitHubIcon} />
            <SocialLink href="https://www.linkedin.com/in/phoenix-keiner/" aria-label="Follow on LinkedIn" icon={SocialIcons.LinkedInIcon} />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <span className="text-xs text-brand-dark/30 tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 bg-brand-dark/20"
          style={{ transformOrigin: 'top' }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
