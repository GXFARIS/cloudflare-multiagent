/**
 * Provider Configuration
 *
 * Defines all supported AI/service providers that can have API keys configured per instance.
 * Each provider specifies validation rules, documentation, and metadata.
 */

export const providers = [
  {
    id: 'ideogram',
    name: 'Ideogram',
    icon: '🎨',
    description: 'AI image generation platform',
    keyPrefix: 'ide_',
    keyPattern: /^ide_[A-Za-z0-9_-]+$/,
    placeholder: 'ide_xxxxxxxxxxxxxxxx',
    docsUrl: 'https://ideogram.ai/api/docs',
    testEndpoint: 'https://api.ideogram.ai/v1/health',
    helpText: 'Get your API key from https://ideogram.ai/settings/api'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    icon: '🤖',
    description: 'GPT models, DALL-E, Whisper, and more',
    keyPrefix: 'sk-',
    keyPattern: /^sk-[A-Za-z0-9]{32,}$/,
    placeholder: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    docsUrl: 'https://platform.openai.com/docs/api-reference',
    testEndpoint: 'https://api.openai.com/v1/models',
    helpText: 'Get your API key from https://platform.openai.com/api-keys'
  },
  {
    id: 'anthropic',
    name: 'Anthropic (Claude)',
    icon: '🧠',
    description: 'Claude AI models',
    keyPrefix: 'sk-ant-',
    keyPattern: /^sk-ant-[A-Za-z0-9_-]+$/,
    placeholder: 'sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    docsUrl: 'https://docs.anthropic.com/claude/reference',
    testEndpoint: null, // No public health endpoint
    helpText: 'Get your API key from https://console.anthropic.com/settings/keys'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    icon: '✨',
    description: 'Google\'s Gemini AI models',
    keyPrefix: 'AI',
    keyPattern: /^AIza[A-Za-z0-9_-]{35}$/,
    placeholder: 'AIzaXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxX',
    docsUrl: 'https://ai.google.dev/docs',
    testEndpoint: null, // Requires complex auth
    helpText: 'Get your API key from https://makersuite.google.com/app/apikey'
  }
]

/**
 * Get provider by ID
 * @param {string} id - Provider ID
 * @returns {object|undefined} Provider object or undefined
 */
export function getProviderById(id) {
  return providers.find(provider => provider.id === id)
}

/**
 * Get all provider IDs
 * @returns {string[]} Array of provider IDs
 */
export function getProviderIds() {
  return providers.map(p => p.id)
}

/**
 * Validate API key format for a provider
 * @param {string} providerId - Provider ID
 * @param {string} apiKey - API key to validate
 * @returns {boolean} True if valid format
 */
export function validateKeyFormat(providerId, apiKey) {
  const provider = getProviderById(providerId)
  if (!provider) return false

  return provider.keyPattern.test(apiKey)
}

/**
 * Get provider name from ID
 * @param {string} providerId - Provider ID
 * @returns {string} Provider display name
 */
export function getProviderName(providerId) {
  const provider = getProviderById(providerId)
  return provider ? provider.name : providerId
}
