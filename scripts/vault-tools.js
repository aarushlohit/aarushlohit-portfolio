#!/usr/bin/env node
/**
 * THE 2030 LOVE VAULT — Security & Encryption Helper
 *
 * This utility runs locally and offline on your computer.
 * It encrypts the secret girlfriend identity with AES-256-GCM so that:
 * 1. Plaintext NEVER touches GitHub, repository history, or client bundles.
 * 2. Ciphertext and Key are generated with cryptographically secure random values.
 * 3. IV (nonce) is 96 bits, and Auth Tag is 128 bits.
 */

import crypto from 'node:crypto';

export function encryptSecret(plainText) {
  // Generate 256-bit (32 bytes) key
  const key = crypto.randomBytes(32);
  // Generate 96-bit (12 bytes) IV standard for AES-GCM
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(plainText, 'utf8');
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const tag = cipher.getAuthTag(); // 16 bytes

  // Combined payload: [12-byte IV][16-byte Tag][Encrypted Data]
  const combined = Buffer.concat([iv, tag, encrypted]);
  const ciphertextBase64 = combined.toString('base64');
  const keyHex = key.toString('hex');

  return {
    keyHex,
    ciphertextBase64,
  };
}

export function decryptSecret(ciphertextBase64, keyHex) {
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

// CLI Execution
if (process.argv[1] && process.argv[1].endsWith('vault-tools.js')) {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === 'encrypt') {
    const text = args[1];
    if (!text) {
      console.error('Error: Please provide the text to encrypt.');
      console.error('Usage: node scripts/vault-tools.js encrypt "<secret_text>"');
      process.exit(1);
    }

    const { keyHex, ciphertextBase64 } = encryptSecret(text);
    console.log('\n======================================================');
    console.log('🔒 THE 2030 LOVE VAULT — AES-256-GCM ENCRYPTION RESULT');
    console.log('======================================================\n');
    console.log('Ciphertext Payload (Base64) — Safe to store in public config/worker:');
    console.log(ciphertextBase64);
    console.log('\nEncryption Key (Hex) — PRIVATE DEPLOYMENT SECRET ONLY:');
    console.log(keyHex);
    console.log('\n------------------------------------------------------');
    console.log('How to configure secrets:');
    console.log('1. Cloudflare Worker:');
    console.log(`   wrangler secret put VAULT_KEY   (Paste: ${keyHex})`);
    console.log(`   wrangler secret put VAULT_CIPHERTEXT (Paste: ${ciphertextBase64})`);
    console.log('2. Vercel:');
    console.log('   Add VAULT_KEY and VAULT_CIPHERTEXT to Project Settings -> Environment Variables');
    console.log('======================================================\n');
  } else if (command === 'decrypt') {
    const cipher = args[1];
    const key = args[2];
    if (!cipher || !key) {
      console.error('Usage: node scripts/vault-tools.js decrypt "<ciphertext_base64>" "<key_hex>"');
      process.exit(1);
    }
    try {
      const result = decryptSecret(cipher, key);
      console.log('Decrypted Secret:', result);
    } catch (e) {
      console.error('Decryption failed:', e.message);
    }
  } else {
    console.log('THE 2030 LOVE VAULT — Security Tool');
    console.log('Commands:');
    console.log('  encrypt "<secret_text>"');
    console.log('  decrypt "<ciphertext_base64>" "<key_hex>"');
  }
}
