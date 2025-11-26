import { useState, useEffect } from 'react'
import Header from './components/Header'
import StatsCards from './components/StatsCards'
import RequestsChart from './components/RequestsChart'
import ErrorsChart from './components/ErrorsChart'
import ProviderChart from './components/ProviderChart'
import RateLimitChart from './components/RateLimitChart'
import apiService from './services/api'

function App() {
  const [selectedInstance, setSelectedInstance] = useState('production')
  const [timeRange, setTimeRange] = useState('24h')
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    loadMetrics()
  }, [selectedInstance, timeRange])

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      loadMetrics()
    }, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [autoRefresh, selectedInstance, timeRange])

  const loadMetrics = async () => {
    try {
      setLoading(true)
      const data = await apiService.getAllMetrics(selectedInstance, timeRange)
      setMetrics(data)
    } catch (err) {
      console.error('Error loading metrics:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading && !metrics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        selectedInstance={selectedInstance}
        onInstanceChange={setSelectedInstance}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        autoRefresh={autoRefresh}
        onAutoRefreshChange={setAutoRefresh}
        onRefresh={loadMetrics}
      />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {metrics && (
          <>
            <StatsCards metrics={metrics.stats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <RequestsChart data={metrics.requests} />
              <ErrorsChart data={metrics.errors} />
              <RateLimitChart data={metrics.rateLimits} />
              <ProviderChart data={metrics.providers} />
            </div>
          </>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>Built with Claude Code | Powered by Cloudflare Workers</p>
          <p className="mt-1">Last updated: {metrics?.timestamp ? new Date(metrics.timestamp).toLocaleString() : '-'}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
