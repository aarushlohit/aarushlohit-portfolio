import { useEffect, useState } from 'react'
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
  } catch (err) {
    void err
  }

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

  useEffect(() => {
    document.title = 'Does Aarush Lohit Have a Girlfriend? — The 2030 Secret'
    let ignore = false

    fetchVaultStatus()
      .then((data) => {
        if (ignore) return
        if (data.status === 'unlocked') {
          setVaultState({
            status: 'unlocked',
            name: data.name,
            message: data.message || 'Some secrets are not meant to be hacked. They are meant to be waited for.',
            unlockedAt: data.unlockedAt,
            serverVerified: true,
            clockMismatchWarning: false,
          })
          document.title = `${data.name} & Aarush — The 2030 Love Vault`
        } else {
          setVaultState((prev) => ({
            ...prev,
            status: 'locked',
            serverVerified: true,
            clockMismatchWarning: false,
          }))
        }
      })
      .catch(() => {
        if (ignore) return
        setVaultState((prev) => ({
          ...prev,
          status: 'locked',
          serverVerified: false,
        }))
      })

    return () => {
      ignore = true
    }
  }, [])


  const handleCountdownZero = () => {
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
    <div className="relative min-h-screen w-full bg-[#08080a] text-neutral-100 flex flex-col justify-between selection:bg-rose-500/20 selection:text-rose-200 overflow-x-hidden antialiased">
      {/* Intimate ambient lighting & fine architectural grid */}
      <RomanticParticles />

      {/* Editorial Header */}
      <header className="relative z-20 border-b border-white/[0.06] bg-black/20 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
          <a
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 transition-colors hover:text-neutral-100"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Aarush Lohit</span>
          </a>
          <div className="flex items-center gap-2 text-neutral-500 font-mono text-[10px] tracking-widest uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500/80" />
            <span>Vault // 2030</span>
          </div>
        </div>
      </header>

      {/* Main Content Showcase */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-16 max-w-3xl mx-auto w-full text-center">
        {/* Heart-Shaped Heirloom Padlock */}
        <HeartPadlock isUnlocked={isUnlocked} />

        {/* Primary Statement */}
        <div className="mt-8 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-rose-300/70">
              {isUnlocked ? 'ARCHIVAL RECORD // UNSEALED' : 'ARCHIVAL RECORD // SEALED'}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-neutral-100"
          >
            {isUnlocked ? (
              <span className="italic">Forever Sealed, Now Revealed.</span>
            ) : (
              <span className="italic">Yes, he&apos;s taken.</span>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-400 font-display italic max-w-lg mx-auto"
          >
            {isUnlocked
              ? vaultState.message
              : 'Her identity is a secret worth waiting for.'}
          </motion.p>
        </div>

        {/* Clock Mismatch Notice */}
        <AnimatePresence>
          {vaultState.clockMismatchWarning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-6 p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 text-amber-200/90 text-xs font-mono max-w-md mx-auto text-left leading-relaxed"
            >
              <div className="font-semibold uppercase tracking-wider mb-1 flex items-center gap-2">
                <span>⚠️</span>
                <span>Server Authority Enforced</span>
              </div>
              Local machine clock mismatch detected. Vault state is authorized exclusively by trusted server time. The seal remains unbroken until 2030-01-01T00:00:00+05:30.
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Archival Cryptographic Dossier Plaque */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 w-full max-w-md mx-auto"
        >
          <div className="relative rounded-2xl border border-white/[0.08] bg-black/50 p-6 backdrop-blur-xl shadow-2xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
              <span>DOC REF: #2030-LOVE</span>
              <span>AES-256-GCM</span>
            </div>

            <div className="py-5 space-y-4">
              <div>
                <span className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  Subject
                </span>
                <span className="text-sm font-medium text-neutral-200">
                  Aarush Lohit
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  Partner Identity
                </span>
                {isUnlocked ? (
                  <div className="mt-1">
                    <span className="font-display text-3xl sm:text-4xl text-rose-200 font-semibold tracking-wide">
                      {vaultState.name}
                    </span>
                    <span className="block mt-1 font-mono text-[10px] text-neutral-500 tracking-wider">
                      UNLOCKED AT {vaultState.unlockedAt ? new Date(vaultState.unlockedAt).toLocaleDateString() : '2030-01-01'}
                    </span>
                  </div>
                ) : (
                  <div className="mt-1.5 flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-rose-500/70" />
                      <span className="font-mono text-xs tracking-[0.25em] text-neutral-300 select-none">
                        ████████████
                      </span>
                    </div>
                    <span className="font-mono text-[9px] tracking-wider text-rose-300/80 uppercase">
                      ENCRYPTED
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-neutral-500 tracking-wider">
              <span>VERIFICATION KEY:</span>
              <span className="text-neutral-400">HARDENED ENCLAVE</span>
            </div>
          </div>
        </motion.div>

        {/* Live Horological Countdown */}
        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 w-full"
          >
            <CountdownTimer onCountdownZero={handleCountdownZero} />
          </motion.div>
        )}

        {/* Epigraph Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-14 max-w-md mx-auto text-center"
        >
          <div className="h-px w-12 bg-white/10 mx-auto mb-5" />
          <p className="text-sm sm:text-base italic text-neutral-400 font-display leading-relaxed">
            &ldquo;Some secrets are not meant to be hacked. They are meant to be waited for.&rdquo;
          </p>
          <div className="h-px w-12 bg-white/10 mx-auto mt-5" />
        </motion.div>
      </main>

      {/* Quiet Luxury Footer */}
      <footer className="relative z-20 py-6 px-6 text-center text-[10px] font-mono tracking-widest text-neutral-500 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 uppercase">
          <span>The 2030 Love Vault • aarushlohit.tech</span>
          <span>Sealed until 2030-01-01 IST</span>
        </div>
      </footer>
    </div>
  )
}
