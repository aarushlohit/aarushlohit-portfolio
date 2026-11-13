import { useMemo } from 'react'

export function RomanticParticles() {
  // Generate random deterministic particle positions and animations
  const particles = useMemo(() => {
    return Array.from({ length: 36 }).map((_, i) => ({
      id: i,
      left: `${(i * 17 + 13) % 100}%`,
      top: `${(i * 23 + 7) % 100}%`,
      size: (i % 3) + 2,
      opacity: ((i % 5) + 3) / 10,
      duration: 4 + (i % 5) * 1.5,
      delay: (i % 6) * 0.7,
      color: i % 4 === 0 ? '#fb7185' : i % 4 === 1 ? '#f43f5e' : i % 4 === 2 ? '#fda4af' : '#ffffff',
    }))
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Ambient Radial Gradient Accents */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[550px] w-[550px] rounded-full bg-gradient-to-b from-rose-500/10 via-pink-500/5 to-transparent blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-rose-600/[0.07] blur-[120px]" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-pink-500/[0.06] blur-3xl" />

      {/* Twinkling ambient particle stars */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
        />
      ))}
    </div>
  )
}
