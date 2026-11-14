import { useEffect, useState } from 'react'

const TARGET_TIMESTAMP_MS = 1893438600000 // 2030-01-01T00:00:00+05:30

function calculateTimeRemaining(targetMs) {
  const now = Date.now()
  const diff = targetMs - now

  if (diff <= 0) {
    return {
      years: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isZero: true,
    }
  }

  const totalSeconds = Math.floor(diff / 1000)
  const seconds = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const minutes = totalMinutes % 60
  const totalHours = Math.floor(totalMinutes / 60)
  const hours = totalHours % 24
  const totalDays = Math.floor(totalHours / 24)

  const years = Math.floor(totalDays / 365.25)
  const days = Math.floor(totalDays % 365.25)

  return {
    years,
    days,
    hours,
    minutes,
    seconds,
    isZero: false,
  }
}

export function CountdownTimer({ onCountdownZero }) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeRemaining(TARGET_TIMESTAMP_MS))

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeRemaining(TARGET_TIMESTAMP_MS)
      setTimeLeft(updated)
      if (updated.isZero && onCountdownZero) {
        onCountdownZero()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [onCountdownZero])

  const units = [
    { label: 'YRS', value: String(timeLeft.years).padStart(2, '0') },
    { label: 'DAYS', value: String(timeLeft.days).padStart(3, '0') },
    { label: 'HRS', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'MIN', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'SEC', value: String(timeLeft.seconds).padStart(2, '0') },
  ]

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Precision Chronometer Strip */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-md px-3 sm:px-6 py-4 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between divide-x divide-white/[0.06]">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="flex-1 flex flex-col items-center justify-center px-1 sm:px-2"
            >
              <span className="font-mono text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-neutral-100 tabular-nums">
                {unit.value}
              </span>
              <span className="mt-1.5 font-mono text-[9px] sm:text-[10px] tracking-[0.24em] text-neutral-500 uppercase">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between px-2 text-[10px] font-mono tracking-widest text-neutral-600 uppercase">
        <span>T-MINUS</span>
        <span>COUNTDOWN TO 2030-01-01 IST</span>
      </div>
    </div>
  )
}
