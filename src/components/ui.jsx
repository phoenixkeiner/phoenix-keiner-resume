import { motion } from 'framer-motion'

export function SectionHeading({ children }) {
  return (
    <motion.h2
      className="text-3xl font-bold bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text text-transparent"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.h2>
  )
}

export function SocialLink({ icon: Icon, ...props }) {
  return (
    <a className="group -m-1 p-1" {...props} target="_blank" rel="noopener noreferrer">
      <Icon className="h-6 w-6 fill-brand-blue/50 transition group-hover:fill-brand-blue" />
    </a>
  )
}

export function Card({ as, className, children }) {
  const Component = as ?? 'div'
  return (
    <Component className={`relative flex flex-col items-start bg-white rounded-xl border border-brand-blue/10 shadow-sm p-5 ${className ?? ''}`}>
      {children}
    </Component>
  )
}

export function CardTitle({ as, href, children }) {
  const Component = as ?? 'h2'
  return (
    <Component className="text-base font-semibold tracking-tight text-brand-dark">
      {href ? <a href={href} className="relative z-10">{children}</a> : children}
    </Component>
  )
}

export function CardEyebrow({ as, decorate = false, className, children, ...props }) {
  const Component = as ?? 'p'
  return (
    <Component className={`relative z-10 order-first mb-2 flex items-center text-brand-blue ${className ?? ''}`} {...props}>
      {decorate && (
        <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
          <span className="h-4 w-0.5 rounded-full bg-brand-blue/30" />
        </span>
      )}
      {children}
    </Component>
  )
}

export function CardDescription({ children }) {
  return (
    <div className="mt-2 text-sm text-brand-dark/70 leading-relaxed">
      {children}
    </div>
  )
}
