import crypto from 'node:crypto';
import { Buffer } from 'node:buffer';
import process from 'node:process';


const RELEASE_TIMESTAMP_MS = 1893438600000; // 2030-01-01T00:00:00+05:30
const RELEASE_ISO_STRING = '2030-01-01T00:00:00+05:30';

function decryptPayload(ciphertextBase64, keyHex) {
  const combined = Buffer.from(ciphertextBase64, 'base64');
  if (combined.length < 28) {
    throw new Error('Invalid ciphertext length');
  }

  const iv = combined.subarray(0, 12);
  const tag = combined.subarray(12, 28);
  const encrypted = combined.subarray(28);

  const key = Buffer.from(keyHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(encrypted, null, 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export default function handler(req, res) {
  // Enforce strict no-cache headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const now = Date.now();
  const isReleased = now >= RELEASE_TIMESTAMP_MS;

  if (!isReleased) {
    return res.status(200).json({
      status: 'locked',
      releaseTimestamp: RELEASE_ISO_STRING,
      serverTime: new Date(now).toISOString(),
      message: 'Her identity is a secret worth waiting for. The vault unlocks on 2030-01-01T00:00:00+05:30.',
    });
  }

  // After 2030:
  try {
    let name = process.env.VAULT_SECRET;
    if (process.env.VAULT_CIPHERTEXT && process.env.VAULT_KEY) {
      name = decryptPayload(process.env.VAULT_CIPHERTEXT, process.env.VAULT_KEY);
    }
    return res.status(200).json({
      status: 'unlocked',
      name: name || 'The One',
      message: 'Some secrets are not meant to be hacked. They are meant to be waited for.',
      unlockedAt: new Date(now).toISOString(),
    });
  } catch {
    return res.status(200).json({
      status: 'unlocked',
      name: 'The One',
      message: 'Some secrets are not meant to be hacked. They are meant to be waited for.',
      unlockedAt: new Date(now).toISOString(),
    });
  }
}
