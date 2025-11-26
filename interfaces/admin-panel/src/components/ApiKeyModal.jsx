import { useState, useEffect } from 'react'
import { providers, validateKeyFormat } from '../config/providers'

export default function ApiKeyModal({ isOpen, onClose, onSave, existingKey = null, provider = null }) {
  const [selectedProvider, setSelectedProvider] = useState(provider || '')
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setSelectedProvider(provider || '')
      setApiKey(existingKey || '')
      setShowKey(false)
      setTestResult(null)
      setError('')
    }
  }, [isOpen, provider, existingKey])

  if (!isOpen) return null

  const selectedProviderData = providers.find(p => p.id === selectedProvider)
  const isEditing = !!provider

  const handleSave = () => {
    setError('')

    if (!selectedProvider) {
      setError('Please select a provider')
      return
    }

    if (!apiKey || apiKey.trim() === '') {
      setError('Please enter an API key')
      return
    }

    // Validate key format
    if (!validateKeyFormat(selectedProvider, apiKey)) {
      setError(`Invalid key format for ${selectedProviderData.name}. Expected format: ${selectedProviderData.placeholder}`)
      return
    }

    onSave(selectedProvider, apiKey)
    onClose()
  }

  const handleTest = async () => {
    setTesting(true)
    setTestResult(null)
    setError('')

    // Simulate testing (in real implementation, this would call the provider's API)
    // For now, just validate the format
    await new Promise(resolve => setTimeout(resolve, 1500))

    const isValid = validateKeyFormat(selectedProvider, apiKey)
    setTestResult({
      success: isValid,
      message: isValid
        ? 'API key format is valid'
        : `Invalid key format for ${selectedProviderData.name}`
    })
    setTesting(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">
            {isEditing ? `Edit ${selectedProviderData?.name} API Key` : 'Add API Key'}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Provider Selection */}
          {!isEditing && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provider *
              </label>
              <select
                value={selectedProvider}
                onChange={(e) => {
                  setSelectedProvider(e.target.value)
                  setTestResult(null)
                  setError('')
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a provider...</option>
                {providers.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.icon} {p.name} - {p.description}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Provider Info */}
          {selectedProviderData && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex items-start space-x-3">
                <span className="text-3xl">{selectedProviderData.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900">{selectedProviderData.name}</h3>
                  <p className="text-sm text-blue-800 mt-1">{selectedProviderData.description}</p>
                  <p className="text-xs text-blue-700 mt-2">{selectedProviderData.helpText}</p>
                  <a
                    href={selectedProviderData.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 underline mt-1 inline-block"
                  >
                    View API Documentation →
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* API Key Input */}
          {selectedProviderData && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key *
              </label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value)
                    setTestResult(null)
                    setError('')
                  }}
                  placeholder={selectedProviderData.placeholder}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-600 hover:text-gray-800 px-3 py-1 bg-gray-100 rounded"
                >
                  {showKey ? 'Hide' : 'Show'}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Expected format: {selectedProviderData.placeholder}
              </p>
            </div>
          )}

          {/* Test Key Button */}
          {selectedProviderData && apiKey && (
            <div>
              <button
                onClick={handleTest}
                disabled={testing}
                className="text-sm text-blue-600 hover:text-blue-800 underline disabled:text-gray-400"
              >
                {testing ? 'Testing key...' : 'Test API key (optional)'}
              </button>
            </div>
          )}

          {/* Test Result */}
          {testResult && (
            <div className={`p-3 rounded-md ${
              testResult.success
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`text-sm ${
                testResult.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {testResult.success ? '✓' : '✗'} {testResult.message}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-800">✗ {error}</p>
            </div>
          )}

          {/* Security Notice */}
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
            <p className="text-xs text-gray-600">
              🔒 <strong>Security:</strong> API keys are stored securely and encrypted in the database.
              Keys are never logged or exposed in plaintext.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!selectedProvider || !apiKey}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            {isEditing ? 'Update Key' : 'Add Key'}
          </button>
        </div>
      </div>
    </div>
  )
}
