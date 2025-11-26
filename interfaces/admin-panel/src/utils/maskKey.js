/**
 * Mask sensitive API keys for display in the UI
 * Shows only the first 3 and last 4 characters, replacing the middle with asterisks
 *
 * Examples:
 *   sk-1234567890abcdef -> sk-****cdef
 *   ide_abc123xyz -> ide****xyz
 *   AIzaSyABC123DEF456GHI -> AIz****GHI
 */

/**
 * Mask an API key for secure display
 * @param {string} key - Full API key
 * @param {number} showFirst - Number of characters to show at start (default: 3)
 * @param {number} showLast - Number of characters to show at end (default: 4)
 * @returns {string} Masked key
 */
export function maskApiKey(key, showFirst = 3, showLast = 4) {
  if (!key || typeof key !== 'string') {
    return '****'
  }

  // If key is too short, mask it completely
  if (key.length <= showFirst + showLast) {
    return '*'.repeat(Math.min(key.length, 8))
  }

  const start = key.slice(0, showFirst)
  const end = key.slice(-showLast)
  const maskedMiddle = '****'

  return `${start}${maskedMiddle}${end}`
}

/**
 * Check if a key is already masked
 * @param {string} key - Key to check
 * @returns {boolean} True if key contains masking characters
 */
export function isMaskedKey(key) {
  return typeof key === 'string' && key.includes('****')
}

/**
 * Format key for display with provider prefix
 * @param {string} providerId - Provider ID (e.g., 'openai', 'ideogram')
 * @param {string} key - Full or masked API key
 * @param {boolean} mask - Whether to mask the key (default: true)
 * @returns {string} Formatted key
 */
export function formatKeyForDisplay(providerId, key, mask = true) {
  if (!key) return 'Not configured'

  if (mask && !isMaskedKey(key)) {
    return maskApiKey(key)
  }

  return key
}

/**
 * Validate that a key is not masked (for form submission)
 * @param {string} key - Key to validate
 * @returns {boolean} True if key is valid (not masked)
 */
export function isValidKey(key) {
  return key && typeof key === 'string' && !isMaskedKey(key) && key.length > 0
}
