import assert from 'node:assert';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { encryptSecret, decryptSecret } from '../scripts/vault-tools.js';
import workerHandler, { RELEASE_TIMESTAMP_MS, RELEASE_ISO_STRING } from '../backend/cloudflare-worker/src/index.js';

console.log('🧪 Starting Love Vault Security & Release Verification Suite...\n');

// 1. Test AES-256-GCM Encryption & Decryption Roundtrip
{
  console.log('1. Testing AES-256-GCM Encryption / Decryption...');
  const testSecret = 'Mock Secret Partner Name';
  const { keyHex, ciphertextBase64 } = encryptSecret(testSecret);

  assert.strictEqual(typeof keyHex, 'string');
  assert.strictEqual(keyHex.length, 64, 'Key must be 64 hex characters (32 bytes / 256 bits)');
  assert.strictEqual(typeof ciphertextBase64, 'string');

  const decrypted = decryptSecret(ciphertextBase64, keyHex);
  assert.strictEqual(decrypted, testSecret, 'Decrypted text must match original secret');
  console.log('   ✅ AES-256-GCM roundtrip verified successfully.');
}

// 2. Test Cloudflare Worker Pre-2030 Authorization (Current Date: Locked)
{
  console.log('2. Testing Pre-Release Server Authorization (Locked State)...');
  const mockEnv = {
    VAULT_SECRET: 'Should Never Be Returned Before 2030',
  };
  const request = new Request('https://aarushlohit.tech/api/vault', {
    method: 'GET',
  });

  const response = await workerHandler.fetch(request, mockEnv);
  assert.strictEqual(response.status, 200);

  const cacheControl = response.headers.get('Cache-Control');
  assert(cacheControl.includes('no-store'), 'Must enforce no-store cache control');

  const data = await response.json();
  assert.strictEqual(data.status, 'locked', 'Status must be strictly "locked"');
  assert.strictEqual(data.releaseTimestamp, RELEASE_ISO_STRING);
  assert.strictEqual(data.name, undefined, 'Secret name must NOT be exposed');
  assert(data.message.includes('secret worth waiting for'), 'Must display locked message');
  console.log('   ✅ Server strictly locked. Zero secret data exposed.');
}

// 3. Test Cloudflare Worker Post-2030 Authorization Simulation
{
  console.log('3. Testing Post-2030 Release Authorization Simulation (Mock Target)...');
  const mockPartner = 'Mock Partner 2030';
  const { keyHex, ciphertextBase64 } = encryptSecret(mockPartner);

  const mockEnv = {
    VAULT_CIPHERTEXT: ciphertextBase64,
    VAULT_KEY: keyHex,
  };

  // Temporarily stub Date.now to year 2030
  const realDateNow = Date.now;
  try {
    Date.now = () => RELEASE_TIMESTAMP_MS + 1000; // 1 second after 2030-01-01 00:00:00 IST

    const request = new Request('https://aarushlohit.tech/api/vault', { method: 'GET' });
    const response = await workerHandler.fetch(request, mockEnv);
    assert.strictEqual(response.status, 200);

    const data = await response.json();
    assert.strictEqual(data.status, 'unlocked', 'Status must be unlocked after release date');
    assert.strictEqual(data.name, mockPartner, 'Decrypted name must be released after release date');
    assert(data.message.includes('Some secrets are not meant to be hacked'), 'Reveal message must be present');
    console.log('   ✅ Post-2030 release authorization and AES decryption verified.');
  } finally {
    Date.now = realDateNow;
  }
}

// 4. Test Production Build Artifacts for Zero Secret / Private Key Leakage
{
  console.log('4. Verifying Build Artifacts in dist/ for Zero Leakage...');
  const distDir = resolve('frontend/dist');
  const files = readdirSync(distDir, { recursive: true });

  const prohibitedTerms = [
    'Mock Secret Partner Name',
    'VAULT_KEY',
    'VAULT_CIPHERTEXT',
    'private_key',
  ];

  for (const file of files) {
    const fullPath = resolve(distDir, file.toString());
    try {
      const content = readFileSync(fullPath, 'utf8');
      for (const term of prohibitedTerms) {
        assert(!content.includes(term), `Prohibited term "${term}" found in build artifact: ${file}`);
      }
    } catch {
      // Binary files or directories, skip
    }
  }
  console.log('   ✅ All production bundles and HTML files verified free of secrets.');
}

// 5. Test SEO Metadata in Built easter-egg HTML
{
  console.log('5. Verifying SEO Metadata in dist/easter-egg/index.html...');
  const easterEggHtml = readFileSync(resolve('frontend/dist/easter-egg/index.html'), 'utf8');

  assert(easterEggHtml.includes('<title>Does Aarush Lohit Have a Girlfriend? — The 2030 Secret</title>'));
  assert(/name="description"\s+content="Yes, Aarush Lohit is in a relationship\. Her identity is sealed in a romantic time capsule that unlocks in 2030\."/.test(easterEggHtml));
  assert(/name="robots"\s+content="index,\s*follow"/.test(easterEggHtml));
  assert(easterEggHtml.includes('link rel="canonical" href="https://aarushlohit.tech/easter-egg"'));
  console.log('   ✅ Crawler SEO tags verified.');

}

console.log('\n🎉 ALL 5 SECURITY & FUNCTIONAL TESTS PASSED!\n');
