import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

function copyEasterEggFallback() {
  return {
    name: 'copy-easter-egg-fallback',
    closeBundle() {
      const src = resolve(__dirname, 'dist/easter-egg/index.html')
      const dest = resolve(__dirname, 'dist/easter-egg.html')
      if (existsSync(src)) {
        copyFileSync(src, dest)
      }
    },
  }
}

function devVaultApi() {
  return {
    name: 'dev-vault-api',
    configureServer(server) {
      server.middlewares.use('/api/vault', (req, res) => {
        const RELEASE_TIMESTAMP_MS = 1893438600000
        const now = Date.now()
        const isReleased = now >= RELEASE_TIMESTAMP_MS

        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        res.setHeader('Access-Control-Allow-Origin', '*')

        if (!isReleased) {
          res.end(
            JSON.stringify({
              status: 'locked',
              releaseTimestamp: '2030-01-01T00:00:00+05:30',
              serverTime: new Date(now).toISOString(),
              message:
                'Her identity is a secret worth waiting for. The vault unlocks on 2030-01-01T00:00:00+05:30.',
            })
          )
        } else {
          res.end(
            JSON.stringify({
              status: 'unlocked',
              name: 'The One',
              message:
                'Some secrets are not meant to be hacked. They are meant to be waited for.',
              unlockedAt: new Date(now).toISOString(),
            })
          )
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), copyEasterEggFallback(), devVaultApi()],

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        easterEgg: resolve(__dirname, 'easter-egg/index.html'),
      },
    },
  },
})


