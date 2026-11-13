/**
 * THE 2030 LOVE VAULT — Cloudflare Worker
 *
 * Route: /api/vault (or assigned custom route on aarushlohit.tech)
 * Release Timestamp: 2030-01-01T00:00:00+05:30 (1893438600000 ms)
 *
 * Strict Server-Side Time Authorization:
 * - Before 2030-01-01T00:00:00+05:30: Vault is LOCKED. Secrets are NEVER accessed,
 *   never decrypted, and never exposed in any form.
 * - After 2030-01-01T00:00:00+05:30: Vault is UNLOCKED. Decrypts AES-256-GCM ciphertext
 *   using private deployment secret VAULT_KEY and returns identity.
 */

// Target release time: 2030-01-01T00:00:00+05:30 (UTC: 2029-12-31T18:30:00.000Z)
export const RELEASE_TIMESTAMP_MS = 1893438600000;
export const RELEASE_ISO_STRING = '2030-01-01T00:00:00+05:30';

const SECURITY_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * Decrypts AES-256-GCM payload using Web Crypto API.
 * Combined payload structure: [12-byte IV][16-byte Tag][Encrypted Data]
 */
async function decryptAesGcm(ciphertextBase64, keyHex) {
  const binaryString = atob(ciphertextBase64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  if (bytes.length < 28) {
    throw new Error('Invalid ciphertext payload');
  }

  const iv = bytes.slice(0, 12);
  const tagAndCiphertext = bytes.slice(12);
  // Web Crypto AES-GCM expects ciphertext + auth tag concatenated at the end
  const ciphertext = tagAndCiphertext.slice(16);
  const tag = tagAndCiphertext.slice(0, 16);
  const reordered = new Uint8Array(ciphertext.length + tag.length);
  reordered.set(ciphertext, 0);
  reordered.set(tag, ciphertext.length);

  // Parse 32-byte hex key
  const keyBytes = new Uint8Array(keyHex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  );

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv, tagLength: 128 },
    cryptoKey,
    reordered
  );

  return new TextDecoder().decode(decryptedBuffer);
}

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: SECURITY_HEADERS,
      });
    }

    if (request.method !== 'GET') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: SECURITY_HEADERS }
      );
    }

    const now = Date.now();
    const isReleased = now >= RELEASE_TIMESTAMP_MS;

    // PRE-RELEASE: STRICTLY LOCKED
    if (!isReleased) {
      return new Response(
        JSON.stringify({
          status: 'locked',
          releaseTimestamp: RELEASE_ISO_STRING,
          serverTime: new Date(now).toISOString(),
          message: 'Her identity is a secret worth waiting for. The vault unlocks on 2030-01-01T00:00:00+05:30.',
        }),
        {
          status: 200,
          headers: SECURITY_HEADERS,
        }
      );
    }

    // POST-RELEASE: AUTHORIZED TO REVEAL
    try {
      let secretName = null;

      // Check if ciphertext + key are configured
      if (env && env.VAULT_CIPHERTEXT && env.VAULT_KEY) {
        secretName = await decryptAesGcm(env.VAULT_CIPHERTEXT, env.VAULT_KEY);
      } else if (env && env.VAULT_SECRET) {
        secretName = env.VAULT_SECRET;
      } else {
        secretName = 'The One';
      }

      return new Response(
        JSON.stringify({
          status: 'unlocked',
          name: secretName,
          message: 'Some secrets are not meant to be hacked. They are meant to be waited for.',
          unlockedAt: new Date(now).toISOString(),
        }),
        {
          status: 200,
          headers: SECURITY_HEADERS,
        }
      );
    } catch (err) {
      // In case of any decryption failure, never leak internal error
      return new Response(
        JSON.stringify({
          status: 'unlocked',
          name: 'The One',
          message: 'Some secrets are not meant to be hacked. They are meant to be waited for.',
          unlockedAt: new Date(now).toISOString(),
        }),
        {
          status: 200,
          headers: SECURITY_HEADERS,
        }
      );
    }
  },
};
