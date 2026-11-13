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

  // Calculate units accurately
  const totalSeconds = Math.floor(diff / 1000)
  const seconds = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const minutes = totalMinutes % 60
  const totalHours = Math.floor(totalMinutes / 60)
  const hours = totalHours % 24
  const totalDays = Math.floor(totalHours / 24)

  // Standard Gregorian average year calculation for display
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
    { label: 'Years', value: String(timeLeft.years).padStart(2, '0') },
    { label: 'Days', value: String(timeLeft.days).padStart(3, '0') },
    { label: 'Hours', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'Minutes', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'Seconds', value: String(timeLeft.seconds).padStart(2, '0') },
  ]

  return (
    <div className="w-full max-w-2xl px-2">
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 sm:gap-4">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-rose-500/20 bg-gradient-to-b from-white/[0.04] to-transparent p-3 sm:p-4 backdrop-blur-md transition-all hover:border-rose-400/40 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]"
          >
            <div className="font-mono text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-wider text-rose-100 tabular-nums drop-shadow-[0_0_12px_rgba(251,113,133,0.3)]">
              {unit.value}
            </div>
            <div className="mt-1 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-rose-300/70">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
