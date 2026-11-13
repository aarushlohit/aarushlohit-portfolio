import { motion } from 'framer-motion'

export function HeartPadlock({ isUnlocked = false }) {
  return (
    <div className="relative flex items-center justify-center p-4">
      {/* Outer ambient glow */}
      <motion.div
        className="absolute -inset-4 rounded-full bg-gradient-to-r from-rose-500/20 via-pink-500/25 to-rose-400/20 blur-2xl"
        animate={{
          scale: isUnlocked ? [1, 1.25, 1.15] : [0.95, 1.08, 0.95],
          opacity: isUnlocked ? [0.6, 0.9, 0.75] : [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: isUnlocked ? 2 : 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={false}
        animate={isUnlocked ? { scale: [1, 1.12, 1.05] } : { y: [0, -4, 0] }}
        transition={
          isUnlocked
            ? { duration: 1.2, ease: 'easeOut' }
            : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <svg
          viewBox="0 0 160 170"
          className="h-32 w-32 sm:h-40 sm:w-40 drop-shadow-[0_0_25px_rgba(244,63,94,0.45)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="shackleGrad" x1="45" y1="20" x2="115" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f472b6" />
              <stop offset="0.5" stopColor="#e11d48" />
              <stop offset="1" stopColor="#9f1239" />
            </linearGradient>

            <linearGradient id="heartGrad" x1="20" y1="45" x2="140" y2="160" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1f1118" />
              <stop offset="0.4" stopColor="#2e1220" />
              <stop offset="0.8" stopColor="#1c0b14" />
              <stop offset="1" stopColor="#0f050b" />
            </linearGradient>

            <linearGradient id="strokeGrad" x1="20" y1="50" x2="140" y2="160" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fb7185" />
              <stop offset="0.5" stopColor="#f43f5e" />
              <stop offset="1" stopColor="#be123c" />
            </linearGradient>

            <radialGradient id="keyholeGlow" cx="80" cy="105" r="16" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fda4af" stopOpacity="0.8" />
              <stop offset="1" stopColor="#f43f5e" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Padlock Shackle */}
          <motion.path
            d="M 52 75 V 44 C 52 28.5 64.5 16 80 16 C 95.5 16 108 28.5 108 44 V 75"
            stroke="url(#shackleGrad)"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
            animate={
              isUnlocked
                ? { y: -16, rotate: -18, originX: '52px', originY: '44px' }
                : { y: 0, rotate: 0 }
            }
            transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
          />

          {/* Heart Padlock Body */}
          <path
            d="M 80 155 C 80 155 24 118 24 76 C 24 56 39 42 58 42 C 68.5 42 76 47 80 54 C 84 47 91.5 42 102 42 C 121 42 136 56 136 76 C 136 118 80 155 80 155 Z"
            fill="url(#heartGrad)"
            stroke="url(#strokeGrad)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Subtle Inner Heart Highlights */}
          <path
            d="M 80 144 C 80 144 32 110 32 77 C 32 61 44 50 58 50 C 67 50 74 54 80 61 C 86 54 93 50 102 50 C 116 50 128 61 128 77 C 128 110 80 144 80 144 Z"
            fill="none"
            stroke="#fb7185"
            strokeWidth="1.2"
            strokeOpacity="0.35"
          />

          {/* Keyhole Glow & Silhouette */}
          <circle cx="80" cy="100" r="14" fill="url(#keyholeGlow)" />
          <circle cx="80" cy="98" r="5" fill="#fbcfe8" />
          <path
            d="M 77 100 L 76 114 C 76 115.5 77.5 116.5 80 116.5 C 82.5 116.5 84 115.5 84 114 L 83 100 Z"
            fill="#fbcfe8"
          />
        </svg>

        {/* Lock Status Text Tag */}
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-950/40 px-3 py-1 backdrop-blur-md">
          <span
            className={`h-2 w-2 rounded-full ${
              isUnlocked ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-pulse'
            }`}
          />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-rose-200">
            {isUnlocked ? 'SEAL BROKEN • UNLOCKED' : 'TIME CAPSULE • LOCKED'}
          </span>
        </div>
      </motion.div>
    </div>
  )
}
