import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeartPadlock } from './HeartPadlock.jsx'
import { CountdownTimer } from './CountdownTimer.jsx'
import { RomanticParticles } from './RomanticParticles.jsx'

const WORKER_FALLBACK_URL = 'https://love-vault-worker.davidorixtech.workers.dev'

async function fetchVaultStatus() {
  try {
    const res = await fetch('/api/vault', { headers: { Accept: 'application/json' } })
    if (res.ok) {
      const contentType = res.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await res.json()
      }
    }
  } catch {}

  const fallbackRes = await fetch(WORKER_FALLBACK_URL, { headers: { Accept: 'application/json' } })
  if (!fallbackRes.ok) throw new Error('Worker response not ok')
  return await fallbackRes.json()
}

export function LoveVault() {
  const [vaultState, setVaultState] = useState({
    status: 'locked',
    name: null,
    message: 'Her identity is a secret worth waiting for.',
    unlockedAt: null,
    serverVerified: false,
    clockMismatchWarning: false,
  })

  // Fetch status from authoritative backend API
  const checkServerStatus = useCallback(async () => {
    try {
      const data = await fetchVaultStatus()

      if (data.status === 'unlocked') {
        setVaultState((prev) => ({
          ...prev,
          status: 'unlocked',
          name: data.name,
          message: data.message || 'Some secrets are not meant to be hacked. They are meant to be waited for.',
          unlockedAt: data.unlockedAt,
          serverVerified: true,
          clockMismatchWarning: false,
        }))
        // Update document title dynamically upon authorized unlock
        document.title = `${data.name} & Aarush — The 2030 Love Vault`
      } else {
        setVaultState((prev) => ({
          ...prev,
          status: 'locked',
          serverVerified: true,
          clockMismatchWarning: false,
        }))
        document.title = 'Does Aarush Lohit Have a Girlfriend? — The 2030 Secret'
      }
    } catch {
      // In case backend is offline, remain strictly locked
      setVaultState((prev) => ({
        ...prev,
        status: 'locked',
        serverVerified: false,
      }))
    }
  }, [])



  useEffect(() => {
    // Set initial SEO meta title for this view
    document.title = 'Does Aarush Lohit Have a Girlfriend? — The 2030 Secret'
    checkServerStatus()
  }, [checkServerStatus])

  // Handler for when local countdown reaches zero
  const handleCountdownZero = () => {
    // Check with the server. If client clock was changed but server is still before 2030,
    // the server will return locked.
    fetchVaultStatus()
      .then((data) => {
        if (data.status !== 'unlocked') {
          setVaultState((prev) => ({
            ...prev,
            clockMismatchWarning: true,
          }))
        } else {
          setVaultState((prev) => ({
            ...prev,
            status: 'unlocked',
            name: data.name,
            message: data.message,
            clockMismatchWarning: false,
          }))
        }
      })
      .catch(() => {
        setVaultState((prev) => ({
          ...prev,
          clockMismatchWarning: true,
        }))
      })
  }


  const isUnlocked = vaultState.status === 'unlocked'

  return (
    <div className="relative min-h-screen w-full bg-[#050508] text-white flex flex-col justify-between selection:bg-rose-500/30 selection:text-rose-200 overflow-x-hidden">
      {/* Ambient background romantic particles & glow */}
      <RomanticParticles />

      {/* Top subtle nav bar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 max-w-5xl mx-auto w-full">
        <a
          href="/"
          className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 transition-colors hover:text-rose-300"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <span>Aarush Lohit</span>
        </a>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-rose-300/80">
            Vault 2030
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12 max-w-3xl mx-auto w-full text-center">
        {/* Heart Padlock Icon */}
        <HeartPadlock isUnlocked={isUnlocked} />

        {/* Status Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6"
        >
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-medium tracking-widest uppercase border border-rose-500/25 bg-rose-950/30 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
            {isUnlocked ? 'Time Capsule Unlocked' : 'The 2030 Love Capsule'}
          </span>
        </motion.div>

        {/* Primary Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-neutral-100"
        >
          {isUnlocked ? (
            <span className="bg-gradient-to-r from-rose-200 via-pink-300 to-rose-400 bg-clip-text text-transparent italic font-serif">
              Forever Sealed, Now Revealed.
            </span>
          ) : (
            <span className="italic">Yes, he's taken.</span>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-rose-200/80 max-w-lg font-light leading-relaxed"
        >
          {isUnlocked
            ? vaultState.message
            : 'Her identity is a secret worth waiting for.'}
        </motion.p>

        {/* Clock Mismatch Warning Notice if client clock was manipulated */}
        <AnimatePresence>
          {vaultState.clockMismatchWarning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-6 p-3.5 rounded-xl border border-amber-500/40 bg-amber-950/40 text-amber-200 text-xs font-mono max-w-md"
            >
              ⚠️ Client clock deviation detected. Authorization is enforced strictly by trusted server time. The vault remains sealed until 2030-01-01T00:00:00+05:30.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Masked Identity vs Revealed Identity Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 w-full max-w-md"
        >
          <div className="relative rounded-2xl border border-rose-500/20 bg-neutral-950/70 p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="text-[11px] font-mono tracking-widest uppercase text-rose-400/80 mb-3">
              {isUnlocked ? 'Her Identity' : 'Encrypted Identity'}
            </div>

            {isUnlocked ? (
              <div className="py-2">
                <span className="font-display text-3xl sm:text-4xl text-rose-100 font-semibold tracking-wide drop-shadow-[0_0_20px_rgba(244,63,94,0.6)]">
                  {vaultState.name}
                </span>
                <p className="mt-2 text-xs font-mono text-rose-300/70">
                  Unsealed at {vaultState.unlockedAt ? new Date(vaultState.unlockedAt).toLocaleDateString() : '2030-01-01'}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-rose-500/10 bg-white/[0.02]">
                <span className="font-mono text-lg sm:text-xl tracking-[0.4em] text-rose-300/60 select-none">
                  ••••••••••••
                </span>
                <span className="text-[10px] font-mono uppercase bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded">
                  AES-256-GCM
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Live Countdown Section (Visible when locked) */}
        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 w-full flex flex-col items-center"
          >
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-4">
              Unlocks January 1, 2030 (IST)
            </div>
            <CountdownTimer onCountdownZero={handleCountdownZero} />
          </motion.div>
        )}

        {/* Philosophical Romantic Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 max-w-lg"
        >
          <blockquote className="border-l-2 border-rose-500/40 pl-4 text-sm sm:text-base italic text-neutral-400 font-serif leading-relaxed">
            "Some secrets are not meant to be hacked. They are meant to be waited for."
          </blockquote>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-8 px-6 text-center text-xs font-mono text-neutral-500 border-t border-white/[0.05]">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>The 2030 Love Vault • aarushlohit.tech</span>
          <span className="text-neutral-600">Cryptographically Sealed</span>
        </div>
      </footer>
    </div>
  )
}
