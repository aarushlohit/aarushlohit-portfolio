export function RomanticParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Intimate, soft warm vignette (No distracting floating party dots) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-40 blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.12) 0%, rgba(159, 18, 57, 0.05) 45%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(251, 113, 133, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Subtle fine grid texture for architectural precision */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 80%)',
        }}
      />
    </div>
  )
}
