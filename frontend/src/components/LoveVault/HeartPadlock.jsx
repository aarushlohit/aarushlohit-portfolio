import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export function HeartPadlock({ isUnlocked = false }) {
  // Tactile micro-tilt on mouse move
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 180 }
  const rotateX = useSpring(useTransform(mouseY, [-60, 60], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-60, 60], [-8, 8]), springConfig)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center py-2"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 900 }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-10 flex flex-col items-center cursor-default select-none"
        animate={isUnlocked ? { scale: [1, 1.06, 1.03] } : { y: [0, -3, 0] }}
        transition={
          isUnlocked
            ? { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        {/* Soft shadow cast below the lock */}
        <div className="absolute -bottom-4 w-28 h-6 bg-black/60 rounded-full blur-md" />

        <svg
          viewBox="0 0 140 150"
          className="h-32 w-32 sm:h-36 sm:w-36 overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Shackle metallic gradient */}
            <linearGradient id="shackleMetal" x1="30" y1="10" x2="110" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f5d0dc" />
              <stop offset="25%" stopColor="#c48b9f" />
              <stop offset="50%" stopColor="#4a2e38" />
              <stop offset="75%" stopColor="#8c586a" />
              <stop offset="100%" stopColor="#f0c2cf" />
            </linearGradient>

            {/* Lock body: deep dark obsidian with subtle brushed texture */}
            <radialGradient id="bodyBase" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#22171c" />
              <stop offset="65%" stopColor="#120c10" />
              <stop offset="100%" stopColor="#080507" />
            </radialGradient>

            {/* Chamfer rim metallic stroke */}
            <linearGradient id="chamferRim" x1="15" y1="35" x2="125" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f3cbd7" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#9e6678" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#472632" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#e8b4c3" stopOpacity="0.7" />
            </linearGradient>

            {/* Subtle inner plate bevel */}
            <linearGradient id="innerBevel" x1="70" y1="50" x2="70" y2="135" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
            </linearGradient>

            {/* Keyhole warm amber-rose illumination */}
            <radialGradient id="keyholeCore" cx="70" cy="88" r="14" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffb3c6" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#e11d48" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#881337" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Shackle: Industrial hardened arch with realistic hinge */}
          <motion.path
            d="M 44 65 V 36 C 44 21.6 55.6 10 70 10 C 84.4 10 96 21.6 96 36 V 65"
            stroke="url(#shackleMetal)"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
            animate={
              isUnlocked
                ? { y: -14, rotate: -22, originX: '44px', originY: '36px' }
                : { y: 0, rotate: 0 }
            }
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Lock Body: Handcrafted Sculpted Heart */}
          <path
            d="M 70 138 C 70 138 20 104 20 64 C 20 46 34 34 50 34 C 60 34 66 38 70 44 C 74 38 80 34 90 34 C 106 34 120 46 120 64 C 120 104 70 138 70 138 Z"
            fill="url(#bodyBase)"
            stroke="url(#chamferRim)"
            strokeWidth="1.75"
          />

          {/* Inner inset border for luxury watch / jewelry look */}
          <path
            d="M 70 130 C 70 130 27 98 27 64 C 27 50 38 41 50 41 C 58.5 41 64 45 70 51 C 76 45 81.5 41 90 41 C 102 41 113 50 113 64 C 113 98 70 130 70 130 Z"
            fill="url(#innerBevel)"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="1"
          />

          {/* Architectural Rivets (Precision hardware screws) */}
          <circle cx="44" cy="54" r="1.6" fill="#c48b9f" opacity="0.6" />
          <circle cx="96" cy="54" r="1.6" fill="#c48b9f" opacity="0.6" />
          <circle cx="70" cy="120" r="1.6" fill="#c48b9f" opacity="0.5" />

          {/* Keyhole Escutcheon */}
          <circle cx="70" cy="85" r="15" fill="none" stroke="rgba(244, 114, 182, 0.2)" strokeWidth="0.8" />
          <circle cx="70" cy="85" r="12" fill="url(#keyholeCore)" />

          {/* Precision Keyhole Slot */}
          <circle cx="70" cy="83" r="4" fill="#080507" />
          <path
            d="M 68 84 L 67.2 94.5 C 67.2 95.3 67.9 96 68.8 96 H 71.2 C 72.1 96 72.8 95.3 72.8 94.5 L 72 84 Z"
            fill="#080507"
          />

          {/* Hairline keyhole rim highlight */}
          <circle cx="70" cy="83" r="4.2" fill="none" stroke="#fbcfe8" strokeWidth="0.5" opacity="0.7" />
        </svg>

        {/* Minimalist Museum-Style Metadata Tag */}
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isUnlocked ? 'bg-emerald-400' : 'bg-rose-500'
            }`}
          />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400">
            {isUnlocked ? 'VAULT STATUS: UNSEALED' : 'VAULT STATUS: SEALED // 2030'}
          </span>
        </div>
      </motion.div>
    </div>
  )
}
