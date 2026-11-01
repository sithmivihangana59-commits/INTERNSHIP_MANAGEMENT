import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { getAuthToken } from '../utils/auth.js'

export function useDashboardData(expectedRole) {
  const $q = useQuasar()
  const data = ref(null)
  const loading = ref(true)
  const error = ref('')

  async function load() {
    loading.value = true
    error.value = ''

    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error('Your session has expired. Please sign in again.')
      }

      const response = await fetch('http://localhost:5000/api/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!response.headers.get('content-type')?.includes('application/json')) {
        throw new Error(
          `Dashboard API returned an unexpected response (${response.status}). Restart the backend to load the dashboard endpoint.`
        )
      }

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            result.message ||
            `Dashboard request failed (${response.status}).`
        )
      }

      if (result.data?.role !== expectedRole) {
        throw new Error(
          'The server returned dashboard data for a different role.'
        )
      }

      data.value = result.data
    } catch (requestError) {
      error.value = requestError.message || 'Could not load dashboard data.'
      $q.notify({ type: 'negative', message: error.value, position: 'top' })
    } finally {
      loading.value = false
    }
  }

  onMounted(load)

  return { data, loading, error, reload: load }
}
