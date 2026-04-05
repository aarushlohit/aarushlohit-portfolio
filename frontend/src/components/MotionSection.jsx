import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export function MotionSection({ children, className = '' }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -8% 0px', amount: 0.15 }}
      transition={{ duration: 0.5, ease }}
    >
      {children}
    </motion.div>
  )
}
